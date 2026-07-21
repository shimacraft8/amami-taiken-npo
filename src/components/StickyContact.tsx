"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { CONTACT_INFO, TEL_HREF } from "@/lib/site";

export function StickyContact() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <a
        href={TEL_HREF}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white shadow-lg active:scale-[0.99]"
      >
        <Phone size={18} aria-hidden />
        {t("contact")}（{CONTACT_INFO.tel}）
      </a>
    </div>
  );
}
