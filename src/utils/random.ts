// ===========================================
// ランダム生成ユーティリティ
// ===========================================

/**
 * 指定範囲のランダムな整数を生成
 * @param min 最小値（含む）
 * @param max 最大値（含む）
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 指定範囲のランダムな小数を生成
 * @param min 最小値（含む）
 * @param max 最大値（含まない）
 * @param decimals 小数点以下の桁数
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
}

/**
 * ランダムな真偽値を生成
 * @param probability trueになる確率（0-1、デフォルト0.5）
 */
export function randomBoolean(probability = 0.5): boolean {
    return Math.random() < probability;
}

/**
 * 配列からランダムに1つ選択
 */
export function randomPick<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    return array[randomInt(0, array.length - 1)];
}

/**
 * 配列からランダムに複数選択（重複なし）
 * @param array 元の配列
 * @param count 選択する数
 */
export function randomPickMultiple<T>(array: T[], count: number): T[] {
    const shuffled = shuffle([...array]);
    return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * 配列をランダムにシャッフル（Fisher-Yates）
 */
export function shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = randomInt(0, i);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * ランダムな文字列を生成
 * @param length 文字列の長さ
 * @param chars 使用する文字セット
 */
export function randomString(
    length: number,
    chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
): string {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomInt(0, chars.length - 1));
    }
    return result;
}

/**
 * ランダムな英数字文字列（小文字）
 */
export function randomAlphanumeric(length: number): string {
    return randomString(length, "abcdefghijklmnopqrstuvwxyz0123456789");
}

/**
 * ランダムな数字文字列
 */
export function randomDigits(length: number): string {
    return randomString(length, "0123456789");
}

/**
 * ランダムな16進数文字列
 */
export function randomHex(length: number): string {
    return randomString(length, "0123456789abcdef");
}

/**
 * ランダムなUUID v4を生成
 */
export function randomUUID(): string {
    // crypto.randomUUIDが使える環境ならそれを使用
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // フォールバック
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * ランダムなスラッグを生成
 * @param length 長さ（デフォルト8）
 */
export function randomSlug(length = 8): string {
    return randomAlphanumeric(length);
}

/**
 * ランダムなトークンを生成（URLセーフ）
 * @param length 長さ（デフォルト32）
 */
export function randomToken(length = 32): string {
    return randomString(length, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
}

/**
 * ランダムな色（HEX形式）
 */
export function randomColor(): string {
    return `#${randomHex(6)}`;
}

/**
 * ランダムなRGB色
 */
export function randomRGB(): { r: number; g: number; b: number } {
    return {
        r: randomInt(0, 255),
        g: randomInt(0, 255),
        b: randomInt(0, 255),
    };
}

/**
 * ランダムなHSL色
 */
export function randomHSL(): { h: number; s: number; l: number } {
    return {
        h: randomInt(0, 360),
        s: randomInt(0, 100),
        l: randomInt(0, 100),
    };
}

/**
 * パステルカラーをランダム生成
 */
export function randomPastelColor(): string {
    const h = randomInt(0, 360);
    return `hsl(${h}, 70%, 80%)`;
}

/**
 * ランダムな日付を生成
 * @param start 開始日
 * @param end 終了日
 */
export function randomDate(start: Date, end: Date): Date {
    const startTime = start.getTime();
    const endTime = end.getTime();
    return new Date(randomInt(startTime, endTime));
}

/**
 * 過去N日以内のランダムな日付
 */
export function randomPastDate(days: number): Date {
    const now = new Date();
    const past = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return randomDate(past, now);
}

/**
 * 未来N日以内のランダムな日付
 */
export function randomFutureDate(days: number): Date {
    const now = new Date();
    const future = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    return randomDate(now, future);
}

/**
 * 重み付きランダム選択
 * @param items 選択肢と重みの配列
 */
export function weightedRandom<T>(items: { value: T; weight: number }[]): T | undefined {
    if (items.length === 0) return undefined;

    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;

    for (const item of items) {
        random -= item.weight;
        if (random <= 0) {
            return item.value;
        }
    }

    return items[items.length - 1].value;
}

/**
 * 確率に基づいてアクションを実行
 * @param probability 確率（0-1）
 * @param action 実行する関数
 */
export function withProbability<T>(probability: number, action: () => T): T | undefined {
    if (Math.random() < probability) {
        return action();
    }
    return undefined;
}

/**
 * ランダムなIPアドレス（v4）
 */
export function randomIPv4(): string {
    return `${randomInt(1, 255)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

/**
 * ランダムなメールアドレス
 */
export function randomEmail(domain = "example.com"): string {
    return `${randomAlphanumeric(8)}@${domain}`;
}

/**
 * ランダムなユーザー名
 */
export function randomUsername(): string {
    const adjectives = ["happy", "clever", "swift", "brave", "calm", "eager", "gentle", "kind"];
    const nouns = ["panda", "tiger", "eagle", "dolphin", "wolf", "fox", "owl", "bear"];
    return `${randomPick(adjectives)}_${randomPick(nouns)}_${randomDigits(4)}`;
}

/**
 * ランダムな日本語名（サンプル）
 */
export function randomJapaneseName(): { firstName: string; lastName: string; full: string } {
    const lastNames = ["田中", "山田", "佐藤", "鈴木", "高橋", "伊藤", "渡辺", "中村", "小林", "加藤"];
    const firstNames = ["太郎", "花子", "一郎", "美咲", "健太", "さくら", "翔太", "結衣", "大輔", "愛"];

    const lastName = randomPick(lastNames) || "田中";
    const firstName = randomPick(firstNames) || "太郎";

    return {
        firstName,
        lastName,
        full: `${lastName} ${firstName}`,
    };
}

/**
 * ランダムな電話番号（日本形式）
 */
export function randomPhoneNumber(): string {
    return `0${randomInt(70, 90)}-${randomDigits(4)}-${randomDigits(4)}`;
}

/**
 * ランダムな郵便番号（日本形式）
 */
export function randomPostalCode(): string {
    return `${randomDigits(3)}-${randomDigits(4)}`;
}
