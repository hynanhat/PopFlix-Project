// src/pages/DetailPage/DetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Đã xóa import ReactPlayer
import { axiosPhimApi, axiosBackend } from '../../api/axios.js'; 
import Navbar from '../../components/Navbar/Navbar.jsx';
import './DetailPage.css';

function DetailPage() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  // Đã xóa state showPlayerError
  
  // --- STATE CHO NÚT YÊU THÍCH ---
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(true);
  // ------------------------------------

  // useEffect fetch chi tiết phim
  useEffect(() => {
    async function fetchData() {
      setMovie(null);
      // Đã xóa setShowPlayerError
      try {
        const response = await axiosPhimApi.get(`/phim/${slug}`);
        
        let foundMovie = null;
        
        if (response.data.movie) {
          foundMovie = response.data.movie;
        } else if (response.data.data && response.data.data.item) {
          foundMovie = response.data.data.item;
        }

        if (foundMovie) {
          setMovie(foundMovie);
        } 

      } catch (error) {
        console.error("Lỗi khi fetch chi tiết phim:", error);
      }
    }

    if (slug) {
      fetchData();
    }
  }, [slug]);

  // --- useEffect ĐỂ KIỂM TRA TRẠNG THÁI YÊU THÍCH ---
  useEffect(() => {
    if (!slug) return;

    async function checkFavoriteStatus() {
      setIsLoadingFavorite(true);
      try {
        const response = await axiosBackend.get('/api/user/favorites');
        const favoriteList = response.data.data || [];
        const isFav = favoriteList.some(favMovie => favMovie.slug === slug);
        setIsFavorite(isFav);
        
      } catch (error) {
        console.error("Lỗi khi kiểm tra yêu thích:", error);
      } finally {
        setIsLoadingFavorite(false);
      }
    }
    
    checkFavoriteStatus();
  }, [slug]);

  // Đã xóa hàm handlePlayerError

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://phimimg.com/${url}`;
  };

  // --- HÀM XỬ LÝ KHI BẤM NÚT YÊU THÍCH ---
  const handleToggleFavorite = async () => {
    if (!movie) return;

    const movieData = {
      title: movie.name,
      slug: slug,
      posterUrl: getImageUrl(movie.poster_url)
    };

    try {
      const response = await axiosBackend.post('/api/user/favorites', {
        movieData: movieData
      });
      
      setIsFavorite(response.data.isFavorite);

    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
      alert("Lỗi: " + (error.response?.data?.message || "Không thể yêu thích"));
    }
  };
  // ---------------------------------------------

  if (!movie) {
    return <div className="detailPage--loading">Đang tải...</div>;
  }

  // Đã xóa biến trailerUrl
  const posterUrl = getImageUrl(movie.poster_url);
  const backdropUrl = getImageUrl(movie.thumb_url);

  return (
    <div className="detailPage">
      <Navbar />
      
      {backdropUrl && (
        <>
          <div
            className="detailPage__backdrop"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          ></div>
          <div className="detailPage__fadeBottom"></div>
        </>
      )}

      <div className="detailPage__content" style={{ paddingTop: '100px' }}>
        
        {posterUrl && (
          <img
            className="detailPage__poster"
            src={posterUrl}
            alt={movie.name}
          />
        )}

        <div className="detailPage__info">
          <h1>{movie.name}</h1>
          <div className="detailPage__meta">
            {movie.year && <span>Năm: {movie.year}</span>}
            {movie.country?.[0] && <span>Quốc gia: {movie.country[0].name}</span>}
          </div>
          
          {movie.content && (
            <p className="detailPage__overview">
              {movie.content}
            </p>
          )}

          {/* Khối nút bấm giữ nguyên */}
          <div className="detailPage__actions">
            <Link to={`/xem-phim/${slug}`} className="detailPage__watchButton">
              ▶ Xem Phim
            </Link>
            
            <button 
              className={`detailPage__favoriteButton ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              disabled={isLoadingFavorite}
            >
              {isFavorite ? '✓ Đã yêu thích' : '+ Yêu thích'}
            </button>
          </div>
        </div>
      </div>

      {/* ĐÃ XÓA HOÀN TOÀN KHỐI TRAILER Ở ĐÂY */}

    </div>
  );
}

export default DetailPage;