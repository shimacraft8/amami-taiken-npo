"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Testimonial } from "@/types";

// 参加者の声（ダミー）。実際の口コミに差し替えること。
// {/* TODO: クライアント確認 */} は呼び出し側ページに記載。
const TESTIMONIALS: Testimonial[] = [
  {
    author: "K.S さん",
    meta: "30代・東京都／ご家族で参加",
    tourTitle: "金作原 原生林 森散策",
    body: "子どもが飽きないか心配でしたが、ガイドさんが目線を合わせて生きものの話をしてくれて、家族みんな夢中に。歩く速さもちょうどよく、森の見え方が変わりました。",
  },
  {
    author: "M.T さん",
    meta: "40代・大阪府／ご夫婦で参加",
    tourTitle: "ナイトツアー",
    body: "暗闇で静かに待つ時間が、こんなにわくわくするとは。出会えた瞬間の感動はもちろん、動物に配慮する姿勢に信頼を感じました。また参加したいです。",
  },
  {
    author: "Y.N さん",
    meta: "20代・福岡県／お一人で参加",
    tourTitle: "マングローブカヌー",
    body: "カヌー初体験で不安でしたが、漕ぎ方から丁寧に教えてもらえて安心。水面から見上げるマングローブは想像以上で、写真もたくさん撮れました。",
  },
  {
    author: "A.H さん",
    meta: "50代・神奈川県／ご友人と参加",
    tourTitle: "湯湾岳トレッキング",
    body: "体力に自信がなかったのに、ペースを細かく見てくれて最後まで登りきれました。固有の植物の説明も興味深く、達成感のある一日でした。",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, go]);

  const current = TESTIMONIALS[index];

  return (
    <div
      className="relative mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="カルーセル"
      aria-label="参加者の声"
    >
      <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-border bg-surface px-7 py-10 shadow-card md:min-h-[220px] md:px-12">
        <span aria-hidden className="font-heading text-6xl leading-none text-accent/20">
          &ldquo;
        </span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="-mt-4"
          >
            <p className="text-fluid-lead text-text">{current.body}</p>
            <footer className="mt-5 text-sm text-text-muted">
              <span className="font-semibold text-text">{current.author}</span>
              <span className="mx-2">/</span>
              {current.meta}
              <span className="mt-1 block text-accent">参加：{current.tourTitle}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* コントロール */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="前の声へ"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent hover:text-accent"
        >
          ←
        </button>
        <div className="flex gap-2" role="tablist" aria-label="声の切り替え">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.author}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1}件目を表示`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-2.5 bg-border"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="次の声へ"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-accent hover:text-accent"
        >
          →
        </button>
      </div>
    </div>
  );
}
