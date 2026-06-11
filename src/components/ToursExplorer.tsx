"use client";

import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";
import { tours } from "@/data/tours";
import type { Tour, TourCategory } from "@/types";
import { CATEGORY_META, TimeBadges } from "./BentoGrid";
import { CONTACT_INFO, TEL_HREF } from "@/lib/site";

type FilterKey = "all" | "自然観察" | "海・川" | "山・森" | "島の文化" | "その他";

const FILTERS: { key: FilterKey; label: string; categories: TourCategory[] }[] = [
  { key: "all", label: "すべて", categories: [] },
  { key: "自然観察", label: "自然観察", categories: ["自然観察"] },
  { key: "海・川", label: "海・川", categories: ["海・川"] },
  { key: "山・森", label: "山・森", categories: ["山・森"] },
  { key: "島の文化", label: "島の文化", categories: ["島の文化"] },
  { key: "その他", label: "その他", categories: ["アウトドア", "撮影"] },
];

const TourDetailCard = memo(function TourDetailCard({ tour }: { tour: Tour }) {
  const reduce = useReducedMotion();
  const meta = CATEGORY_META[tour.category];
  const Icon = meta.icon;

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      id={tour.slug}
      className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: meta.gradient }}
      />
      <div className="flex items-center justify-between">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
          style={{ background: meta.gradient }}
        >
          <Icon size={13} aria-hidden />
          {tour.category}
        </span>
        <TimeBadges times={tour.timeOfDay} />
      </div>

      <h2 className="mt-4 font-heading text-xl font-bold">{tour.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{tour.summary}</p>

      {/* 予約は電話がメイン */}
      <a
        href={TEL_HREF}
        className="mt-5 inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
      >
        <Phone size={15} aria-hidden />
        電話で予約・相談（{CONTACT_INFO.tel}）
      </a>
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
      <div role="tablist" aria-label="カテゴリで絞り込み" className="flex flex-wrap gap-2">
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

      {/* カードグリッド */}
      <motion.div layout={!reduce} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((tour) => (
            <TourDetailCard key={tour.slug} tour={tour} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
