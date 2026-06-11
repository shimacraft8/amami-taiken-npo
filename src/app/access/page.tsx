import type { Metadata } from "next";
import Link from "next/link";
import { Car, ParkingCircle, Phone, Plane } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CONTACT_INFO, ORG_NAME_FULL, SITE_URL, TEL_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "アクセス",
  description:
    "特定非営利活動法人奄美大島自然体験活動協議会への交通案内。奄美市住用町の事務所所在地、奄美空港からのアクセス、駐車場のご案内です。",
  alternates: { canonical: "/access" },
  openGraph: {
    title: "アクセス",
    description: "事務所所在地と奄美空港からの交通手段、駐車場のご案内。",
    url: `${SITE_URL}/access`,
  },
};

const transports = [
  {
    icon: Plane,
    title: "飛行機でお越しの方",
    body: "奄美空港から住用町方面へお車で向かいます。主要都市からの直行便のほか、鹿児島空港での乗り継ぎ便もあります。",
  },
  {
    icon: Car,
    title: "お車でお越しの方",
    body: "島内の移動はレンタカーが便利です。集合場所までの詳しい経路は、ご予約確定時にご案内します。",
  },
  {
    icon: ParkingCircle,
    title: "駐車場",
    body: "事務所に駐車スペースをご用意しています。お車でそのままお越しいただけます。",
  },
];

const meetingSteps = [
  "ご予約確定時に、集合場所の地図と駐車場のご案内をお送りします。",
  "当日は開始時刻の10分前までに事務所へお集まりください。",
  "受付・装備の確認のあと、ガイドと一緒にフィールドへ出発します。",
];

export default function AccessPage() {
  // 住所をマップ検索クエリに（住用町役勝）
  const mapQuery = encodeURIComponent("鹿児島県奄美市住用町役勝");

  return (
    <>
      <PageHeader
        eyebrow="Access"
        title="アクセス"
        lead="事務所の所在地と交通手段、駐車場についてご案内します。"
        tone="water"
      />

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal variant="fadeInLeft">
            <h2 className="text-fluid-h3 font-heading font-bold">所在地</h2>
            <div className="mt-5 overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed&z=12`}
                title="奄美市住用町役勝 周辺の地図"
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
                <dd className="font-medium">{ORG_NAME_FULL}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">所在地</dt>
                <dd className="font-medium">
                  {CONTACT_INFO.postal} {CONTACT_INFO.address}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">電話</dt>
                <dd className="font-medium">
                  <a href={TEL_HREF} className="text-accent hover:underline">
                    {CONTACT_INFO.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-text-muted">受付</dt>
                <dd className="font-medium">{CONTACT_INFO.hours}</dd>
              </div>
            </dl>
          </Reveal>

          {/* 集合までの流れ */}
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
              <h3 className="font-heading text-base font-semibold">集合時間のご相談</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                飛行機やフェリーの到着時刻に合わせた調整も可能です。お気軽にお電話ください。
              </p>
              <a
                href={TEL_HREF}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                <Phone size={15} aria-hidden />
                {CONTACT_INFO.tel}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 交通手段：3カラム */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Transportation
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">交通・駐車場のご案内</h2>
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
        </div>
      </section>
    </>
  );
}
