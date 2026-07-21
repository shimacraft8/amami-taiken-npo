import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONTACT_INFO, MAIL_HREF, NAV_LINKS, ORG_NAME, TEL_HREF } from "@/lib/site";

export async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        {/* 団体情報 */}
        <div>
          <span className="font-heading text-sm font-semibold">{ORG_NAME}</span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
            {t("description")}
          </p>
        </div>

        {/* サイトマップ */}
        <nav aria-label={t("sitemap")}>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {t("sitemap")}
          </h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text transition-colors hover:text-accent"
                >
                  {tn(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 連絡先 */}
        <div>
          <h2 className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            {t("contactSection")}
          </h2>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-text-muted">
            <p>
              {tc("postal")}
              <br />
              {tc("address")}
            </p>
            <p>
              TEL：
              <a href={TEL_HREF} className="text-accent hover:underline">
                {CONTACT_INFO.tel}
              </a>
              <br />
              <a href={MAIL_HREF} className="text-accent hover:underline break-all">
                {CONTACT_INFO.email}
              </a>
              <br />
              {t("hours", { hours: tc("hours") })}
            </p>
            <p>
              <Link href="/contact" className="text-accent hover:underline">
                {t("contactLink")}
              </Link>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-content px-5 py-5 md:px-8">
          <p className="text-center text-xs text-text-muted">
            © {year} {ORG_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
