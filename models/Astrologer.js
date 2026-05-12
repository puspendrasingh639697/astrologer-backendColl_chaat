const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, default: '' },
    image: { type: String, default: '' },
    languages: [{ type: String }],
    experience: { type: Number, default: 0 },
    skills: [{ type: String }],
    rating: { type: Number, default: 5 },
    isAvailable: { type: Boolean, default: true },
    pricePerSession: { type: Number, default: 500 }
}, { timestamps: true });

module.exports = mongoose.model('Astrologer', astrologerSchema);