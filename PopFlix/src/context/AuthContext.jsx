// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { axiosBackend } from '../api/axios';

export const AuthContext = createContext();

// Hàm này phải dùng 'axiosBackend'
const setAuthToken = (token) => {
  if (token) {
    axiosBackend.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosBackend.defaults.headers.common['Authorization'];
  }
};

// --- SỬA LỖI RACE CONDITION ---
// Đọc token từ localStorage MỘT LẦN khi app tải
const initialToken = localStorage.getItem('token');
// Đặt token vào header của axios ngay lập tức
if (initialToken) {
  setAuthToken(initialToken);
}
// ------------------------------

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  // SỬA: Dùng 'initialToken' đã đọc
  const [token, setToken] = useState(initialToken);

  // Bỏ 'useEffect' cũ vì token đã được set ở trên.
  // Các hàm login/logout sẽ tự gọi setAuthToken.

  const login = async (email, password) => {
    const response = await axiosBackend.post('/api/auth/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    setCurrentUser(user);
    setToken(token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setToken(null);
    setAuthToken(null);
  };

  const value = {
    currentUser,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}