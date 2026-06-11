import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Leaf, Search } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { AmamiSilhouette } from "@/components/AmamiSilhouette";
import {
  CONTACT_INFO,
  ORG_NAME_FULL,
  REPRESENTATIVE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "私たちについて",
  description:
    "特定非営利活動法人奄美大島自然体験活動協議会の概要・目的・沿革・組織体制をご紹介します。希少な生態系の保全と、自然体験・文化交流を通じた啓発に取り組んでいます。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "私たちについて",
    description:
      "奄美の希少な自然を守り、体験と文化交流を通じて伝えるNPOの、目的・沿革・組織のご紹介。",
    url: `${SITE_URL}/about`,
  },
};

// 法人の目的（定款の特定非営利活動の3分野をもとに新規執筆）
const missions = [
  {
    icon: Leaf,
    title: "環境の保全",
    en: "Conservation",
    body: "奄美大島とその周辺地域に息づく希少な動植物・固有の生態系の保護に取り組み、未来へ引き継ぎます。",
  },
  {
    icon: GraduationCap,
    title: "体験と社会教育",
    en: "Experience",
    body: "観察・体験イベントを企画運営し、自然や文化に触れる機会を提供。その大切さを広く啓発します。",
  },
  {
    icon: Search,
    title: "調査・情報発信",
    en: "Research",
    body: "希少な動植物や生態系について調査・研究を行い、ホームページやSNSを通じて情報を発信します。",
  },
];

// 沿革（登記・設立趣旨書の経過に基づく）
const history = [
  { year: "平成29年 9月", text: "久保 公と有志が集まり、奄美の環境保護活動について勉強会を開始。" },
  { year: "平成29年 9月", text: "発起人会を開催し、設立の趣旨・定款・事業計画などを決定。" },
  { year: "平成29年10月", text: "設立総会を開催。法人設立と役員を承認。" },
  { year: "平成30年 3月", text: "特定非営利活動法人として成立（設立登記）。" },
  { year: "現在", text: "認定ガイドによる自然体験事業と、調査・啓発活動を継続。" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="私たちについて"
        lead="奄美の希少な自然を守り、体験と文化交流を通じてその魅力を伝える特定非営利活動法人です。"
        tone="forest"
      />

      {/* 目的：3カラムの大アイコンカード */}
      <section className="relative mx-auto max-w-content overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <AmamiSilhouette className="pointer-events-none absolute -right-16 -top-10 w-[420px] text-accent opacity-[0.06]" />
        <Reveal className="text-center">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">Mission</p>
          <h2 className="text-fluid-h2 mt-4 font-heading font-bold">私たちの目的</h2>
          <p className="text-fluid-lead mx-auto mt-5 max-w-2xl text-text-muted">
            奄美大島は2021年に世界自然遺産へ登録されました。観光客の増加が見込まれるいまだからこそ、
            民間の立場から、3つの分野で島の自然と向き合います。
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

      {/* 沿革：タイムライン */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-12">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">History</p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">沿革</h2>
          </Reveal>

          <Stagger as="ul" className="relative ml-2 max-w-2xl">
            <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-accent/25" />
            {history.map((h, i) => (
              <StaggerItem
                key={`${h.year}-${i}`}
                as="li"
                variant="fadeInLeft"
                className="relative pb-10 pl-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                </span>
                <p className="font-heading text-base font-bold leading-none text-accent">
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
        <Reveal delay={0.1}>
          <dl className="overflow-hidden rounded-2xl border border-border bg-surface">
            {[
              ["名称", ORG_NAME_FULL],
              ["代表者", `理事長　${REPRESENTATIVE}`],
              ["所在地", `${CONTACT_INFO.postal} ${CONTACT_INFO.address}`],
              ["設立", CONTACT_INFO.established],
              ["電話", CONTACT_INFO.tel],
              ["メール", CONTACT_INFO.email],
              [
                "活動内容",
                "自然体験・観察イベントの企画運営／希少な動植物・生態系の調査研究と情報提供／環境保全の啓発・文化交流",
              ],
              ["対象エリア", "奄美大島およびその周辺地域"],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <dt className="font-heading text-sm font-semibold text-text-muted">{k}</dt>
                <dd className="break-words text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            活動について問い合わせる
          </Link>
        </div>
      </section>
    </>
  );
}
