import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import {
  handInHandImg,
  heroLiftImg,
  im05Img,
  im17Img,
} from '../../../constants/images.constants';
import { WEDDING_VENUE } from '../../../config/wedding.config';

export const WeddingVenueSection: React.FC = () => {
  const hasHall = Boolean(WEDDING_VENUE.hall?.trim());

  return (
    <section className="px-6 py-6 bg-white space-y-4">
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.75 }}
        className="font-wedding text-[15px] text-center leading-relaxed text-stone-800"
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
        {WEDDING_VENUE.mapEmbedUrl ? (
          <iframe
            title="Địa điểm tiệc cưới"
            width="100%"
            height="100%"
            frameBorder="0"
            src={WEDDING_VENUE.mapEmbedUrl}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4 text-center">
            <span className="text-sm font-medium">[Bản đồ đang được cập nhật]</span>
          </div>
        )}

        {WEDDING_VENUE.mapExternalUrl ? (
          <a
            href={WEDDING_VENUE.mapExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 left-2 bg-white/90 px-3 py-1.5 rounded shadow text-xs font-semibold text-blue-600 flex items-center gap-1 hover:bg-white transition-colors"
          >
            <span>Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : null}
      </motion.div>

      <div className="text-center py-2">
        <h4 className="text-[20px] font-wedding font-semibold text-stone-800">
          {WEDDING_VENUE.name}
        </h4>
        <p className="text-m font-bold font-wedding text-stone-500 mt-0.5">
          {hasHall && (
            <>
              {WEDDING_VENUE.hall?.trim()}
              <br />
            </>
          )}
          {WEDDING_VENUE.address}
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
          src={im05Img}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = handInHandImg;
          }}
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
          src={im17Img}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = heroLiftImg;
          }}
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
            className="font-script text-[52px] text-white drop-shadow-lg block leading-tight"
          >
            We’re meant to
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.85, delay: 0.3 }}
            className="font-script text-[50px] text-white drop-shadow-lg block leading-tight -mt-4"
          >
            be together
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default WeddingVenueSection;
