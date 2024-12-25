const express = require('express');
const router = express.Router();
const LoginControllers = require('../controllers/loginControllers');

router.post('/login', LoginControllers.login);
router.post('/token', LoginControllers.token);

module.exports = router;
