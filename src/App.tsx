import { useEffect, useRef, useState } from 'react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
  }, []);

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
        <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#"
            className="text-3xl tracking-tight font-serif text-[#000000] hover:opacity-85 transition-opacity"
          >
            L&amp;N
          </a>

          {/* Menu items */}
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <a
              href="#cau-chuyen"
              className="text-[#000000] font-medium transition-colors hover:opacity-80"
            >
              Câu chuyện
            </a>
            <a
              href="#dia-diem"
              className="text-[#6F6F6F] transition-colors hover:text-[#000000]"
            >
              Địa điểm
            </a>
            <a
              href="#lich-trinh"
              className="text-[#6F6F6F] transition-colors hover:text-[#000000]"
            >
              Lịch trình
            </a>
            <a
              href="#album-anh"
              className="text-[#6F6F6F] transition-colors hover:text-[#000000]"
            >
              Album ảnh
            </a>
            <a
              href="#gui-loi-chuc"
              className="text-[#6F6F6F] transition-colors hover:text-[#000000]"
            >
              Gửi lời chúc
            </a>
          </div>

          {/* Nav CTA button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-full px-6 py-2.5 text-sm bg-[#000000] text-white hover:scale-[1.03] transition-transform duration-200 shadow-sm active:scale-95"
          >
            Mở thiệp mời
          </button>
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
          onClick={() => setIsModalOpen(true)}
          className="rounded-full px-14 py-5 text-base mt-12 bg-[#000000] text-[#FFFFFF] hover:scale-[1.03] transition-transform duration-200 animate-fade-rise-delay-2 shadow-lg hover:shadow-xl active:scale-95"
        >
          Mở thiệp mời
        </button>
      </main>

      {/* Invitation Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all duration-300 animate-fade-rise"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-black/5 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black transition-colors w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-lg"
              aria-label="Đóng thiệp"
            >
              ✕
            </button>

            {/* Monogram */}
            <div className="font-serif text-4xl text-black tracking-wider mb-2">
              L &amp; N
            </div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#6F6F6F] mb-6">
              Save The Date
            </div>

            <div className="w-12 h-[1px] bg-black/10 mb-6" />

            <h3 className="font-serif text-2xl text-black mb-2">
              Lâm &amp; Ngân
            </h3>
            <p className="text-sm text-[#6F6F6F] leading-relaxed mb-6">
              Thân mời bạn và người thương cùng đến tham dự lễ thành hôn ấm cúng của chúng mình.
            </p>

            <div className="bg-[#f9f9f9] rounded-2xl p-5 w-full mb-6 border border-black/5 text-left space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
                <span>NGÀY CHUNG ĐÔI</span>
                <span className="font-medium text-black">Chủ Nhật, 28.11.2026</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
                <span>THỜI GIAN</span>
                <span className="font-medium text-black">17:30</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
                <span>ĐỊA ĐIỂM</span>
                <span className="font-medium text-black">Gem Center, TP. Hồ Chí Minh</span>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded-full py-3.5 bg-black text-white text-sm hover:scale-[1.02] transition-transform duration-200"
            >
              Xác nhận tham dự
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
