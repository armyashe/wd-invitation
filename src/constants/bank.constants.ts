import { envConfig } from '../config/env.config';
import type { BankConfig } from '../types/bank.types';

// Tài khoản ngân hàng duy nhất được cấu hình theo từng Vercel Project
export const weddingBank: BankConfig = {
  recipient: envConfig.bank.recipient,
  bankName: envConfig.bank.bankName,
  accountNumber: envConfig.bank.accountNumber,
  accountHolder: envConfig.bank.accountHolder,
  qrUrl: envConfig.bank.qrUrl,
};
