const express = require('express');
const router = express.Router();
const { getTop20Songs } = require('../controllers/songController'); // Ensure this is the correct path
const { getRandomSongs } = require('../controllers/songController');
// Route for fetching top 20 songs
router.get('/top-20-songs', getTop20Songs);
router.get('/random', getRandomSongs);

module.exports = router;
