


// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors');
// // const http = require('http');
// // const socketIo = require('socket.io');
// // require('dotenv').config();

// // // Model Import
// // const Message = require('./models/Message'); 

// // const app = express();
// // const server = http.createServer(app);

// // // Socket.io Setup
// // const io = socketIo(server, {
// //     cors: {
// //         origin: ["http://localhost:3000", "http://localhost:5173"],
// //         methods: ["GET", "POST"]
// //     }
// // });

// // app.use(cors());
// // app.use(express.json());

// // // --- MongoDB Connection ---
// // mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astrologerDB')
// //     .then(() => console.log('✅ [DB] MongoDB Connected'))
// //     .catch((err) => console.log('❌ [DB] MongoDB Error:', err));

// // // --- Routes ---
// // app.use('/api', require('./routes/astrologers'));
// // app.use('/api/chat', require('./routes/chat'));

// // // Test API
// // app.get('/api/test', (req, res) => {
// //     res.json({ message: 'Backend is working!' });
// // });

// // // --- SOCKET.IO FULL LOGIC ---
// // const users = {}; // Mapping: { userId: socketId }

// // io.on('connection', (socket) => {
// //     console.log(`🔌 [DEBUG] New Connection: ${socket.id}`);

// //     // 1. User/Pandit Join Logic
// //     socket.on('user-join', (userId) => {
// //         if (userId) {
// //             const strUserId = String(userId);
// //             users[strUserId] = socket.id; 
// //             console.log(`📱 [DEBUG] User ${strUserId} is Online (Socket: ${socket.id})`);
// //             io.emit('online-users', Object.keys(users));
// //         }
// //     });

// //     // 2. Private Message Logic
// //     socket.on('private-message', async (data) => {
// //         const { to, from, message } = data;
        
// //         if (String(to) === String(from)) {
// //             console.log("❌ ERROR: Sender and Receiver are SAME!");
// //             return; 
// //         }

// //         // Save message to database
// //         try {
// //             const newMessage = new Message({ from, to, message });
// //             await newMessage.save();
// //         } catch (err) {
// //             console.error("Error saving message:", err);
// //         }

// //         const targetSocket = users[String(to)];
// //         if (targetSocket) {
// //             io.to(targetSocket).emit('private-message', { 
// //                 from, 
// //                 message, 
// //                 createdAt: new Date() 
// //             });
// //             console.log(`✅ Message routed from ${from} to ${to}`);
// //         } else {
// //             console.log(`📡 User ${to} offline, message saved to DB`);
// //         }
// //     });

// //     // 3. Chat Notification
// //     socket.on('chat-notification', (data) => {
// //         const targetSocket = users[String(data.to)];
// //         if (targetSocket) {
// //             console.log(`📣 [DEBUG] Sending Chat Invite to: ${data.to}`);
// //             io.to(targetSocket).emit('chat-notification', {
// //                 from: data.from,
// //                 fromName: data.fromName || "A User"
// //             });
// //         }
// //     });

// //     // 4. Typing Indicator
// //     socket.on('typing', (data) => {
// //         const targetSocket = users[String(data.to)];
// //         if (targetSocket) {
// //             io.to(targetSocket).emit('user-typing', { from: data.from });
// //         }
// //     });

// //     // 5. Video Call Signaling - ✅ CRITICAL: Incoming Call Event
// //     socket.on('call-user', (data) => {
// //         console.log(`📞 [DEBUG] Call Signal from ${data.from} to ${data.to}`);
// //         const targetSocket = users[String(data.to)];
// //         if (targetSocket) {
// //             // Send both notifications for better compatibility
// //             io.to(targetSocket).emit('call-notification', { 
// //                 from: data.from,
// //                 type: 'call'
// //             });
// //             io.to(targetSocket).emit('incoming-call', { 
// //                 from: data.from, 
// //                 signal: data.signal || 'call_request'
// //             });
// //             console.log(`✅ Call notification sent to ${data.to}`);
// //         } else {
// //             console.log(`❌ User ${data.to} not online`);
// //         }
// //     });

// //     socket.on('answer-call', (data) => {
// //         const targetSocket = users[String(data.to)];
// //         if (targetSocket) {
// //             io.to(targetSocket).emit('call-answered', { signal: data.signal });
// //             console.log(`✅ Call answered by ${data.to}`);
// //         }
// //     });

// //     socket.on('end-call', (data) => {
// //         const targetSocket = users[String(data.to)];
// //         if (targetSocket) {
// //             io.to(targetSocket).emit('call-ended');
// //             console.log(`🔴 Call ended with ${data.to}`);
// //         }
// //     });

// //     // 6. Disconnection Logic
// //     socket.on('disconnect', () => {
// //         for (const [userId, socketId] of Object.entries(users)) {
// //             if (socketId === socket.id) {
// //                 console.log(`🔴 [DEBUG] User ${userId} went Offline.`);
// //                 delete users[userId];
// //                 io.emit('online-users', Object.keys(users));
// //                 break;
// //             }
// //         }
// //     });
// // });

// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => {
// //     console.log(`🚀 [SERVER] Running on http://localhost:${PORT}`);
// //     console.log(`✅ Socket.io ready for Chat & Video Calls`);
// // });


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');
// require('dotenv').config();

// // Model Import
// const Message = require('./models/Message'); 

// const app = express();
// const server = http.createServer(app);

// // ✅ CORS - Add your Vercel frontend URL here
// const allowedOrigins = [
//     "http://localhost:3000",
//     "http://localhost:5173",
//     "https://demo-asto-poject-5pyv.vercel.app",
//     "https://demo-asto-poject.vercel.app"
// ];

// // Socket.io Setup with CORS
// const io = socketIo(server, {
//     cors: {
//         origin: allowedOrigins,
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });

// // Express CORS
// app.use(cors({
//     origin: allowedOrigins,
//     credentials: true
// }));
// app.use(express.json());

// // --- MongoDB Connection ---
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astrologerDB')
//     .then(() => console.log('✅ [DB] MongoDB Connected'))
//     .catch((err) => console.log('❌ [DB] MongoDB Error:', err));

// // --- Routes ---
// app.use('/api', require('./routes/astrologers'));
// app.use('/api/chat', require('./routes/chat'));

// // Test API
// app.get('/api/test', (req, res) => {
//     res.json({ message: 'Backend is working!' });
// });

// // --- SOCKET.IO FULL LOGIC ---
// const users = {}; // Mapping: { userId: socketId }

// io.on('connection', (socket) => {
//     console.log(`🔌 [DEBUG] New Connection: ${socket.id}`);

//     // 1. User/Pandit Join Logic
//     socket.on('user-join', (userId) => {
//         if (userId) {
//             const strUserId = String(userId);
//             users[strUserId] = socket.id; 
//             console.log(`📱 [DEBUG] User ${strUserId} is Online (Socket: ${socket.id})`);
//             io.emit('online-users', Object.keys(users));
//         }
//     });

//     // 2. Private Message Logic
//     socket.on('private-message', async (data) => {
//         const { to, from, message } = data;
        
//         if (String(to) === String(from)) {
//             console.log("❌ ERROR: Sender and Receiver are SAME!");
//             return; 
//         }

//         // Save message to database
//         try {
//             const newMessage = new Message({ from, to, message });
//             await newMessage.save();
//         } catch (err) {
//             console.error("Error saving message:", err);
//         }

//         const targetSocket = users[String(to)];
//         if (targetSocket) {
//             io.to(targetSocket).emit('private-message', { 
//                 from, 
//                 message, 
//                 createdAt: new Date() 
//             });
//             console.log(`✅ Message routed from ${from} to ${to}`);
//         } else {
//             console.log(`📡 User ${to} offline, message saved to DB`);
//         }
//     });

//     // 3. Chat Notification
//     socket.on('chat-notification', (data) => {
//         const targetSocket = users[String(data.to)];
//         if (targetSocket) {
//             console.log(`📣 [DEBUG] Sending Chat Invite to: ${data.to}`);
//             io.to(targetSocket).emit('chat-notification', {
//                 from: data.from,
//                 fromName: data.fromName || "A User"
//             });
//         }
//     });

//     // 4. Typing Indicator
//     socket.on('typing', (data) => {
//         const targetSocket = users[String(data.to)];
//         if (targetSocket) {
//             io.to(targetSocket).emit('user-typing', { from: data.from });
//         }
//     });

//     // 5. Video Call Signaling - ✅ CRITICAL: Incoming Call Event
//     socket.on('call-user', (data) => {
//         console.log(`📞 [DEBUG] Call Signal from ${data.from} to ${data.to}`);
//         const targetSocket = users[String(data.to)];
//         if (targetSocket) {
//             // Send both notifications for better compatibility
//             io.to(targetSocket).emit('call-notification', { 
//                 from: data.from,
//                 type: 'call'
//             });
//             io.to(targetSocket).emit('incoming-call', { 
//                 from: data.from, 
//                 signal: data.signal || 'call_request'
//             });
//             console.log(`✅ Call notification sent to ${data.to}`);
//         } else {
//             console.log(`❌ User ${data.to} not online`);
//         }
//     });

//     socket.on('answer-call', (data) => {
//         const targetSocket = users[String(data.to)];
//         if (targetSocket) {
//             io.to(targetSocket).emit('call-answered', { signal: data.signal });
//             console.log(`✅ Call answered by ${data.to}`);
//         }
//     });

//     socket.on('end-call', (data) => {
//         const targetSocket = users[String(data.to)];
//         if (targetSocket) {
//             io.to(targetSocket).emit('call-ended');
//             console.log(`🔴 Call ended with ${data.to}`);
//         }
//     });

