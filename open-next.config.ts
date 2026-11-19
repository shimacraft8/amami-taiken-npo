import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";
// 全ページがビルド時生成のため、KV/R2を使わず静的アセットからキャッシュを読む。
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
