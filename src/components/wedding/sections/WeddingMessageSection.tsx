import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { WEDDING_CONFIG } from '../../../config/wedding.config';
import { formatDateDot } from '../../../utils/calendar.utils';

export const WeddingMessageSection: React.FC = () => {
  const displayDateDot = useMemo(
    () => formatDateDot(WEDDING_CONFIG.targetDate),
    []
  );

  return (
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
        {displayDateDot}
      </motion.div>

      <p className="text-[17px] font-wedding font-medium text-stone-900">
        Chúng mình, hẹn gặp nhau trong ngày cưới nhé!
      </p>
    </motion.section>
  );
};

export default WeddingMessageSection;
