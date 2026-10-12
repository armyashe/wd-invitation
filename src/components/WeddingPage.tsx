import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  ArrowLeft,
  ExternalLink,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WeddingPetalsCanvas } from './WeddingPetalsCanvas';

// Fallback images
import heroLiftImg from '../assets/images/IM01.jpg';
import bouquetCoupleImg from '../assets/images/IM02.jpg';
import handInHandImg from '../assets/images/IM03.jpg';
interface WeddingPageProps {
  onBackToTech: () => void;
}

export const WeddingPage: React.FC<WeddingPageProps> = ({ onBackToTech }) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [showPetals, setShowPetals] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // RSVP Form state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'yes' | 'no'>('yes');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Audio ref for direct HTML5 audio playback of wedding theme
  const audioRef = useRef<HTMLAudioElement | null>(null);


  // Track scroll position for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown timer to wedding day: May 20, 2050 at 12:00 PM
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

    const weddingTarget = new Date('2050-05-20T12:00:00').getTime();
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

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-stone-900 font-sans relative selection:bg-rose-200 selection:text-rose-900">

      {/* HTML5 Audio Player */}
      <audio
        ref={audioRef}
        src="https://assets.cinelove.me/mp3/0e470330-e4d4-4fdc-8d99-830aab66916c.mp3"
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
            title={showPetals ? 'Tắt hiệu ứng' : 'Bật hiệu ứngy'}
            aria-label="Toggle Petals"
            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black/85 border border-white/70 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-all"
          >
            <Sparkles className={`w-3.5 h-3.5 ${showPetals ? 'text-pink-300' : 'text-stone-400'}`} />
          </button>

          {/* Audio Toggle Icon */}
          <button
            onClick={handleToggleMusic}
            aria-label="Toggle Music"
            title={isPlayingMusic ? 'Tắt nhạc' : 'Bật nhạc'}
            className="w-8 h-8 rounded-full bg-black/80 border border-white/80 shadow-md flex items-center justify-center text-white overflow-hidden active:scale-95 transition-transform"
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
            src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/5d65d861-da0a-460d-906f-01d503d821eb.jpeg"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
            alt="Thuỳ Linh & Quang Huy"
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
            <h1 className="text-2xl sm:text-[26px] font-semibold tracking-wider uppercase font-sans text-white drop-shadow-md">
              Welcome to our wedding
            </h1>
            <p className="text-sm mt-2 font-light opacity-90 max-w-sm mx-auto leading-relaxed drop-shadow">
              I love three things in this world: Sun, moon and you. Sun for morning, moon for night, and you forever.
            </p>
          </motion.div>

          {/* Bottom text block: WE GOT MARRIED, Thuỳ Linh & Quang Huy, 2050.05.20, Wedding Invitation */}
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
                className="text-2xl sm:text-3xl font-bold font-display-wedding border-b border-white/50 pb-1 text-white drop-shadow-md"
              >
                Thuỳ Linh
              </motion.div>
              <motion.div
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                className="text-[#ff6883] font-bold text-3xl sm:text-4xl px-2 drop-shadow-md select-none"
              >
                &amp;
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl font-bold font-display-wedding border-b border-white/50 pb-1 text-white drop-shadow-md"
              >
                Quang Huy
              </motion.div>
            </div>

            {/* Date */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.2em' }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-lg sm:text-xl font-semibold mt-2 text-white drop-shadow-md"
            >
              2050.05.20
            </motion.div>

            {/* Wedding Invitation */}
            <p className="text-xs tracking-widest uppercase mt-1 opacity-80 text-white drop-shadow">
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
              src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/13f9dcdf-0bee-47c3-b511-13089aa2a0a3.jpeg"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = handInHandImg; }}
              alt="Together in Love"
              className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white space-y-2">
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7 }}
                className="text-[22px] font-wedding tracking-wider drop-shadow-md"
              >
                Right love | Right reason | Right for you
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[14px] leading-relaxed max-w-sm font-medium text-white/95 drop-shadow"
              >
                To Our Family And Friends, Thank You For Celebrating Our Special Day, Supporting Us And Sharing Our Love.
              </motion.p>
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/33108cfa-eebb-49f7-8d94-da847ff81905.jpeg"
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
          <p className="text-[15px] leading-relaxed text-stone-800 font-normal max-w-sm mx-auto">
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
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[24px] font-wedding tracking-wider text-stone-900 pt-2"
          >
            2050.05.20
          </motion.div>

          <p className="text-[20px] font-wedding font-medium text-stone-900">
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
              className="absolute left-[80px] bottom-[200px] -translate-y-1/2 z-10 pointer-events-none select-none"
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/0d2f9d57-3461-444b-87c6-0d8f3c4489de.jpeg"
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/d8c117d7-51aa-43ad-b616-c511c746f362.jpeg"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Open arms couple"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
            {/* Rotated date 05.20 */}
            <motion.div
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              whileInView={{ opacity: 1, rotate: 90, scale: 1 }}
              viewport={{ once: false }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-[26px] font-wedding font-medium text-stone-900 tracking-widest pl-2"
            >
              05.20
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
              <h3 className="text-[28px] font-bold font-wedding text-stone-700 leading-tight">
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
              src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/021f7a07-bf26-4e5b-ba95-b94503416d3c.jpeg"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = heroLiftImg; }}
              alt="Deep Embrace"
              className="w-full h-[565px] object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Red bold brush text overlapping bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.85, delay: 0.2 }}
              className="absolute bottom-2 right-4 text-right"
            >
              <div className="font-script text-[48px] text-[#b70000] font-bold leading-tight drop-shadow">
                Love and freedom
              </div>
              <div className="font-script text-[48px] text-[#b70000] font-bold leading-tight drop-shadow -mt-3">
                you And gentleness
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ----------------- SECTION 6: WEDDING INFORMATION & TWO PHOTOS ----------------- */}
        <section className="px-6 py-6 bg-white space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-[17px] text-center leading-relaxed text-stone-800"
          >
            Núi biếc rừng xanh vang vọng tiếng lòng,
            <br />
            Giữa thế gian rộng lớn, người chung nhịp vẫn tìm thấy nhau.
            <br />
            Tình yêu đến như một lẽ tự nhiên,
            <br />
            Và chúng ta nắm tay nhau đi đến trọn đời.
          </motion.p>

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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/96624014-6e8e-4df2-9577-6b87fc0dda7f.jpeg"
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/3e9b5d30-32ba-4034-9952-6ec02489ad24.jpeg"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg; }}
                alt="Couple moment 2"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="text-[17px] text-center leading-relaxed text-stone-700 pt-2"
          >
            I love three things in this world.，
            <br />
            Sun moon and you. Sun for morning moon for night,
            <br />
            and you forever.
          </motion.p>

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
              src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/048c66b5-b4e1-462e-b8df-9651d9d5a361.jpeg"
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
              className="absolute top-4 left-4 right-4 flex items-center justify-between text-white text-base"
            >
              <span className="font-semibold">NO.12</span>
              <span>05.20</span>
              <span>FALL IN</span>
              <span>LOVE</span>
            </motion.div>

            {/* Laurel wreath on photo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute top-12 left-0 right-0 flex items-center justify-center gap-2 text-white text-xs tracking-wider"
            >
              <span>🌿</span>
              <span>WEDDING INVITATION</span>
              <span className="transform -scale-x-100">🌿</span>
            </motion.div>

            {/* Translucent Calendar Card Over Photo with 3D tilt float */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[280px] left-8 right-8 bg-black/40 backdrop-blur-md rounded-xl p-5 text-white border border-white/10 shadow-2xl"
            >
              <div className="grid grid-cols-7 gap-y-3 text-center text-sm font-sans">
                {/* Calendar Days 1..31 */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isWeddingDay = day === 21 || day === 20;
                  return (
                    <div key={day} className="flex items-center justify-center relative py-1">
                      {isWeddingDay ? (
                        <div className="relative flex items-center justify-center">
                          <span className="absolute -inset-1 rounded-full bg-red-600/90 shadow-md flex items-center justify-center animate-pulse">
                            <Heart className="w-5 h-5 fill-current text-white/90" />
                          </span>
                          <span className="relative z-10 font-bold text-white text-xs">{day}</span>
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
            <p className="font-wedding italic text-lg text-stone-800">
              Thứ Bảy, 20.05.2050
            </p>
            <p className="font-wedding italic text-sm text-stone-600">
              Âm lịch 22/4 | 12:00 PM
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
            className="text-[17px] leading-relaxed text-stone-800"
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/4990d53a-c8e0-47b6-8ccc-4efca542bc32.jpeg"
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/bce43835-1a2e-4d3c-a1b4-5d2830c9a25c.jpeg"
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
            <span className="font-script text-[26px] text-stone-700 block">
              As the clouds and mist dissipate
            </span>
            <span className="font-script text-[26px] text-stone-700 block">
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
                src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/adf5f081-6d66-429e-921b-a8f9832940cb.jpeg"
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
              className="flex flex-col items-center text-[18px] font-wedding text-stone-900 tracking-widest pl-2"
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
            className="text-[17px] text-center leading-relaxed text-stone-800"
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
              src="https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed"
              allowFullScreen
            />
            <a
              href="https://maps.google.com/?q=52+Miếu+Đầm+Mễ+Trì+Nam+Từ+Liêm+Hà+Nội"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2 left-2 bg-white/90 px-3 py-1.5 rounded shadow text-xs font-semibold text-blue-600 flex items-center gap-1 hover:bg-white transition-colors"
            >
              <span>Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          <div className="text-center py-2">
            <h4 className="text-[16px] font-wedding font-semibold text-stone-800">
              Trung tâm tiệc cưới Grand Palace
            </h4>
            <p className="text-xs text-stone-500 mt-0.5">
              52 Miếu Đầm, Mễ Trì, Nam Từ Liêm, Hà Nội
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
              src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/d8c117d7-51aa-43ad-b616-c511c746f362.jpeg"
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
              src="https://assets.cinelove.me/templates/assets/7e275458-268a-4dad-b147-1af6ad9abb46/c47cf001-2170-4c33-923a-82f6e8b117f0.jpeg"
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
                className="font-script text-[64px] text-white drop-shadow-lg block leading-tight"
              >
                You ar my
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.85, delay: 0.3 }}
                className="font-script text-[64px] text-white drop-shadow-lg block leading-tight -mt-4"
              >
                Sunshine
              </motion.span>
            </div>
          </motion.div>
        </section>

        {/* ----------------- SECTION 10: RSVP & THANK YOU ----------------- */}
        <section className="px-6 py-8 bg-white space-y-6">
          {/* RSVP Card */}
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85 }}
            className="bg-white rounded-xl shadow-lg border border-stone-200 p-6 space-y-4"
          >
            <h3 className="text-center font-bold text-[18px] text-stone-800">
              Xác nhận tham dự
            </h3>

            <form onSubmit={handleRsvpSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-stone-700 mb-1 text-xs font-medium">Họ và tên</label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Nhập tên của bạn"
                  className="w-full px-3 py-2 border border-stone-200 rounded text-xs focus:outline-none focus:border-stone-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1 text-xs font-medium">Bạn sẽ tham dự chứ?</label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      checked={rsvpAttendance === 'yes'}
                      onChange={() => setRsvpAttendance('yes')}
                      className="accent-[#3a9bff]"
                    />
                    <span>Có, tôi sẽ tham dự</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      checked={rsvpAttendance === 'no'}
                      onChange={() => setRsvpAttendance('no')}
                      className="accent-[#3a9bff]"
                    />
                    <span>Tôi bận, rất tiếc không thể tham dự</span>
                  </label>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-2 bg-[#5c5c5c] hover:bg-[#434343] text-white text-xs font-semibold rounded transition-colors shadow active:scale-95"
              >
                Gửi xác nhận
              </motion.button>

              {rsvpSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2 bg-emerald-50 text-emerald-700 text-xs text-center rounded border border-emerald-200"
                >
                  Cảm ơn bạn! Xác nhận tham dự đã được gửi thành công.
                </motion.div>
              )}
            </form>
          </motion.div>

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
        </section>

      </div>

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
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white shadow-xl backdrop-blur-md flex items-center justify-center border border-white/30 transition-colors"
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
