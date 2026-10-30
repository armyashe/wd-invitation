import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { bouquetCoupleImg, im16_v2Img } from '../../../constants/images.constants';
import { WEEKDAYS } from '../../../constants/calendar.constants';
import { WEDDING_CONFIG } from '../../../config/wedding.config';
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  getMonthYearEnglish,
} from '../../../utils/calendar.utils';
import type { TimeLeft } from '../../../types/countdown.types';

interface WeddingCalendarSectionProps {
  timeLeft: TimeLeft;
}

export const WeddingCalendarSection: React.FC<WeddingCalendarSectionProps> = ({ timeLeft }) => {
  const weddingDate = useMemo(() => new Date(WEDDING_CONFIG.targetDate), []);
  const weddingYear = weddingDate.getFullYear();
  const weddingMonth = weddingDate.getMonth();
  const weddingDay = weddingDate.getDate();

  const daysInMonth = useMemo(() => {
    return getDaysInMonth(weddingYear, weddingMonth);
  }, [weddingYear, weddingMonth]);

  const firstDayOfWeek = useMemo(() => {
    return getFirstDayOfWeek(weddingYear, weddingMonth);
  }, [weddingYear, weddingMonth]);

  const monthYearEnglish = useMemo(() => {
    return getMonthYearEnglish(weddingDate);
  }, [weddingDate]);

  return (
    <section className="relative w-full bg-white pt-2">
      {/* Forehead touching photo with calendar glass card */}
      <div className="relative h-[750px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2 }}
          src={im16_v2Img}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = bouquetCoupleImg;
          }}
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
          <span className="font-bold">L&amp;N</span>
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
                className={`py-1 text-xs font-semibold tracking-wider ${
                  dow === 'CN' ? 'text-rose-300 font-bold' : 'text-white/80'
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
            { val: timeLeft.seconds, label: 'giây' },
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
  );
};

export default WeddingCalendarSection;

