"use client";

import { memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Binoculars,
  Camera,
  Moon,
  Mountain,
  Music,
  Sun,
  Tent,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { featuredTours } from "@/data/tours";
import type { Tour, TourCategory, TimeOfDay } from "@/types";
import { Stagger, StaggerItem } from "./Reveal";

// カテゴリのアイコンと配色
export const CATEGORY_META: Record<
  TourCategory,
  { icon: LucideIcon; gradient: string }
> = {
  自然観察: { icon: Binoculars, gradient: "linear-gradient(135deg,#2d5a4e,#6fa890)" },
  "海・川": { icon: Waves, gradient: "linear-gradient(135deg,#1f6f6a,#6fc2bd)" },
  "山・森": { icon: Mountain, gradient: "linear-gradient(135deg,#3a4a36,#8aa67a)" },
  島の文化: { icon: Music, gradient: "linear-gradient(135deg,#6a4a2d,#c79a63)" },
  アウトドア: { icon: Tent, gradient: "linear-gradient(135deg,#2a3a52,#5e7da6)" },
  撮影: { icon: Camera, gradient: "linear-gradient(135deg,#4a3a52,#9a7daa)" },
};

const TIME_ICON: Record<TimeOfDay, LucideIcon> = { 昼: Sun, 夜: Moon };

export function TimeBadges({ times }: { times: TimeOfDay[] }) {
  return (
    <span className="inline-flex gap-1.5">
      {times.map((t) => {
        const Icon = TIME_ICON[t];
        return (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent"
          >
            <Icon size={11} aria-hidden />
            {t}
          </span>
        );
      })}
    </span>
  );
}

const CELL_CLASS = [
  "md:col-span-2 md:row-span-2", // 0: 大カード
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1", // 5: 横長
];

const TourCard = memo(function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const reduce = useReducedMotion();
  const large = index === 0;
  const meta = CATEGORY_META[tour.category];
  const Icon = meta.icon;

  return (
    <StaggerItem as="article" className={CELL_CLASS[index] ?? ""}>
      <motion.div
        whileHover={reduce ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="group h-full"
      >
        <Link
          href={`/tours#${tour.slug}`}
          className="relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card transition-shadow duration-300 ease-smooth group-hover:shadow-card-hover"
        >
          {/* 左の縦アクセント */}
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-1"
            style={{ background: meta.gradient }}
          />
          {/* ホバー時の薄い緑オーバーレイ */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(180deg, rgba(45,90,78,0) 0%, rgba(45,90,78,0.07) 100%)",
            }}
          />

          <div className="flex items-center justify-between">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white"
              style={{ background: meta.gradient }}
            >
              <Icon size={13} aria-hidden />
              {tour.category}
            </span>
            <TimeBadges times={tour.timeOfDay} />
          </div>

          <h3 className={`mt-4 font-heading font-semibold ${large ? "text-2xl" : "text-lg"}`}>
            {tour.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{tour.summary}</p>

          <span className="mt-4 translate-y-1 text-sm font-medium text-accent opacity-0 transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            詳しく見る →
          </span>
        </Link>
      </motion.div>
    </StaggerItem>
  );
});

/** トップページのピックアップ（featured） */
export function BentoGrid() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      {featuredTours.map((tour, i) => (
        <TourCard key={tour.slug} tour={tour} index={i} />
      ))}
    </Stagger>
  );
}
