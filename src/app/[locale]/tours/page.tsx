import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ToursExplorer } from "@/components/ToursExplorer";
import { tours } from "@/data/tours";
import { CONTACT_INFO, ORG_NAME_FULL, SITE_URL, TEL_HREF } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tours" });
  return {
    title: t("title"),
    alternates: { canonical: "/tours" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const toursJsonLd = {
  "@context": "https://schema.org",
  "@graph": tours.map((tour) => ({
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.summary,
    url: `${SITE_URL}/tours#${tour.slug}`,
    provider: {
      "@type": "NGO",
      name: ORG_NAME_FULL,
      url: SITE_URL,
      telephone: CONTACT_INFO.tel,
    },
    itinerary: {
      "@type": "Place",
      name: "奄美大島",
      address: {
        "@type": "PostalAddress",
        addressRegion: "鹿児島県",
        addressLocality: "奄美市",
      },
    },
  })),
} as const;

export default async function ToursPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("tours");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toursJsonLd) }}
      />
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        tone="forest"
      />

      <section className="mx-auto max-w-content px-5 pt-12 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-text-muted">
              {t("reservationText").split(t("reservationTextBold")).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="font-medium text-text">{t("reservationTextBold")}</span>
                  )}
                </span>
              ))}
            </p>
            <a
              href={TEL_HREF}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              <Phone size={15} aria-hidden />
              {CONTACT_INFO.tel}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-5 py-12 md:px-8 md:py-16">
        <ToursExplorer />
      </section>

      <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
        <p className="text-center text-xs text-text-muted">{t("note")}</p>
      </section>
    </>
  );
}
