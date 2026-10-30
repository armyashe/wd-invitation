import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudioPlayer(defaultPlaying = true, volume = 0.8) {
  const [isPlayingMusic, setIsPlayingMusic] = useState(defaultPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        // Trình duyệt chặn autoplay khi chưa có tương tác từ người dùng
      });
    }
  }, [volume]);

  const toggleMusic = useCallback(() => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.play().catch(() => {
          // Play prevented
        });
        setIsPlayingMusic(true);
      }
    } else {
      setIsPlayingMusic((prev) => !prev);
    }
  }, [isPlayingMusic]);

  return { audioRef, isPlayingMusic, toggleMusic };
}

