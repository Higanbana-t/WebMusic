const express = require('express');
const { createPlaylistsByGenres } = require('../controllers/autoplaylistController');

const router = express.Router();

// Route to create playlists for fixed genres
router.post('/create-playlists', createPlaylistsByGenres);

module.exports = router;
