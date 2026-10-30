import type { WeddingConfig } from '../types/wedding.types';

export const WEDDING_CONFIG: WeddingConfig = {
  targetDate: '2026-12-06T18:00:00',
  title: 'TIỆC MỪNG TÂN HÔN',
  dateFormatted: 'Chủ Nhật, 06.12.2026',
  lunarText: 'Âm lịch 28 tháng 10 Năm Bính Ngọ | Lúc 18:00 PM',
};

export const WEDDING_VENUE = {
  name: 'Trung tâm hội nghị - tiệc cưới Venus Luxury',
  hall: 'Sảnh Hera - Tầng 3',
  address: '117-117A Lê Trọng Tấn, Phường Tân Sơn Nhì, Tp.Hồ Chí Minh',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304.81331853410717!2d106.62866087489543!3d10.805836191844557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bd46f658857%3A0x227ecfc8312d0652!2sVenus%20Luxury!5e0!3m2!1svi!2s!4v1791820132975!5m2!1svi!2s',
  mapExternalUrl: 'https://maps.app.goo.gl/2L7GnDmhZpZwSK929',
} as const;

export const WEDDING_COUPLE = {
  groom: {
    fullName: 'Nhật Long',
    shortName: 'Long',
  },
  bride: {
    fullName: 'Nguyễn Ngân',
    shortName: 'Ngân',
    modalName: 'Ngan',
  },
} as const;

