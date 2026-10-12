import React, { useEffect, useRef, useState } from 'react';
import { VolumeX } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * BackgroundAudioWithMuteToggle
 * Phát nhạc nền "Rewrite the Stars" tự động và hiển thị 1 biểu tượng/kí tự xoay tròn
 * tinh tế ở góc phải màn hình để người xem có thể tắt tiếng / bật tiếng bất kỳ lúc nào.
 */
interface BackgroundAudioProps {
  hideFloatingButton?: boolean;
}

export const BackgroundAudio: React.FC<BackgroundAudioProps> = ({ hideFloatingButton = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const playerRef = useRef<any>(null);
  const isPlayingRef = useRef<boolean>(false);
  const isMutedRef = useRef<boolean>(false);

  useEffect(() => {
    const videoId = 'H6uLAwHTgDo'; // Can I call you back? - SHY Martin

    const triggerAudioUnlock = () => {
      setHasInteracted(true);
      if (playerRef.current && playerRef.current.playVideo) {
        if (!isMutedRef.current) {
          playerRef.current.unMute?.();
          playerRef.current.setVolume?.(80);
        }
        playerRef.current.playVideo();
        isPlayingRef.current = true;
        setIsPlaying(true);
      }
      ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, triggerAudioUnlock);
      });
    };

    const setupPlayer = () => {
      if (playerRef.current) return;
      try {
        playerRef.current = new window.YT.Player('stellar-background-audio-frame', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: videoId,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.setVolume(80);
              const playPromise = event.target.playVideo();
              if (playPromise !== undefined) {
                playPromise.catch?.(() => {
                  // Trình duyệt chặn autoplay khi chưa có cử chỉ -> đợi tương tác
                });
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                isPlayingRef.current = true;
                setIsPlaying(true);
                ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
                  window.removeEventListener(evt, triggerAudioUnlock);
                });
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch (e) {
        console.warn('Silent audio background setup error:', e);
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = setupPlayer;
    } else {
      setupPlayer();
    }

    ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, triggerAudioUnlock, { passive: true, once: true });
    });

    return () => {
      ['click', 'touchstart', 'scroll', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, triggerAudioUnlock);
      });
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const handleToggleSound = () => {
    setHasInteracted(true);
    if (!playerRef.current) return;

    if (isMuted || !isPlaying) {
      // Bật tiếng
      setIsMuted(false);
      isMutedRef.current = false;
      playerRef.current.unMute?.();
      playerRef.current.setVolume?.(80);
      playerRef.current.playVideo?.();
      setIsPlaying(true);
    } else {
      // Tắt tiếng
      setIsMuted(true);
      isMutedRef.current = true;
      playerRef.current.mute?.();
    }
  };

  useEffect(() => {
    (window as any).stellarToggleAudio = () => {
      handleToggleSound();
    };
    (window as any).stellarPauseAudio = () => {
      if (playerRef.current?.pauseVideo) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    };
    (window as any).stellarResumeAudio = () => {
      if (playerRef.current?.playVideo && !isMutedRef.current) {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };
    (window as any).stellarIsAudioPlaying = () => isPlaying && !isMuted;
  }, [isPlaying, isMuted]);

  // Pause YouTube audio when entering wedding view, resume when leaving
  useEffect(() => {
    if (hideFloatingButton) {
      if (playerRef.current?.pauseVideo) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      }
    } else {
      if (hasInteracted && playerRef.current?.playVideo && !isMutedRef.current) {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  }, [hideFloatingButton, hasInteracted]);

  const isSpinning = isPlaying && !isMuted;

  return (
    <>
      {/* Hidden YouTube IFrame */}
      <div
        aria-hidden="true"
        className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden select-none z-[-9999]"
        tabIndex={-1}
      >
        <div id="stellar-background-audio-frame" />
      </div>

      {/* Nút biểu tượng xoay tròn cố định ở góc dưới bên phải màn hình (ẩn khi ở trang thiệp cưới) */}
      {!hideFloatingButton && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
        {/* Tooltip hướng dẫn hiển thị khi hover */}
        {showTooltip && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#080D19]/90 border border-white/10 text-xs text-slate-200 shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
            <span>{isSpinning ? 'Tắt tiếng nhạc nền' : 'Bật tiếng nhạc nền'}</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400 font-medium">Can I call you back?</span>
          </div>
        )}

        <button
          onClick={handleToggleSound}
          aria-label={isSpinning ? 'Tắt tiếng nhạc nền' : 'Bật tiếng nhạc nền'}
          className={`relative group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            isSpinning
              ? 'bg-[#090E1A]/85 hover:bg-[#0D1424] border border-cyan-500/40 hover:border-cyan-400 shadow-cyan-500/20 hover:shadow-cyan-400/40'
              : 'bg-[#090E1A]/85 hover:bg-[#0D1424] border border-white/15 hover:border-white/30 text-slate-400 hover:text-white'
          } backdrop-blur-md active:scale-95`}
        >
          {/* Vòng hào quang nhẹ khi đang phát nhạc */}
          {isSpinning && (
            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-sm pointer-events-none" />
          )}

          {/* Kí tự / biểu tượng âm nhạc xoay tròn */}
          <div
            className={`flex items-center justify-center transition-transform ${
              isSpinning ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            {isSpinning ? (
              // Kí tự nốt nhạc phong cách cosmic xoay tròn
              <span className="text-base select-none text-cyan-300 group-hover:text-cyan-200 font-serif leading-none">
                ♫
              </span>
            ) : (
              // Biểu tượng tắt tiếng khi đã tắt
              <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
            )}
          </div>

          {/* Sóng âm mini nhịp nhàng quanh viền khi đang phát */}
          {isSpinning && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
          )}
        </button>
      </div>
      )}
    </>
  );
};

export const AudioPlayer = BackgroundAudio;
