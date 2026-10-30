/**
 * Tự động lấy số ngày trong tháng (tháng 0-indexed, vd: 11 = Tháng 12)
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Tự động tính thứ của ngày 1 trong tháng (0 = CN, 1 = T2, ..., 6 = T7)
 */
export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/**
 * Tên tháng tiếng Anh hiển thị trên banner (vd: "December 2026")
 */
export function getMonthYearEnglish(date: Date): string {
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

/**
 * Định dạng ngày dạng YYYY.MM.DD (vd: "2026.12.06")
 */
export function formatDateDot(dateInput: Date | string, fallback = '2026.12.06'): string {
  if (!dateInput) return fallback;
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return fallback;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * Định dạng tháng ngày tiếng Anh (vd: "December 06")
 */
export function formatMonthDayEnglish(dateInput: Date | string, fallback = 'December 06'): string {
  if (!dateInput) return fallback;
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return fallback;
  return d.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
}
