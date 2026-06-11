/**
 * サイト全体の共有定数。
 * クライアント/サーバー両方から import できるよう "use client" を付けないこと
 * （クライアントモジュールから配列を export するとサーバー側で .map() できず
 *   ビルドエラーになるため、ナビ定義はここに集約する）。
 */

export const ORG_NAME = "NPO法人 奄美大島自然体験活動協議会";
export const ORG_NAME_EN = "NPO Amami Oshima Nature Experience Council";

// TODO: クライアント確認（本番ドメイン確定後に差し替え）
export const SITE_URL = "https://amami-taiken-npo.vercel.app";

export const ORG_DESCRIPTION =
  "世界自然遺産・奄美大島の希少な動植物と固有の生態系の保全、および自然体験活動の普及に取り組む、認定ネイチャーガイドによるエコツアー協議会です。";

export const NAV_LINKS = [
  { href: "/", label: "ホーム", labelEn: "Home" },
  { href: "/about", label: "私たちについて", labelEn: "About" },
  { href: "/tours", label: "体験プログラム", labelEn: "Tours" },
  { href: "/guides", label: "ガイド紹介", labelEn: "Guides" },
  { href: "/access", label: "アクセス", labelEn: "Access" },
  { href: "/contact", label: "お問い合わせ", labelEn: "Contact" },
] as const;

// ダミー連絡先（フッター・アクセスページ共通）
// TODO: クライアント確認（住所・電話・受付時間の実値）
export const CONTACT_INFO = {
  postal: "〒894-0000",
  address: "鹿児島県奄美市名瀬○○町0-0-0",
  tel: "0997-00-0000",
  hours: "9:00〜18:00",
} as const;
