// src/components/MovieList/MovieList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { axiosPhimApi } from '../../api/axios.js'; 
import './MovieList.css';

const BASE_IMG_URL = 'https://phimimg.com/';

function MovieList({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axiosPhimApi.get(fetchUrl); 
        
        let foundMovies = []; 

        // SỬA CẤU TRÚC: Kiểm tra cả 2 vị trí (Đã đúng logic)
        if (request.data.items) {
          foundMovies = request.data.items;
        } else if (request.data.data && request.data.data.items) {
          foundMovies = request.data.data.items;
        }

        setMovies(foundMovies); 

      } catch (error) {
        // Sửa lỗi cú pháp: Dùng template literal để log
        console.error(`Lỗi khi fetch ${title}:`, error);
      }
    }
    fetchData();
  }, [fetchUrl, title]); 
  
  // (Phần JSX giữ nguyên như code đã gửi)
  
  // Hàm xử lý link ảnh
  const getImageUrl = (posterUrl) => {
    if (!posterUrl) return '';
    if (posterUrl.startsWith('http')) {
      return posterUrl; 
    }
    return `${BASE_IMG_URL}${posterUrl}`; 
  };

  return (
    <div className="movieList">
      <h2>{title}</h2>

      <div className="movieList__posters">
        {Array.isArray(movies) && movies.map((movie) => (
          
          <Link key={movie._id} to={`/phim/${movie.slug}`}> 
            <img
              className="movieList__poster"
              src={getImageUrl(movie.poster_url)} 
              alt={movie.name}
            />
          </Link>

        ))}
      </div>
    </div>
  );
}

export default MovieList;