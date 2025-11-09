const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hàm tạo Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token hết hạn sau 30 ngày
    });
};

// 1. ĐĂNG KÝ
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Vui lòng điền đủ thông tin' });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Email hoặc Tên đăng nhập đã tồn tại' });
        }

        // Tạo user mới (Mongoose 'pre-save' hook sẽ tự động hash password)
        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();

        res.status(201).json({
            message: 'Đăng ký thành công!',
            token: generateToken(newUser._id),
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

// 2. ĐĂNG NHẬP
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token: generateToken(user._id),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};