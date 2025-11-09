const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); // <--- THÊM DÒNG NÀY

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Tên đăng nhập là bắt buộc'],
            unique: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/.+\@.+\..+/, 'Vui lòng nhập email hợp lệ']
        },
        password: {
            type: String,
            required: [true, 'Mật khẩu là bắt buộc'],
            minlength: 6
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true 
    }
);

// --- THÊM PHẦN NÀY ---
// Tự động hash mật khẩu trước khi 'save'
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;