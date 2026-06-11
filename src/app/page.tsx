import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { BentoGrid } from "@/components/BentoGrid";
import { StatsCounter } from "@/components/StatsCounter";
import { Reveal } from "@/components/Reveal";

// カルーセルは初期表示に不要なため遅延ロード（コード分割）
const Testimonials = dynamic(
  () => import("@/components/Testimonials").then((m) => m.Testimonials),
  { loading: () => <div className="mx-auto h-72 max-w-3xl rounded-3xl bg-surface" /> },
);

export const metadata: Metadata = {
  // トップは template が効かないため絶対指定（団体名＋キャッチ）
  title: {
    absolute: "NPO法人 奄美大島自然体験活動協議会｜世界自然遺産・奄美のエコツアー",
  },
  description:
    "世界自然遺産・奄美大島の希少な自然を、認定ネイチャーガイドと共に。森・夜・海・山のエコツアー6プログラムをご案内するNPO法人奄美大島自然体験活動協議会の公式サイト。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* ミッション導入 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Our Mission
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">
              島の自然を知り、
              <br />
              未来へつなぐ。
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-fluid-lead text-text-muted">
              <p>
                私たちは、奄美の自然を知り尽くした認定ネイチャーガイドが集うエコツアー協議会です。
                希少な動植物と固有の生態系を守りながら、その魅力を一人でも多くの方に伝えること——
                それが私たちの役割だと考えています。
              </p>
              <p>
                体験は、ただ見るためのものではありません。歩き、耳を澄まし、気配を感じる。
                その先に芽生える「大切にしたい」という気持ちこそが、自然を守る第一歩になると信じています。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
              >
                私たちについて、詳しく →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 体験プログラム（Bento） */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Experience Programs
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">体験プログラム</h2>
            <p className="text-fluid-lead mx-auto mt-4 max-w-2xl text-text-muted">
              森・夜・海・山。奄美のいろいろな表情に出会う6つのプログラム。
              はじめての方やご家族でも安心してご参加いただけます。
            </p>
          </Reveal>
          <BentoGrid />
          <div className="mt-10 text-center">
            <Link
              href="/tours"
              className="inline-block rounded-full border border-accent px-7 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-white"
            >
              すべてのプログラムを見る
            </Link>
          </div>
        </div>
      </section>

      {/* 実績カウンター */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-24">
        <Reveal className="mb-8 text-center">
          <h2 className="text-fluid-h3 font-heading font-bold">数字で見る私たちの活動</h2>
          {/* TODO: クライアント確認（実績数値の実値） */}
          <p className="mt-2 text-sm text-text-muted">※ 数値はサンプルです（確定後に差し替え）</p>
        </Reveal>
        <Reveal delay={0.1}>
          <StatsCounter />
        </Reveal>
      </section>

      {/* 参加者の声 */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Voices
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">参加者の声</h2>
            {/* TODO: クライアント確認（実際の口コミに差し替え） */}
            <p className="mt-2 text-sm text-text-muted">※ 掲載内容はサンプルです</p>
          </Reveal>
          <Reveal delay={0.1}>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal className="overflow-hidden rounded-3xl bg-accent px-7 py-14 text-center text-white md:px-12 md:py-20">
          <h2 className="text-fluid-h2 font-heading font-bold">奄美の自然に、会いに行こう。</h2>
          <p className="text-fluid-lead mx-auto mt-4 max-w-xl text-white/90">
            ご希望の日程・人数をお知らせください。プログラム選びのご相談もお気軽にどうぞ。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-accent transition-transform hover:-translate-y-0.5"
            >
              体験を予約・相談する
            </Link>
            <Link
              href="/tours"
              className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              プログラム一覧
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
