// =============================================================
// 共通型定義
// =============================================================

/** 体験プログラムのカテゴリ */
export type TourCategory =
  | "自然観察"
  | "海・川"
  | "山・森"
  | "島の文化"
  | "アウトドア"
  | "撮影";

/** 開催時間帯 */
export type TimeOfDay = "昼" | "夜";

/** 体験プログラム（料金・写真は扱わない方針） */
export interface Tour {
  /** 資料（活動内容一覧）と同じ通し番号（1〜15） */
  no: number;
  /** URL スラッグ（/tours#<slug> 用） */
  slug: string;
  /** プログラム名 */
  title: string;
  /** カード用の1行説明 */
  summary: string;
  /** カテゴリ */
  category: TourCategory;
  /** 開催時間帯（昼／夜） */
  timeOfDay: TimeOfDay[];
  /** トップページのピックアップに出すか */
  featured?: boolean;
}
