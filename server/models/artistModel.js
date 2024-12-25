const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel'); // Liên kết với bảng Users

const Artist = sequelize.define('Artist', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false }, // Liên kết với bảng Users
  name: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'Artists', timestamps: false });

// Thiết lập mối quan hệ: Artist thuộc về User
Artist.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Artist;
