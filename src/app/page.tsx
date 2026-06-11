import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SplashScreen } from "@/components/SplashScreen";
import { CONTACT_INFO, TEL_HREF } from "@/lib/site";

export const metadata: Metadata = {
  title: "ホーム",
  description:
    "世界自然遺産・奄美大島の希少な自然を、認定ガイドと共に。森・川・海・島の文化まで多彩な自然体験プログラムをご案内する特定非営利活動法人奄美大島自然体験活動協議会の公式サイト。",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* 初回表示時のスプラッシュ（トップのみ・約2秒） */}
      <SplashScreen />

      <Hero />

      {/* ミッション導入 */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal variant="fadeInLeft">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-accent">
              Our Mission
            </p>
            <h2 className="text-fluid-h2 mt-4 font-heading font-bold">
              島の自然を知り、
              <br />
              未来へつなぐ。
            </h2>
          </Reveal>
          <Reveal variant="fadeInRight" delay={0.1}>
            <div className="space-y-5 text-fluid-lead text-text-muted">
              <p>
                私たちは、奄美大島とその周辺地域に息づく希少な動植物・固有の生態系を守り、
                自然体験や文化交流を通じてその大切さを伝える特定非営利活動法人です。
              </p>
              <p>
                世界自然遺産に登録された奄美。訪れる人が増えるいまだからこそ、
                自然への負荷を抑えながら楽しむ「持続可能な体験」のかたちを、ガイドと共に提案し続けます。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
              >
                私たちについて、詳しく →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA（電話予約がメイン） */}
      <section className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <Reveal
          variant="scaleIn"
          className="overflow-hidden rounded-3xl bg-accent px-7 py-14 text-center text-white md:px-12 md:py-20"
        >
          <h2 className="text-fluid-h2 font-heading font-bold">奄美の自然に、会いに行こう。</h2>
          <p className="text-fluid-lead mx-auto mt-4 max-w-xl text-white/90">
            ご予約・ご相談はお電話で承ります。プログラム選びのご相談もお気軽にどうぞ。
          </p>
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
              メールで問い合わせる
            </Link>
          </div>
          <p className="mt-5 text-xs text-white/80">受付：{CONTACT_INFO.hours}</p>
        </Reveal>
      </section>
    </>
  );
}
