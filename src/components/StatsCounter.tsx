"use client";

import { memo, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Stat } from "@/types";

// 実績数値（ダミー）。実値はクライアント確認のうえ差し替えること。
// {/* TODO: クライアント確認 */} は呼び出し側ページに記載。
const STATS: Stat[] = [
  { label: "認定ガイド", value: 12, suffix: "名", note: "経験豊富なネイチャーガイド" },
  { label: "累計催行", value: 3200, suffix: "回", note: "これまでの体験プログラム" },
  { label: "保全活動", value: 18, suffix: "年", note: "自然保護への取り組み" },
  { label: "出会える生きもの", value: 120, suffix: "種", note: "ツアーで観察された動植物" },
];

const StatItem = memo(function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const reduce = useReducedMotion();
  // 物理ベース（スプリング）のカウントアップ
  const spring = useSpring(0, { stiffness: 42, damping: 18, mass: 1 });
  const display = useTransform(spring, (v) =>
    Math.round(v).toLocaleString("ja-JP"),
  );

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      spring.jump(stat.value); // モーション低減時は即時表示
    } else {
      spring.set(stat.value);
    }
  }, [active, reduce, spring, stat.value]);

  return (
    <div className="text-center">
      <div className="font-heading text-4xl font-bold text-accent md:text-5xl">
        <motion.span>{display}</motion.span>
        <span className="ml-1 text-2xl md:text-3xl">{stat.suffix}</span>
      </div>
      <div className="mt-2 font-heading text-sm font-semibold">{stat.label}</div>
      {stat.note && <p className="mt-1 text-xs text-text-muted">{stat.note}</p>}
    </div>
  );
});

export function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  // ビューポートに入った瞬間に開始
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-8 rounded-3xl border border-border bg-surface px-6 py-12 shadow-card md:grid-cols-4 md:px-10"
    >
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={inView} />
      ))}
    </div>
  );
}
