const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { sendMessage, getMessages, deleteMessage } = require('../controllers/messageController');

// Public: Send Message
router.post('/', sendMessage);

// Admin: Read/Delete Messages
router.get('/', auth, getMessages);
router.delete('/:id', auth, deleteMessage);

module.exports = router;