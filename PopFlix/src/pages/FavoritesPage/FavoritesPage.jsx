import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { axiosBackend } from '../../api/axios.js';
import './FavoritesPage.css'; // Chúng ta sẽ tạo file này ở bước 2

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        // 1. Gọi API backend (đã có sẵn)
        const response = await axiosBackend.get('/api/user/favorites');
        setFavorites(response.data.data); // Lưu danh sách phim
      } catch (err) {
        console.error("Lỗi khi lấy danh sách yêu thích:", err);
        setError("Không thể tải danh sách của bạn. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []); // Chỉ chạy 1 lần khi trang được tải

  if (loading) {
    return (
      <div className="favoritesPage">
        <Navbar />
        <div className="favoritesPage__content">
          <h2>Đang tải danh sách...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favoritesPage">
        <Navbar />
        <div className="favoritesPage__content">
          <h2>{error}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="favoritesPage">
      <Navbar />
      <div className="favoritesPage__content">
        <h2>Danh sách Yêu thích của tôi</h2>
        
        {favorites.length === 0 ? (
          <p>Bạn chưa thêm phim nào vào danh sách yêu thích.</p>
        ) : (
          <div className="favoritesPage__grid">
            {favorites.map((movie) => (
              // 2. Link đến trang chi tiết khi bấm vào poster
              <Link key={movie.slug} to={`/phim/${movie.slug}`}>
                <div className="favoritesPage__posterContainer">
                  <img
                    className="favoritesPage__poster"
                    src={movie.posterUrl} // API đã trả về posterUrl
                    alt={movie.title}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;