
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

// ฟังก์ชันสร้างผู้ใช้
exports.createUser = async (req, res) => {
    try {
        const { email, password, name, age } = req.body; // ข้อมูลที่จะอัปเดตจาก Body

        // const isDuplicateEmail = users?.find(e => e?.email === email)
        const isDuplicateEmail = await User.findOne({ email });
        if (isDuplicateEmail) {
            return res.status(404).send({ message: "Email cannot duplicate" });
        }

        // สร้างผู้ใช้ใหม่
        const user = new User({
            email,
            password, // อย่าลืมเข้ารหัสรหัสผ่านก่อนบันทึก
            name,
            age,
        });

        // เข้ารหัสรหัสผ่านก่อนบันทึก
        user.password = await bcrypt.hash(user.password, 10); // เข้ารหัสรหัสผ่าน
        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.patchUser = async (req, res) => {
    try {
        const userId = req.params.id; // ดึง ID จากพารามิเตอร์ URL
        const updates = req.body; // ข้อมูลที่จะอัปเดตจาก Body

        // ค้นหาและอัปเดตผู้ใช้
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // ส่งข้อมูลผู้ใช้ที่อัปเดตแล้ว
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// ฟังก์ชันดึงข้อมูลผู้ใช้
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUsersById = async (req, res) => {
    try {
        // ดึง ID จากพารามิเตอร์ URL
        const userId = req.params.id;

        // ค้นหาผู้ใช้ตาม ID
        const user = await User.findById(userId);

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // ส่งข้อมูลผู้ใช้
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // ดึง ID จากพารามิเตอร์ URL

        // ลบผู้ใช้ตาม ID
        const user = await User.findByIdAndDelete(userId);

        // ตรวจสอบว่าพบผู้ใช้หรือไม่
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // ส่งข้อความยืนยันการลบ
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
};