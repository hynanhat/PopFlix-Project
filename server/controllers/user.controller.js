// server/controllers/user.controller.js
const Interaction = require('../models/userMovieInteraction.model');
const Movie = require('../models/movie.model');

// 1. THÊM/XÓA KHỎI DANH SÁCH YÊU THÍCH (TOGGLE)
// Phiên bản này sẽ XÓA bản ghi khi bỏ thích
exports.toggleFavorite = async (req, res) => {
    try {
        const { movieData } = req.body;
        const userId = req.userId;

        if (!movieData || !movieData.slug) {
            return res.status(400).json({ message: 'Thiếu thông tin phim (slug)' });
        }

        // 1. Tìm hoặc tạo phim (Upsert)
        const movie = await Movie.findOneAndUpdate(
            { slug: movieData.slug },
            {
                $set: {
                    title: movieData.title,
                    posterUrl: movieData.posterUrl,
                    slug: movieData.slug
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        // 2. Tìm tương tác cũ
        const interaction = await Interaction.findOne({ 
            user: userId, 
            movie: movie._id 
        });

        let newStatus;
        if (interaction) {
            // Đã có (Đã yêu thích) -> Xóa nó đi
            await Interaction.deleteOne({ _id: interaction._id });
            newStatus = false; // Trạng thái mới là "false" (không yêu thích)
        } else {
            // Chưa có -> Tạo mới
            await Interaction.create({
                user: userId,
                movie: movie._id,
                isFavorite: true
            });
            newStatus = true; // Trạng thái mới là "true" (đã yêu thích)
        }

        res.status(200).json({
            message: newStatus ? 'Đã thêm vào yêu thích' : 'Đã xóa khỏi yêu thích',
            isFavorite: newStatus,
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};

// 2. LẤY DANH SÁCH PHIM YÊU THÍCH
exports.getFavoriteMovies = async (req, res) => {
    try {
        const userId = req.userId; // Lấy từ middleware

        const favorites = await Interaction.find({
            user: userId,
            isFavorite: true
        })
        // Lấy thêm slug để frontend đối chiếu
        .populate('movie', 'title posterUrl slug');

        const favoriteMovies = favorites.map(fav => fav.movie);

        res.status(200).json({
            message: "Lấy danh sách yêu thích thành công",
            data: favoriteMovies,
        });

    } catch (err) {
        res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
};