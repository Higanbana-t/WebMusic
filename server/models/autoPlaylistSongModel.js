const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const AutoPlaylistSong = sequelize.define('AutoPlaylistSong', {
  auto_playlist_id: { type: DataTypes.INTEGER, primaryKey: true },
  song_id: { type: DataTypes.INTEGER, primaryKey: true },
}, { tableName: 'Auto_Playlist_Songs', timestamps: false });

module.exports = AutoPlaylistSong;
