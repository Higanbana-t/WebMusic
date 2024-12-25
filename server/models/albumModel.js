// models/albumModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Album = sequelize.define('Album', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  artist_id: { type: DataTypes.INTEGER, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  release_date: { type: DataTypes.DATE },
  cover_url: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Album;
