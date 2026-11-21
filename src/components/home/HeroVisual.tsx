"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useToast } from "@once-ui-system/core";
import { person } from "@/resources";
import styles from "./HomeHero.module.scss";

const floatStyle = (delaySeconds: number, depthPx: number) =>
  ({ "--delay": `${delaySeconds}s`, "--depth": `${depthPx}px`, height: "auto" }) as CSSProperties;

/**
 * Photo with floating game objects.
 * - Mouse parallax + photo tilt (fine pointers only, off with reduced motion)
 * - The controller is a button: each press pops "+1 XP", 10 presses unlock an achievement
 */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const presses = useRef(0);
  const [pops, setPops] = useState<number[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let mx = 0;
    let my = 0;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mx = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth / 2)));
      my = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight / 2)));
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          el.style.setProperty("--mx", mx.toFixed(3));
          el.style.setProperty("--my", my.toFixed(3));
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const pressController = () => {
    const id = Date.now() + Math.random();
    setPops((current) => [...current, id]);
    setTimeout(() => setPops((current) => current.filter((pop) => pop !== id)), 900);
    presses.current += 1;
    if (presses.current === 10) {
      addToast({ variant: "success", message: "Achievement unlocked: Button Masher. +10 XP" });
    }
  };

  return (
    <div ref={wrapRef} className={styles.photoWrap}>
      <Image
        src={person.avatar}
        alt={`${person.name} in a suit and sunglasses, smiling outdoors`}
        width={320}
        height={320}
        priority
        className={styles.photo}
      />
      <button
        type="button"
        className={`${styles.float} ${styles.controller}`}
        style={floatStyle(0.8, 18)}
        onClick={pressController}
        aria-label="Press the controller to earn XP"
        title="Press me"
      >
        <Image src="/images/icons/controller.png" unoptimized alt="" width={112} height={112} />
        {pops.map((id) => (
          <span key={id} className={styles.xp} aria-hidden="true">
            +1 XP
          </span>
        ))}
      </button>
      <Image
        src="/images/icons/halo.png"
        unoptimized
        alt=""
        aria-hidden
        width={84}
        height={84}
        className={`${styles.float} ${styles.halo}`}
        style={floatStyle(1, 10)}
      />
      <Image
        src="/images/icons/headphones.png"
        unoptimized
        alt=""
        aria-hidden
        width={329}
        height={360}
        className={`${styles.float} ${styles.headphones}`}
        style={floatStyle(1.2, 26)}
      />
    </div>
  );
}
