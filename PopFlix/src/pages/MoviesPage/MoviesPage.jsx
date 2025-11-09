// src/pages/MoviesPage/MoviesPage.jsx
import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';
import './MoviesPage.css';

function MoviesPage() {
  return (
    <div className="moviesPage">
      <Navbar />
      <div className="moviesPage__content">
        <MovieList 
          title="Phim Lẻ (Trang 1)" 
          // SỬA: Dùng API tổng hợp
          fetchUrl="/v1/api/danh-sach/phim-le?page=1" 
        />
        <MovieList 
          title="Phim Hay" 
          // SỬA: Dùng API tổng hợp
          fetchUrl="/v1/api/danh-sach/phim-le?page=2" 
        />
        <MovieList 
          title="Phim Hài" 
          // SỬA: Dùng API theo thể loại
          fetchUrl="/v1/api/the-loai/hai-huoc?page=1" 
        />
      </div>
    </div>
  );
}

export default MoviesPage;