import Link from "next/link";
import { CONTACT_INFO, NAV_LINKS, ORG_NAME } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        {/* 団体情報 */}
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-base text-white"
            >
              奄
            </span>
            <span className="font-heading text-sm font-semibold">{ORG_NAME}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
            世界自然遺産・奄美大島の希少な自然を未来へ。認定ネイチャーガイドが、
            保全への配慮と安全管理を大切に、森・夜・海のエコツアーをご案内します。
          </p>
        </div>

        {/* サイトマップ */}
        <nav aria-label="フッターナビゲーション">
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Site Map
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 連絡先（団体としての情報・ダミー） */}
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Contact
          </h2>
          {/* TODO: クライアント確認（住所・電話・受付時間の実値） */}
          <address className="mt-4 space-y-2.5 text-sm not-italic text-text-muted">
            <p>
              {CONTACT_INFO.postal}
              <br />
              {CONTACT_INFO.address}
            </p>
            <p>
              TEL：{CONTACT_INFO.tel}
              <br />
              受付：{CONTACT_INFO.hours}
            </p>
            <p>
              <Link href="/contact" className="text-accent hover:underline">
                お問い合わせフォーム
              </Link>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-content px-5 py-5 md:px-8">
          {/* copyright は団体名のみ（個人名・制作者名は記載しない） */}
          <p className="text-center text-xs text-text-muted">
            © {year} {ORG_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
