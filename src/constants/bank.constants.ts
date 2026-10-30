import { envConfig } from '../config/env.config';
import { defaultGroomQrImg } from './images.constants';
import type { BankAccount } from '../types/bank.types';

export const groomBank: BankAccount = {
  bankName: envConfig.groom.bankName,
  accountNumber: envConfig.groom.accountNumber,
  accountHolder: envConfig.groom.accountHolder,
  qrUrl: envConfig.groom.qrUrl || defaultGroomQrImg,
};

export const brideBank: BankAccount = {
  bankName: envConfig.bride.bankName,
  accountNumber: envConfig.bride.accountNumber,
  accountHolder: envConfig.bride.accountHolder,
  qrUrl: envConfig.bride.qrUrl,
};

