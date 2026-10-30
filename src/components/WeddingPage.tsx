import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Heart,
  ArrowLeft,
  ExternalLink,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WeddingPetalsCanvas } from './WeddingPetalsCanvas';
import { getImageUrl, getWeddingAssetUrl } from '../utils/supabase';

// Supabase Storage assets
const AudioPlayer = getWeddingAssetUrl('music-vay-cuoi-erik.mp3');
const heroLiftImg = getImageUrl('IM01.jpg');
const bouquetCoupleImg = getImageUrl('IM02.jpg');
const handInHandImg = getImageUrl('IM03.jpg');
const im03_v2Img = getImageUrl('IM03-v2.jpg');
const im04_v2Img = getImageUrl('IM04-v2.jpg');
const im04Img = getImageUrl('IM04.jpg');
const im05Img = getImageUrl('IM05.jpg');
const im06Img = getImageUrl('IM06.jpg');
const im07Img = getImageUrl('IM07.jpg');
const im08Img = getImageUrl('IM08.jpg');
const im08_v2Img = getImageUrl('IM08-v2.jpg');
const im09Img = getImageUrl('IM09.jpg');
const im10Img = getImageUrl('IM10.jpg');
const im11Img = getImageUrl('IM11.jpg');
const im12Img = getImageUrl('IM12.jpg');
const im13Img = getImageUrl('IM13.jpg');
const im14Img = getImageUrl('IM14.jpg');
const im15Img = getImageUrl('IM15.jpg');
const im16_v2Img = getImageUrl('IM16-v2.jpg');
const im17Img = getImageUrl('IM17.jpg');

// Bank & QR Configuration from Environment Variables
const groomBank = {
  bankName: import.meta.env.VITE_GROOM_BANK_NAME || '',
  accountNumber: import.meta.env.VITE_GROOM_ACCOUNT_NUMBER || '',
  accountHolder: import.meta.env.VITE_GROOM_ACCOUNT_HOLDER || '',
  qrUrl: import.meta.env.VITE_GROOM_QR_URL || getImageUrl('QR-grom.jpg'),
};

const brideBank = {
  bankName: import.meta.env.VITE_BRIDE_BANK_NAME || '',
  accountNumber: import.meta.env.VITE_BRIDE_ACCOUNT_NUMBER || '',
  accountHolder: import.meta.env.VITE_BRIDE_ACCOUNT_HOLDER || '',
  qrUrl: import.meta.env.VITE_BRIDE_QR_URL || '',
};

// Preloaded wedding gallery
// Wedding Configuration
export const WEDDING_CONFIG = {
  targetDate: '2026-12-06T18:00:00',
  title: 'TIỆC MỪNG TÂN HÔN',
  dateFormatted: 'Chủ Nhật, 06.12.2026',
  lunarText: 'Âm lịch 28 tháng 10 Năm Bính Ngọ | Lúc 18:00 PM',
};

// Preloaded wedding gallery
export const weddingImages = [im04_v2Img, im04Img, im06Img, im07Img, im08Img, im09Img, im10Img, im13Img, im14Img, im15Img];

interface CalendarQrCardProps {
  role: string;
  name: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrUrl: string;
  copySuccess: boolean;
  onCopy: () => void;
}

const CalendarQrCard: React.FC<CalendarQrCardProps> = ({
  role,
  name,
  bankName,
  accountNumber,
  accountHolder,
  qrUrl,
  copySuccess,
  onCopy,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border border-rose-100 max-w-xs mx-auto text-center">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-rose-50">
        <span className="text-xs uppercase font-bold text-[#5e2229] tracking-wider">
          {role}: {name}
        </span>
        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
          {bankName}
        </span>
      </div>

      <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-center items-center my-3 shadow-inner">
        <img
          src={qrUrl}
          alt={`Mã QR ${accountHolder}`}
          className="w-44 h-44 object-contain rounded-lg drop-shadow-sm"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).alt = 'QR Code';
          }}
        />
      </div>

      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
        Chủ tài khoản
      </div>
      <div className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-1 font-wedding">
        {accountHolder}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        <span className="font-mono text-xs sm:text-[13.5px] text-slate-700 font-normal">
          {bankName} - {accountNumber}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className={`text-xs px-2.5 py-0.5 rounded-md font-medium transition active:scale-95 border shrink-0 ${copySuccess
              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
              : 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3] hover:bg-rose-100'
            }`}
        >
          {copySuccess ? 'Đã sao chép' : 'Sao chép'}
        </button>
      </div>
    </div>
  );
};

