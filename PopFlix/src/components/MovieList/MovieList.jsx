// src/components/MovieList/MovieList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 1. Đảm bảo đã import Link
import { axiosPhimApi } from '../../api/axios.js'; 
import Slider from "react-slick";
import './MovieList.css';

const BASE_IMG_URL = 'https://phimimg.com/';

// 2. Thêm "seeAllLink" vào danh sách props
function MovieList({ title, fetchUrl, seeAllLink }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // ... (Phần code useEffect giữ nguyên, không thay đổi) ...
      try {
        const request = await axiosPhimApi.get(fetchUrl); 
        
        let foundMovies = []; 

        if (request.data.items) {
          foundMovies = request.data.items;
        } else if (request.data.data && request.data.data.items) {
          foundMovies = request.data.data.items;
        }

        setMovies(foundMovies); 

      } catch (error) {
        console.error(`Lỗi khi fetch ${title}:`, error);
      }
    }
    fetchData();
  }, [fetchUrl, title]); 
  
  // ... (Hàm getImageUrl giữ nguyên) ...
  const getImageUrl = (posterUrl) => {
    if (!posterUrl) return '';
    if (posterUrl.startsWith('http')) {
      return posterUrl; 
    }
    return `${BASE_IMG_URL}${posterUrl}`; 
  };

  // ... (Phần "settings" của Slider giữ nguyên) ...
  const settings = {
    dots: false,        
    infinite: true,     
    speed: 500,         
    slidesToShow: 7,    
    slidesToScroll: 3,  
    autoplay: true,     
    autoplaySpeed: 3500,
    pauseOnHover: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 5, slidesToScroll: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 4, slidesToScroll: 1 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 3, slidesToScroll: 1 }
      }
    ]
  };

  return (
    <div className="movieList">
      {/* 3. THAY ĐỔI CHÍNH Ở ĐÂY */}
      {/* Nếu có prop 'seeAllLink', bọc <h2> trong <Link>.
        Nếu không, chỉ hiển thị <h2> như cũ.
      */}
      {seeAllLink ? (
        <Link to={seeAllLink} className="movieList__titleLink">
          <h2>{title}</h2>
        </Link>
      ) : (
        <h2>{title}</h2>
      )}

      {/* Phần Slider giữ nguyên */}
      <div className="movieList__posters">
        <Slider {...settings}>
          {Array.isArray(movies) && movies.map((movie) => (
            <div key={movie._id}> 
              <Link to={`/phim/${movie.slug}`}> 
                <img
                  className="movieList__poster"
                  src={getImageUrl(movie.poster_url)} 
                  alt={movie.name}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default MovieList;