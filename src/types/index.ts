// =============================================================
// 共通型定義
// =============================================================

/** 体験プログラム */
export interface Tour {
  /** URL スラッグ（/tours#<slug> や将来の詳細ページ用） */
  slug: string;
  /** プログラム名 */
  title: string;
  /** よみがな（任意） */
  reading?: string;
  /** カード・一覧用の短い説明 */
  summary: string;
  /** 詳細説明（複数段落） */
  description: string[];
  /** カテゴリ（森 / 夜 / 海 / 山 など） */
  category: TourCategory;
  /** 所要時間（ダミー・要クライアント確認） */
  duration: string;
  /** 料金（ダミー・要クライアント確認） */
  price: string;
  /** 対象目安 */
  suitableFor: string;
  /** 定員・参加人数の目安（ダミー・要クライアント確認） */
  capacity: string;
  /** 難易度（1: やさしい 〜 3: 健脚向け） */
  difficulty: 1 | 2 | 3;
  /** ハイライト（箇条書き） */
  highlights: string[];
  /** 画像 alt テキスト */
  imageAlt: string;
  /** Bento Grid 上で大きく見せるか */
  featured?: boolean;
}

export type TourCategory = "森" | "夜" | "海" | "山" | "川" | "観察";

/** 認定ガイド */
export interface Guide {
  slug: string;
  /** 氏名（ダミー・要クライアント確認） */
  name: string;
  /** ローマ字表記（イニシャル生成にも使用） */
  nameEn: string;
  /** 肩書き・専門領域 */
  role: string;
  /** 保有資格（ダミー・要クライアント確認） */
  certifications: string[];
  /** 自己紹介 */
  bio: string;
  /** 得意なプログラム（Tour.slug を参照） */
  specialties: string[];
  /** ガイド歴（年・ダミー） */
  yearsActive: number;
}

/** 実績カウンター */
export interface Stat {
  label: string;
  value: number;
  suffix: string;
  /** 補足（任意） */
  note?: string;
}

/** 参加者の声 */
export interface Testimonial {
  /** 表示名（イニシャル等・ダミー） */
  author: string;
  /** 属性（年代・地域など・ダミー） */
  meta: string;
  /** 参加プログラム名 */
  tourTitle: string;
  /** 本文 */
  body: string;
}
