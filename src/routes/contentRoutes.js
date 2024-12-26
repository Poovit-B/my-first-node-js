const express = require('express');
const router = express.Router();
const ContentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ContentController.createContent);
router.get('/', authMiddleware, ContentController.getContents);

module.exports = router;
