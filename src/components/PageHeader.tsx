import { MediaPlaceholder } from "./MediaPlaceholder";

interface PageHeaderProps {
  /** 英字の小見出し（Outfit） */
  eyebrow: string;
  /** 日本語タイトル */
  title: string;
  /** リード文 */
  lead?: string;
  tone?: "forest" | "night" | "water" | "mountain";
}

/** 下層ページ共通のヒーロー見出し（固定ヘッダー分の上余白を確保） */
export function PageHeader({ eyebrow, title, lead, tone = "forest" }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* TODO: 実画像差し替え（各ページのイメージ写真） */}
        <MediaPlaceholder label={`${title}のイメージ`} tone={tone} minimal className="h-full w-full" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,20,16,0.55) 0%, rgba(10,20,16,0.45) 100%)",
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
