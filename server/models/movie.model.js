const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa Movie Schema
const MovieSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Tiêu đề là bắt buộc'],
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        description: {
            type: String,
            trim: true
        },
        posterUrl: {
            type: String,
            trim: true
        },
        trailerUrl: {
            type: String,
            trim: true
        },
        videoUrl: {
           
            type: String, 
            trim: true
        },
        releaseDate: {
            type: Date
        },
        genres: [
            {
                type: String,
                trim: true
            }
        ],
        duration: {
            // Tính bằng phút
            type: Number 
        }
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;