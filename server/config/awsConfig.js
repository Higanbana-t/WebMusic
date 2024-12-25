require('dotenv').config();  // Đọc thông tin từ tệp .env

const AWS = require('aws-sdk');

// Cấu hình AWS SDK với các biến môi trường
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Khởi tạo S3
const s3 = new AWS.S3();

module.exports = s3;
