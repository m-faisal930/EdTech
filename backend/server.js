// // 📁 server/server.js
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const courseRoutes = require('./routes/courseRoutes');
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);


// app.listen(5000, () => console.log('Server running on port 5000'));




// 📁 server/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/messages', messageRoutes);

connectDB();



const Message = require('./models/Message'); // ⬅ import the Message model at top

// io.on('connection', (socket) => {
//   socket.on('joinRoom', ({ courseId, user }) => {
//     socket.join(courseId);
//     // Send updated list of active users to room (you can build this out further)
//   });

//   socket.on(
//     'sendMessage',
//     async ({ courseId, message, senderId, receiverId }) => {
//       try {
//         const savedMessage = new Message({
//           courseId,
//           senderId,
//           receiverId: receiverId || null,
//           message,
//         });
//         await savedMessage.save();

//         const populatedMessage = await savedMessage
//           .populate('senderId', 'name')
//           .populate('receiverId', 'name')
//           .execPopulate();

//         io.to(courseId).emit('message', populatedMessage);
//       } catch (err) {
//         console.error('Failed to save message:', err);
//       }
//     }
//   );
// });




// const Message = require('./models/Message'); // make sure this import is present

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ courseId, user }) => {
    socket.join(courseId);
  });

  socket.on(
    'sendMessage',
    async ({ courseId, message, senderId, receiverId }) => {
      try {
        // Save message to DB
        const saved = await new Message({
          courseId,
          message,
          senderId,
          receiverId,
        }).save();

        // Populate sender and receiver
        const populatedMessage = await Message.findById(saved._id)
          .populate('senderId', 'name')
          .populate('receiverId', 'name');

        // Emit to the room
        io.to(courseId).emit('message', populatedMessage);
      } catch (err) {
        console.error('Message saving error:', err);
      }
    }
  );
});

server.listen(5000, () => console.log('Server running on port 5000'));
