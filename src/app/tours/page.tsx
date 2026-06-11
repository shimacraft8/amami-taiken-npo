import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ToursExplorer } from "@/components/ToursExplorer";
import { tours } from "@/data/tours";
import { CONTACT_INFO, ORG_NAME_FULL, SITE_URL, TEL_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "体験プログラム",
  description:
    "野生・生物観察、シーカヤック・リバーカヌー、川遊び、ダイビング、トレッキング、島唄・三味線、ホエールウォッチングなど。奄美大島の自然と文化を体験できる多彩なプログラム。",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "体験プログラム",
    description:
      "森・川・海・島の文化まで。奄美大島の自然を楽しむ多彩な体験プログラムのご案内。",
    url: `${SITE_URL}/tours`,
  },
};

// 構造化データ：各プログラム（schema.org/TouristTrip）
const toursJsonLd = {
  "@context": "https://schema.org",
  "@graph": tours.map((tour) => ({
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    url: `${SITE_URL}/tours#${tour.slug}`,
    provider: {
      "@type": "NGO",
      name: ORG_NAME_FULL,
      url: SITE_URL,
      telephone: CONTACT_INFO.tel,
    },
    itinerary: {
      "@type": "Place",
      name: "奄美大島",
      address: {
        "@type": "PostalAddress",
        addressRegion: "鹿児島県",
        addressLocality: "奄美市",
      },
    },
  })),
} as const;

export default function ToursPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursJsonLd) }}
      />
      <PageHeader
        eyebrow="Experience Programs"
        title="体験プログラム"
        lead="自然観察から海・川あそび、山歩き、島の文化体験まで。奄美の魅力を多彩なかたちでご案内します。"
        tone="forest"
      />

      {/* 予約方法の案内 */}
      <section className="mx-auto max-w-content px-5 pt-12 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-text-muted">
              ご予約・お申し込みは<span className="font-medium text-text">お電話</span>で承ります。
              内容・所要時間・料金など、お気軽にお問い合わせください。
            </p>
            <a
              href={TEL_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <Phone size={15} aria-hidden />
              {CONTACT_INFO.tel}
            </a>
          </div>
        </Reveal>
      </section>

      {/* 一覧（フィルタ付き） */}
      <section className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
        <ToursExplorer />
      </section>

      {/* 注記 */}
      <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
        <p className="text-center text-xs text-text-muted">
          ※ 各プログラムは天候・季節・潮位などにより、内容や開催時間が変わる場合があります。
          催行状況はお電話でご確認ください。
        </p>
      </section>
    </>
  );
}
