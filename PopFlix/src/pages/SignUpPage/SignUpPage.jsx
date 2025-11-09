import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';
// Sửa import: Dùng cả 2
import { axiosBackend, axiosPhimApi } from '../../api/axios.js'; 

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  // ----- Logic nền động (ĐÃ SỬA) -----
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    async function fetchBackgroundMovies() {
      try {
        const response = await axiosPhimApi.get('/danh-sach/phim-moi-cap-nhat?page=1'); // Gọi API mới
        const movies = response.data.items; // Đoán cấu trúc
        const posters = movies
          .filter(movie => movie.poster_url) // Đoán tên trường
          .slice(0, 10)
          .map(movie => movie.poster_url);
        setBackgroundImages(posters);
      } catch (error) {
        console.error("Error fetching background images:", error);
      }
    }
    fetchBackgroundMovies();
  }, []);

  useEffect(() => {
    if (backgroundImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImages]);
  // ----- Hết logic nền động -----

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    
    try {
      // Sửa: Dùng axiosBackend
      await axiosBackend.post('/api/auth/register', { 
        username,
        email,
        password
      });
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');

    } catch (error) {
      alert(error.response?.data?.message || 'Lỗi đăng ký');
    }
  };

  return (
    <div className="signUpPage">
      {/* (Code nền động JSX) */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`signUpPage__backgroundImage ${
            index === currentBgIndex ? 'active' : ''
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <div className="signUpPage__backgroundOverlay"></div>

      {/* (Code JSX còn lại của Signup giữ nguyên) */}
      <div className="signUpPage__header">
        <h2 className="signUpPage__logoText">PopFlix</h2>
      </div>
      <div className="signUpPage__body">
        <div className="signUpPage__formContainer">
          <h1>Đăng ký</h1>
          <form onSubmit={handleSignUp}>
            <input type="text" placeholder="Tên đăng nhập (username)" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Đăng ký</button>
          </form>
          <div className="signUpPage__footer">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;