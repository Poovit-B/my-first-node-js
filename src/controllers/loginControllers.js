const bcrypt = require('bcrypt');
const { createTokens , verifyToken } = require('../services/tokenService');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // ดึง email และ password จาก Body

        // ค้นหาผู้ใช้ตาม email
        let user = await User.findOne({ email });

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        const { accessToken, refreshToken } = createTokens(user);

        // เก็บ Refresh Token ในฐานข้อมูลหรือเซสชัน (ในที่นี้ใช้ตัวแปรสำหรับตัวอย่าง)
        user.refresh_token = refreshToken;
        await user.save(); // บันทึก Refresh Token

        res.status(200).send({ access_token: accessToken, refresh_token: refreshToken, user });
    } catch (error) {
        console.log('error', error)
        res.status(500).send(error);
    }
};


exports.token = async (req, res) => {

    const refreshToken = req.body.token;
    if (!refreshToken) return res.sendStatus(401); // Unauthorized

    try {
        const userData = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        // ค้นหาผู้ใช้ในฐานข้อมูลโดยใช้ ID จาก Refresh Token
        const user = await User.findById(userData.id);

        if (!user || user.refresh_token !== refreshToken) return res.sendStatus(403); // Forbidden

        const { accessToken } = createTokens(user);
        res.json({ accessToken });
    } catch (err) {
        console.log('err',err)
        return res.sendStatus(403); // Forbidden
    }
}