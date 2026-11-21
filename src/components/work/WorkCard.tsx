"use client";

import Link from "next/link";
import { useRef } from "react";
import { Icon } from "@once-ui-system/core";
import styles from "./WorkBento.module.scss";

export interface WorkCardProps {
  href: string;
  /** The result, written as a sentence (falls back to the project title) */
  headline: string;
  title: string;
  summary: string;
  role?: string;
  timeframe?: string;
  tools?: string[];
  /** Grid columns this card spans (1–3) */
  span: number;
  /** Heading level for the headline */
  headingLevel?: "h2" | "h3";
}

const MAX_TILT = 6; // degrees

/**
 * Bento project card (no image): the result is the headline, project details sit below it.
 * Tilts toward the mouse and lights the border nearest the pointer. Tilt is mouse-only and
 * off with reduced motion; keyboard focus shows the glow.
 */
export function WorkCard({
  href,
  headline,
  title,
  summary,
  role,
  timeframe,
  tools,
  span,
  headingLevel = "h2",
}: WorkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const Heading = headingLevel;

  const onMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 90;
    el.style.setProperty("--angle", `${angle.toFixed(1)}deg`);
    el.style.setProperty("--glow", "1");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.setProperty("--rx", `${((y / rect.height - 0.5) * -2 * MAX_TILT).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x / rect.width - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glow", "0");
  };

  return (
    <div className={styles.cell} style={{ gridColumn: `span ${span}` }}>
      <Link
        ref={ref}
        href={href}
        className={`${styles.card} ${span > 1 ? styles.wide : ""}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className={styles.glow} aria-hidden="true" />
        <div className={styles.body}>
          <Heading className={styles.headline}>{headline}</Heading>
          <p className={styles.summary}>{summary}</p>
        </div>
        <div className={styles.footer}>
          <div className={styles.meta}>
            <p className={styles.project}>{title}</p>
            {(role || timeframe) && (
              <p className={styles.detail}>{[role, timeframe].filter(Boolean).join(", ")}</p>
            )}
            {tools && tools.length > 0 && <p className={styles.tools}>{tools.join(", ")}</p>}
          </div>
          <span className={styles.arrow} aria-hidden="true">
            <Icon name="arrowUpRight" size="m" />
          </span>
        </div>
      </Link>
    </div>
  );
}
