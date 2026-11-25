"use client";

import { useEffect, useRef } from "react";
import styles from "./RevealGrid.module.scss";

/**
 * A grid whose cards play the hero's entrance (fade, rise, un-blur; Enter.module.scss) as each one
 * scrolls into view, staggered like the hero. The server HTML shows every card: the hidden
 * starting state only applies once this has run, and never with reduced motion.
 */
export function RevealGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cells = Array.from(grid.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        // Cards that come into view together stagger in reading order.
        const arriving = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target as HTMLElement);
        arriving
          .sort((a, b) => cells.indexOf(a) - cells.indexOf(b))
          .forEach((cell, order) => {
            cell.style.setProperty("--i", String(order));
            cell.dataset.revealed = "";
            observer.unobserve(cell);
          });
      },
      { threshold: 0.15 },
    );

    // Cards already on screen at load reveal straight away (still staggered).
    grid.dataset.ready = "";
    for (const cell of cells) observer.observe(cell);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className ?? ""} ${styles.reveal}`}>
      {children}
    </div>
  );
}
