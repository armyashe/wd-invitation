import React from 'react';
import { motion } from 'motion/react';
import {
  bouquetCoupleImg,
  heroLiftImg,
  im09Img,
  im15Img,
} from '../../../constants/images.constants';

export const WeddingStoryGridSection: React.FC = () => {
  return (
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = heroLiftImg;
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg;
            }}
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
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
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
  );
};

export default WeddingStoryGridSection;

