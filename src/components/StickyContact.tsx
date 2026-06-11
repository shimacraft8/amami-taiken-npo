"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * スマホ用の画面下部固定 CTA。
 * /contact ページ自身では非表示。lg 以上では表示しない（ヘッダーに CTA があるため）。
 */
export function StickyContact() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <Link
        href="/contact"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white shadow-lg active:scale-[0.99]"
      >
        <span aria-hidden>📅</span>
        体験を予約する
      </Link>
    </div>
  );
}
