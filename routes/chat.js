const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get messages between two users
router.get('/messages/:user1/:user2', async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await Message.find({
            $or: [
                { from: user1, to: user2 },
                { from: user2, to: user1 }
            ]
        }).sort({ createdAt: 1 });
        
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Save message
router.post('/messages', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();
        res.json({ success: true, data: message });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;