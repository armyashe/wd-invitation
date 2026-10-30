import React from 'react';
import { CalendarQrCard } from './CalendarQrCard';
import type { BankAccount } from '../../types/bank.types';

interface WeddingGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  brideBank: BankAccount;
  brideName?: string;
  isCopied: boolean;
  onCopy: () => void;
}

export const WeddingGiftModal: React.FC<WeddingGiftModalProps> = ({
  isOpen,
  onClose,
  brideBank,
  brideName = 'Nguyễn Ngân',
  isCopied,
  onCopy,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center animate-fade-rise max-h-[92vh] overflow-y-auto"
      >
        <div className="inline-block bg-[#5e2229] text-white px-6 py-1.5 rounded-full font-medium text-xs tracking-widest uppercase shadow-md mb-2">
          Hộp quà mừng
        </div>

        {/* Calendar Qr Card in Modal */}
        <div className="mt-4">
          <CalendarQrCard
            role="Cô dâu"
            name={brideName}
            bankName={brideBank.bankName}
            accountNumber={brideBank.accountNumber}
            accountHolder={brideBank.accountHolder}
            qrUrl={brideBank.qrUrl}
            copySuccess={isCopied}
            onCopy={onCopy}
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition active:scale-98"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default WeddingGiftModal;

