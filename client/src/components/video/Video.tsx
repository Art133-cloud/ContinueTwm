"use client"
import React, { useRef } from 'react';
import styles from "./Video.module.scss"
const CustomVideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err) => {
          alert(`Ошибка при попытке развернуть видео на весь экран: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  return (
    <div className={styles.videoContainer} style={{ position: 'relative', maxWidth: '960px', margin: 'auto' }}>
      <video
        controls
        style={{ width: '100%', height: 'auto', display: 'block', background: '#000' }}
      >
        <source src="/assets/video/Заново.mp4" type="video/mp4" />
        Ваш браузер не поддерживает элемент video.
      </video>
    </div>
  );
};

export default CustomVideoPlayer;
