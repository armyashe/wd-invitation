import { getImageUrl, getWeddingAssetUrl } from '../services/supabase.service';

// Audio asset
export const WEDDING_AUDIO_URL = getWeddingAssetUrl('music-vay-cuoi-erik.mp3');

// Hero background video
export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4';

// Thank you illustration
export const THANK_YOU_ILLUSTRATION_URL =
  'https://assets.cinelove.me/resources/characters/2pln23imlphtxz5q16j3mc.png';

// Wedding photos from Supabase Storage
export const heroLiftImg = getImageUrl('IM01.jpg');
export const bouquetCoupleImg = getImageUrl('IM02.jpg');
export const handInHandImg = getImageUrl('IM03.jpg');
export const im03_v2Img = getImageUrl('IM03-v2.jpg');
export const im04_v2Img = getImageUrl('IM04-v2.jpg');
export const im04Img = getImageUrl('IM04.jpg');
export const im05Img = getImageUrl('IM05.jpg');
export const im06Img = getImageUrl('IM06.jpg');
export const im07Img = getImageUrl('IM07.jpg');
export const im08Img = getImageUrl('IM08.jpg');
export const im08_v2Img = getImageUrl('IM08-v2.jpg');
export const im09Img = getImageUrl('IM09.jpg');
export const im10Img = getImageUrl('IM10.jpg');
export const im11Img = getImageUrl('IM11.jpg');
export const im12Img = getImageUrl('IM12.jpg');
export const im13Img = getImageUrl('IM13.jpg');
export const im14Img = getImageUrl('IM14.jpg');
export const im15Img = getImageUrl('IM15.jpg');
export const im16_v2Img = getImageUrl('IM16-v2.jpg');
export const im17Img = getImageUrl('IM17.jpg');
export const defaultGroomQrImg = getImageUrl('QR-grom.jpg');

// Preloaded wedding gallery
export const weddingImages: string[] = [
  im04_v2Img,
  im04Img,
  im06Img,
  im07Img,
  im08Img,
  im09Img,
  im10Img,
  im13Img,
  im14Img,
  im15Img,
];

