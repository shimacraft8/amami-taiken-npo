import type { Metadata } from "next";
import { Outfit, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyContact } from "@/components/StickyContact";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import {
  allowIndex,
  CONTACT_INFO,
  ORG_DESCRIPTION,
  ORG_NAME,
  ORG_NAME_FULL,
  REPRESENTATIVE,
  SITE_URL,
} from "@/lib/site";
import { routing } from "@/i18n/routing";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

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
  },
  twitter: {
    card: "summary_large_image",
    title: ORG_NAME,
    description: ORG_DESCRIPTION,
  },
  robots: { index: allowIndex, follow: allowIndex },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${outfit.variable} ${notoSansJP.variable} ${notoSerifJP.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ngoJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</div>
          <Footer />
          <StickyContact />
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
