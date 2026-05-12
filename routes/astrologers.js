const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');

router.get('/astrologers', async (req, res) => {
    try {
        const astrologers = await Astrologer.find();
        res.json({ success: true, data: astrologers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get('/astrologers/:id', async (req, res) => {
    try {
        const astrologer = await Astrologer.findById(req.params.id);
        if (!astrologer) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: astrologer });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.post('/astrologers', async (req, res) => {
    try {
        const astrologer = new Astrologer(req.body);
        await astrologer.save();
        res.status(201).json({ success: true, data: astrologer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.put('/astrologers/:id', async (req, res) => {
    try {
        const astrologer = await Astrologer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: astrologer });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.delete('/astrologers/:id', async (req, res) => {
    try {
        await Astrologer.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router; 