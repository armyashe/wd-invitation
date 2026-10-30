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
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

