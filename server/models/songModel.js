// models/songModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Song = sequelize.define('Song', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  play_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  genre: Sequelize.STRING,
  description: Sequelize.STRING,
  file_url: Sequelize.STRING,
  cover_url: Sequelize.STRING,
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  },
}, {
  timestamps: false, // Tắt tính năng timestamps
});




module.exports = Song;
