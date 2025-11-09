import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
// Sửa import (dùng cả 2)
import { axiosPhimApi } from '../../api/axios.js'; 
import { AuthContext } from '../../context/AuthContext.jsx';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  // (Code nền động đã sửa)
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    async function fetchBackgroundMovies() {
      try {
        // SỬA: Gọi API mới
        const response = await axiosPhimApi.get('/danh-sach/phim-moi-cap-nhat?page=1');
        
        // CHÚ Ý: Dòng này đang "ĐOÁN" cấu trúc JSON
        // Chúng ta sẽ sửa lại sau nếu cần
        const movies = response.data.items; 
        
        // CHÚ Ý: Dòng này đang "ĐOÁN" tên trường
        const posters = movies
          .filter(movie => movie.poster_url) // Đoán là 'poster_url'
          .slice(0, 10) 
          .map(movie => movie.poster_url); // Lấy link poster

        setBackgroundImages(posters);
      } catch (error) {
        console.error("Lỗi khi lấy ảnh nền:", error);
      }
    }
    fetchBackgroundMovies();
  }, []);

  // (useEffect đổi ảnh giữ nguyên)
  useEffect(() => {
    if (backgroundImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImages]);
  
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Hàm login này (từ AuthContext) đã được
      // cài đặt để gọi 'axiosBackend' -> RẤT TỐT, GIỮ NGUYÊN
      await login(email, password); 
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi đăng nhập');
    }
  };

  return (
    <div className="loginPage">
      {/* (Code nền động JSX) */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`loginPage__backgroundImage ${
            index === currentBgIndex ? 'active' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }} 
        ></div>
      ))}
      <div className="loginPage__backgroundOverlay"></div>

      {/* (Code JSX còn lại của Login giữ nguyên) */}
      <div className="loginPage__header">
        <h2 className="loginPage__logoText">PopFlix</h2>
      </div>
      <div className="loginPage__body">
        <div className="loginPage__formContainer">
          <h1>Đăng nhập</h1>
          {error && <p className="loginError">{error}</p>} 
          <form onSubmit={handleLogin}> 
            <input type="email" placeholder="Email " value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Đăng nhập</button>
            <div className="loginPage__formHelp">
              <label><input type="checkbox" /><span>Ghi nhớ tôi</span></label>
              {/* <a href="#">Bạn cần trợ giúp?</a> */}
            </div>
          </form>
          <div className="loginPage__footer">
            <p>Bạn mới tham gia? <Link to="/signup">Đăng ký ngay</Link>.</p>
            {/* <small>Trang này được Google reCAPTCHA bảo vệ. <a href="#">Tìm hiểu thêm.</a></small> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;