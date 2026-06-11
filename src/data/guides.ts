import type { Guide } from "@/types";

/**
 * 認定ガイドデータ
 * ※ 氏名・資格・ガイド歴はすべてダミー値。実値はクライアント確認のうえ差し替えること。
 * ※ 顔写真は使用せず、イニシャル＋グラデーションのアバターで表示（実写真は要差し替え）。
 *    {/* TODO: クライアント確認 *​/} は guides ページ JSX に記載。
 */
export const guides: Guide[] = [
  {
    slug: "guide-mori",
    name: "森田 ひかる",
    nameEn: "Hikaru Morita",
    role: "代表ガイド / 森林・植生担当",
    certifications: ["環境省 認定エコツアーガイド", "森林インストラクター"],
    bio: "奄美の森に魅せられて移住し、20年以上ガイドを続けています。「気づく楽しさ」を大切に、立ち止まって森を眺める時間をご案内します。",
    specialties: ["kinsakubaru", "yuwandake"],
    yearsActive: 22,
  },
  {
    slug: "guide-yoru",
    name: "夜久 さとし",
    nameEn: "Satoshi Yaku",
    role: "ナイトツアー / 動物観察担当",
    certifications: ["認定ネイチャーガイド", "救急救命講習 修了"],
    bio: "夜行性動物の生態に詳しく、観察マナーの普及にも力を注いでいます。希少動物との出会いを、動物に負担をかけない形でお届けします。",
    specialties: ["night-tour", "birdwatching"],
    yearsActive: 15,
  },
  {
    slug: "guide-umi",
    name: "海野 なぎさ",
    nameEn: "Nagisa Umino",
    role: "カヌー / 水辺の自然担当",
    certifications: ["カヌー安全指導員", "認定ネイチャーガイド"],
    bio: "マングローブと干潟が大好き。潮の満ち引きと生きもののつながりを、カヌーの上から楽しく解説します。お子さま連れも大歓迎です。",
    specialties: ["mangrove-canoe", "waterfall"],
    yearsActive: 11,
  },
  {
    slug: "guide-tani",
    name: "谷川 れん",
    nameEn: "Ren Tanigawa",
    role: "沢・トレッキング / 安全管理担当",
    certifications: ["山岳ガイド", "気象予報の基礎研修 修了"],
    bio: "沢歩きと山のプログラムを担当。天候とルートの安全管理を徹底し、はじめての方でも安心して自然に挑戦できる一日を組み立てます。",
    specialties: ["waterfall", "yuwandake"],
    yearsActive: 9,
  },
];

/** slug から1件取得 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** イニシャル（アバター表示用） */
export function getInitials(nameEn: string): string {
  return nameEn
    .split(" ")
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 2);
}
