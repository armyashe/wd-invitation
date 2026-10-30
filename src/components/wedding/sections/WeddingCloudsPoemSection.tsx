import React from 'react';
import { motion } from 'motion/react';
import {
  bouquetCoupleImg,
  handInHandImg,
  heroLiftImg,
  im07Img,
  im11Img,
  im12Img,
} from '../../../constants/images.constants';

export const WeddingCloudsPoemSection: React.FC = () => {
  return (
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg;
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = handInHandImg;
            }}
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
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = heroLiftImg;
            }}
            alt="Forever"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
          whileInView={{ opacity: 1, rotate: 90, scale: 1 }}
          viewport={{ once: false }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center text-[15px] font-wedding text-stone-900 tracking-widest pl-2"
        >
          <span>FOREVER</span>
          <span>AND</span>
          <span>EVER</span>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingCloudsPoemSection;

