// src/pages/SearchPage/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import { axiosPhimApi } from '../../api/axios.js'; 
import './SearchPage.css';

const BASE_IMG_URL = 'https://phimimg.com/';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const { slug } = useParams(); 
  const location = useLocation(); 

  const query = searchParams.get('q'); 

  const [pageTitle, setPageTitle] = useState('Đang tải...');

  useEffect(() => {
    let apiUrl = '';
    // let term = ''; // <-- ĐÃ XÓA BIẾN NÀY

    // Case 1: Nếu có 'query' (người dùng tìm kiếm qua Navbar)
    if (query) {
      apiUrl = `/v1/api/tim-kiem?keyword=${query}`;
      setPageTitle(`Kết quả tìm kiếm cho: "${query}"`);
    } 
    // Case 2: Nếu có 'slug' (người dùng click "Xem tất cả")
    // ...
    else if (slug) {
      // ...
      apiUrl = `/v1/api${location.pathname}`; 
      
      // Format title: "phim-bo" -> "Phim Bo"
      const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      // === THÊM LOGIC ĐỔI TÊN Ở ĐÂY ===
      let displayTitle = formattedTitle;
      if (formattedTitle === 'Phim Bo') {
        displayTitle = 'Phim Hay'; // Đổi "Phim Bo" thành "Phim Hay"
      }
      setPageTitle(`Danh mục: ${displayTitle}`); 
    } 
    // Case 3: Không có gì (vào /search trực tiếp)
    else {
      setPageTitle('Không có từ khóa tìm kiếm hoặc danh mục');
      setSearchResults([]);
      return; 
    }

    // --- Bắt đầu gọi API ---
    async function fetchData() {
      try {
        if (slug) {
          apiUrl += '?page=1'; 
        }

        const request = await axiosPhimApi.get(apiUrl);
        let foundItems = [];
        
        if (request.data.data && request.data.data.items) {
           foundItems = request.data.data.items;
        } else if (request.data.items) {
           foundItems = request.data.items;
        }
        setSearchResults(foundItems); 

        if (foundItems.length === 0) {
          if (query) {
            setPageTitle(`Không tìm thấy kết quả cho: "${query}"`);
          } else {
            setPageTitle(`Không có phim nào trong danh mục: "${slug}"`);
          }
        }
      } catch (error) {
        console.error('Lỗi khi fetch data:', error);
        setSearchResults([]);
        setPageTitle(`Đã xảy ra lỗi khi tải dữ liệu`);
      }
    }
    
    fetchData();

  }, [query, slug, location.pathname]); 

  
  // Hàm xử lý link ảnh (giữ nguyên)
  const getImageUrl = (posterUrl) => {
    // ... (code giữ nguyên) ...
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
        <h2>{pageTitle}</h2>
        
        <div className="searchPage__grid">
          {Array.isArray(searchResults) && searchResults.map((movie) => (
            movie.poster_url && movie.slug && movie.name && ( 
              <Link 
                key={movie.slug} 
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