const ListeningHistory = require('../models/listeningHistoryModel');
const Song = require('../models/songModel');

exports.saveListeningHistory = async (req, res) => {
  const { userId, songId } = req.body;

  if (!userId || !songId) {
    return res.status(400).json({ message: 'Missing userId or songId' });
  }

  if (isNaN(userId) || isNaN(songId)) {
    return res.status(400).json({ message: 'userId and songId must be numbers' });
  }

  try {
    // Log nhận dữ liệu
    console.log('Saving Listening History:', { userId, songId });

    // Lưu vào bảng ListeningHistory
    await ListeningHistory.create({ user_id: userId, song_id: songId });

    // Tăng play_count cho bài hát (không cần cập nhật updatedAt)
    const updatedRows = await Song.increment('play_count', { by: 1, where: { id: songId } });

    if (!updatedRows[0]) {
      return res.status(404).json({ message: 'Song not found' });
    }

    return res.status(200).json({
      message: 'Successfully saved to listening history and updated play count',
    });
  } catch (error) {
    console.error('Error in saveListeningHistory:', error);

    // Gửi thông tin lỗi chi tiết hơn nếu cần
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
