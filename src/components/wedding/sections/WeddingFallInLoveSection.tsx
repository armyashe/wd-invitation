import React from 'react';
import { motion } from 'motion/react';
import { heroLiftImg, im06Img } from '../../../constants/images.constants';

export const WeddingFallInLoveSection: React.FC = () => {
  return (
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
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
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
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = heroLiftImg;
          }}
          alt="Deep Embrace"
          className="w-full h-[565px] object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Elegant Calligraphy text overlapping bottom */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="inset-x-0 mx-auto text-center px-4 flex flex-col items-center space-y-1.5"
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
  );
};

export default WeddingFallInLoveSection;

