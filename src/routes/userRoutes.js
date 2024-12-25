const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// เส้นทางสำหรับการสร้างผู้ใช้
router.post('/', authMiddleware, UserController.createUser);
// เส้นทางสำหรับการดึงข้อมูลผู้ใช้
router.get('/', authMiddleware, UserController.getUsers);

router.get('/:id', authMiddleware, UserController.getUsersById);
router.patch('/:id', authMiddleware, UserController.patchUser);
router.delete('/:id', authMiddleware, UserController.deleteUser);

module.exports = router;
