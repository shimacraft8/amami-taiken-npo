// @ts-ignore `.open-next/worker.js` is generated at build time
import { default as handler } from "./.open-next/worker.js";

type Env = { ASSETS: { fetch: (req: Request) => Promise<Response> } };

// 静的アセット配信は Range 非対応のため、iOS Safari の動画再生に必要な 206 応答をここで返す
async function serveWithRange(request: Request, env: Env): Promise<Response> {
  const res = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (!res.ok) return res;

  const headers = new Headers(res.headers);
  headers.set("Accept-Ranges", "bytes");
  const range = request.headers.get("Range");
  const m = range?.match(/^bytes=(\d*)-(\d*)$/);
  if (!m || (m[1] === "" && m[2] === "")) {
    return new Response(request.method === "HEAD" ? null : res.body, { status: 200, headers });
  }

  const buf = await res.arrayBuffer();
  const size = buf.byteLength;
  let start: number;
  let end: number;
  if (m[1] === "") {
    start = Math.max(size - Number(m[2]), 0);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === "" ? size - 1 : Math.min(Number(m[2]), size - 1);
  }
  if (start >= size || start > end) {
    headers.set("Content-Range", `bytes */${size}`);
    headers.delete("Content-Length");
    return new Response(null, { status: 416, headers });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(request.method === "HEAD" ? null : buf.slice(start, end + 1), { status: 206, headers });
}

export default {
  async fetch(request: Request, env: Env, ctx: unknown) {
    const url = new URL(request.url);
    // 旧Vercelと同じく www は全パスを apex へ転送（拡張子付きファイルも含む）
    if (url.hostname === "www.amamitaiken.com") {
      url.hostname = "amamitaiken.com";
      return Response.redirect(url.toString(), 307);
    }
    if (url.pathname.endsWith(".mp4")) {
      return serveWithRange(request, env);
    }
    // 旧Vercelは /ABOUT 等の大文字URLも表示していたため、小文字ページへ転送して互換を保つ
    const lower = url.pathname.toLowerCase();
    if (lower !== url.pathname && !url.pathname.startsWith("/_next/") && !url.pathname.includes(".")) {
      url.pathname = lower;
      return Response.redirect(url.toString(), 308);
    }
    return handler.fetch(request, env, ctx);
  },
};
