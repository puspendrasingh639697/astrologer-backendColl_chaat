const mongoose = require('mongoose');
const Astrologer = require('./models/Astrologer');

const demoData = [
    {
        firstName: 'Acharya Sheetal',
        languages: ['Hindi', 'English'],
        experience: 17,
        skills: ['Vedic Astrology'],
        rating: 5,
        isAvailable: true
    },
    {
        firstName: 'Pandit Suresh Mishra',
        languages: ['Hindi'],
        experience: 10,
        skills: ['Vedic Astrology'],
        rating: 5,
        isAvailable: true
    },
    {
        firstName: 'Acharya Shardha',
        languages: ['English'],
        experience: 15,
        skills: ['Vedic Astrology', 'Tarot'],
        rating: 5,
        isAvailable: true
    },
    {
        firstName: 'Pandit Anil Tripathi',
        languages: ['Hindi', 'Sanskrit'],
        experience: 22,
        skills: ['Vedic Astrology', 'Vedic Pujan'],
        rating: 5,
        isAvailable: true
    },
    {
        firstName: 'Pt. Raghav Mishra',
        languages: ['English', 'Hindi'],
        experience: 7,
        skills: ['Vedic Astrology', 'Vedic Pujan'],
        rating: 4.5,
        isAvailable: true
    },
    {
        firstName: 'Acharya Nakul',
        languages: ['Hindi', 'Sanskrit'],
        experience: 9,
        skills: ['Vedic Astrology'],
        rating: 4.5,
        isAvailable: true
    },
    {
        firstName: 'Pandit Hari Om',
        languages: ['English', 'Hindi'],
        experience: 6,
        skills: ['Vedic Astrology', 'Tarot'],
        rating: 4,
        isAvailable: true
    }
];

async function seed() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/astrologerDB');
        await Astrologer.deleteMany();
        await Astrologer.insertMany(demoData);
        console.log('✅ Demo data added successfully!');
        console.log(`📊 Added ${demoData.length} astrologers`);
        process.exit();
    } catch (error) {
        console.log('❌ Error:', error);
        process.exit();
    }
}

seed();