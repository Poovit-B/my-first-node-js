const User = require('../models/userModel');

// ฟังก์ชันสร้างผู้ใช้
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
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