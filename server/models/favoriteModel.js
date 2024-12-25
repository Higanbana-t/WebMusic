const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');
const Song = require('./songModel');

const Favorite = sequelize.define('Favorite', {
  added_to_favorites_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Favorites',
  timestamps: false
});

// Thiết lập mối quan hệ với bảng Users và Songs
Favorite.belongsTo(User, { foreignKey: 'user_id' });
Favorite.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = Favorite;
