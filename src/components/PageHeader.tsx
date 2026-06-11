import type { CSSProperties } from "react";

interface PageHeaderProps {
  /** 英字の小見出し（Outfit） */
  eyebrow: string;
  /** 日本語タイトル */
  title: string;
  /** リード文 */
  lead?: string;
  tone?: "forest" | "night" | "water" | "mountain";
}

// 装飾グラデーション（写真は使わず CSS のみ）
const toneGradient: Record<NonNullable<PageHeaderProps["tone"]>, string> = {
  forest: "linear-gradient(150deg, #16332b 0%, #2d5a4e 55%, #1c4038 100%)",
  night: "linear-gradient(150deg, #101a30 0%, #24405e 60%, #16243c 100%)",
  water: "linear-gradient(150deg, #134f4a 0%, #2f8f8a 60%, #18524d 100%)",
  mountain: "linear-gradient(150deg, #2b3a28 0%, #5a7150 60%, #33402f 100%)",
};

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

/** 下層ページ共通のヒーロー見出し（固定ヘッダー分の上余白を確保） */
export function PageHeader({ eyebrow, title, lead, tone = "forest" }: PageHeaderProps) {
  const bg: CSSProperties = { background: toneGradient[tone] };
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={bg}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
          style={{ backgroundImage: NOISE_SVG }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,20,16,0.35) 0%, rgba(10,20,16,0.2) 100%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-content px-5 pb-16 pt-32 md:px-8 md:pb-20 md:pt-40">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-white/80">
          {eyebrow}
        </p>
        <h1 className="text-fluid-h2 mt-3 font-heading font-bold text-white">{title}</h1>
        {lead && <p className="text-fluid-lead mt-5 max-w-2xl text-white/90">{lead}</p>}
      </div>
    </section>
  );
}
