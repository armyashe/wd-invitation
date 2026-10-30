import React from 'react';
import { motion } from 'motion/react';
import {
  im03_v2Img,
  handInHandImg,
  im04_v2Img,
  bouquetCoupleImg,
} from '../../../constants/images.constants';

export const WeddingLoveStoryBanner: React.FC = () => {
  return (
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
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = handInHandImg;
          }}
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
              Trân trọng cảm ơn gia đình và bạn bè đã hiện diện, chúc phúc và cùng chúng mình viết nên
              ngày hạnh phúc.
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg;
            }}
            alt="Sweet Moment"
            className="w-full h-[250px] object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -23 }}
            viewport={{ once: false }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.2 }}
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
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl"
        >
          🌿
        </motion.span>
        <div className="text-center">
          <div className="text-[20px] font-wedding font-bold leading-none uppercase">WEDDING</div>
          <div className="text-[12px] font-wedding tracking-widest text-stone-600 uppercase">
            INVITATION
          </div>
        </div>
        <motion.span
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl transform -scale-x-100"
        >
          🌿
        </motion.span>
      </motion.div>
    </section>
  );
};

export default WeddingLoveStoryBanner;

