// ===========================================
// 日付ユーティリティ関数
// ===========================================

/**
 * 日付を「YYYY-MM-DD」形式でフォーマット
 */
export function formatDate(date: Date | string | number): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

/**
 * 日付を「YYYY/MM/DD」形式でフォーマット
 */
export function formatDateSlash(date: Date | string | number): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
}

/**
 * 日付を「YYYY年MM月DD日」形式でフォーマット
 */
export function formatDateJapanese(date: Date | string | number): string {
    const d = new Date(date);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

/**
 * 日付を「MM/DD HH:mm」形式でフォーマット（Yahoo News風）
 */
export function formatDateShort(date: Date | string | number): string {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hours}:${minutes}`;
}

/**
 * 日付を「M月D日(曜日)」形式でフォーマット
 */
export function formatDateWithDay(date: Date | string | number): string {
    const d = new Date(date);
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getMonth() + 1}月${d.getDate()}日(${days[d.getDay()]})`;
}

/**
 * 日時を「YYYY-MM-DD HH:mm:ss」形式でフォーマット
 */
export function formatDateTime(date: Date | string | number): string {
    const d = new Date(date);
    const datePart = formatDate(d);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${datePart} ${hours}:${minutes}:${seconds}`;
}

/**
 * 時刻を「HH:mm」形式でフォーマット
 */
export function formatTime(date: Date | string | number): string {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

/**
 * 時刻を「HH:mm:ss」形式でフォーマット
 */
export function formatTimeFull(date: Date | string | number): string {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * 相対時間を表示（〜前、〜後）
 */
export function timeAgo(date: Date | string | number): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffSec < 0) {
        // 未来の日付
        return timeUntil(date);
    }

    if (diffSec < 60) return "たった今";
    if (diffMin < 60) return `${diffMin}分前`;
    if (diffHour < 24) return `${diffHour}時間前`;
    if (diffDay < 7) return `${diffDay}日前`;
    if (diffWeek < 4) return `${diffWeek}週間前`;
    if (diffMonth < 12) return `${diffMonth}ヶ月前`;
    return `${diffYear}年前`;
}

/**
 * 未来までの相対時間（〜後）
 */
export function timeUntil(date: Date | string | number): string {
    const now = new Date();
    const d = new Date(date);
    const diffMs = d.getTime() - now.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 0) return timeAgo(date);
    if (diffSec < 60) return "まもなく";
    if (diffMin < 60) return `${diffMin}分後`;
    if (diffHour < 24) return `${diffHour}時間後`;
    return `${diffDay}日後`;
}

/**
 * 今日かどうか
 */
export function isToday(date: Date | string | number): boolean {
    const d = new Date(date);
    const today = new Date();
    return (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
    );
}

/**
 * 昨日かどうか
 */
export function isYesterday(date: Date | string | number): boolean {
    const d = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        d.getFullYear() === yesterday.getFullYear() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getDate() === yesterday.getDate()
    );
}

/**
 * 明日かどうか
 */
export function isTomorrow(date: Date | string | number): boolean {
    const d = new Date(date);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
        d.getFullYear() === tomorrow.getFullYear() &&
        d.getMonth() === tomorrow.getMonth() &&
        d.getDate() === tomorrow.getDate()
    );
}

/**
 * 今週かどうか
 */
export function isThisWeek(date: Date | string | number): boolean {
    const d = new Date(date);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    return d >= startOfWeek && d < endOfWeek;
}

/**
 * 今月かどうか
 */
export function isThisMonth(date: Date | string | number): boolean {
    const d = new Date(date);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

/**
 * 今年かどうか
 */
export function isThisYear(date: Date | string | number): boolean {
    const d = new Date(date);
    const now = new Date();
    return d.getFullYear() === now.getFullYear();
}

/**
 * 過去かどうか
 */
export function isPast(date: Date | string | number): boolean {
    return new Date(date).getTime() < Date.now();
}

/**
 * 未来かどうか
 */
export function isFuture(date: Date | string | number): boolean {
    return new Date(date).getTime() > Date.now();
}

/**
 * 2つの日付が同じ日かどうか
 */
export function isSameDay(date1: Date | string | number, date2: Date | string | number): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

/**
 * 日数を加算
 */
export function addDays(date: Date | string | number, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

/**
 * 月を加算
 */
export function addMonths(date: Date | string | number, months: number): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

/**
 * 年を加算
 */
export function addYears(date: Date | string | number, years: number): Date {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d;
}

/**
 * 時間を加算
 */
export function addHours(date: Date | string | number, hours: number): Date {
    const d = new Date(date);
    d.setHours(d.getHours() + hours);
    return d;
}

/**
 * 分を加算
 */
export function addMinutes(date: Date | string | number, minutes: number): Date {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() + minutes);
    return d;
}

/**
 * 2つの日付の差（日数）
 */
export function diffDays(date1: Date | string | number, date2: Date | string | number): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * 2つの日付の差（時間）
 */
export function diffHours(date1: Date | string | number, date2: Date | string | number): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(diffMs / (1000 * 60 * 60));
}

/**
 * 2つの日付の差（分）
 */
export function diffMinutes(date1: Date | string | number, date2: Date | string | number): number {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffMs = Math.abs(d1.getTime() - d2.getTime());
    return Math.floor(diffMs / (1000 * 60));
}

/**
 * その日の開始時刻（00:00:00）
 */
export function startOfDay(date: Date | string | number): Date {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * その日の終了時刻（23:59:59.999）
 */
export function endOfDay(date: Date | string | number): Date {
    const d = new Date(date);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * その月の開始日
 */
export function startOfMonth(date: Date | string | number): Date {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * その月の終了日
 */
export function endOfMonth(date: Date | string | number): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1, 0);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * その年の開始日
 */
export function startOfYear(date: Date | string | number): Date {
    const d = new Date(date);
    d.setMonth(0, 1);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * その年の終了日
 */
export function endOfYear(date: Date | string | number): Date {
    const d = new Date(date);
    d.setMonth(11, 31);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * うるう年かどうか
 */
export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * その月の日数を取得
 */
export function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * 曜日を取得（日本語）
 */
export function getDayOfWeek(date: Date | string | number): string {
    const days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    return days[new Date(date).getDay()];
}

/**
 * 曜日を取得（短縮形）
 */
export function getDayOfWeekShort(date: Date | string | number): string {
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return days[new Date(date).getDay()];
}

/**
 * 週末かどうか
 */
export function isWeekend(date: Date | string | number): boolean {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
}

/**
 * 平日かどうか
 */
export function isWeekday(date: Date | string | number): boolean {
    return !isWeekend(date);
}

/**
 * 年齢を計算
 */
export function calculateAge(birthDate: Date | string | number): number {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

/**
 * ISO文字列をDate型に変換
 */
export function parseISO(isoString: string): Date {
    return new Date(isoString);
}

/**
 * UNIXタイムスタンプ（秒）をDate型に変換
 */
export function fromUnixTime(timestamp: number): Date {
    return new Date(timestamp * 1000);
}

/**
 * Date型をUNIXタイムスタンプ（秒）に変換
 */
export function toUnixTime(date: Date | string | number): number {
    return Math.floor(new Date(date).getTime() / 1000);
}

/**
 * 日付が有効かどうか
 */
export function isValidDate(date: unknown): boolean {
    if (date instanceof Date) {
        return !isNaN(date.getTime());
    }
    if (typeof date === "string" || typeof date === "number") {
        const d = new Date(date);
        return !isNaN(d.getTime());
    }
    return false;
}

/**
 * 日付の範囲内かどうか
 */
export function isWithinRange(
    date: Date | string | number,
    start: Date | string | number,
    end: Date | string | number
): boolean {
    const d = new Date(date).getTime();
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    return d >= s && d <= e;
}

/**
 * 2つの日付の間の日付リストを取得
 */
export function getDatesBetween(
    start: Date | string | number,
    end: Date | string | number
): Date[] {
    const dates: Date[] = [];
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }

    return dates;
}
