import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Phone } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SplashScreen } from "@/components/SplashScreen";
import { CONTACT_INFO, SITE_URL, TEL_HREF } from "@/lib/site";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "home" });
  return {
    title: "ホーム",
    alternates: { canonical: "/" },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  return (
    <>
      <SplashScreen />
      <Hero />

      {/* ミッション導入 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal variant="fadeInLeft">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              {t("missionEyebrow")}
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">
              {t("missionH2Line1")}
              <br />
              {t("missionH2Line2")}
            </h2>
          </Reveal>
          <Reveal variant="fadeInRight" delay={0.1}>
            <div className="space-y-5 text-fluid-lead text-text-muted">
              <p>{t("missionBody1")}</p>
              <p>{t("missionBody2")}</p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
              >
                {t("missionLink")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal
          variant="scaleIn"
          className="overflow-hidden rounded-3xl bg-accent px-7 py-14 text-center text-white md:px-12 md:py-20"
        >
          <h2 className="text-fluid-h2 font-heading font-bold">{t("ctaH2")}</h2>
          <p className="text-fluid-lead mx-auto mt-4 max-w-xl text-white/90">{t("ctaLead")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={TEL_HREF}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-accent transition-transform hover:-translate-y-0.5"
            >
              <Phone size={16} aria-hidden />
              {CONTACT_INFO.tel}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-white/70 px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {t("ctaMail")}
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/80">
            {t("ctaHours", { hours: tc("hours") })}
          </p>
        </Reveal>
      </section>
    </>
  );
}
