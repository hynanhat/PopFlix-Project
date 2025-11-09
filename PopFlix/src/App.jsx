// src/App.jsx

import React, { useContext } from 'react'; // 1. Import useContext
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 2. Import Navigate
import { AuthContext } from './context/AuthContext.jsx'; // 3. Import AuthContext

// Import các trang
import HomePage from './pages/HomePage/HomePage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import AboutPage from './pages/AboutUs/AboutUs.jsx';
import MoviesPage from './pages/MoviesPage/MoviesPage.jsx';
import NewPopularPage from './pages/NewPopularPage/NewPopularPage.jsx';
import SearchPage from './pages/SearchPage/SearchPage.jsx';
import DetailPage from './pages/DetailPage/DetailPage.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import PhimPage from "./pages/PhimPage/PhimPage.jsx"; 
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";

import './index.css';

// 4. Tạo component AppRoutes để có thể dùng useContext
function AppRoutes() {
  const { currentUser } = useContext(AuthContext); // 5. Lấy trạng thái đăng nhập

  return (
    <Routes>
      {/* === Trang công khai (Ai cũng vào được) === */}
      <Route 
        path="/login" 
        element={
          !currentUser ? <LoginPage /> : <Navigate to="/" />
        } 
      />
      <Route 
        path="/signup" 
        element={
          !currentUser ? <SignUpPage /> : <Navigate to="/" />
        } 
      />

      {/* === Trang cần bảo vệ === */}
      <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
      <Route path="/new-popular" element={<ProtectedRoute><NewPopularPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      
      {/* --- THÊM ROUTE MỚI CHO TRANG YÊU THÍCH --- */}
      <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      
      <Route path="/phim/:slug" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
      <Route path="/xem-phim/:slug" element={<ProtectedRoute><PhimPage /></ProtectedRoute>} />
      
    </Routes>
  );
}

// 6. Sửa component App chính
function App() {
  return (
    <Router>
      <div className="app">
        <AppRoutes /> {/* 7. Gọi AppRoutes ở đây */}
      </div>
    </Router>
  );
}

export default App;