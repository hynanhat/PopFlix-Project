import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { axiosPhimApi } from '../../api/axios.js'; 
import './SearchPage.css';

const BASE_IMG_URL = 'https://phimimg.com/';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q'); 

  useEffect(() => {
    if (query) {
      async function fetchData() {
        try {
          const searchUrl = `/v1/api/tim-kiem?keyword=${query}`; 
          const request = await axiosPhimApi.get(searchUrl);
          
          let foundItems = [];
          
          // API tìm kiếm trả về data.data.items hoặc data.items
          if (request.data.data && request.data.data.items) {
             foundItems = request.data.data.items;
          } else if (request.data.items) {
             foundItems = request.data.items;
          }

          setSearchResults(foundItems); 

        } catch (error) {
          console.error('Lỗi khi tìm kiếm:', error);
          setSearchResults([]); 
        }
      }
      fetchData();
    }
  }, [query]);

  // Hàm xử lý link ảnh thông minh
  const getImageUrl = (posterUrl) => {
    if (!posterUrl) return ''; 
    if (posterUrl.startsWith('http')) {
      return posterUrl; 
    }
    return `${BASE_IMG_URL}${posterUrl}`; 
  };

  return (
    <div className="searchPage">
      <Navbar />
      <div className="searchPage__content">
        <h2>
          {searchResults.length > 0
            ? `Kết quả tìm kiếm cho: "${query}"`
            : `Không tìm thấy kết quả cho: "${query}"`}
        </h2>
        
        <div className="searchPage__grid">
          {Array.isArray(searchResults) && searchResults.map((movie) => (
            // === ĐÃ SỬA: Dùng movie.slug làm key và kiểm tra movie.name ===
            movie.poster_url && movie.slug && movie.name && ( 
              <Link 
                key={movie.slug} // <-- SỬA KEY Ở ĐÂY
                to={`/phim/${movie.slug}`}
              >
                <div className="searchPage__posterContainer">
                  <img
                    className="searchPage__poster"
                    src={getImageUrl(movie.poster_url)} 
                    alt={movie.name}
                  />
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;