"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const JA_TITLE_LINES: string[][] = [
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
  const locale = useLocale();
  const t = useTranslations("hero");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const isJa = locale === "ja";
  const titleLines = isJa
    ? JA_TITLE_LINES
    : [[t("titleLine1")], [t("titleLine2")]];

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="奄美大島自然体験活動協議会 メインビジュアル"
    >
      {/* 背景（動画） */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 will-change-transform"
        style={reduce ? undefined : { y: bgY }}
      >
        <div className="absolute -inset-[25%]">
          <video
            className="h-full w-full object-cover"
            src="/hero-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,18,14,0.45) 0%, rgba(8,18,14,0.2) 45%, rgba(8,18,14,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "linear-gradient(115deg, transparent 38%, rgba(214,255,235,0.14) 44%, transparent 50%, rgba(214,255,235,0.08) 58%, transparent 64%)",
          }}
        />
      </motion.div>

      {/* コンテンツ */}
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
          {t("eyebrow")}
        </motion.p>

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
          {titleLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((w) => (
                <span
                  key={w}
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span
                    variants={word}
                    className="inline-block will-change-transform"
                  >
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
          {t("lead")}
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
            {t("ctaTours")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            {t("ctaContact")}
          </Link>
        </motion.div>
      </motion.div>

      {/* スクロール誘導 */}
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
