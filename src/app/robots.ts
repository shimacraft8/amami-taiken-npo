import type { MetadataRoute } from "next";
import { allowIndex, SITE_URL } from "@/lib/site";

/**
 * インデックス可否は環境変数で自動判定（allowIndex）。
 * - 本番(production) かつ NEXT_PUBLIC_ALLOW_INDEX=true → 全許可＋sitemap
 * - それ以外（プレビュー/staging/ローカル）→ Disallow: /（noindex 相当）
 *
 * 【公開時】Vercel の Production 環境変数に NEXT_PUBLIC_ALLOW_INDEX=true を設定する。
 */
export default function robots(): MetadataRoute.Robots {
  if (allowIndex) {
    return {
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${SITE_URL}/sitemap.xml`,
    };
  }
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
