const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const AutoPlaylist = sequelize.define('AutoPlaylist', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: 'auto_playlists', // Đảm bảo tên này khớp với bảng trong cơ sở dữ liệu
  timestamps: false,
});


module.exports = AutoPlaylist;
