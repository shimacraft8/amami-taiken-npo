"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "@/lib/site";

/**
 * グラスモーフィズムヘッダー。
 * - スクロール 0px：完全透明・テキスト白（全ページのヒーローが深色のため）
 * - スクロール 50px〜：backdrop-blur(20px) + 半透明背景 + 下線ボーダー
 * - 現在ページには layoutId による下線インジケーター
 * - モバイル：フルスクリーンオーバーレイ（メニューは縦中央寄せで上部ロゴと重ならない）
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const solid = scrolled || open;
  const onDark = open || !solid; // テキストを白で出す条件
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300"
      style={
        solid
          ? {
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              backgroundColor: "rgba(248,246,242,0.85)",
              borderBottom: "1px solid rgba(45,90,78,0.15)",
            }
          : { backgroundColor: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-5 md:h-20 md:px-8">
        {/* ロゴ（団体名 ＋ 右にアマミノクロウサギの動画） */}
        <Link href="/" className="group relative z-[60] flex items-center gap-2.5" aria-label="ホームへ">
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
          {/* アマミノクロウサギ（自動再生・ループ・ミュート）。
              背景・被写体とも黒の素材のため、白リングで円形メダリオンとして縁取り
              （透明 / クリームどちらのヘッダー背景でも視認できるように）。 */}
          <video
            className="h-9 w-9 shrink-0 rounded-full bg-black object-cover ring-2 ring-white/70 shadow-sm md:h-11 md:w-11"
            src="/amami-rabbit.mp4"
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
                  solid
                    ? active
                      ? "font-medium text-accent"
                      : "text-text"
                    : active
                      ? "font-medium text-white"
                      : "text-white/85"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full ${
                      solid ? "bg-accent" : "bg-white"
                    }`}
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
                  open || !solid ? "bg-white" : "bg-text"
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
            {/* メニューは縦中央寄せ。上部余白(pt)でロゴ／閉じるボタンと重ならないようにする */}
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