//     // 6. Disconnection Logic
//     socket.on('disconnect', () => {
//         for (const [userId, socketId] of Object.entries(users)) {
//             if (socketId === socket.id) {
//                 console.log(`🔴 [DEBUG] User ${userId} went Offline.`);
//                 delete users[userId];
//                 io.emit('online-users', Object.keys(users));
//                 break;
//             }
//         }
//     });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`🚀 [SERVER] Running on http://localhost:${PORT}`);
//     console.log(`✅ Socket.io ready for Chat & Video Calls`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Model Import
const Message = require('./models/Message'); 

const app = express();
const server = http.createServer(app);

// ✅ CORS - All Frontend URLs added
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://demo-asto-poject-5pyv.vercel.app",
    "https://demo-asto-poject-vrxc.vercel.app",
    "https://demo-asto-poject.vercel.app",
    "https://astrologer-backendcoll-chaat.onrender.com"
];

// Socket.io Setup with CORS
const io = socketIo(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Express CORS
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astrologerDB')
    .then(() => console.log('✅ [DB] MongoDB Connected'))
    .catch((err) => console.log('❌ [DB] MongoDB Error:', err));

// --- Routes ---
app.use('/api', require('./routes/astrologers'));
app.use('/api/chat', require('./routes/chat'));

// Test API
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

// --- SOCKET.IO FULL LOGIC ---
const users = {};

io.on('connection', (socket) => {
    console.log(`🔌 [DEBUG] New Connection: ${socket.id}`);

    // 1. User/Pandit Join Logic
    socket.on('user-join', (userId) => {
        if (userId) {
            const strUserId = String(userId);
            users[strUserId] = socket.id; 
            console.log(`📱 [DEBUG] User ${strUserId} is Online (Socket: ${socket.id})`);
            io.emit('online-users', Object.keys(users));
        }
    });

    // 2. Private Message Logic
    socket.on('private-message', async (data) => {
        const { to, from, message } = data;
        
        if (String(to) === String(from)) {
            console.log("❌ ERROR: Sender and Receiver are SAME!");
            return; 
        }

        try {
            const newMessage = new Message({ from, to, message });
            await newMessage.save();
        } catch (err) {
            console.error("Error saving message:", err);
        }

        const targetSocket = users[String(to)];
        if (targetSocket) {
            io.to(targetSocket).emit('private-message', { 
                from, 
                message, 
                createdAt: new Date() 
            });
            console.log(`✅ Message routed from ${from} to ${to}`);
        } else {
            console.log(`📡 User ${to} offline, message saved to DB`);
        }
    });

    // 3. Chat Notification
    socket.on('chat-notification', (data) => {
        const targetSocket = users[String(data.to)];
        if (targetSocket) {
            console.log(`📣 [DEBUG] Sending Chat Invite to: ${data.to}`);
            io.to(targetSocket).emit('chat-notification', {
                from: data.from,
                fromName: data.fromName || "A User"
            });
        }
    });

    // 4. Typing Indicator
    socket.on('typing', (data) => {
        const targetSocket = users[String(data.to)];
        if (targetSocket) {
            io.to(targetSocket).emit('user-typing', { from: data.from });
        }
    });

    // 5. Video Call Signaling - Incoming Call Event
    socket.on('call-user', (data) => {
        console.log(`📞 [DEBUG] Call Signal from ${data.from} to ${data.to}`);
        const targetSocket = users[String(data.to)];
        if (targetSocket) {
            io.to(targetSocket).emit('call-notification', { 
                from: data.from,
                type: 'call'
            });
            io.to(targetSocket).emit('incoming-call', { 
                from: data.from, 
                signal: data.signal || 'call_request'
            });
            console.log(`✅ Call notification sent to ${data.to}`);
        } else {
            console.log(`❌ User ${data.to} not online`);
        }
    });

    socket.on('answer-call', (data) => {
        const targetSocket = users[String(data.to)];
        if (targetSocket) {
            io.to(targetSocket).emit('call-answered', { signal: data.signal });
            console.log(`✅ Call answered by ${data.to}`);
        }
    });

    socket.on('end-call', (data) => {
        const targetSocket = users[String(data.to)];
        if (targetSocket) {
            io.to(targetSocket).emit('call-ended');
            console.log(`🔴 Call ended with ${data.to}`);
        }
    });

    // 6. Disconnection Logic
    socket.on('disconnect', () => {
        for (const [userId, socketId] of Object.entries(users)) {
            if (socketId === socket.id) {
                console.log(`🔴 [DEBUG] User ${userId} went Offline.`);
                delete users[userId];
                io.emit('online-users', Object.keys(users));
                break;
            }
        }
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 [SERVER] Running on http://localhost:${PORT}`);
    console.log(`✅ Socket.io ready for Chat & Video Calls`);
});