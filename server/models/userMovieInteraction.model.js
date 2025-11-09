const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa Interaction Schema (Cách 2 - Gộp chung)
const UserMovieInteractionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', // Tham chiếu đến User Model
            required: true
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: 'Movie', // Tham chiếu đến Movie Model
            required: true
        },
        isFavorite: {
            type: Boolean,
            default: false
        },
        watchedAt: {
            // Dùng cho lịch sử xem
            type: Date 
        }
    },
    {
        timestamps: true
    }
);

// Tạo index để đảm bảo một user chỉ có 1 bản ghi tương tác cho 1 phim
// (Tùy chọn nhưng khuyến nghị để tối ưu truy vấn)
UserMovieInteractionSchema.index({ user: 1, movie: 1 }, { unique: true });

const UserMovieInteraction = mongoose.model('UserMovieInteraction', UserMovieInteractionSchema);

module.exports = UserMovieInteraction;