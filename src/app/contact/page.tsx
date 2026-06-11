import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT_INFO, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ・体験予約",
  description:
    "体験プログラムのご予約・ご相談はこちらから。ご希望の日程・人数・プログラムをお知らせください。プログラム選びのご相談も歓迎です。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ・体験予約",
    description: "体験プログラムのご予約・ご相談フォーム。",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact / Reservation"
        title="お問い合わせ・体験予約"
        lead="ご希望の日程・人数・プログラムをお知らせください。「どれが合うか相談したい」も大歓迎です。"
        tone="forest"
      />

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* フォーム */}
          <Reveal>
            {/* useSearchParams を使うため Suspense でラップ */}
            <Suspense
              fallback={<div className="h-96 animate-pulse rounded-3xl bg-surface" />}
            >
              <ContactForm />
            </Suspense>
          </Reveal>

          {/* サイド情報 */}
          <Reveal variant="fadeInRight" delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h2 className="font-heading text-base font-semibold">お電話でのお問い合わせ</h2>
                {/* TODO: クライアント確認（電話番号・受付時間の実値） */}
                <p className="mt-3 flex items-center gap-2 font-heading text-2xl font-bold text-accent">
                  <Phone size={20} aria-hidden />
                  {CONTACT_INFO.tel}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
                  <Clock size={14} aria-hidden />
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
                  <li>2営業日以内に返信いたします。</li>
                  <li>前日・当日のご予約はお電話が確実です。</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
