const express = require('express');
const userRoutes = require('./userRoutes'); // นำเข้าค่า userRoutes
const loginRoutes = require('./loginRoutes'); // หากมีไฟล์ loginRoutes

const router = express.Router();

// กำหนดเส้นทางหลักที่นี่
router.use('/users', userRoutes); // เส้นทางสำหรับผู้ใช้
router.use('', loginRoutes); // เส้นทางสำหรับการล็อกอิน (ถ้ามี)

module.exports = router; // ส่งออก router