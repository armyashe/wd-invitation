import React from 'react';
import { CalendarQrCard } from '../CalendarQrCard';
import type { BankAccount } from '../../../types/bank.types';

interface WeddingGiftSectionProps {
  bank: BankAccount;
  role: string;
  name: string;
  isCopied: boolean;
  onCopy: () => void;
}

export const WeddingGiftSection: React.FC<WeddingGiftSectionProps> = ({
  bank,
  role,
  name,
  isCopied,
  onCopy,
}) => {
  return (
    <section
      id="hop-qua-mung"
      className="py-8 px-6 bg-gradient-to-b from-white via-rose-50/40 to-white text-center border-t border-slate-100"
    >
      {/* Pill badge */}
      <div className="inline-block bg-[#5e2229] text-white px-7 py-2 rounded-full font-medium text-xs sm:text-sm tracking-widest uppercase shadow-md mb-2">
        Hộp quà mừng
      </div>

      <p className="text-xs text-slate-500 py-2 mb-6 max-w-xs mx-auto">
        Cảm ơn tình cảm và sự chúc phúc chân thành từ bạn dành cho ngày vui của chúng mình!
      </p>

      {/* Calendar Style Frame with QR code duy nhất */}
      <CalendarQrCard
        role={role}
        name={name}
        bankName={bank.bankName}
        accountNumber={bank.accountNumber}
        accountHolder={bank.accountHolder}
        qrUrl={bank.qrUrl}
        copySuccess={isCopied}
        onCopy={onCopy}
      />
    </section>
  );
};

export default WeddingGiftSection;
