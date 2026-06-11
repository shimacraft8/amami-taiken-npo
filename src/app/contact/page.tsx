import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import {
  CONTACT_INFO,
  MAIL_HREF,
  SITE_URL,
  TEL_HREF,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ・体験予約",
  description:
    "体験プログラムのご予約・ご相談はお電話が便利です。メールフォームからのお問い合わせも承ります。ご希望の日程・人数・プログラムをお知らせください。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ・体験予約",
    description: "体験プログラムのご予約・ご相談（お電話・メールフォーム）。",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact / Reservation"
        title="お問い合わせ・体験予約"
        lead="ご予約・ご相談はお電話が確実です。メールフォームからのお問い合わせも承ります。"
        tone="forest"
      />

      {/* 電話予約（メイン導線） */}
      <section className="mx-auto max-w-content px-5 pt-14 md:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-accent px-7 py-10 text-center text-white md:flex-row md:justify-between md:text-left">
            <div>
              <p className="font-heading text-xs uppercase tracking-[0.25em] text-white/80">
                Reservation by Phone
              </p>
              <h2 className="mt-2 font-heading text-xl font-bold">
                ご予約・お申し込みはお電話で
              </h2>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-white/85 md:justify-start">
                <Clock size={14} aria-hidden />
                受付：{CONTACT_INFO.hours}
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

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* メールフォーム */}
          <Reveal>
            <h2 className="text-fluid-h3 font-heading font-bold">メールでのお問い合わせ</h2>
            <p className="mt-2 text-sm text-text-muted">
              お急ぎでない場合や、ご相談内容を整理してお伝えになりたい場合はこちらから。
            </p>
            <div className="mt-6">
              {/* useSearchParams を使うため Suspense でラップ */}
              <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-surface" />}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>

          {/* サイド情報 */}
          <Reveal variant="fadeInRight" delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-heading text-base font-semibold">連絡先</h2>
                <p className="mt-3 flex items-center gap-2 text-sm">
                  <Phone size={16} aria-hidden className="shrink-0 text-accent" />
                  <a href={TEL_HREF} className="font-medium text-accent hover:underline">
                    {CONTACT_INFO.tel}
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm">
                  <Mail size={16} aria-hidden className="shrink-0 text-accent" />
                  <a
                    href={MAIL_HREF}
                    className="font-medium text-accent hover:underline break-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-text-muted">
                  <Clock size={16} aria-hidden className="shrink-0 text-accent" />
                  受付：{CONTACT_INFO.hours}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-heading text-base font-semibold">所在地</h2>
                <p className="mt-3 flex items-start gap-2 text-sm text-text-muted">
                  <MapPin size={16} aria-hidden className="mt-0.5 shrink-0 text-accent" />
                  <span>
                    {CONTACT_INFO.postal}
                    <br />
                    {CONTACT_INFO.address}
                  </span>
                </p>
              </div>

              <div className="rounded-2xl bg-accent/5 p-6 text-sm leading-relaxed text-text-muted">
                <h2 className="font-heading text-base font-semibold text-text">
                  ご予約にあたって
                </h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>天候・潮位により内容や時間が変わる場合があります。</li>
                  <li>前日・当日のご予約はお電話が確実です。</li>
                  <li>メールフォームには数日内に返信いたします。</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
