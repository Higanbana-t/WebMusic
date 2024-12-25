const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');
const Song = require('./songModel');

const ListeningHistory = sequelize.define('ListeningHistory', {
  listened_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Listening_History',
  timestamps: false
});

// Thiết lập mối quan hệ với bảng Users và Songs
ListeningHistory.belongsTo(User, { foreignKey: 'user_id' });
ListeningHistory.belongsTo(Song, { foreignKey: 'song_id' });

module.exports = ListeningHistory;
