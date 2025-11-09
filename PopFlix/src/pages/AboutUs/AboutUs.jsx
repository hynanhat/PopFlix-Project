import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Dùng lại Navbar
import './AboutUs.css';


function AboutUs() {
  return (
    <div className="aboutPage">
      <Navbar />
      <div className="aboutPage__container">
        <h1 className="aboutPage__title">PopFlix</h1>
        <p>
          PopFlix là một project môn học <strong>Các công nghệ lập trình hiện đại</strong>  được xây dựng bằng ReactJS
          cho phần frontend và Backend được sử dụng Nodejs và Expressjs. Ngoài ra chúng em còn sử dụng MongoDB để lưu trữ thông tin người dùng.
        </p>
        <p>
          Trang web này sử dụng API từ <strong> kkphim.com</strong> - API dành cho nhà phát triển website xem phim 
          để hiển thị thông tin phim, poster, và các danh sách phim thịnh hành.
        </p>
        <p>
          Mục tiêu của dự án là thực hành các kỹ năng React, gọi API
          (axios), và xử lý định tuyến (react-router-dom) trong một ứng dụng
          web thực tế. Hi vọng các bạn có trải nghiệm thú vị ạ.
        </p>
        <p>
          Thiết kế frontend: Trương Thành Tâm <br></br>
          Thiết kế backend: Huỳnh Anh Nhật 
        </p>
      </div>
    </div>
  );
}

export default AboutUs;