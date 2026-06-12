"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/site";

// ヘッダー固定背景色（スクロールでも変化しない）
const HEADER_BG = "#f5f0e8";

/**
 * ヘッダー（背景はベージュ #f5f0e8 で固定）。
 * - 文字は常にダーク。モバイルのフルスクリーンメニュー表示中のみ白。
 * - 団体名の右にアマミノクロウサギ動画（白背景素材 × mix-blend-mode: multiply）。
 * - 現在ページには layoutId による下線インジケーター。
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  // ルート変更時にモバイルメニューを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // メニュー表示中は背景スクロールを固定
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // メニュー（緑のフルスクリーン）表示中のみ、ロゴ／ハンバーガーを白に
  const onDark = open;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{ backgroundColor: HEADER_BG, borderBottom: "1px solid rgba(45,90,78,0.15)" }}
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:h-20 md:px-8">
        {/* ロゴ（団体名 ＋ 右にアマミノクロウサギの動画） */}
        <Link href="/" className="group relative z-[60] flex items-center gap-2" aria-label="ホームへ">
          <span className="flex flex-col leading-tight">
            <span
              className={`font-heading text-sm font-semibold tracking-wide transition-colors duration-300 ${
                onDark ? "text-white" : "text-text"
              }`}
            >
              奄美大島自然体験活動協議会
            </span>
            <span
              className={`font-heading text-[10px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                onDark ? "text-white/70" : "text-text-muted"
              }`}
            >
              NPO Amami Nature
            </span>
          </span>
          {/* アマミノクロウサギ（白背景素材を multiply でヘッダーに馴染ませる） */}
          <video
            className="h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
            style={{ mixBlendMode: "multiply", backgroundColor: HEADER_BG }}
            src="/amami-rabbit-white.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
          />
        </Link>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="メインナビゲーション">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1.5 text-sm transition-colors hover:opacity-80 ${
                  active ? "font-medium text-accent" : "text-text"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-accent"
                    transition={
                      reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }
                    }
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* モバイル：ハンバーガー */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`absolute left-0 block h-0.5 w-6 transition-all duration-300 ${
                  open ? "bg-white" : "bg-text"
                } ${
                  i === 0
                    ? open
                      ? "top-1.5 rotate-45"
                      : "top-0"
                    : i === 1
                      ? open
                        ? "top-1.5 opacity-0"
                        : "top-1.5 opacity-100"
                      : open
                        ? "top-1.5 -rotate-45"
                        : "top-3"
                }`}
              />
            ))}
          </span>
        </button>
      </div>

      {/* ===== モバイル：フルスクリーンオーバーレイ ===== */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: "8%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: "8%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col lg:hidden"
            style={{
              background:
                "linear-gradient(165deg, #16332b 0%, #2d5a4e 60%, #1c4038 100%)",
            }}
            aria-label="モバイルナビゲーション"
          >
            {/* メニューは縦中央寄せ。上部余白でロゴ／閉じるボタンと重ならないようにする */}
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1 px-8 pb-16 pt-24"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-3 border-b border-white/10 py-4 ${
                        active ? "text-white" : "text-white/75"
                      }`}
                    >
                      <span className="w-16 shrink-0 font-heading text-[10px] uppercase tracking-[0.2em] text-white/50">
                        {link.labelEn}
                      </span>
                      <span className="font-heading text-2xl font-semibold">{link.label}</span>
                      {active && (
                        <span aria-hidden className="ml-auto h-2 w-2 rounded-full bg-white" />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
