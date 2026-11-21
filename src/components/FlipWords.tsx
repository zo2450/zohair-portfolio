"use client";

import { useEffect, useState } from "react";
import styles from "./FlipWords.module.scss";

interface FlipWordsProps {
  words: string[];
  /** Time each word stays on screen, in ms */
  interval?: number;
  className?: string;
}

/**
 * Cycles through words: the current word blurs out upward, the next one fades in letter by letter
 * (in the style of Aceternity's Flip Words). Screen readers get every word once; reduced motion
 * shows only the first word.
 */
export function FlipWords({ words, interval = 2600, className }: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let swap: ReturnType<typeof setTimeout>;
    const timer = setInterval(() => {
      setLeaving(true);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setLeaving(false);
      }, 350);
    }, interval);
    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, [words.length, interval]);

  const word = words[index];

  return (
    <span className={`${styles.wrap} ${className ?? ""}`}>
      <span className={styles.srOnly}>{words.join(", ")}</span>
      <span
        key={index}
        className={`${styles.word} ${leaving ? styles.leaving : ""}`}
        aria-hidden="true"
      >
        {Array.from(word).map((letter, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: letters can repeat; position is the identity
            key={i}
            className={styles.letter}
            style={{ animationDelay: `${i * 0.03}s` }}
          >
            {letter === " " ? " " : letter}
          </span>
        ))}
      </span>
    </span>
  );
}
