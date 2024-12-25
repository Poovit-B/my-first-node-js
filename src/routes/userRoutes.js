const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// เส้นทางสำหรับการสร้างผู้ใช้
router.post('/', UserController.createUser);

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้
router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUsersById);

module.exports = router;
