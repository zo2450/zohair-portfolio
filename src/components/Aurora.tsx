"use client";

import { useEffect, useRef } from "react";
import styles from "./Aurora.module.scss";

// Ribbon colours: navy/indigo/violet family with a teal accent
const RIBBONS = [
  { color: "#4f46e5", offset: -0.06, amplitude: 0.11, speed: 0.9, phase: 0.0 },
  { color: "#7c3aed", offset: -0.02, amplitude: 0.13, speed: 0.75, phase: 1.7 },
  { color: "#a855f7", offset: 0.02, amplitude: 0.1, speed: 1.05, phase: 3.1 },
  { color: "#d946ef", offset: 0.05, amplitude: 0.12, speed: 0.85, phase: 4.6 },
  { color: "#14b8a6", offset: 0.09, amplitude: 0.09, speed: 0.95, phase: 2.4 },
];
const RENDER_SCALE = 0.5; // canvas pixels per CSS pixel; the CSS blur hides the difference
const FRAME_INTERVAL = 1000 / 30;
const CENTER = 0.56; // vertical position of the ribbon bundle (0 = top, 1 = bottom)

// Smooth 1D value noise, so each ribbon wanders organically instead of a pure sine
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}

/**
 * Fixed full-page background: bold, blurred wavy ribbons of light flowing across the
 * screen (canvas 2D, in the style of Aceternity's Wavy Background). 30fps cap, pauses in
 * hidden tabs, single still frame when the visitor prefers reduced motion.
 */
export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const resize = () => {
      width = Math.max(1, Math.floor(canvas.clientWidth * RENDER_SCALE));
      height = Math.max(1, Math.floor(canvas.clientHeight * RENDER_SCALE));
      canvas.width = width;
      canvas.height = height;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      const lineWidth = Math.max(18, height * 0.07);
      const step = Math.max(4, Math.floor(width / 160));

      RIBBONS.forEach((ribbon, index) => {
        const t = time * ribbon.speed;
        ctx.beginPath();
        for (let x = -step; x <= width + step; x += step) {
          const nx = x / width;
          const wave =
            Math.sin(nx * 5.2 + t * 0.55 + ribbon.phase) * 0.55 +
            Math.sin(nx * 2.3 - t * 0.35 + ribbon.phase * 0.7) * 0.45 +
            (noise(nx * 3 + t * 0.25 + index * 10) - 0.5) * 0.9;
          const y = height * (CENTER + ribbon.offset + wave * ribbon.amplitude);
          if (x === -step) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ribbon.color;
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    resize();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const startOffset = 12; // begin mid-flow
    let frame = 0;
    let last = 0;

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_INTERVAL) return;
      last = now;
      draw(startOffset + (now - start) / 1000);
    };

    if (reducedMotion) draw(startOffset);
    else frame = requestAnimationFrame(loop);

    const onResize = () => {
      resize();
      if (reducedMotion) draw(startOffset);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={styles.aurora} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.ribbons} />
    </div>
  );
}
