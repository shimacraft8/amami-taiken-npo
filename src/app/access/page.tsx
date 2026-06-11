import type { Metadata } from "next";
import Link from "next/link";
import { Bus, Car, KeyRound } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CONTACT_INFO, ORG_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス",
  description:
    "NPO法人奄美大島自然体験活動協議会への交通案内・集合場所のご案内。奄美空港からの車・バス・レンタカーでのアクセス方法をまとめています。",
  alternates: { canonical: "/access" },
  openGraph: {
    title: "アクセス",
    description: "集合場所と奄美空港からの交通手段のご案内。",
    url: `${SITE_URL}/access`,
  },
};

// 奄美空港からの交通手段（3カラム）
const transports = [
  {
    icon: Car,
    title: "お車（送迎・タクシー）",
    body: "奄美空港から約40分。タクシーのほか、プログラムによっては送迎のご相談も承ります（要事前予約）。",
  },
  {
    icon: Bus,
    title: "路線バス",
    body: "空港線バスで名瀬方面へ約55分。「名瀬○○」バス停下車、徒歩約5分です。本数が限られるため時刻表をご確認ください。",
  },
  {
    icon: KeyRound,
    title: "レンタカー",
    body: "島内の移動にはレンタカーが便利です。空港周辺で借りられ、集合場所まで約40分。無料駐車場をご利用いただけます。",
  },
];

// 集合までの流れ（numbered list）
const meetingSteps = [
  "ご予約確定時に、集合場所の地図と駐車場のご案内をお送りします。",
  "当日は開始時刻の10分前までに事務所前にお集まりください。",
  "受付・装備の確認のあと、ガイドと一緒にフィールドへ出発します。",
];

export default function AccessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Access"
        title="アクセス"
        lead="集合場所・交通手段をご案内します。ご不明な点はお気軽にお問い合わせください。"
        tone="water"
      />

      {/* 地図＋所在地 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal variant="fadeInLeft">
            <h2 className="text-fluid-h3 font-heading font-bold">集合場所</h2>
            {/* TODO: クライアント確認（正式な集合場所・住所・地図の正確な座標） */}
            <p className="mt-2 text-sm text-text-muted">
              ※ 住所はサンプルです。確定後に正式な集合場所・座標へ差し替えます。
            </p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border shadow-card">
              {/* TODO: クライアント確認後、正式な住所の埋め込みURLに差し替え（現在は奄美大島全域表示） */}
              <iframe
                src="https://www.google.com/maps?q=%E5%A5%84%E7%BE%8E%E5%A4%A7%E5%B3%B6&output=embed&z=10"
                title="集合場所周辺の地図（暫定：奄美大島全域）"
                className="h-72 w-full md:h-80"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <dl className="mt-6 space-y-3 rounded-2xl border border-border bg-surface p-6 text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">名称</dt>
                <dd className="font-medium">{ORG_NAME}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">所在地</dt>
                <dd className="font-medium">
                  {CONTACT_INFO.postal} {CONTACT_INFO.address}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">TEL</dt>
                <dd className="font-medium">{CONTACT_INFO.tel}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">受付</dt>
                <dd className="font-medium">{CONTACT_INFO.hours}</dd>
              </div>
            </dl>
          </Reveal>

          {/* 集合までの流れ（numbered list） */}
          <Reveal variant="fadeInRight" delay={0.1}>
            <h2 className="text-fluid-h3 font-heading font-bold">集合までの流れ</h2>
            <p className="mt-2 text-sm text-text-muted">
              プログラムや季節・潮位により集合時間が変わります。
            </p>
            <ol className="mt-5 space-y-4">
              {meetingSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card"
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-white"
                  >
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm leading-relaxed text-text-muted">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-2xl bg-accent/5 p-6">
              <h3 className="font-heading text-base font-semibold">ご不安な点はご相談を</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                フェリーや飛行機の到着時刻に合わせた集合時間の調整も可能です。お気軽にお問い合わせください。
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                アクセスについて問い合わせる
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 奄美空港からの交通手段：3カラム */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Transportation
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">
              奄美空港からの交通手段
            </h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {transports.map((t) => (
              <StaggerItem
                key={t.title}
                as="article"
                className="rounded-3xl border border-border bg-surface p-7 text-center shadow-card transition-transform duration-300 ease-smooth hover:-translate-y-1.5"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <t.icon size={26} aria-hidden />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{t.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          {/* TODO: クライアント確認（所要時間・バス路線名・バス停名の実値） */}
          <p className="mt-6 text-center text-xs text-text-muted">
            ※ 所要時間・路線情報はサンプルです。
          </p>
        </div>
      </section>
    </>
  );
}
