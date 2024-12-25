// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig'); // Đảm bảo kết nối đúng

// Import mô hình Song
const Song = require('./songModel');

// Xuất sequelize và mô hình
module.exports = { sequelize, Song };
