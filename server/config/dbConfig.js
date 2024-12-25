require('dotenv').config();  // Đọc thông tin từ tệp .env

const { Sequelize } = require('sequelize');

// Sử dụng các biến môi trường để kết nối
const sequelize = new Sequelize(
  process.env.DB_NAME, // Tên cơ sở dữ liệu
  process.env.DB_USER, // Người dùng MySQL
  process.env.DB_PASSWORD, // Mật khẩu MySQL
  {
    host: process.env.DB_HOST, // Máy chủ MySQL
    dialect: process.env.DB_DIALECT, // Loại cơ sở dữ liệu (MySQL)
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;

