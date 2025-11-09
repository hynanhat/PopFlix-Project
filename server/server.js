const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Kết nối MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("✅ Kết nối MongoDB thành công!");
})
.catch((err) => {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
});

// --- IMPORT CÁC ROUTES ---
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

// --- SỬ DỤNG CÁC ROUTES ---
app.use('/api/auth', authRoutes);     // API xác thực
app.use('/api/user', userRoutes);     // API tương tác user

// --- Route test ---
app.get('/', (req, res) => {
    res.send('Chào mừng đến với MovieHub API!');
});

// --- Khởi chạy Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy trên http://localhost:${PORT}`);
});