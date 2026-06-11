import type { Tour } from "@/types";

/**
 * 体験プログラムデータ（協議会の実際の活動項目に基づく）。
 * ※ 説明文はすべて新規オリジナル。
 * ※ 料金・所要時間・写真は掲載しない方針（ご予約・詳細はお電話で）。
 */
export const tours: Tour[] = [
  {
    slug: "wildlife-watching",
    title: "野生・生物観察体験",
    summary:
      "アマミノクロウサギなど、奄美ならではの希少な生きものを昼夜それぞれの表情で観察します。",
    category: "自然観察",
    timeOfDay: ["昼", "夜"],
    featured: true,
  },
  {
    slug: "sea-kayak-canoe",
    title: "シーカヤック・リバーカヌー体験",
    summary:
      "穏やかな入り江やマングローブの川を、カヤック／カヌーで水面から探検する人気プログラム。",
    category: "海・川",
    timeOfDay: ["昼", "夜"],
    featured: true,
  },
  {
    slug: "river-play",
    title: "川遊び体験",
    summary: "澄んだ清流で、生きものをさがしながら涼やかに過ごす。ご家族にもおすすめです。",
    category: "海・川",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "diving-snorkeling",
    title: "ダイビング・シュノーケリング体験",
    summary: "サンゴ礁と色とりどりの魚たちが待つ、奄美の海の中をのぞいてみる体験。",
    category: "海・川",
    timeOfDay: ["昼"],
    featured: true,
  },
  {
    slug: "tidepool",
    title: "磯遊び体験",
    summary: "潮だまりをのぞけば小さな海の生きものたちのにぎわい。じっくり観察して楽しみます。",
    category: "海・川",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "fishing",
    title: "船釣り・磯釣り体験",
    summary: "奄美の豊かな海で、船からも磯からも。釣りの楽しさと海の恵みを体感します。",
    category: "海・川",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "trekking",
    title: "山歩き（トレッキング）体験",
    summary: "亜熱帯の森を歩き、固有の植物や森の気配を感じる。初心者向けのコースもご用意します。",
    category: "山・森",
    timeOfDay: ["昼"],
    featured: true,
  },
  {
    slug: "island-food",
    title: "島食体験",
    summary: "奄美の特産・地場の食材を自分で採り、味わう。島の暮らしと食文化に触れる体験です。",
    category: "島の文化",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "shima-uta",
    title: "島唄・島踊り・島口・三味線体験",
    summary: "奄美に受け継がれる唄と踊り、島ことばと三味線。土地の文化を体で楽しみます。",
    category: "島の文化",
    timeOfDay: ["昼", "夜"],
    featured: true,
  },
  {
    slug: "town-walk",
    title: "島まち歩き体験",
    summary: "島の歴史や文化、泥染め・機織りなどの手仕事をたどりながら、まちをゆっくり歩きます。",
    category: "島の文化",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "old-trail",
    title: "古道歩き体験",
    summary: "人々が行き交った古い道をたどり、奄美の暮らしの歴史に思いをはせる散策です。",
    category: "山・森",
    timeOfDay: ["昼"],
    featured: false,
  },
  {
    slug: "camp",
    title: "キャンプ体験",
    summary: "自然のなかで一夜を過ごす。星空や夜の音に包まれる、奄美ならではのアウトドア体験。",
    category: "アウトドア",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "island-life",
    title: "島くらし・民泊体験",
    summary: "島の家庭で過ごし、暮らしのリズムを体感する。人とのふれあいが旅の思い出になります。",
    category: "島の文化",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
  {
    slug: "whale-watching",
    title: "ホエールウォッチング体験",
    summary: "冬から春にかけて奄美の海を訪れるクジラに会いに。雄大な姿を船上から見守ります。",
    category: "自然観察",
    timeOfDay: ["昼"],
    featured: true,
  },
  {
    slug: "location-coordinate",
    title: "撮影ロケーションコーディネート",
    summary:
      "撮影全般のロケーション選びから現地手配まで。奄美の自然を知り尽くしたスタッフがサポートします。",
    category: "撮影",
    timeOfDay: ["昼", "夜"],
    featured: false,
  },
];

/** slug から1件取得 */
export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

/** トップページ用のピックアップ（featured のみ） */
export const featuredTours = tours.filter((t) => t.featured);
