import type { CSSProperties } from "react";

/**
 * 実写真が未確定のため、各画像スロットに表示する装飾プレースホルダ。
 * - alt 相当の説明は `label` に渡し、視覚的にも何の画像が入る場所か分かるようにする。
 * - 実写真（Unsplash / Pexels / PAKUTASO のフリー素材、または提供素材）が
 *   用意でき次第、各ページの <MediaPlaceholder> を next/image の <Image> に差し替える。
 *   差し替え箇所には JSX 側で {/* TODO: 実画像差し替え *​/} を記載している。
 */

interface MediaPlaceholderProps {
  /** 入る予定の画像内容の説明（実写真差し替え時の alt の下書きにもなる） */
  label: string;
  /** 装飾アクセント（プログラムのカテゴリ等で色味を変える） */
  tone?: "forest" | "night" | "water" | "mountain";
  className?: string;
  /** ラベルを非表示にしてグラデーションのみにする */
  minimal?: boolean;
}

const toneStyles: Record<NonNullable<MediaPlaceholderProps["tone"]>, CSSProperties> = {
  forest: {
    background:
      "linear-gradient(135deg, #2d5a4e 0%, #3f7a6a 55%, #6fa890 100%)",
  },
  night: {
    background:
      "linear-gradient(135deg, #14203a 0%, #24405e 60%, #3f6079 100%)",
  },
  water: {
    background:
      "linear-gradient(135deg, #1f6f6a 0%, #2f8f8a 55%, #6fc2bd 100%)",
  },
  mountain: {
    background:
      "linear-gradient(135deg, #3a4a36 0%, #5a7150 55%, #8aa67a 100%)",
  },
};

export function MediaPlaceholder({
  label,
  tone = "forest",
  className = "",
  minimal = false,
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label}（写真は準備中のプレースホルダ）`}
      className={`relative flex items-end overflow-hidden ${className}`}
      style={toneStyles[tone]}
    >
      {/* テクスチャ風の重ね */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 8px)",
        }}
      />
      {!minimal && (
        <div className="relative z-10 p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            <span aria-hidden>◍</span>
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
