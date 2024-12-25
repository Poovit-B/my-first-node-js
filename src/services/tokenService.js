
const jwt = require('jsonwebtoken');

// ฟังก์ชันสำหรับสร้าง Access Token และ Refresh Token
const createTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

// ฟังก์ชันสำหรับการตรวจสอบ Token
const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = { createTokens, verifyToken };