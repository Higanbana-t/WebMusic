const Song = require('../models/songModel'); // Ensure this is the correct path
const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');

// API to fetch top 20 songs by play_count
const getTop20Songs = async (req, res) => {
  try {
    // Fetch top 20 songs by play_count in descending order
    const topSongs = await Song.findAll({
      order: [['play_count', 'DESC']], // Order by play_count in descending order
      limit: 20, // Limit the results to the top 20 songs
      attributes: [
        'id', 
        'name', 
        'play_count', 
        'genre', 
        'description', 
        'file_url', 
        'cover_url', 
        'created_at', // Ensure 'created_at' column is selected
      ], // Explicitly select the columns
    });

    if (topSongs.length === 0) {
      return res.status(404).json({ message: 'No songs found.' });
    }

    // Convert topSongs from Sequelize instance to plain object for easy JSON response
    const songsData = topSongs.map(song => song.toJSON());

    res.status(200).json({
      message: 'Top 20 songs fetched successfully.',
      songs: songsData,
    });
  } catch (error) {
    console.error('Error fetching top 20 songs:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
// Lấy danh sách 19 bài hát ngẫu nhiên
const getRandomSongs = async (req, res) => {
  try {
    // Lấy 19 bài hát ngẫu nhiên từ bảng Song
    const randomSongs = await Song.findAll({
      order: Sequelize.fn('RAND'), // Lấy các bài hát ngẫu nhiên
      limit: 19,  // Cố định lấy 19 bài hát
      attributes: [
        'id', 
        'name',  
        'file_url', 
        'cover_url', 
        'play_count', 
        'genre', 
        'description', 
        'created_at', // Cột created_at để đảm bảo có thông tin thời gian tạo
      ], // Explicitly select the columns
    });

    if (randomSongs.length === 0) {
      return res.status(404).json({ message: 'No songs found.' });
    }

    // Chuyển dữ liệu từ Sequelize instance sang đối tượng JSON để trả về dễ dàng
    const songsData = randomSongs.map(song => song.toJSON());

    res.status(200).json({
      message: 'Random songs fetched successfully.',
      songs: songsData,
    });
  } catch (error) {
    console.error('Error fetching random songs:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { getTop20Songs,getRandomSongs };
