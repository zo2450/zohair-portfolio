"use client";

import { useEffect, useRef, useState } from "react";

const PATTERN = /^([^\d]*)([\d,]+)(.*)$/;

/**
 * Counts a metric like "87%", "$30M+" or "1,500+" up from 0 once it scrolls into view.
 * The server HTML holds the final value, and screen readers always get the final value.
 */
export function CountUp({
  value,
  durationMs = 1600,
  startDelayMs = 0,
}: {
  value: string;
  durationMs?: number;
  /** Wait this long after the number scrolls into view (lets an entrance animation finish first) */
  startDelayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(PATTERN);
    const el = ref.current;
    if (!match || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number.parseInt(digits.replace(/,/g, ""), 10);
    const useCommas = digits.includes(",");
    const format = (n: number) =>
      `${prefix}${useCommas ? n.toLocaleString("en-US") : String(n)}${suffix}`;

    setDisplay(format(0));
    let frame = 0;
    let delayTimer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        delayTimer = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - (1 - t) ** 3; // ease-out: fast start, gentle landing
            setDisplay(format(Math.round(target * eased)));
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, startDelayMs);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, startDelayMs]);

  return (
    <span ref={ref}>
      <span style={visuallyHidden}>{value}</span>
      <span aria-hidden="true" style={{ fontVariantNumeric: "tabular-nums" }}>
        {display}
      </span>
    </span>
  );
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;