interface WeddingPageProps {
  onBackToTech: () => void;
}

export const WeddingPage: React.FC<WeddingPageProps> = ({ onBackToTech }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [showPetals, setShowPetals] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(null), 2500);
  };

  // Audio ref for direct HTML5 audio playback of wedding theme
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Keep the control in sync after navigation, viewport changes, and restored scroll positions.
  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrollTopVisibility = () => {
      animationFrameId = null;

      const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY;
      setShowScrollTop(scrollTop > 24);
    };

    const scheduleUpdate = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateScrollTopVisibility);
      }
    };

    updateScrollTopVisibility();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('pageshow', scheduleUpdate);
    window.visualViewport?.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('pageshow', scheduleUpdate);
      window.visualViewport?.removeEventListener('resize', scheduleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Target wedding date object & smart calendar calculations
  const weddingDate = useMemo(() => new Date(WEDDING_CONFIG.targetDate), []);
  const weddingYear = weddingDate.getFullYear();
  const weddingMonth = weddingDate.getMonth(); // 0-indexed (11 = December)
  const weddingDay = weddingDate.getDate(); // 6

  // 1. Tự động lấy số ngày trong tháng đó (vd: Tháng 12 = 31 ngày)
  const daysInMonth = useMemo(() => {
    return new Date(weddingYear, weddingMonth + 1, 0).getDate();
  }, [weddingYear, weddingMonth]);

  // 2. Tự động tính thứ của ngày 1 trong tháng để đặt các ô trống đầu tháng chuẩn xác
  // getDay(): 0 = CN, 1 = T2, 2 = T3, 3 = T4, 4 = T5, 5 = T6, 6 = T7
  const firstDayOfWeek = useMemo(() => {
    return new Date(weddingYear, weddingMonth, 1).getDay();
  }, [weddingYear, weddingMonth]);

  // 3. Tiêu đề các thứ trong tuần: CN, T2, T3, T4, T5, T6, T7
  const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Tên tháng tiếng Anh hiển thị trên banner (e.g. "December 2026")
  const monthYearEnglish = useMemo(() => {
    return weddingDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [weddingDate]);

  // Countdown timer to wedding day: December 06, 2026 at 18:00 PM
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Attempt auto-play audio on mount
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch(() => {
        // Browser autoplay restriction, will play on user gesture
      });
    }

    const weddingTarget = new Date(WEDDING_CONFIG.targetDate).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, weddingTarget - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleToggleMusic = () => {
    if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.play();
        setIsPlayingMusic(true);
      }
    } else {
      setIsPlayingMusic(!isPlayingMusic);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-stone-900 font-sans relative selection:bg-rose-200 selection:text-rose-900">

      {/* HTML5 Audio Player */}
      <audio
        ref={audioRef}
        src={AudioPlayer}
        loop
        preload="auto"
      />

      {/* Floating Back to Hero Button */}
      <div className="fixed top-3 left-3 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToTech}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-xs font-medium border border-white/20 transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </motion.button>
      </div>

      {/* ============================================================== */}
      {/* PHONE-STYLE CONTAINER (500px width matching template) */}
      {/* ============================================================== */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-2xl relative min-h-screen overflow-x-hidden pb-10">

        {/* Ambient Falling Petals & Floating Sparkles Canvas (Reacts to Scroll) */}
        {showPetals && <WeddingPetalsCanvas />}

        {/* ----------------- TOP-RIGHT FLOATING CONTROLS ----------------- */}
        <div className="absolute top-3 right-3 z-40 flex items-center gap-2">
          {/* Petal Canvas Toggle */}
          <button
            onClick={() => setShowPetals(!showPetals)}
            title={showPetals ? 'Tắt hiệu ứng' : 'Bật hiệu ứng'}
            aria-label="Toggle Petals"
            className="relative w-8 h-8 rounded-full bg-black/70 hover:bg-black/85 border border-white/70 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-all"
          >
            <Sparkles className={`w-3.5 h-3.5 ${showPetals ? 'text-pink-300' : 'text-stone-400'}`} />
          </button>

          {/* Audio Toggle Icon */}
          <button
            onClick={handleToggleMusic}
            aria-label="Toggle Music"
            title={isPlayingMusic ? 'Tắt nhạc' : 'Bật nhạc'}
            className="relative w-8 h-8 rounded-full bg-black/80 border border-white/80 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-transform"
          >
            <div className={`w-full h-full flex items-center justify-center ${isPlayingMusic ? 'animate-[spin_5s_linear_infinite]' : ''}`}>
              <div className="absolute inset-1 rounded-full border border-white/20" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <span className="text-xs font-serif text-white">♫</span>
            </div>
            {!isPlayingMusic && (
              <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center">
                <span className="w-5 h-0.5 bg-white rotate-45 rounded-full" />
              </div>
            )}
          </button>
        </div>

        {/* ----------------- SECTION 1: HERO COVER ----------------- */}
        <header className="relative w-full h-[850px] bg-cover bg-center flex flex-col justify-between p-6 text-white text-center overflow-hidden">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            src={im05Img}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
            alt="Nhật Long & Nguyễn Ngân"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Top text block: WELCOME TO OUR WEDDING & Poem */}
          <motion.div
            initial={{ opacity: 0, y: -35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 pt-8 px-2"
          >
            <h1 className="text-2xl sm:text-[26px] mt-10 font-wedding font-semibold tracking-wider uppercase text-white drop-shadow-md">
              Welcome to our wedding
            </h1>
            <p className="text-sm mt-2 font-light opacity-90 max-w-sm mx-auto leading-relaxed drop-shadow">
              Giữa muôn vàn người trên thế gian, thật may vì chúng ta đã tìm thấy nhau.
            </p>
          </motion.div>

          {/* Bottom text block: WE GOT MARRIED, Nguyen Ngan & Nhat Long, 2026.12.06, Wedding Invitation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 pb-10 flex flex-col items-center"
          >
            {/* Translucent pill badge with gentle float */}
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-xs uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white font-medium shadow-sm mb-2 border border-white/20"
            >
              We Got Married
            </motion.span>

            {/* Names row with pink ampersand */}
            <div className="w-full flex justify-between items-center my-4 px-2 sm:px-6">
              <motion.div
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl font-great-vibes border-b border-white/50 pb-1 text-white drop-shadow-md"
              >
                Nhật Long
              </motion.div>
              <motion.div
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                className=" font-great-vibes text-3xl sm:text-4xl px-2 drop-shadow-md select-none"
              >
                &amp;
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl font-great-vibes border-b border-white/50 pb-1 text-white drop-shadow-md"
              >
                Nguyễn Ngân
              </motion.div>
            </div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg font-wedding sm:text-xl font-semibold mt-2 text-white drop-shadow-md"
            >
              2026.12.06
            </motion.div>

            {/* Wedding Invitation */}
            <p className="text-base font-wedding font-semibold tracking-widest uppercase mt-1 opacity-80 text-white drop-shadow">
              Wedding Invitation
            </p>
          </motion.div>
        </header>

        {/* ----------------- SECTION 2: OUR LOVE STORY ----------------- */}
        <section className="relative w-full bg-white pt-2 overflow-hidden">
          {/* Hand in hand photo banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[285px] w-full overflow-hidden"
          >
            <img
              src={im03_v2Img}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = handInHandImg; }}
              alt="Together in Love"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="translate-y-[60px] flex flex-col items-center space-y-2">
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7 }}
                  className="text-[18px] font-wedding tracking-wider drop-shadow-md"
                >
                  Right love | Right reason | Right for you
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-[14px] font-wedding leading-relaxed max-w-sm font-medium text-white/95 drop-shadow"
                >
                  Trân trọng cảm ơn gia đình và bạn bè đã hiện diện, chúc phúc và cùng chúng mình viết nên ngày hạnh phúc.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="pt-8 pb-4 text-center"
          >
            <h2 className="text-[30px] font-bold font-wedding tracking-[2px] text-stone-900 uppercase">
              OUR LOVE STORY
            </h2>
            <p className="text-[16px] font-wedding italic text-stone-600 text-right pr-12 mt-1">
              Fall in love
            </p>
          </motion.div>

          {/* Bouquet photo with Sweet cursive */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 relative"
          >
            <div className="relative rounded overflow-hidden shadow-md">
              <img
                src={im04_v2Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Sweet Moment"
                className="w-full h-[250px] object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -23 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.2 }}
                className="absolute bottom-[-15px] right-2 font-script text-[85px] text-[#d63030] select-none drop-shadow pointer-events-none"
              >
                Sweet
              </motion.span>
            </div>
          </motion.div>

          {/* Laurel wreath emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="pt-10 pb-4 flex items-center justify-center gap-3 text-stone-800"
          >
            <motion.span
              animate={{ rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl"
            >
              🌿
            </motion.span>
            <div className="text-center">
              <div className="text-[20px] font-wedding font-bold leading-none uppercase">WEDDING</div>
              <div className="text-[12px] font-wedding tracking-widest text-stone-600 uppercase">INVITATION</div>
            </div>
            <motion.span
              animate={{ rotate: [3, -3, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl transform -scale-x-100"
            >
              🌿
            </motion.span>
          </motion.div>
        </section>

        {/* ----------------- SECTION 3: NÓI VỀ ĐÁM CƯỚI ----------------- */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="px-6 py-6 text-center space-y-4 bg-white"
        >
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-[13px] font-wedding font-semibold text-stone-800 text-center leading-relaxed"
          >
            Trước đây cứ nghĩ đám cưới chỉ là một thông báo chính thức,
            <br />
            Giờ mới hiểu đó là một dịp hiếm hoi để mọi người tụ họp.
            <br />
            Là những chuyến đi xa chỉ để có mặt bên nhau,
            <br />
            Là sự ủng hộ vô điều kiện từ những người thương yêu.
            <br />
            Cảm ơn gia đình, bạn bè đã luôn đồng hành.
            <br />
            Lâu rồi không gặp, thật sự rất nhớ mọi người!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[24px] font-wedding tracking-wider text-stone-900 pt-2"
          >
            2026.12.06
          </motion.div>

          <p className="text-[17px] font-wedding font-medium text-stone-900">
            Chúng mình, hẹn gặp nhau trong ngày cưới nhé!
          </p>
        </motion.section>

        {/* ----------------- SECTION 4: OUR LOVE STORY BENTO ----------------- */}
        <section className="relative px-4 py-8 bg-white overflow-hidden">
          {/* Top Right Title */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="text-right pr-4 mb-3"
          >
            <div className="text-[32px] font-bold font-wedding text-[#c91212] leading-tight tracking-wider">
              OUR
              <br />
              LOVE STORY
            </div>
          </motion.div>

          <div className="relative flex justify-end">
            {/* Vertical script text running parallel to the left of Photo 1 */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.85 }}
              // className="absolute left-15 bottom-[140px] z-10 pointer-events-none select-none"
              className="absolute left-[70px] bottom-[200px] -translate-y-1/2 z-10 pointer-events-none select-none"
            >
              <div
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: 'bottom left',
                }}
                className="text-[18px] sm:text-[19px] font-script text-stone-600 tracking-wide whitespace-nowrap"
              >
                Love goes with the wind, but never goes away.
              </div>
            </motion.div>

            {/* Photo 1: Walking together */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-[385px] h-[540px] rounded overflow-hidden shadow-lg"
            >
              <img
                src={bouquetCoupleImg}
                // src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/0d2f9d57-3461-444b-87c6-0d8f3c4489de.jpeg"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = handInHandImg; }}
                alt="Love Story Main"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Photo 2: Open arms on lawn */}
          <div className="mt-4 relative flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="w-[390px] h-[220px] p-2 bg-white rounded shadow-md overflow-hidden"
            >
              <img
                src={im08_v2Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Open arms couple"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            {/* Rotated date 12.06 */}
            <motion.div
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              whileInView={{ opacity: 1, rotate: 90, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="whitespace-nowrap text-[17px] font-wedding font-medium text-stone-900 tracking-widest pl-2"
            >
              December 06
            </motion.div>
          </div>
        </section>

        {/* ----------------- SECTION 5: FALL IN LOVE & EMBRACE ----------------- */}
        <section className="px-6 py-6 bg-white space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="flex items-center gap-3"
          >
            {/* Double Happiness Song Hy character with heartbeat pulse */}
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[48px] text-[#c71717] font-bold leading-none select-none drop-shadow-sm"
            >
              囍
            </motion.span>
            <div>
              <h3 className="text-[25px] font-bold font-wedding text-stone-700 leading-tight">
                FALL
                <br />
                IN LOVE
              </h3>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[18px] font-wedding italic text-stone-700 leading-relaxed"
          >
            Mong rằng khi ngoảnh lại, ta vẫn có nhau.
            <br />
            Cùng nắm tay đi đến bạc đầu...
          </motion.p>

          {/* Three headers row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65 }}
            className="flex items-center justify-between text-[20px] font-wedding text-stone-700 pt-2"
          >
            <span>YOU ARE</span>
            <span>MY DEAREST</span>
            <span>LOVE</span>
          </motion.div>

          {/* Big portrait photo with overlapping red calligraphy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded overflow-hidden shadow-lg"
          >
            <img
              src={im06Img}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
              alt="Deep Embrace"
              className="w-full h-[565px] object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Elegant Calligraphy text overlapping bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className=" inset-x-0 mx-auto text-center px-4 flex flex-col items-center space-y-1.5"
            >
              <div className="w-full font-great-vibes text-right text-[12px] sm:text-[25px] text-[#8C3038] font-normal leading-[1.3] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                Two Hearts, One Journey
              </div>
              <div className="w-full font-great-vibes text-right text-[12px] sm:text-[25px] text-[#8C3038] font-normal leading-[1.3] drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                A Lifetime of Love
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ----------------- SECTION 6: WEDDING INFORMATION & TWO PHOTOS ----------------- */}
        <section className="px-6 py-6 bg-white space-y-4">

          {/* Headers row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-between text-[20px] font-wedding text-stone-500 py-2 border-t border-b border-stone-200"
          >
            <span>LOVE</span>
            <span>WEDDING</span>
            <span>INFORMATION</span>
          </motion.div>

          {/* Two vertical photos with staggered slide-in */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -35, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="h-[290px] rounded overflow-hidden shadow"
            >
              <img
                src={im09Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
                alt="Couple moment 1"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 35, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="h-[290px] rounded overflow-hidden shadow"
            >
              <img
                src={im15Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Couple moment 2"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75 }}
            className="flex items-center gap-3 pt-2"
          >
            <motion.span
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[44px] text-[#c71717] font-bold leading-none select-none drop-shadow-sm"
            >
              囍
            </motion.span>
            <div>
              <div className="text-[26px] font-bold font-wedding text-stone-900 leading-tight">
                YOU
                <br />
                ARE PERFECT
              </div>
              <div className="text-[16px] font-wedding italic text-stone-500 mt-1">
                Thương một người, dành trọn một đời
              </div>
            </div>
          </motion.div>
        </section>

        {/* ----------------- SECTION 7: CALENDAR & COUNTDOWN ----------------- */}
        <section className="relative w-full bg-white pt-2">
          {/* Forehead touching photo with calendar glass card */}
          <div className="relative h-[750px] w-full overflow-hidden">
            <motion.img
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2 }}
              src={im16_v2Img}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
              alt="Kiss forehead"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            {/* Top info on photo */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7 }}
              className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-base font-wedding tracking-wider drop-shadow-md"
            >
              <span className="font-bold">L&N</span>
              <span className="font-semibold">{monthYearEnglish}</span>
              <span className="font-bold">FALL IN</span>
              <span className="font-bold">LOVE</span>
            </motion.div>

            {/* Laurel wreath on photo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute top-20 left-0 right-0 flex items-center justify-center gap-2 text-white text-lg font-wedding tracking-[0.2em] drop-shadow-md"
            >
              <span>🌿</span>
              <span className="font-bold">WEDDING INVITATION</span>
              <span className="transform -scale-x-100">🌿</span>
            </motion.div>

            {/* Translucent Calendar Card Over Photo with 3D tilt float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[280px] left-6 right-6 sm:left-8 sm:right-8 bg-black/30 backdrop-blur-xs rounded-xl p-4 sm:p-5 text-white border border-white/15 shadow-2xl"
            >
              {/* Hàng đánh dấu tháng năm */}
              <div className="flex items-center justify-center gap-2.5 pb-2.5 mb-2.5 border-b border-white/20">
                <span className="h-[1px] w-6 bg-white/30" />
                <span className="font-wedding font-bold text-base sm:text-lg tracking-widest uppercase text-white drop-shadow-sm">
                  Tháng {weddingMonth + 1} / {weddingYear}
                </span>
                <span className="h-[1px] w-6 bg-white/30" />
              </div>

              <div className="grid grid-cols-7 gap-y-2.5 text-center text-sm font-sans">
                {/* Hàng tiêu đề thứ trong tuần: CN, T2, T3, T4, T5, T6, T7 */}
                {WEEKDAYS.map((dow) => (
                  <div
                    key={dow}
                    className={`py-1 text-xs font-semibold tracking-wider ${dow === 'CN' ? 'text-rose-300 font-bold' : 'text-white/80'
                      }`}
                  >
                    {dow}
                  </div>
                ))}

                {/* Tự động đặt các ô trống đầu tháng chuẩn xác */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="py-1" />
                ))}

                {/* Tự động hiển thị các ngày trong tháng (vd: Tháng 12 có 31 ngày) */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const isWeddingDay = day === weddingDay;
                  return (
                    <div key={day} className="flex items-center justify-center relative py-1">
                      {isWeddingDay ? (
                        <div className="relative flex items-center justify-center w-7 h-7">
                          {/* Tự động gắn huy hiệu trái tim đỏ đang nhịp đập (Heart animate-pulse) */}
                          <Heart className="w-6 h-6 fill-red-600 text-red-600 animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.85)]" />
                          <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-[11px] leading-none drop-shadow">
                            {day}
                          </span>
                        </div>
                      ) : (
                        <span className="text-white/85 text-xs">{day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Date info text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65 }}
            className="py-5 text-center space-y-1"
          >
            <p className="font-wedding italic font-bold text-lg text-stone-800">
              {WEDDING_CONFIG.title}
            </p>
            <p className="font-wedding italic text-lg text-stone-800">
              {WEDDING_CONFIG.dateFormatted}
            </p>
            <p className="font-wedding italic text-sm text-stone-600">
              {WEDDING_CONFIG.lunarText}
            </p>
          </motion.div>

          {/* Red Countdown Bar with 3D Flip Spring Entrance */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-4 gap-2.5 text-center">
              {[
                { val: timeLeft.days, label: 'ngày' },
                { val: timeLeft.hours, label: 'giờ' },
                { val: timeLeft.minutes, label: 'phút' },
                { val: timeLeft.seconds, label: 'giây' }
              ].map((unit, uIdx) => (
                <motion.div
                  key={uIdx}
                  initial={{ opacity: 0, y: 30, scale: 0.85, rotateX: 25 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.65, delay: 0.08 * uIdx, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#940000] text-white py-3 rounded shadow-md transform-gpu"
                >
                  <div className="text-xl font-bold font-wedding tabular-nums">{unit.val}</div>
                  <div className="text-[11px] uppercase mt-0.5 text-white/90">{unit.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ----------------- SECTION 8: AS THE CLOUDS & MIST ----------------- */}
        <section className="px-6 py-6 bg-white space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75 }}
            className="text-[16px] font-wedding font-semibold text-stone-800 leading-relaxed"
          >
            Ánh trời bừng sáng, rơi vào chốn nhân gian.
            <br />
            Ta vượt ngàn sông núi,
            <br />
            Chỉ để cùng em
            <br />
            Đi qua bốn mùa, dùng chung ba bữa
          </motion.p>

          {/* Two photos */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.div
              initial={{ opacity: 0, x: -35, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="h-[240px] rounded overflow-hidden shadow"
            >
              <img
                src={im11Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Laughing together"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 35, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="h-[240px] rounded overflow-hidden shadow"
            >
              <img
                src={im12Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = handInHandImg; }}
                alt="Looking at each other"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75 }}
            className="py-2"
          >
            <span className="font-script text-[23px] text-stone-700 block">
              As the clouds and mist dissipate
            </span>
            <span className="font-script text-[23px] text-stone-700 block">
              love you and everyone knows it
            </span>
          </motion.div>

          {/* Square photo with vertical FOREVER AND EVER text */}
          <div className="relative flex items-center justify-between pt-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85 }}
              className="w-[358px] h-[358px] p-2 bg-white rounded shadow-md overflow-hidden"
            >
              <img
                src={im07Img}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
                alt="Forever"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              whileInView={{ opacity: 1, rotate: 90, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center text-[15px] font-wedding text-stone-900 tracking-widest pl-2"
            >
              <span>FOREVER</span>
              <span>AND</span>
              <span>EVER</span>
            </motion.div>
          </div>
        </section>

        {/* ----------------- SECTION 9: WEDDING VENUE & SUNSHINE ----------------- */}
        <section className="px-6 py-6 bg-white space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.75 }}
            className="font-wedding text-[15px] text-center leading-relaxed text-stone-800"
          >
            Em tựa núi sông, băng qua rừng biếc,
            <br />
            Thoáng hiện như cánh chim, muôn hoa bừng nở.
            <br />
            Giữa nhân gian cỏ cây vô tận,
            <br />
            Riêng anh chỉ thấy em là ngọn núi xanh dịu dàng.
          </motion.p>

          {/* Google Maps Card */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="w-full h-[250px] rounded-xl overflow-hidden shadow border border-stone-200 relative"
          >
            <iframe
              title="Địa điểm tiệc cưới"
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304.81331853410717!2d106.62866087489543!3d10.805836191844557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bd46f658857%3A0x227ecfc8312d0652!2sVenus%20Luxury!5e0!3m2!1svi!2s!4v1791820132975!5m2!1svi!2s"
              allowFullScreen
            />
            <a
              href="https://maps.app.goo.gl/2L7GnDmhZpZwSK929"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 left-2 bg-white/90 px-3 py-1.5 rounded shadow text-xs font-semibold text-blue-600 flex items-center gap-1 hover:bg-white transition-colors"
            >
              <span>Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="text-center py-2">
            <h4 className="text-[20px] font-wedding font-semibold text-stone-800">
              Trung tâm hội nghị - tiệc cưới Venus Luxury
            </h4>
            <p className="text-m font-bold font-wedding text-stone-500 mt-0.5">
              Sảnh Hera - Tầng 3
              <br />
              117-117A Lê Trọng Tấn, Phường Tân Sơn Nhì, Tp.Hồ Chí Minh
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="w-full h-[225px] rounded overflow-hidden shadow"
          >
            <img
              src={im05Img}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = handInHandImg; }}
              alt="Love forever"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          <div className="flex items-center justify-between text-[20px] font-wedding text-stone-800 py-2 border-t border-b border-stone-200">
            <span>LOVE YOU</span>
            <span>FOREVER</span>
            <span>AND EVER</span>
          </div>

          {/* Full height sunshine photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[670px] w-full rounded overflow-hidden shadow"
          >
            <img
              src={im17Img}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
              alt="Sunshine Bride and Groom"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="absolute top-16 left-0 right-0 text-center">
              <motion.span
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.85, delay: 0.2 }}
                className="font-script text-[52px] text-white drop-shadow-lg block leading-tight"
              >
                We’re meant to
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.85, delay: 0.3 }}
                className="font-script text-[50px] text-white drop-shadow-lg block leading-tight -mt-4"
              >
                be together
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* SECTION: HỘP QUÀ MỪNG (THE CALENDAR FRAME QR CODE SECTION) */}
        <section id="hop-qua-mung" className="py-8 px-6 bg-gradient-to-b from-white via-rose-50/40 to-white text-center border-t border-slate-100">
          {/* Pill badge from Image 2 */}
          <div className="inline-block bg-[#5e2229] text-white px-7 py-2 rounded-full font-medium text-xs sm:text-sm tracking-widest uppercase shadow-md mb-2">
            Hộp quà mừng
          </div>

          <p className="text-xs text-slate-500 py-2 mb-6 max-w-xs mx-auto">
            Cảm ơn tình cảm và sự chúc phúc chân thành từ bạn dành cho ngày vui của chúng mình!
          </p>

          {/* Calendar Style Frame with QR code (from Image 1 & 2) */}
          <CalendarQrCard
            role="Chú rể"
            name="Nhật Long"
            bankName={groomBank.bankName}
            accountNumber={groomBank.accountNumber}
            accountHolder={groomBank.accountHolder}
            qrUrl={groomBank.qrUrl}
            copySuccess={copySuccess === 'groom'}
            onCopy={() => copyToClipboard(groomBank.accountNumber, 'groom')}
          />
        </section>

        {/* ----------------- FOOTER: THANK YOU ----------------- */}
        <footer
          id="thank-you"
          className="px-6 pt-8 pb-[calc(2rem+env(safe-area-inset-bottom))] bg-white space-y-6"
        >

          {/* Cute Couple Drawing Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85 }}
            className="py-4 flex flex-col items-center justify-center text-center space-y-3"
          >
            <motion.img
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              src="https://assets.cinelove.me/resources/characters/2pln23imlphtxz5q16j3mc.png"
              alt="Bride and Groom Illustration"
              className="w-24 h-28 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: [0.8, 1.06, 1] }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-script text-[64px] text-stone-900 leading-none select-none"
            >
              Thankyou
            </motion.div>
          </motion.div>
        </footer>

      </div>

      {/* MODAL: GIFT / QR BANKING */}
      {showGiftModal && (
        <div
          onClick={() => setShowGiftModal(false)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center animate-fade-rise max-h-[92vh] overflow-y-auto"
          >
            <div className="inline-block bg-[#5e2229] text-white px-6 py-1.5 rounded-full font-medium text-xs tracking-widest uppercase shadow-md mb-2">
              Hộp quà mừng
            </div>

            {/* Calendar Qr Card in Modal */}
            <div className="mt-4">
              <CalendarQrCard
                role="Cô dâu"
                name="Thuỳ Linh"
                bankName={brideBank.bankName}
                accountNumber={brideBank.accountNumber}
                accountHolder={brideBank.accountHolder}
                qrUrl={brideBank.qrUrl}
                copySuccess={copySuccess === 'bride'}
                onCopy={() => copyToClipboard(brideBank.accountNumber, 'bride')}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowGiftModal(false)}
              className="mt-6 w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition active:scale-98"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Floating "Scroll to top" button when scrolled down */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-50 w-10 h-10 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white shadow-xl backdrop-blur-md flex items-center justify-center border border-white/30 transition-colors"
            title="Cuộn lên đầu trang"
            aria-label="Cuộn lên đầu trang"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default WeddingPage;
