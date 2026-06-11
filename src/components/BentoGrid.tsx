"use client";

import { memo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Bird, Droplets, Moon, Mountain, TreePine, Waves, type LucideIcon } from "lucide-react";
import { tours } from "@/data/tours";
import type { Tour, TourCategory } from "@/types";
import { Stagger, StaggerItem } from "./Reveal";
import { MediaPlaceholder } from "./MediaPlaceholder";

export const CATEGORY_ICONS: Record<TourCategory, LucideIcon> = {
  森: TreePine,
  夜: Moon,
  海: Waves,
  川: Droplets,
  山: Mountain,
  観察: Bird,
};

export const CATEGORY_TONES: Record<TourCategory, "forest" | "night" | "water" | "mountain"> = {
  森: "forest",
  夜: "night",
  海: "water",
  川: "water",
  山: "mountain",
  観察: "forest",
};

/**
 * マガジンレイアウト（非対称 Bento）。
 * 大カード1枚（col-span-2 row-span-2）＋小カード5枚。
 */
const CELL_CLASS = [
  "md:col-span-2 md:row-span-2", // 0: 金作原（大）
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-2 md:row-span-1", // 5: 横長で締める
];

const TourCard = memo(function TourCard({ tour, index }: { tour: Tour; index: number }) {
  const reduce = useReducedMotion();
  const large = index === 0;
  const Icon = CATEGORY_ICONS[tour.category];

  return (
    <StaggerItem as="article" className={CELL_CLASS[index] ?? ""}>
      <motion.div
        whileHover={reduce ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className="group h-full"
      >
        <Link
          href={`/tours#${tour.slug}`}
          className="flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-shadow duration-300 ease-smooth group-hover:shadow-card-hover"
        >
          <div className="relative">
            {/* TODO: 実画像差し替え（各プログラムの代表写真） */}
            <MediaPlaceholder
              label={tour.imageAlt}
              tone={CATEGORY_TONES[tour.category]}
              minimal
              className={large ? "h-56 w-full md:h-80" : "h-36 w-full"}
            />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              <Icon size={13} aria-hidden />
              {tour.category}
            </span>
          </div>

          <div className="relative flex flex-1 flex-col p-5">
            {/* ホバー時の緑グラデーションオーバーレイ */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(180deg, rgba(45,90,78,0) 0%, rgba(45,90,78,0.08) 100%)",
              }}
            />
            <h3 className={`font-heading font-semibold ${large ? "text-xl" : "text-lg"}`}>
              {tour.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{tour.summary}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
              <span>{tour.duration}</span>
              {/* ホバーでフェードインする誘導テキスト */}
              <span className="translate-y-1 font-medium text-accent opacity-0 transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
                詳細を見る →
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </StaggerItem>
  );
});

export function BentoGrid() {
  return (
    <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      {tours.map((tour, i) => (
        <TourCard key={tour.slug} tour={tour} index={i} />
      ))}
    </Stagger>
  );
}
