"use client";

import { memo, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Gauge, Users } from "lucide-react";
import { tours } from "@/data/tours";
import type { Tour, TourCategory } from "@/types";
import { CATEGORY_ICONS, CATEGORY_TONES } from "./BentoGrid";
import { MediaPlaceholder } from "./MediaPlaceholder";

/**
 * 体験プログラム一覧：フィルタタブ＋ AnimatePresence による切替。
 * タブは「全て / 森・山 / 海・川 / 夜」（全カテゴリを網羅するため森に山・観察を含む）。
 */

type FilterKey = "all" | "forest" | "water" | "night";

const FILTERS: { key: FilterKey; label: string; categories: TourCategory[] }[] = [
  { key: "all", label: "全て", categories: [] },
  { key: "forest", label: "森・山", categories: ["森", "山", "観察"] },
  { key: "water", label: "海・川", categories: ["海", "川"] },
  { key: "night", label: "夜", categories: ["夜"] },
];

const DIFFICULTY_LABEL: Record<1 | 2 | 3, string> = {
  1: "やさしい",
  2: "ふつう",
  3: "健脚向け",
};

const TourDetailCard = memo(function TourDetailCard({ tour }: { tour: Tour }) {
  const reduce = useReducedMotion();
  const Icon = CATEGORY_ICONS[tour.category];

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      id={tour.slug}
      className="group flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      {/* カード上部：MediaPlaceholder（緑グラデ＋プログラム名） */}
      <div className="relative">
        {/* TODO: 実画像差し替え（{tour.title} の代表写真・フリー素材または提供写真） */}
        <MediaPlaceholder
          label={tour.imageAlt}
          tone={CATEGORY_TONES[tour.category]}
          minimal
          className="h-44 w-full md:h-52"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <span className="font-heading text-lg font-bold text-white drop-shadow-md">
            {tour.title}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Icon size={13} aria-hidden />
            {tour.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* バッジ：難易度・所要時間・参加人数（ダミー値） */}
        {/* TODO: クライアント確認（所要時間・定員・難易度区分の実値） */}
        <ul className="flex flex-wrap gap-2 text-xs">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 font-medium text-accent">
            <Gauge size={13} aria-hidden />
            {DIFFICULTY_LABEL[tour.difficulty]}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 font-medium text-accent">
            <Clock size={13} aria-hidden />
            {tour.duration}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 font-medium text-accent">
            <Users size={13} aria-hidden />
            {tour.capacity}
          </li>
        </ul>

        {tour.reading && (
          <p className="mt-3 text-xs text-text-muted">（{tour.reading}）</p>
        )}

        <div className="mt-3 space-y-3 text-sm leading-relaxed text-text-muted">
          {tour.description.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* ハイライト */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {tour.highlights.map((h) => (
            <li
              key={h}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
            >
              {h}
            </li>
          ))}
        </ul>

        {/* 料金・対象 */}
        <dl className="mt-5 grid grid-cols-1 gap-3 rounded-2xl bg-bg p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-text-muted">料金（サンプル）</dt>
            <dd className="mt-0.5 font-medium">{tour.price}</dd>
          </div>
          <div>
            <dt className="text-xs text-text-muted">こんな方に</dt>
            <dd className="mt-0.5 font-medium">{tour.suitableFor}</dd>
          </div>
        </dl>

        <Link
          href={`/contact?tour=${tour.slug}`}
          className="mt-6 inline-block self-start rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
        >
          このプログラムを予約・相談する
        </Link>
      </div>
    </motion.article>
  );
});

export function ToursExplorer() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const reduce = useReducedMotion();

  const visible = useMemo(() => {
    const def = FILTERS.find((f) => f.key === filter);
    if (!def || def.key === "all") return tours;
    return tours.filter((t) => def.categories.includes(t.category));
  }, [filter]);

  return (
    <div>
      {/* フィルタタブ */}
      <div
        role="tablist"
        aria-label="カテゴリで絞り込み"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "text-white"
                  : "border border-border bg-surface text-text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="tour-filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={
                    reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* カードグリッド（AnimatePresence で切替） */}
      <motion.div layout={!reduce} className="mt-10 grid gap-7 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((tour) => (
            <TourDetailCard key={tour.slug} tour={tour} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
