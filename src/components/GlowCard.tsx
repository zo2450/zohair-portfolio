"use client";

import { useRef } from "react";
import styles from "./GlowCard.module.scss";

interface GlowCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section";
  children: React.ReactNode;
}

/**
 * Solid dark card whose border lights up in violet/pink/teal nearest the pointer
 * (same effect as the work cards, in the style of Aceternity's Glowing Effect).
 * Keyboard focus inside the card also shows the glow.
 */
export function GlowCard({ as: Tag = "div", className, children, ...rest }: GlowCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const angle =
      (Math.atan2(
        event.clientY - rect.top - rect.height / 2,
        event.clientX - rect.left - rect.width / 2,
      ) *
        180) /
        Math.PI +
      90;
    el.style.setProperty("--angle", `${angle.toFixed(1)}deg`);
    el.style.setProperty("--glow", "1");
  };

  const onLeave = () => ref.current?.style.setProperty("--glow", "0");

  return (
    <Tag
      // biome-ignore lint/suspicious/noExplicitAny: polymorphic ref for div/section
      ref={ref as any}
      className={`${styles.card} ${className ?? ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      <span className={styles.glow} aria-hidden="true" />
      {children}
    </Tag>
  );
}
