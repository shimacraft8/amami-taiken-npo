import type { Metadata } from "next";
import { Outfit, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ClientEffects } from "@/components/ClientEffects";
import { StickyContact } from "@/components/StickyContact";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  CONTACT_INFO,
  ORG_DESCRIPTION,
  ORG_NAME,
  ORG_NAME_FULL,
  REPRESENTATIVE,
  SITE_URL,
} from "@/lib/site";

// 見出し（英字）
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// 本文・見出し（日本語）
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false, // 日本語フォントはサブセットが大きいため preload を無効化
});

// パターンA（ダークアース）切替時の明朝見出し用
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ORG_NAME,
    template: `%s | ${ORG_NAME}`,
  },
  description: ORG_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: ORG_NAME,
    title: ORG_NAME,
    description: ORG_DESCRIPTION,
    url: SITE_URL,
    // TODO: クライアント確認（OGP画像。実写真確定後に /opengraph-image を追加）
  },
  twitter: {
    card: "summary_large_image",
    title: ORG_NAME,
    description: ORG_DESCRIPTION,
  },
  // レビュー公開のため検索エンジンから除外
  // TODO: 承認後に index 許可へ戻す（robots.ts と合わせて解除）
  robots: { index: false, follow: false },
};

// 構造化データ：団体（schema.org/NGO）
const ngoJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: ORG_NAME_FULL,
  alternateName: ORG_NAME,
  description: ORG_DESCRIPTION,
  areaServed: "奄美大島",
  url: SITE_URL,
  telephone: CONTACT_INFO.tel,
  email: CONTACT_INFO.email,
  founder: { "@type": "Person", name: REPRESENTATIVE },
  address: {
    "@type": "PostalAddress",
    postalCode: CONTACT_INFO.postal.replace("〒", ""),
    addressRegion: "鹿児島県",
    addressLocality: "奄美市",
    streetAddress: "住用町大字役勝7番地",
    addressCountry: "JP",
  },
} as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${outfit.variable} ${notoSansJP.variable} ${notoSerifJP.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ngoJsonLd) }}
        />
        <ClientEffects />
        <Header />
        {/* スマホ固定CTAに隠れないよう下部に余白（lg以上は不要） */}
        <div className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</div>
        <Footer />
        <StickyContact />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
