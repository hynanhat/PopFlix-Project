import React from 'react';
import Banner from '../../components/Banner/Banner.jsx';
import MovieList from '../../components/MovieList/MovieList.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homePage">
      <Navbar />
      
      {/* Banner sẽ gọi "Phim mới nhất" (API này có vẻ không cần /v1/api/) */}
      <Banner fetchUrl="/danh-sach/phim-moi-cap-nhat?page=1" />

      {/* Các hàng phim */}
      <MovieList 
        title="Phim Mới" 
        fetchUrl="/danh-sach/phim-moi-cap-nhat?page=1" // API này hoạt động, giữ nguyên
      />
      
      {/* === SỬA CÁC URL BÊN DƯỚI === */}
      
      <MovieList 
        title="Xu hướng" 
        // Thêm /v1/api/ theo tài liệu
        fetchUrl="/v1/api/danh-sach/phim-le?page=1" 
      />
      <MovieList 
        title="Phim Bộ" 
        // Thêm /v1/api/ theo tài liệu
        fetchUrl="/v1/api/danh-sach/phim-bo?page=1" 
      />
    </div>
  );
}

export default HomePage;