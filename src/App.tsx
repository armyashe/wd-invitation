import { useEffect, useRef, useState } from 'react';
import WeddingPage from './components/WeddingPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'hero' | 'wedding'>('hero');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (currentPage !== 'hero') return;

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

    // Start monitoring animation frame
    animationFrameId = requestAnimationFrame(updateOpacity);

    // On ended event: set opacity to 0, wait 100ms, reset currentTime = 0, then play() again
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

    // Initial play attempt
    video.play().catch((err) => {
      console.warn('Initial autoplay was prevented:', err);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentPage]);

  const handleOpenInvitation = () => {
    setCurrentPage('wedding');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToHero = () => {
    setCurrentPage('hero');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (currentPage === 'wedding') {
    return <WeddingPage onBackToTech={handleBackToHero} />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Background Video Layer (z-0) */}
      <div
        className="absolute w-full z-0 pointer-events-none"
        style={{
          top: '300px',
          inset: 'auto 0 0 0',
          height: 'calc(100% - 300px)',
        }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          className="w-full h-full object-cover will-change-[opacity]"
          autoPlay
          muted
          playsInline
          style={{ opacity: 0 }}
        />

        {/* Gradient overlays: absolute inset-0 bg-gradient-to-b from-background via-transparent to-background positioned over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      </div>

      {/* Navigation Bar (z-10) */}
      <header className="relative z-10 w-full">
        <nav className="flex items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="text-3xl tracking-tight font-serif text-[#000000] hover:opacity-85 transition-opacity"
          >
            L&amp;N
          </a>
        </nav>
      </header>

      {/* Hero Section (z-10) */}
      <main
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
        style={{
          paddingTop: 'calc(8rem - 75px)',
          paddingBottom: '10rem', // pb-40
        }}
      >
        {/* Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl max-w-7xl font-normal text-[#000000] leading-[0.95] tracking-[-2.46px] animate-fade-rise">
          The Journey of{' '}
          <span className="italic text-[#6F6F6F]">Love,</span> We Begin{' '}
          <span className="italic text-[#6F6F6F]">Together.</span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#6F6F6F] animate-fade-rise-delay">
          Trân trọng kính mời bạn đến chung vui và chia sẻ những khoảnh khắc hạnh phúc nhất trong ngày trọng đại của chúng mình.
        </p>

        {/* Hero CTA Button */}
        <button
          onClick={handleOpenInvitation}
          className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 animate-fade-rise-delay-2 shadow-lg hover:shadow-xl active:scale-95"
        >
          Mở thiệp mời
        </button>
      </main>
    </div>
  );
}
