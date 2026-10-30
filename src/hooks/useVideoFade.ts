import { useEffect, useRef } from 'react';

export function useVideoFade(isActive = true) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const updateOpacity = () => {
      if (video && video.duration) {
        const currentTime = video.currentTime;
        const duration = video.duration;
        let opacity = 1;

        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime < 0.5) {
          opacity = currentTime / 0.5;
        }
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (duration > 0.5 && currentTime > duration - 0.5) {
          opacity = Math.max(0, (duration - currentTime) / 0.5);
        } else {
          opacity = 1;
        }

        // Clamp between 0 and 1
        video.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
      }

      animationFrameId = requestAnimationFrame(updateOpacity);
    };

    animationFrameId = requestAnimationFrame(updateOpacity);

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch((err) => {
          console.warn('Video replay was prevented:', err);
        });
      }, 100);
    };

    video.addEventListener('ended', handleEnded);

    video.play().catch((err) => {
      console.warn('Initial autoplay was prevented:', err);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, [isActive]);

  return videoRef;
}

