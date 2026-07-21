import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CONTACT_INFO, MAIL_HREF, SITE_URL, TEL_HREF } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "contact" });
  return {
    title: t("title"),
    alternates: { canonical: "/contact" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("contact");
  const tc = await getTranslations("common");

  const notes = t.raw("notes") as string[];

  return (
    <>
      <PageHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        tone="forest"
      />

      {/* 電話予約 */}
      <section className="mx-auto max-w-content px-5 pt-14 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-accent px-7 py-10 text-center text-white md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-white/80">
                {t("phoneEyebrow")}
              </p>
              <h2 className="mt-2 font-heading text-xl font-bold">{t("phoneH2")}</h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/85 md:justify-start">
                <Clock size={14} aria-hidden />
                {t("phoneHours", { hours: tc("hours") })}
              </p>
            </div>
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-heading text-2xl font-bold text-accent transition-transform hover:-translate-y-0.5"
            >
              <Phone size={22} aria-hidden />
              {CONTACT_INFO.tel}
            </a>
          </div>
        </Reveal>
      </section>

      {/* 連絡先・所在地・注意事項 */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
        <Stagger className="grid gap-6 md:grid-cols-3">
          <StaggerItem className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-heading text-base font-semibold">{t("cardContactH2")}</h2>
            <p className="mt-3 flex items-center gap-2 text-sm">
              <Phone size={16} aria-hidden className="shrink-0 text-accent" />
              <a href={TEL_HREF} className="font-medium text-accent hover:underline">
                {CONTACT_INFO.tel}
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              <Mail size={16} aria-hidden className="shrink-0 text-accent" />
              <a href={MAIL_HREF} className="font-medium text-accent hover:underline break-all">
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
              <Clock size={16} aria-hidden className="shrink-0 text-accent" />
              {t("cardHours", { hours: tc("hours") })}
            </p>
          </StaggerItem>

          <StaggerItem className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="font-heading text-base font-semibold">{t("cardAddressH2")}</h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-text-muted">
              <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" />
              <span>
                {tc("postal")}
                <br />
                {tc("address")}
              </span>
            </p>
          </StaggerItem>

          <StaggerItem className="rounded-2xl bg-accent/5 p-6 text-sm leading-relaxed text-text-muted">
            <h2 className="font-heading text-base font-semibold text-text">
              {t("cardNotesH2")}
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5">
              {notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>
      </section>
    </>
  );
}
