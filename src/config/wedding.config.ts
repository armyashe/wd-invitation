import { envConfig } from './env.config';
import type { WeddingConfig, WeddingCouple, WeddingVenue } from '../types/wedding.types';

// Cấu hình sự kiện cưới thống nhất lấy từ envConfig
export const WEDDING_CONFIG: WeddingConfig = {
  targetDate: envConfig.wedding.targetDate,
  title: envConfig.wedding.title,
  dateFormatted: envConfig.wedding.dateFormatted,
  lunarText: envConfig.wedding.lunarText,
};

// Cấu hình địa điểm và bản đồ lấy từ envConfig
export const WEDDING_VENUE: WeddingVenue = {
  name: envConfig.venue.name,
  hall: envConfig.venue.hall,
  address: envConfig.venue.address,
  mapEmbedUrl: envConfig.venue.mapEmbedUrl,
  mapExternalUrl: envConfig.venue.mapExternalUrl,
};

// Nguồn dữ liệu duy nhất cho tên Cô dâu và Chú rể (lấy từ envConfig)
export const WEDDING_COUPLE: WeddingCouple = {
  groom: {
    fullName: envConfig.couple.groom.fullName,
    shortName: envConfig.couple.groom.shortName,
  },
  bride: {
    fullName: envConfig.couple.bride.fullName,
    shortName: envConfig.couple.bride.shortName,
  },
};
