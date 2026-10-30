import React from 'react';
import { motion } from 'motion/react';
import {
  bouquetCoupleImg,
  handInHandImg,
  im08_v2Img,
} from '../../../constants/images.constants';

export const WeddingBentoStorySection: React.FC = () => {
  return (
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = handInHandImg;
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg;
            }}
            alt="Open arms couple"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        {/* Rotated date 12.06 */}
        <motion.div
          initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
          whileInView={{ opacity: 1, rotate: 90, scale: 1 }}
          viewport={{ once: false }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="whitespace-nowrap text-[17px] font-wedding font-medium text-stone-900 tracking-widest pl-2"
        >
          December 06
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingBentoStorySection;

