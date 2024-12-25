const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

// API lưu bài hát vào Listening History và cập nhật play_count
router.post('/saveListeningHistory', musicController.saveListeningHistory);

module.exports = router;
