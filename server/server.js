const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

// Import các route cần thiết
const userRoutes = require('./routes/userRoutes');


const autoPlaylistRoutes = require('./routes/autoplaylistRoutes');
const songRoutes = require('./routes/songRoutes');
const musicRoutes = require('./routes/musicRoutes');



 // Auto Playlist routes

// Sử dụng CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Chỉ cho phép frontend ở localhost:3000 gửi yêu cầu
  methods: ['GET', 'POST'], // Các phương thức cho phép
  allowedHeaders: ['Content-Type'], // Các header cho phép
}));

app.use(express.json());  // Middleware để xử lý JSON request

// Đăng ký router cho các route liên quan đến user, search và auto playlist
app.use('/api', userRoutes);   // Sử dụng router cho user
 // Sử dụng router cho search
app.use('/api', autoPlaylistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/music', musicRoutes);

// Port của server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

