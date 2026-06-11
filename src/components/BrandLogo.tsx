import type { CSSProperties } from "react";

/**
 * 案A：中央寄せ縦組みの文字ロゴ（純表示・"use client" 不要）。
 * 既存ブランドトークン（accent / text / bg）と layout 読込済みフォント
 * （Noto Serif JP = font-serif / Noto Sans JP = font-sans）のみを参照。新規 hex は足さない。
 *
 * SplashScreen のアニメ版でも同じ文字・配色・あしらいを再利用できるよう、
 * 文字配列・スタイル・SVG パスを定数として公開する。
 */

export type BrandLogoSize = "sm" | "lg";

/** 2行目（1文字ずつアニメさせる対象） */
export const AMAMI_CHARS = ["奄", "美", "大", "島"] as const;

/** あしらい SVG（葉＋稜線ライン）の共有パス */
export const FLOURISH = {
  viewBox: "0 0 150 28",
  ridge: "M0,24 C22,12 38,17 55,11 C72,5 88,15 105,9 C122,3 138,12 150,11",
  leaf: "M75,2 C66,9 66,18 75,25 C84,18 84,9 75,2 Z",
  vein: { x: 75, y1: 6, y2: 22 },
} as const;

interface SizeTokens {
  npo: CSSProperties;
  amami: CSSProperties;
  council: CSSProperties;
  flourishWidth: number;
  gap: string;
}

export function brandSizeTokens(size: BrandLogoSize): SizeTokens {
  if (size === "sm") {
    return {
      npo: { fontSize: "10px", letterSpacing: "0.4em", textIndent: "0.4em" },
      amami: { fontSize: "1.3rem", letterSpacing: "0.1em", textIndent: "0.1em" },
      council: { fontSize: "0.8rem", letterSpacing: "0.2em", textIndent: "0.2em" },
      flourishWidth: 104,
      gap: "0.4rem",
    };
  }
  return {
    npo: { fontSize: "13px", letterSpacing: "0.45em", textIndent: "0.45em" },
    amami: {
      fontSize: "clamp(2rem, 7vw, 3rem)",
      letterSpacing: "0.1em",
      textIndent: "0.1em",
    },
    council: {
      fontSize: "clamp(1.1rem, 3.5vw, 1.45rem)",
      letterSpacing: "0.22em",
      textIndent: "0.22em",
    },
    flourishWidth: 150,
    gap: "0.7rem",
  };
}

export function BrandLogo({ size = "lg" }: { size?: BrandLogoSize }) {
  const t = brandSizeTokens(size);
  return (
    <div className="flex flex-col items-center text-center" style={{ rowGap: t.gap }}>
      {/* 1行目：NPO法人（Noto Sans JP・弱い緑＝accent 低彩度） */}
      <span
        className="font-sans font-medium uppercase text-accent"
        style={{ ...t.npo, opacity: 0.6 }}
      >
        NPO法人
      </span>

      {/* 2行目：奄美大島（Noto Serif JP・text 色） */}
      <span className="font-serif font-medium text-text" style={t.amami}>
        {AMAMI_CHARS.map((c, i) => (
          <span key={i} className="inline-block">
            {c}
          </span>
        ))}
      </span>

      {/* 3行目：自然体験活動協議会（Noto Serif JP・accent 色） */}
      <span className="font-serif text-accent" style={{ fontWeight: 400, ...t.council }}>
        自然体験活動協議会
      </span>

      {/* あしらい：稜線＋葉 */}
      <svg
        aria-hidden
        viewBox={FLOURISH.viewBox}
        width={t.flourishWidth}
        className="mt-1"
        fill="none"
      >
        <path
          d={FLOURISH.ridge}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.2}
          opacity={0.5}
        />
        <path d={FLOURISH.leaf} fill="var(--color-accent)" opacity={0.85} />
        <line
          x1={FLOURISH.vein.x}
          y1={FLOURISH.vein.y1}
          x2={FLOURISH.vein.x}
          y2={FLOURISH.vein.y2}
          stroke="var(--color-bg)"
          strokeWidth={1}
        />
      </svg>
    </div>
  );
}
