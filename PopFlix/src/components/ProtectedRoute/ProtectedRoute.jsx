// src/components/ProtectedRoute/ProtectedRoute.jsx
import React, { useContext } from 'react'; // Import useContext
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx'; // Import AuthContext

function ProtectedRoute({ children }) {
  // Sửa dùng useContext
  const { currentUser } = useContext(AuthContext); 

  if (!currentUser) {
    // Nếu chưa đăng nhập, đá về trang /login
    return <Navigate to="/login" />;
  }

  // Nếu đã đăng nhập, cho phép hiển thị "children"
  return children;
}

export default ProtectedRoute;