"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

/**
 * フルスクリーンヒーロー。
 * - 背景は CSS グラデーション＋SVG ノイズテクスチャ（外部画像不要・著作権フリー）
 *   ※ TODO: 実画像差し替え（奄美の原生林・フリー素材または提供写真に置換可）
 * - 見出しは単語ごとに下から stagger で浮き上がる
 * - スクロール連動パララックス（useScroll + useTransform）
 * - 下部に pulse アニメーションのスクロール誘導ドット
 */

// feTurbulence によるノイズテクスチャ（データURI・依存なし）
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

// 見出し（単語単位で stagger させる）
const TITLE_LINES: string[][] = [
  ["奄美の", "いのちと、"],
  ["出会う", "旅へ。"],
];

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // パララックス：背景はゆっくり、前景テキストは少し速く流す
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="奄美大島自然体験活動協議会 メインビジュアル"
    >
      {/* ===== 背景（CSS only） ===== */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
        style={reduce ? undefined : { y: bgY }}
      >
        {/* 深緑のレイヤードグラデーション：奄美の森のイメージ */}
        {/* TODO: 実画像差し替え（原生林のワイド写真が用意でき次第 next/image に置換） */}
        <div
          className="absolute inset-0 scale-110"
          style={{
            background: [
              "radial-gradient(110% 90% at 85% 8%, rgba(111,168,144,0.5) 0%, rgba(111,168,144,0) 55%)",
              "radial-gradient(120% 100% at 10% 100%, rgba(10,30,24,0.95) 0%, rgba(20,52,44,0.5) 60%, rgba(20,52,44,0) 100%)",
              "linear-gradient(160deg, #16332b 0%, #2d5a4e 48%, #1c4038 78%, #122922 100%)",
            ].join(", "),
          }}
        />
        {/* ノイズテクスチャ重ね */}
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG }}
        />
        {/* 木漏れ日の光条 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(115deg, transparent 38%, rgba(214,255,235,0.14) 44%, transparent 50%, rgba(214,255,235,0.08) 58%, transparent 64%)",
          }}
        />
        {/* 可読性のための下部減光 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,18,14,0.35) 0%, rgba(8,18,14,0.05) 45%, rgba(8,18,14,0.55) 100%)",
          }}
        />
      </motion.div>

      {/* ===== コンテンツ ===== */}
      <motion.div
        className="mx-auto w-full max-w-content px-5 pb-28 pt-28 md:px-8"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          initial={reduce ? false : "hidden"}
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="font-heading text-xs uppercase tracking-[0.35em] text-white/80 md:text-sm"
        >
          World Natural Heritage · Amami Ōshima
        </motion.p>

        {/* 流体タイポ＋単語 stagger */}
        <motion.h1
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={wordContainer}
          className="mt-6 max-w-5xl font-heading font-bold text-white"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 7rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.02em",
          }}
        >
          {TITLE_LINES.map((line, li) => (
            <span key={li} className="block">
              {line.map((w) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span variants={word} className="inline-block will-change-transform">
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={reduce ? false : "hidden"}
          animate="visible"
          custom={0.55}
          variants={fadeUp}
          className="text-fluid-lead mt-7 max-w-xl text-white/90"
        >
          世界自然遺産の島で、認定ガイドと歩く。
          森の奥、夜の気配、水辺のにぎわい——奄美にしかない自然のものがたりを、
          安全に、ていねいにご案内します。
        </motion.p>

        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          custom={0.7}
          variants={fadeUp}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/tours"
            className="rounded-full bg-white px-7 py-3.5 text-sm font-medium text-accent shadow-lg transition-transform duration-300 ease-smooth hover:-translate-y-1"
          >
            体験プログラムを見る
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            体験を予約する
          </Link>
        </motion.div>
      </motion.div>

      {/* ===== スクロール誘導（pulse ドット） ===== */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-white/70"
      >
        <span className="font-heading text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-3 w-3 items-center justify-center">
          {!reduce && (
            <motion.span
              className="absolute h-3 w-3 rounded-full bg-white/60"
              animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
            />
          )}
          <span className="relative h-2 w-2 rounded-full bg-white" />
        </span>
      </motion.div>
    </section>
  );
}
