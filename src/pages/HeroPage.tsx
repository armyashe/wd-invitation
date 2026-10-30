import React from 'react';
import { useVideoFade } from '../hooks/useVideoFade';
import { HERO_VIDEO_URL } from '../constants/images.constants';

interface HeroPageProps {
  onOpenInvitation: () => void;
}

export const HeroPage: React.FC<HeroPageProps> = ({ onOpenInvitation }) => {
  const videoRef = useVideoFade(true);

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
          src={HERO_VIDEO_URL}
          className="w-full h-full object-cover will-change-[opacity]"
          autoPlay
          muted
          playsInline
          style={{ opacity: 0 }}
        />

        {/* Gradient overlays */}
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
          paddingBottom: '10rem',
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
          Trân trọng kính mời bạn đến chung vui và chia sẻ những khoảnh khắc hạnh phúc nhất trong
          ngày trọng đại của chúng mình.
        </p>

        {/* Cụm hướng dẫn "Chạm để mở thiệp mời" */}
        <div className="mt-8 mb-2 flex items-center justify-center select-none px-4">
          <div className="-translate-x-[110px] translate-y-[50px] ">
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 animate-bounce">
              <div className="flex flex-col items-end text-right font-wedding text-sm font-bold italic text-neutral-900 tracking-wide leading-tight whitespace-nowrap animate-text-glow drop-shadow">
                <span>Chạm để mở</span>
                <span>thiệp mời</span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-8 flex-shrink-0 pt-0.5">
                <svg
                  viewBox="0 0 65 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full text-black drop-shadow-sm overflow-visible"
                >
                  <path
                    d="M 4 22 C 18 2, 45 3, 53 28"
                    stroke="currentColor"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                  />
                  <polygon points="42,22 55,30 59,15" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Hero CTA Button */}
        <button
          onClick={onOpenInvitation}
          className="rounded-full px-12 py-4 text-base sm:text-lg mt-12 bg-black text-white hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all duration-200 shadow-2xl font-medium tracking-wide animate-pulse"
        >
          Mở thiệp mời
        </button>
      </main>
    </div>
  );
};

export default HeroPage;

