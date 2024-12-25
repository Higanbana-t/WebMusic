const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Đảm bảo đúng đường dẫn

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('user', 'admin', 'artist'),
    defaultValue: 'user'
  },
  image_url: {
    type: DataTypes.STRING(255),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Users',
  timestamps: false
});

module.exports = User;
