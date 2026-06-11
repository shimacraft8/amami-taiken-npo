import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ToursExplorer } from "@/components/ToursExplorer";
import { tours } from "@/data/tours";
import { ORG_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "体験プログラム",
  description:
    "金作原原生林の森散策、ナイトツアー、マングローブカヌー、滝めぐり、湯湾岳トレッキング、バードウォッチング。奄美大島の自然を楽しむ6つのエコツアープログラム。",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "体験プログラム",
    description:
      "森・夜・海・山。奄美大島の自然を楽しむ6つのエコツアープログラムのご案内。",
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
    touristType: tour.suitableFor,
    provider: {
      "@type": "NGO",
      name: ORG_NAME,
      url: SITE_URL,
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
        lead="森・夜・海・山。奄美のいろいろな表情に出会う6つのプログラム。カテゴリで絞り込んでお探しいただけます。"
        tone="forest"
      />

      {/* 料金・所要時間の注記 */}
      <section className="mx-auto max-w-content px-5 pt-12 md:px-8">
        {/* TODO: クライアント確認（料金・所要時間・定員・催行条件の実値） */}
        <Reveal>
          <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-muted">
            ※ 料金・所要時間・定員はサンプルです。確定後に差し替えます。最新の催行状況は
            <Link href="/contact" className="text-accent hover:underline">
              お問い合わせ
            </Link>
            ください。
          </p>
        </Reveal>
      </section>

      {/* 一覧（フィルタ付き） */}
      <section className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
        <ToursExplorer />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
        <Reveal className="rounded-3xl bg-accent px-7 py-12 text-center text-white md:px-12">
          <h2 className="text-fluid-h3 font-heading font-bold">
            どのプログラムが合うか、迷ったら。
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90">
            日程・体力・興味に合わせて、ガイドが最適なプランをご提案します。お気軽にご相談ください。
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-medium text-accent transition-transform hover:-translate-y-0.5"
          >
            プログラム選びを相談する
          </Link>
        </Reveal>
      </section>
    </>
  );
}
