export const envConfig = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    publishableKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  },
  groom: {
    name: import.meta.env.VITE_GROOM_NAME || 'Nhật Long',
    bankName: import.meta.env.VITE_GROOM_BANK_NAME || '',
    accountNumber: import.meta.env.VITE_GROOM_ACCOUNT_NUMBER || '',
    accountHolder: import.meta.env.VITE_GROOM_ACCOUNT_HOLDER || '',
    qrUrl: import.meta.env.VITE_GROOM_QR_URL || '',
  },
  bride: {
    name: import.meta.env.VITE_BRIDE_NAME || 'Nguyễn Ngân',
    bankName: import.meta.env.VITE_BRIDE_BANK_NAME || '',
    accountNumber: import.meta.env.VITE_BRIDE_ACCOUNT_NUMBER || '',
    accountHolder: import.meta.env.VITE_BRIDE_ACCOUNT_HOLDER || '',
    qrUrl: import.meta.env.VITE_BRIDE_QR_URL || '',
  },
} as const;

