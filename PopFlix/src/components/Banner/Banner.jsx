// src/components/Banner/Banner.jsx

import React, { useState, useEffect } from 'react';
// 1. THÊM IMPORT 'Link' TỪ REACT-ROUTER-DOM
import { Link } from 'react-router-dom';
import { axiosPhimApi } from '../../api/axios.js';
import './Banner.css';

const BASE_IMG_URL = 'https://phimimg.com/';

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axiosPhimApi.get(fetchUrl);
        
        let foundMovies = [];

        if (request.data.items) {
          foundMovies = request.data.items;
        } else if (request.data.data && request.data.data.items) {
          foundMovies = request.data.data.items;
        }

        if (foundMovies.length > 0) {
          const randomMovie = foundMovies[Math.floor(Math.random() * foundMovies.length)];
          setMovie(randomMovie);
        }
      } catch (error) {
        console.error('Lỗi khi fetch Banner:', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const getImageUrl = (thumbUrl) => {
    if (!thumbUrl) return '';
    if (thumbUrl.startsWith('http')) {
      return thumbUrl;
    }
    return `${BASE_IMG_URL}${thumbUrl}`;
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  if (!movie) {
    return <div className="banner--loading">Đang tải...</div>;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${getImageUrl(movie.thumb_url)})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.name}
        </h1>

        {/* === 2. SỬA KHỐI NÀY === */}
        <div className="banner__buttons">
          {/* Bọc nút "Phát" trong Link, trỏ đến trang xem phim.
            Chúng ta kiểm tra 'movie.slug' để đảm bảo link hợp lệ.
          */}
          {movie.slug && (
            <Link to={`/xem-phim/${movie.slug}`}>
              <button className="banner__button">Phát</button>
            </Link>
          )}
        </div>
        {/* ===================== */}

        <h1 className="banner__description">
          {truncate(movie.origin_name, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;