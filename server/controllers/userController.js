const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');  // Import model User (giả sử bạn đã có model này)
const Artist = require('../models/artistModel'); // Import model Artist (nếu có)

const register = async (req, res) => {
  const { username, email, password, role, name, bio } = req.body; // Thêm role, name và bio cho artist

  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã được sử dụng.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,  // Lưu role (user hoặc artist)
    });

    // Nếu role là artist, tạo bản ghi cho artist
    if (role === 'artist') {
      if (!name) {
        return res.status(400).json({ message: 'Tên nghệ sĩ không được để trống.' });
      }

      // Tạo bản ghi nghệ sĩ
      await Artist.create({
        user_id: newUser.id,
        name,
        bio,  // Bio nghệ sĩ (có thể để trống)
      });
    }

    return res.status(201).json({
      message: 'Đăng ký thành công!',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Lỗi khi đăng ký tài khoản:', error);
    return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kiểm tra email có tồn tại trong DB không
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại.' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng.' });
    }

    // Tạo token (JWT)
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret_key", // Sử dụng khóa mặc định nếu không có .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
  }
};

module.exports = { login, register };
