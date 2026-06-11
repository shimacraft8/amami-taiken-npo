"use client";

import dynamic from "next/dynamic";

// カスタムカーソルはクライアント専用＆初期描画に不要なため遅延ロード
// （ssr: false は Server Component では指定できないため、このラッパーを layout から使う）
const CustomCursor = dynamic(
  () => import("./CustomCursor").then((m) => m.CustomCursor),
  { ssr: false },
);

export function ClientEffects() {
  return <CustomCursor />;
}
