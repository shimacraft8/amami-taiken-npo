"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * スクロールトリガーの共通アニメーションラッパー。
 * - <Reveal variant="...">  : 単体要素（fadeInUp / fadeInLeft / fadeInRight / scaleIn）
 * - <Stagger>               : 子要素を順番に表示するコンテナ（staggerChildren）
 * - <StaggerItem>           : Stagger 内の各要素
 * prefers-reduced-motion 時はアニメーションせず即時表示する。
 */

export type RevealVariant = "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;

function buildVariants(variant: RevealVariant): Variants {
  const hidden =
    variant === "fadeInUp"
      ? { opacity: 0, y: 32 }
      : variant === "fadeInLeft"
        ? { opacity: 0, x: -40 }
        : variant === "fadeInRight"
          ? { opacity: 0, x: 40 }
          : { opacity: 0, scale: 0.92 };

  return {
    hidden,
    visible: (delay: number = 0) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: EASE, delay },
    }),
  };
}

type MotionTagName = "div" | "section" | "li" | "ul" | "article" | "header" | "span";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 表示遅延（秒） */
  delay?: number;
  variant?: RevealVariant;
  as?: MotionTagName;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeInUp",
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    // モーション低減時は静的に表示
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      custom={delay}
      variants={buildVariants(variant)}
    >
      {children}
    </MotionTag>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: MotionTagName;
}

export function Stagger({ children, className, as = "div" }: StaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: MotionTagName;
}

export function StaggerItem({
  children,
  className,
  variant = "fadeInUp",
  as = "div",
}: StaggerItemProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={buildVariants(variant)}>
      {children}
    </MotionTag>
  );
}
