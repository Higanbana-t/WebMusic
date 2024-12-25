const Song = require('../models/songModel');
const AutoPlaylist = require('../models/autoPlaylistModel');
const AutoPlaylistSong = require('../models/autoPlaylistSongModel');

const genres = [
  'Pop',
  'Rock',
  'Jazz',
  'Classical',
  'Hip-hop',
  'Blues',
  'Country',
  'Reggae',
  'Electronic',
  'Folk',
  'Disco',
  'Soul',
  'Metal',
  'Funk',
  'R&B',
  'Latin',
  'Indie',
  'Gospel',
  'K-pop',
];

const createPlaylistsByGenres = async (req, res) => {
  try {
    const createdPlaylists = [];

    for (const genre of genres) {
      // Fetch top 10 songs by play_count for the genre
      const topSongs = await Song.findAll({
        attributes: [
          'id',
          'name',
          'play_count',
          'genre',
          'description',
          'file_url',
          'cover_url',
          'created_at', // Explicitly include 'created_at'
        ],
        where: { genre },
        order: [['play_count', 'DESC']],
        limit: 10, // Adjusting to get top 10 songs
      });

      if (topSongs.length === 0) {
        console.log(`No songs found for genre: ${genre}`);
        continue; // Skip if no songs found for the genre
      }

      // Create playlist for the genre
      const playlist = await AutoPlaylist.create({
        name: `Top 10 ${genre} Hits`,
        reason: `Top songs in ${genre}`,
      });

      // Add songs to the playlist
      const playlistSongs = topSongs.map(song => ({
        auto_playlist_id: playlist.id,
        song_id: song.id,
      }));

      await AutoPlaylistSong.bulkCreate(playlistSongs);

      // Include the songs in the response
      createdPlaylists.push({
        playlist: playlist.toJSON(),
        songs: topSongs.map(song => song.toJSON()),
      });
    }

    if (createdPlaylists.length === 0) {
      return res.status(404).json({
        message: 'No playlists created. No songs found for any genre.',
      });
    }

    res.status(201).json({
      message: 'Playlists created successfully',
      playlists: createdPlaylists,
    });
  } catch (error) {
    console.error('Error creating playlists:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = { createPlaylistsByGenres };
