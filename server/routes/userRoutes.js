const express = require('express');
const { check, validationResult } = require('express-validator');
const userController = require('../controllers/userController');  // Đảm bảo import đúng controller của bạn

const router = express.Router();

// Route đăng ký người dùng
router.post(
  '/register',
  [
    check('username', 'Tên người dùng không được để trống').notEmpty(),
    check('email', 'Email không hợp lệ').isEmail(),
    check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    check('role', 'Vui lòng chọn role').notEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.register
);

// Route đăng nhập người dùng
router.post('/login', userController.login);

module.exports = router;
