import type { Metadata } from "next";
import { Car, ParkingCircle, Plane } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CONTACT_INFO, ORG_NAME_FULL, SITE_URL, TEL_HREF } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "access" });
  return {
    title: t("title"),
    alternates: { canonical: "/access" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TRANSPORT_ICONS = {
  plane: Plane,
  car: Car,
  parking: ParkingCircle,
} as const;

export default async function AccessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("access");
  const tc = await getTranslations("common");

  const mapQuery = encodeURIComponent("鹿児島県奄美市住用町大字役勝7番地");
  const transportKeys = ["plane", "car", "parking"] as const;

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        tone="water"
      />

      {/* 所在地 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-8">
          <h2 className="text-fluid-h3 font-heading font-bold">{t("locationH2")}</h2>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal variant="fadeInLeft">
            <div className="overflow-hidden rounded-3xl border border-border shadow-card">
              <iframe
                src={`https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`}
                title={t("mapTitle")}
                className="h-72 w-full md:h-[26rem]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal variant="fadeInRight" delay={0.1}>
            <dl className="space-y-4 rounded-3xl border border-border bg-surface p-7 text-sm md:p-8">
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-text-muted">{t("dlName")}</dt>
                <dd className="font-medium">{ORG_NAME_FULL}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-text-muted">{t("dlAddress")}</dt>
                <dd className="font-medium">
                  {tc("postal")}
                  <br />
                  {tc("address")}
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-text-muted">{t("dlTel")}</dt>
                <dd className="font-medium">
                  <a href={TEL_HREF} className="text-accent hover:underline">
                    {CONTACT_INFO.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-text-muted">{t("dlEmail")}</dt>
                <dd className="font-medium break-all">{CONTACT_INFO.email}</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-24 shrink-0 text-text-muted">{t("dlHours")}</dt>
                <dd className="font-medium">{tc("hours")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 交通・駐車場 */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              {t("transportEyebrow")}
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">{t("transportH2")}</h2>
          </Reveal>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {transportKeys.map((key) => {
              const Icon = TRANSPORT_ICONS[key];
              return (
                <StaggerItem
                  key={key}
                  as="article"
                  className="rounded-3xl border border-border bg-surface p-7 text-center shadow-card transition-transform duration-300 ease-smooth hover:-translate-y-1.5"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon size={26} aria-hidden />
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-semibold">
                    {t(`transports.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">
                    {t(`transports.${key}.body`)}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </>
  );
}
