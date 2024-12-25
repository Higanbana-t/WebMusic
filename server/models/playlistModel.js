const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');  // Đảm bảo rằng bạn đã định nghĩa model User

const Playlist = sequelize.define('Playlist', {
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Playlists',
  timestamps: false  // Nếu không sử dụng trường `updatedAt` và `createdAt`
});

// Mối quan hệ với bảng Users
Playlist.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Playlist;
