import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import Navbar from "../../components/Navbar/Navbar.jsx";
// 1. Import file CSS mới
import './PhimPage.css';

function PhimPage() {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  
  // 2. STATE MỚI: Lưu danh sách tập và tập đang chọn
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  // (Chúng ta không cần state 'videoUrl' nữa)

  // 3. SỬA HÀM FETCHDATA
  useEffect(() => {
    // Reset state khi đổi phim
    setMovie(null);
    setEpisodes([]);
    setCurrentEpisode(null);

    async function fetchData() {
      try {
        const res = await fetch(`https://phimapi.com/phim/${slug}`);
        const data = await res.json();
        
        // Kiểm tra xem API có trả về danh sách tập không
        // (Giả sử chúng ta chỉ lấy server đầu tiên, vd: "Vietsub")
        if (data.status && data.episodes?.[0]?.server_data) {
          
          const episodeList = data.episodes[0].server_data;
          
          setEpisodes(episodeList); // Lưu toàn bộ danh sách tập
          setCurrentEpisode(episodeList[0]); // Đặt tập 1 làm tập mặc định
          setMovie(data.movie);

        } else {
          console.warn("Không tìm thấy danh sách tập cho phim này");
        }
      } catch (error) {
        console.error("Lỗi khi fetch phim:", error);
      }
    }
    fetchData();
  }, [slug]);

  // 4. SỬA useEffect CỦA HLS.js
  // Chạy lại mỗi khi 'currentEpisode' (tập đang chọn) thay đổi
  useEffect(() => {
    // Lấy link video từ tập đang được chọn
    const videoUrl = currentEpisode?.link_m3u8;

    if (videoUrl && Hls.isSupported()) {
      const video = document.getElementById("video-player");
      
      // Tạo mới Hls instance mỗi khi đổi tập
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      
      // Hủy instance cũ khi component unmount hoặc đổi tập
      return () => {
        hls.destroy();
      };
    }
  }, [currentEpisode]); // <-- Phụ thuộc vào currentEpisode

  // 5. HÀM MỚI: Xử lý khi người dùng bấm chọn tập
  const handleSelectEpisode = (episode) => {
    setCurrentEpisode(episode);
  };

  return (
    <div style={{ paddingTop: '80px' }}>
      <Navbar />
      
      <div className="watch-area-container">
        {movie ? (
          <>
            <h1>{movie.name}</h1>
            
            {/* 6. HIỂN THỊ VIDEO PLAYER */}
            <div className="video-player-wrapper">
              {currentEpisode ? (
                <video
                  id="video-player"
                  controls
                  autoPlay={true} // Tự động phát khi đổi tập
                />
              ) : (
                <p style={{ padding: '20px' }}>Phim này chưa có link video.</p>
              )}
            </div>

            {/* 7. HIỂN THỊ DANH SÁCH TẬP */}
            <div className="episode-selector">
              <h3>Chọn tập:</h3>
              <div className="episode-list">
                {episodes.map((ep) => (
                  <button
                    key={ep.slug}
                    className={`episode-button ${
                      currentEpisode?.slug === ep.slug ? 'active' : ''
                    }`}
                    onClick={() => handleSelectEpisode(ep)}
                  >
                    {ep.name} {/* Hiển thị tên tập, vd: "Tập 1", "Tập 2"... */}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center' }}>Đang tải phim...</p>
        )}
      </div> 
    </div>
  );
}

export default PhimPage;