"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AMAMI_CHARS,
  BrandLogo,
  brandSizeTokens,
  FLOURISH,
} from "./BrandLogo";

/** スプラッシュ全体の所要時間（保持→フェード手前まで）。ここで一括調整。 */
const SPLASH_MS = 2200;

/* ───────── 切替オプション ─────────────────────────────────────────────
   ▼ 背景色：通常版（クリーム）。深緑の「濃色版」にするには下の1行を入れ替える。
       通常 : bg = var(--color-bg) / 文字はそのまま
       濃色 : bg = var(--color-accent) にし、<div className="splash-dark"> を付けて
              文字色を bg(クリーム)系へ反転（必要なら text-bg / [color:var(--color-bg)] を当てる）
   ▼ 表示頻度：既定は「セッション1回」（sessionStorage）。毎回表示にしたい場合は
       useEffect 内の sessionStorage 判定3行をコメントアウトする。
   ──────────────────────────────────────────────────────────────────── */
const SPLASH_BG = "var(--color-bg)";
// const SPLASH_BG = "var(--color-accent)"; // ← 濃色版に切替する場合はこちら

const EASE = [0.22, 1, 0.36, 1] as const;

export function SplashScreen() {
  const reduce = useReducedMotion();
  // SSR/初回描画では必ず覆ってコンテンツのチラ見えを防ぐ
  const [show, setShow] = useState(true);
  const [run, setRun] = useState(false);

  useEffect(() => {
    // セッション内で表示済みなら即 dismiss（毎回表示にするにはこの3行を外す）
    if (sessionStorage.getItem("amami_splash_seen")) {
      setShow(false);
      return;
    }
    setRun(true);
    sessionStorage.setItem("amami_splash_seen", "1");

    const ms = reduce ? 700 : SPLASH_MS; // reduced-motion は短時間で抜ける
    const t = setTimeout(() => setShow(false), ms);
    return () => clearTimeout(t);
  }, [reduce]);

  // 表示中は背景スクロールをロック
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          role="status"
          aria-label="読み込み中"
          initial={false}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
          style={{ backgroundColor: SPLASH_BG }}
        >
          {run && !reduce ? <AnimatedBrandLogo /> : <BrandLogo size="lg" />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** スプラッシュ用：BrandLogo（lg）と同一の見た目を 1要素ずつアニメーションさせる版 */
function AnimatedBrandLogo() {
  const t = brandSizeTokens("lg");

  return (
    <div className="flex flex-col items-center text-center" style={{ rowGap: t.gap }}>
      {/* 1行目：NPO法人 */}
      <motion.span
        className="font-sans font-medium uppercase text-accent"
        style={{ ...t.npo }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
      >
        NPO法人
      </motion.span>

      {/* 2行目：奄美大島（1文字ずつ stagger） */}
      <span className="font-serif font-medium text-text" style={t.amami}>
        {AMAMI_CHARS.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.12, duration: 0.4, ease: EASE }}
          >
            {c}
          </motion.span>
        ))}
      </span>

      {/* 3行目：自然体験活動協議会 */}
      <motion.span
        className="font-serif text-accent"
        style={{ fontWeight: 400, ...t.council }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: EASE }}
      >
        自然体験活動協議会
      </motion.span>

      {/* あしらい：稜線（pathLength で描画）＋葉（フェード） */}
      <svg aria-hidden viewBox={FLOURISH.viewBox} width={t.flourishWidth} className="mt-1" fill="none">
        <motion.path
          d={FLOURISH.ridge}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.2}
          style={{ opacity: 0.5 }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d={FLOURISH.leaf}
          fill="var(--color-accent)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 1.1, duration: 0.5, ease: EASE }}
        />
        <motion.line
          x1={FLOURISH.vein.x}
          y1={FLOURISH.vein.y1}
          x2={FLOURISH.vein.x}
          y2={FLOURISH.vein.y2}
          stroke="var(--color-bg)"
          strokeWidth={1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.4, ease: EASE }}
        />
      </svg>
    </div>
  );
}
