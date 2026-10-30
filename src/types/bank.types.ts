export type BankRecipient = 'groom' | 'bride';

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrUrl: string;
}

export interface BankConfig extends BankAccount {
  recipient: BankRecipient;
}

export interface CalendarQrCardProps {
  role: string;
  name: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrUrl: string;
  copySuccess: boolean;
  onCopy: () => void;
}
