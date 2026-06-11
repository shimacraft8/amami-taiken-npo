import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { StatsCounter } from "@/components/StatsCounter";
import { AmamiSilhouette } from "@/components/AmamiSilhouette";
import { CONTACT_INFO, ORG_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "NPO法人奄美大島自然体験活動協議会の概要・ミッション・沿革・組織体制をご紹介します。希少な生態系の保全と自然体験活動の普及に取り組んでいます。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "私たちについて",
    description:
      "奄美の自然を知り尽くした認定ガイドが集うエコツアー協議会の、ミッション・沿革・組織のご紹介。",
    url: `${SITE_URL}/about`,
  },
};

// ミッション3本柱（大きなアイコン＋テキスト）
const missions = [
  {
    icon: Leaf,
    title: "保全",
    en: "Conservation",
    body: "奄美大島とその周辺地域に息づく希少な動植物・固有の生態系を、調査と保護活動を通じて未来へ引き継ぎます。",
  },
  {
    icon: Users,
    title: "体験の普及",
    en: "Experience",
    body: "認定ガイドによる安全で質の高い自然体験を提供し、島の自然のかけがえのなさを一人でも多くの方に伝えます。",
  },
  {
    icon: ShieldCheck,
    title: "持続可能性",
    en: "Sustainability",
    body: "自然への負荷を抑えたエコツアーの基準づくりと普及啓発で、観光と保全が両立する島の在り方を提案します。",
  },
];

// 沿革（ダミー）。実際の年表に差し替えること。
const history = [
  { year: "2005", text: "島内の認定ガイド有志により、自然体験活動の勉強会を発足。" },
  { year: "2010", text: "協議会を組織化。エコツアーの安全基準とガイドラインを整備。" },
  { year: "2016", text: "希少種の生息地モニタリングと保全活動を本格化。" },
  { year: "2021", text: "奄美大島の世界自然遺産登録を受け、来島者向けの普及啓発を強化。" },
  { year: "現在", text: "認定ガイドによるエコツアーと、次世代への環境教育を継続。" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="私たちについて"
        lead="奄美の自然を知り尽くした認定ガイドが集う、エコツアー協議会です。"
        tone="forest"
      />

      {/* ミッション：3カラムの大アイコンカード */}
      <section className="relative mx-auto max-w-content overflow-hidden px-5 py-20 md:px-8 md:py-28">
        {/* 島のシルエットを背景アクセントに */}
        <AmamiSilhouette
          className="pointer-events-none absolute -right-16 -top-10 w-[420px] text-accent opacity-[0.06]"
        />
        <Reveal className="text-center">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">Mission</p>
          <h2 className="text-fluid-h2 mt-4 font-heading font-bold">私たちのミッション</h2>
          <p className="text-fluid-lead mx-auto mt-5 max-w-2xl text-text-muted">
            2021年、奄美大島は世界自然遺産に登録されました。
            訪れる人が増えるいまだからこそ、私たちは3つの柱で島の自然と向き合います。
          </p>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {missions.map((m) => (
            <StaggerItem
              key={m.title}
              as="article"
              className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card transition-transform duration-300 ease-smooth hover:-translate-y-1.5"
            >
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <m.icon size={30} aria-hidden />
              </span>
              <p className="mt-5 font-heading text-[10px] uppercase tracking-[0.25em] text-text-muted">
                {m.en}
              </p>
              <h3 className="mt-1 font-heading text-xl font-bold text-accent">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{m.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 沿革：タイムライン（左縦線＋右テキスト） */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-12">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">History</p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">沿革</h2>
            {/* TODO: クライアント確認（設立年・沿革の実値） */}
            <p className="mt-2 text-sm text-text-muted">※ 年表はサンプルです</p>
          </Reveal>

          <Stagger as="ul" className="relative ml-2 max-w-2xl">
            {/* 左の縦線 */}
            <span
              aria-hidden
              className="absolute bottom-2 left-0 top-2 w-px bg-accent/25"
            />
            {history.map((h) => (
              <StaggerItem
                key={h.year}
                as="li"
                variant="fadeInLeft"
                className="relative pb-10 pl-10 last:pb-0"
              >
                {/* ノード */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                </span>
                <p className="font-heading text-lg font-bold leading-none text-accent">
                  {h.year}
                </p>
                <p className="mt-2 leading-relaxed text-text-muted">{h.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 組織概要 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-10">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
            Organization
          </p>
          <h2 className="text-fluid-h2 mt-4 font-heading font-bold">組織概要</h2>
        </Reveal>
        {/* TODO: クライアント確認（名称以外の項目はダミー） */}
        <Reveal delay={0.1}>
          <dl className="overflow-hidden rounded-2xl border border-border bg-surface">
            {[
              ["名称", ORG_NAME],
              ["所在地", `${CONTACT_INFO.address}（${CONTACT_INFO.postal}）`],
              ["設立", "2010年（前身の勉強会は2005年発足）"],
              ["活動内容", "エコツアーの企画・運営／自然保護活動／環境教育・普及啓発"],
              ["対象エリア", "奄美大島およびその周辺地域"],
              ["会員", "認定ネイチャーガイド ほか"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <dt className="font-heading text-sm font-semibold text-text-muted">{k}</dt>
                <dd className="text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* 実績 */}
      <section className="bg-surface/50 py-20 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-8 text-center">
            <h2 className="text-fluid-h3 font-heading font-bold">活動の実績</h2>
            {/* TODO: クライアント確認（実績数値の実値） */}
            <p className="mt-2 text-sm text-text-muted">※ 数値はサンプルです</p>
          </Reveal>
          <Reveal delay={0.1} variant="scaleIn">
            <StatsCounter />
          </Reveal>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              活動について問い合わせる
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
