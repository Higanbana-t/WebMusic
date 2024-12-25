const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Playlist = require('./playlistModel');
const Song = require('./songModel');

const PlaylistSong = sequelize.define('PlaylistSong', {}, {
  tableName: 'Playlist_Songs',
  timestamps: false
});

// Thiết lập mối quan hệ với bảng Playlists và Songs
PlaylistSong.belongsTo(Playlist, { foreignKey: 'playlist_id' });
PlaylistSong.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = PlaylistSong;
