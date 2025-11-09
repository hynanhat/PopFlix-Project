// src/components/Navbar/Navbar.jsx

import React, { useState, useContext } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext.jsx';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  // Sửa dòng này (dùng useContext)
  const { currentUser, logout } = useContext(AuthContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/">
          <h2 className="navbar__logoText">PopFlix</h2>
        </Link>
        
        {/* Chỉ hiển thị link khi đã đăng nhập */}
        {currentUser && (
          <ul className="navbar__links">
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/about">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/movies">Phim</Link>
            </li>
            <li>
              <Link to="/new-popular">Mới & Phổ biến</Link>
            </li>
            {/* --- ĐÃ THÊM LINK MỚI VÀO ĐÂY --- */}
            <li>
              <Link to="/favorites">Danh sách của tôi</Link>
            </li>
          </ul>
        )}
      </div>

      <div className="navbar__right">
        {/* Hiển thị có điều kiện */}
        {currentUser ? (
          // === ĐÃ ĐĂNG NHẬP ===
          <>
            <form onSubmit={handleSearch} className="navbar__search">
              <input
                type="text"
                placeholder="Tìm kiếm phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Tìm</button>
            </form>
            <button onClick={handleLogout} className="navbar__loginButton navbar__logoutButton">
              Đăng xuất
            </button>
          </>
        ) : (
          // === CHƯA ĐĂNG NHẬP ===
          <Link to="/login" className="navbar__loginButton">
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;