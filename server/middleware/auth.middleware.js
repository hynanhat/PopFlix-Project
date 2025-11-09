const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ header (vd: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Xác thực token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Gán ID của user vào request để các controller sau có thể dùng
            req.userId = decoded.id;

            next(); // Hợp lệ, cho đi tiếp
        } catch (error) {
            console.error(error);
            // LỖI CÓ THỂ Ở ĐÂY: Phải là 401
            res.status(401).json({ message: 'Token không hợp lệ, từ chối truy cập' });
        }
    }

    if (!token) {
        // HOẶC LỖI CÓ THỂ Ở ĐÂY: Phải là 401
        res.status(401).json({ message: 'Không có token, từ chối truy cập' });
    }
};

module.exports = { protectRoute };