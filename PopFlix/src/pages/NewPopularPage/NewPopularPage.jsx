// src/pages/NewPopularPage/NewPopularPage.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';
import './NewPopularPage.css';

// Trang này cũng gọi lại MovieList
function NewPopularPage() {
  return (
    <div className="newPopularPage">
      <Navbar />
      <div className="newPopularPage__content">
        <MovieList 
          title="Mới & Phổ Biến" 
          fetchUrl="/danh-sach/phim-moi-cap-nhat?page=1"
        />
        <MovieList 
          title="Phim được đánh giá cao" 
          fetchUrl="/danh-sach/phim-moi-cap-nhat?page=2"
        />
      </div>
    </div>
  );
}

export default NewPopularPage;