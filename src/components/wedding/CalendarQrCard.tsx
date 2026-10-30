import React from 'react';
import type { CalendarQrCardProps } from '../../types/bank.types';

export const CalendarQrCard: React.FC<CalendarQrCardProps> = ({
  role,
  name,
  bankName,
  accountNumber,
  accountHolder,
  qrUrl,
  copySuccess,
  onCopy,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border border-rose-100 max-w-xs mx-auto text-center">
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-rose-50">
        <span className="text-xs uppercase font-bold text-[#5e2229] tracking-wider">
          {role}: {name}
        </span>
        {bankName && (
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            {bankName}
          </span>
        )}
      </div>

      <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100 flex justify-center items-center my-3 shadow-inner min-h-[176px]">
        {qrUrl ? (
          <img
            src={qrUrl}
            alt={`Mã QR ${accountHolder}`}
            className="w-44 h-44 object-contain rounded-lg drop-shadow-sm"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).alt = 'QR Code';
            }}
          />
        ) : (
          <div className="w-44 h-44 flex flex-col items-center justify-center text-xs text-stone-400 bg-stone-100/80 rounded-lg p-2">
            <span>[Chưa cập nhật mã QR]</span>
          </div>
        )}
      </div>

      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
        Chủ tài khoản
      </div>
      <div className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-1 font-wedding">
        {accountHolder || '[Chưa cập nhật]'}
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        <span className="font-mono text-xs sm:text-[13.5px] text-slate-700 font-normal">
          {bankName ? `${bankName} - ` : ''}{accountNumber || '[Chưa cập nhật số tài khoản]'}
        </span>
        {accountNumber && (
          <button
            type="button"
            onClick={onCopy}
            className={`text-xs px-2.5 py-0.5 rounded-md font-medium transition active:scale-95 border shrink-0 ${
              copySuccess
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-[#fff1f2] text-[#be123c] border-[#fecdd3] hover:bg-rose-100'
            }`}
          >
            {copySuccess ? 'Đã sao chép' : 'Sao chép'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CalendarQrCard;
