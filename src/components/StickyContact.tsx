"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { CONTACT_INFO, TEL_HREF } from "@/lib/site";

/**
 * スマホ用の画面下部固定 CTA（電話予約がメインのため tel: リンク）。
 * /contact ページ自身では非表示。lg 以上では表示しない。
 */
export function StickyContact() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <a
        href={TEL_HREF}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white shadow-lg active:scale-[0.99]"
      >
        <Phone size={18} aria-hidden />
        電話で予約する（{CONTACT_INFO.tel}）
      </a>
    </div>
  );
}
