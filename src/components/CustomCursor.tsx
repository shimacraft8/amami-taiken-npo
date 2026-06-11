"use client";

import { useEffect, useRef, useState } from "react";

/**
 * カスタムカーソル（PC・ポインタが fine なデバイスのみ）。
 * - mix-blend-mode: difference で背景に応じて反転。
 * - a / button / [data-cursor-hover] のホバーで拡大。
 * - タッチデバイス・reduced-motion 環境では描画しない。
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const tick = () => {
      // リングは少し遅れて追従（イージング）
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      !!el.closest("a, button, input, textarea, select, [data-cursor-hover]");

    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 rounded-full border border-white transition-[width,height,margin,opacity] duration-200 ${
          hovering ? "-ml-6 -mt-6 h-12 w-12 opacity-90" : "-ml-4 -mt-4 h-8 w-8 opacity-60"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
    </div>
  );
}
