import React from 'react';
import { motion } from 'motion/react';
import { heroLiftImg, im05Img } from '../../../constants/images.constants';

export const WeddingHeroCover: React.FC = () => {
  return (
    <header className="relative w-full h-[850px] bg-cover bg-center flex flex-col justify-between p-6 text-white text-center overflow-hidden">
      <motion.img
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        src={im05Img}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = heroLiftImg;
        }}
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
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
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
  );
};

export default WeddingHeroCover;

