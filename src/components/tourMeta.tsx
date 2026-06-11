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
import type { TimeOfDay, TourCategory } from "@/types";

// カテゴリのアイコンと配色（既存ブランドトークン系の深緑グラデーション）
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

/** 開催時間帯（昼／夜）のバッジ */
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
