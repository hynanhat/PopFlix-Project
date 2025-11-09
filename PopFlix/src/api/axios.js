// src/api/axios.js
import axios from 'axios';

// 1. Instance cho BACKEND CỦA BẠN (Gọi /api/auth/...)
//    Sẽ tự động dùng proxy trong vite.config.js
export const axiosBackend = axios.create();

// 2. Instance cho API PHIM (phimapi.com)
//    Chúng ta set baseURL để gọi thẳng
export const axiosPhimApi = axios.create({
  baseURL: 'https://phimapi.com',
});