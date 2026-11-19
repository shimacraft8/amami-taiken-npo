// @ts-ignore `.open-next/worker.js` is generated at build time
import { default as handler } from "./.open-next/worker.js";

export default {
  fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    // 旧Vercelと同じく www は全パスを apex へ転送（拡張子付きファイルも含む）
    if (url.hostname === "www.amamitaiken.com") {
      url.hostname = "amamitaiken.com";
      return Response.redirect(url.toString(), 307);
    }
    // 旧Vercelは /ABOUT 等の大文字URLも表示していたため、小文字ページへ転送して互換を保つ
    const lower = url.pathname.toLowerCase();
    if (lower !== url.pathname && !url.pathname.startsWith("/_next/") && !url.pathname.includes(".")) {
      url.pathname = lower;
      return Response.redirect(url.toString(), 308);
    }
    return handler.fetch(request, env, ctx);
  },
} satisfies ExportedHandler;
