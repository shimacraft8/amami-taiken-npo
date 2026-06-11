import type { Metadata } from "next";
import Link from "next/link";
import { Award, BadgeCheck } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { guides, getInitials } from "@/data/guides";
import { getTourBySlug } from "@/data/tours";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "ガイド紹介",
  description:
    "奄美の自然を知り尽くした認定ネイチャーガイドをご紹介。森林・夜行性動物・水辺・トレッキングなど、各分野のスペシャリストが安全で豊かな体験をご案内します。",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "ガイド紹介",
    description:
      "各分野のスペシャリストである認定ネイチャーガイドのご紹介。",
    url: `${SITE_URL}/guides`,
  },
};

// イニシャルアバターの色味をローテーション（深緑ベース）
const avatarTones = [
  "linear-gradient(135deg,#2d5a4e,#6fa890)",
  "linear-gradient(135deg,#14203a,#3f6079)",
  "linear-gradient(135deg,#1f6f6a,#6fc2bd)",
  "linear-gradient(135deg,#3a4a36,#8aa67a)",
];

const VETERAN_YEARS = 15;

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Guides"
        title="ガイド紹介"
        lead="それぞれの得意分野を持つ認定ネイチャーガイドが、奄美の自然をご案内します。"
        tone="mountain"
      />

      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        {/* TODO: クライアント確認（ガイド氏名・資格・経歴・顔写真の実値。現在はダミー＋イニシャル表示） */}
        <Reveal className="mb-10">
          <p className="text-sm text-text-muted">
            ※ ガイド氏名・資格・経歴はサンプルです。顔写真は準備中のため、当面はイニシャル表示としています。
          </p>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2">
          {guides.map((guide, i) => (
            <StaggerItem
              key={guide.slug}
              as="article"
              className="flex flex-col gap-5 rounded-3xl border border-border bg-surface p-6 shadow-card transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover md:flex-row md:p-7"
            >
              {/* アバター（イニシャル・深緑グラデーション） */}
              <div className="flex shrink-0 flex-row items-start gap-4 md:flex-col">
                <div
                  aria-hidden
                  className="flex h-20 w-20 items-center justify-center rounded-2xl font-heading text-2xl font-bold text-white"
                  style={{ background: avatarTones[i % avatarTones.length] }}
                >
                  {getInitials(guide.nameEn)}
                </div>
                {/* バッジ */}
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-medium text-white">
                    <BadgeCheck size={12} aria-hidden />
                    認定ガイド
                  </span>
                  {guide.yearsActive >= VETERAN_YEARS && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                      <Award size={12} aria-hidden />
                      ベテラン
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-heading text-xl font-bold">{guide.name}</h2>
                <p className="font-heading text-xs uppercase tracking-wide text-text-muted">
                  {guide.nameEn}
                </p>
                <p className="mt-1 text-sm font-medium text-accent">{guide.role}</p>

                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.bio}</p>

                {/* 資格（chip） */}
                <div className="mt-4">
                  <h3 className="text-xs font-semibold text-text-muted">保有資格</h3>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {guide.certifications.map((c) => (
                      <li
                        key={c}
                        className="rounded-full bg-accent/10 px-2.5 py-1 text-xs text-accent"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 専門分野タグ（chip） */}
                <div className="mt-4">
                  <h3 className="text-xs font-semibold text-text-muted">
                    得意なプログラム（ガイド歴 {guide.yearsActive} 年）
                  </h3>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {guide.specialties.map((slug) => {
                      const tour = getTourBySlug(slug);
                      if (!tour) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/tours#${slug}`}
                            className="rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
                          >
                            {tour.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            ガイドへの相談・体験予約はこちら
          </Link>
        </div>
      </section>
    </>
  );
}
