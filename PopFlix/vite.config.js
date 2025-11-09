import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // (Bạn đang dùng SWC)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // === THÊM KHỐI NÀY ĐỂ CẤU HÌNH PROXY ===
  server: {
    proxy: {
      // Khi frontend gọi '/api', Vite sẽ tự động
      // chuyển nó đến backend (cổng 8080)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true, // Bắt buộc
        secure: false,      // Bắt buộc (nếu backend là http)
      },
    },
  },
  // ======================================
})