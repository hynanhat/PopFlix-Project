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
          title="Phim Lẻ" 
          // Thêm &limit=20 để lấy 20 phim
          fetchUrl="/v1/api/danh-sach/phim-le?page=1" 
          seeAllLink="/danh-sach/phim-le"
        />
        <MovieList 
          title="Phim Hay" 
          // Thêm &limit=20 để lấy 20 phim
          fetchUrl="/v1/api/danh-sach/phim-le?page=2"
          seeAllLink="/danh-sach/phim-hay" 
        />
        <MovieList 
          title="Phim Hài" 
          // Thêm &limit=20 để lấy 20 phim
          fetchUrl="/v1/api/the-loai/hai-huoc?page=1" 
          seeAllLink="/the-loai/hai-huoc"
        />
      </div>
    </div>
  );
}

export default MoviesPage;