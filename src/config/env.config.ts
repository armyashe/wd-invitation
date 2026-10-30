import type { BankRecipient } from '../types/bank.types';

// Validate các biến môi trường bắt buộc của sự kiện cưới & ngân hàng
function validateEnvironment(): void {
  const missingWeddingVars: string[] = [];
  const missingBankVars: string[] = [];
  const missingCoupleVars: string[] = [];

  // Kiểm tra biến sự kiện cưới
  if (!import.meta.env.VITE_WEDDING_TARGET_DATE) missingWeddingVars.push('VITE_WEDDING_TARGET_DATE');
  if (!import.meta.env.VITE_WEDDING_TITLE) missingWeddingVars.push('VITE_WEDDING_TITLE');
  if (!import.meta.env.VITE_WEDDING_DATE_FORMATTED) missingWeddingVars.push('VITE_WEDDING_DATE_FORMATTED');
  if (!import.meta.env.VITE_WEDDING_VENUE_NAME) missingWeddingVars.push('VITE_WEDDING_VENUE_NAME');
  if (!import.meta.env.VITE_WEDDING_VENUE_ADDRESS) missingWeddingVars.push('VITE_WEDDING_VENUE_ADDRESS');

  // Kiểm tra biến tài khoản ngân hàng mừng cưới
  if (!import.meta.env.VITE_BANK_NAME) missingBankVars.push('VITE_BANK_NAME');
  if (!import.meta.env.VITE_BANK_ACCOUNT_NUMBER) missingBankVars.push('VITE_BANK_ACCOUNT_NUMBER');
  if (!import.meta.env.VITE_BANK_ACCOUNT_HOLDER) missingBankVars.push('VITE_BANK_ACCOUNT_HOLDER');
  if (!import.meta.env.VITE_BANK_QR_URL) missingBankVars.push('VITE_BANK_QR_URL');

  // Kiểm tra biến thông tin cô dâu và chú rể
  if (!import.meta.env.VITE_GROOM_FULL_NAME) missingCoupleVars.push('VITE_GROOM_FULL_NAME');
  if (!import.meta.env.VITE_GROOM_SHORT_NAME) missingCoupleVars.push('VITE_GROOM_SHORT_NAME');
  if (!import.meta.env.VITE_BRIDE_FULL_NAME) missingCoupleVars.push('VITE_BRIDE_FULL_NAME');
  if (!import.meta.env.VITE_BRIDE_SHORT_NAME) missingCoupleVars.push('VITE_BRIDE_SHORT_NAME');

  if (missingWeddingVars.length > 0) {
    console.error(
      `[WeddingConfig Error] Thiếu các biến môi trường cấu hình tiệc cưới: ${missingWeddingVars.join(
        ', '
      )}.\nVui lòng thiết lập trong .env.local hoặc Vercel Project Environment Variables.`
    );
  }

  if (missingBankVars.length > 0) {
    console.error(
      `[BankConfig Error] Thiếu các biến môi trường cấu hình tài khoản mừng cưới: ${missingBankVars.join(
        ', '
      )}.\nVui lòng thiết lập trong .env.local hoặc Vercel Project Environment Variables để hiển thị chính xác thông tin chuyển khoản.`
    );
  }

  if (missingCoupleVars.length > 0) {
    console.error(
      `[CoupleConfig Error] Thiếu các biến môi trường cấu hình tên cô dâu & chú rể: ${missingCoupleVars.join(
        ', '
      )}.\nVui lòng thiết lập trong .env.local hoặc Vercel Project Environment Variables.`
    );
  }
}

validateEnvironment();

const rawRecipient = (import.meta.env.VITE_BANK_RECIPIENT || 'groom').trim().toLowerCase();
const bankRecipient: BankRecipient = rawRecipient === 'bride' ? 'bride' : 'groom';

export const envConfig = {
  // Cấu hình thông tin cô dâu và chú rể
  couple: {
    groom: {
      fullName: import.meta.env.VITE_GROOM_FULL_NAME || '',
      shortName: import.meta.env.VITE_GROOM_SHORT_NAME || '',
    },
    bride: {
      fullName: import.meta.env.VITE_BRIDE_FULL_NAME || '',
      shortName: import.meta.env.VITE_BRIDE_SHORT_NAME || '',
    },
  },

  // Cấu hình sự kiện cưới thống nhất (được cấu hình riêng biệt trên từng Vercel Project)
  wedding: {
    targetDate: import.meta.env.VITE_WEDDING_TARGET_DATE || '',
    title: import.meta.env.VITE_WEDDING_TITLE || '[Chưa cấu hình tiêu đề lễ cưới]',
    dateFormatted: import.meta.env.VITE_WEDDING_DATE_FORMATTED || '[Chưa cấu hình ngày cưới]',
    lunarText: import.meta.env.VITE_WEDDING_LUNAR_TEXT || '',
  },

  // Địa điểm tổ chức & bản đồ
  venue: {
    name: import.meta.env.VITE_WEDDING_VENUE_NAME || '[Chưa cấu hình tên địa điểm]',
    hall: import.meta.env.VITE_WEDDING_VENUE_HALL || '',
    address: import.meta.env.VITE_WEDDING_VENUE_ADDRESS || '[Chưa cấu hình địa chỉ]',
    mapEmbedUrl: import.meta.env.VITE_WEDDING_MAP_EMBED_URL || '',
    mapExternalUrl: import.meta.env.VITE_WEDDING_MAP_EXTERNAL_URL || '',
  },

  // Supabase Configuration
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  },

  // Cấu hình duy nhất một tài khoản ngân hàng mừng cưới cho từng Vercel Project
  // Không fallback sang tài khoản của bên còn lại hoặc ảnh QR mặc định
  bank: {
    recipient: bankRecipient,
    bankName: import.meta.env.VITE_BANK_NAME || '',
    accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '',
    accountHolder: import.meta.env.VITE_BANK_ACCOUNT_HOLDER || '',
    qrUrl: import.meta.env.VITE_BANK_QR_URL || '',
  },
} as const;
