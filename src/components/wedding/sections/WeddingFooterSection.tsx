import React from 'react';
import { motion } from 'motion/react';
import { THANK_YOU_ILLUSTRATION_URL } from '../../../constants/images.constants';

export const WeddingFooterSection: React.FC = () => {
  return (
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
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          src={THANK_YOU_ILLUSTRATION_URL}
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
  );
};

export default WeddingFooterSection;

