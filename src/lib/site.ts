/**
 * サイト全体の共有定数。
 * クライアント/サーバー両方から import できるよう "use client" を付けないこと。
 */

// 表示用の短縮名
export const ORG_NAME = "NPO法人 奄美大島自然体験活動協議会";
// 正式名称（登記名）
export const ORG_NAME_FULL = "特定非営利活動法人 奄美大島自然体験活動協議会";
export const ORG_NAME_EN = "Amami Oshima Nature Experience Council";

// 代表者（理事長）
export const REPRESENTATIVE = "久保 公";

export const SITE_URL = "https://amamitaiken.com";

/**
 * 検索エンジンのインデックス許可フラグ（ビルド時に確定）。
 * 本番ビルド（npm run cf:build:production）だけが CF_ENV=production と
 * NEXT_PUBLIC_ALLOW_INDEX=true を渡す。それ以外のビルドは noindex。
 */
export const allowIndex =
  (process.env.CF_ENV === "production" || process.env.VERCEL_ENV === "production") &&
  process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

export const ORG_DESCRIPTION =
  "世界自然遺産・奄美大島の希少な動植物と固有の生態系を守りながら、自然体験活動を通じてその魅力を伝える特定非営利活動法人です。認定ガイドが森・川・海・島の文化まで多彩な体験をご案内します。";

export const NAV_LINKS = [
  { href: "/", label: "ホーム", labelEn: "Home", labelKey: "home" as const },
  { href: "/about", label: "私たちについて", labelEn: "About", labelKey: "about" as const },
  { href: "/tours", label: "体験プログラム", labelEn: "Tours", labelKey: "tours" as const },
  { href: "/access", label: "アクセス", labelEn: "Access", labelKey: "access" as const },
  { href: "/contact", label: "お問い合わせ・予約", labelEn: "Contact", labelKey: "contact" as const },
] as const;

// 団体の基本情報（実データ）
export const CONTACT_INFO = {
  postal: "〒894-1201",
  address: "鹿児島県奄美市住用町大字役勝7番地",
  tel: "0997-69-2189",
  email: "mangrove@amami-taiken.com",
  hours: "9:00〜18:00（年中無休）",
  established: "平成30年3月26日",
} as const;

// 電話発信用（tel: リンク）
export const TEL_HREF = `tel:${CONTACT_INFO.tel.replace(/-/g, "")}`;
export const MAIL_HREF = `mailto:${CONTACT_INFO.email}`;
