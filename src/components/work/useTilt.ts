"use client";

import { useRef } from "react";

const MAX_TILT = 6; // degrees

/**
 * Bento card hover: tilts toward the mouse and aims the glowing border at the pointer by setting
 * --rx, --ry, --angle and --glow (styled in WorkBento.module.scss). Mouse only; no tilt with
 * reduced motion.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = (event: React.PointerEvent) => {
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

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glow", "0");
  };

  return { ref, onPointerMove, onPointerLeave };
}
