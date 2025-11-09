const express = require('express');
const router = express.Router();
const { toggleFavorite, getFavoriteMovies } = require('../controllers/user.controller');
const { protectRoute } = require('../middleware/auth.middleware');

// SỬA LỖI Ở ĐÂY:
// GET phải trỏ đến getFavoriteMovies
router.get('/favorites', protectRoute, getFavoriteMovies);

// POST phải trỏ đến toggleFavorite
router.post('/favorites', protectRoute, toggleFavorite);

module.exports = router;