import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { GraduationCap, Leaf, Search } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { AmamiSilhouette } from "@/components/AmamiSilhouette";
import {
  CONTACT_INFO,
  ORG_NAME_FULL,
  REPRESENTATIVE,
  SITE_URL,
} from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("title"),
    alternates: { canonical: "/about" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const MISSION_ICONS = {
  conservation: Leaf,
  experience: GraduationCap,
  research: Search,
} as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tc = await getTranslations("common");

  const missionKeys = ["conservation", "experience", "research"] as const;
  const historyItems = t.raw("history") as { year: string; text: string }[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        tone="forest"
      />

      {/* 目的 */}
      <section className="relative mx-auto max-w-content overflow-hidden px-5 py-20 md:px-8 md:py-28">
        <AmamiSilhouette className="pointer-events-none absolute -right-16 -top-10 w-[420px] text-accent opacity-[0.06]" />
        <Reveal className="text-center">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
            {t("missionEyebrow")}
          </p>
          <h2 className="text-fluid-h2 mt-4 font-heading font-bold">{t("missionH2")}</h2>
          <p className="text-fluid-lead mx-auto mt-5 max-w-2xl text-text-muted">
            {t("missionLead")}
          </p>
        </Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {missionKeys.map((key) => {
            const Icon = MISSION_ICONS[key];
            return (
              <StaggerItem
                key={key}
                as="article"
                className="rounded-3xl border border-border bg-surface p-8 text-center shadow-card transition-transform duration-300 ease-smooth hover:-translate-y-1.5"
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon size={30} aria-hidden />
                </span>
                <p className="mt-5 font-heading text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  {t(`missions.${key}.en`)}
                </p>
                <h3 className="mt-1 font-heading text-xl font-bold text-accent">
                  {t(`missions.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {t(`missions.${key}.body`)}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* 沿革 */}
      <section className="bg-surface/50 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Reveal className="mb-12">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              {t("historyEyebrow")}
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">{t("historyH2")}</h2>
          </Reveal>
          <Stagger as="ul" className="relative ml-2 max-w-2xl">
            <span aria-hidden className="absolute bottom-2 left-0 top-2 w-px bg-accent/25" />
            {historyItems.map((h, i) => (
              <StaggerItem
                key={`${h.year}-${i}`}
                as="li"
                variant="fadeInLeft"
                className="relative pb-10 pl-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-1 flex h-4 w-4 -translate-x-1/2 items-center justify-center"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                </span>
                <p className="font-heading text-base font-bold leading-none text-accent">
                  {h.year}
                </p>
                <p className="mt-2 leading-relaxed text-text-muted">{h.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 組織概要 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal className="mb-10">
          <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
            {t("orgEyebrow")}
          </p>
          <h2 className="text-fluid-h2 mt-4 font-heading font-bold">{t("orgH2")}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="overflow-hidden rounded-2xl border border-border bg-surface">
            {[
              [t("orgTable.name"), ORG_NAME_FULL],
              [t("orgTable.representative"), t("orgTable.representativeValue")],
              [t("orgTable.address"), `${CONTACT_INFO.postal} ${CONTACT_INFO.address}`],
              [t("orgTable.established"), CONTACT_INFO.established],
              [t("orgTable.tel"), CONTACT_INFO.tel],
              [t("orgTable.email"), CONTACT_INFO.email],
              [t("orgTable.activities"), t("orgTable.activitiesValue")],
              [t("orgTable.area"), t("orgTable.areaValue")],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[10rem_1fr] sm:gap-4 ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <dt className="font-heading text-sm font-semibold text-text-muted">{k}</dt>
                <dd className="break-words text-text">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
          >
            {t("contactLink")}
          </Link>
        </div>
      </section>
    </>
  );
}
