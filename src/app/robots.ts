import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * レビュー公開中のため、すべてのクローラーを拒否（noindex / nofollow 相当）。
 * layout.tsx の metadata.robots（index:false, follow:false）とセットで運用。
 *
 * TODO: 承認後に index 許可へ戻す
 *   → rules を { userAgent: "*", allow: "/" } に変更し、
 *     layout.tsx の robots: { index: false, follow: false } を削除する。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
