"use client";

import { useEffect, useState } from "react";
import { Row, Text } from "@once-ui-system/core";
import styles from "./TypingPill.module.scss";

const phrases = [
  "building AI agents",
  "product management",
  "teaching C++ game dev",
  "web development",
  "marketing",
];

/** "Experienced in …" pill that types through phrases. Shows a static list when motion is reduced. */
export function TypingPill() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const full = phrases[phraseIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charCount === full.length) {
      timer = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && charCount === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }, 250);
    } else {
      timer = setTimeout(() => setCharCount((c) => c + (deleting ? -1 : 1)), deleting ? 35 : 85);
    }
    return () => clearTimeout(timer);
  }, [charCount, deleting, phraseIndex, reducedMotion]);

  const visible = reducedMotion ? phrases.join(", ") : phrases[phraseIndex].slice(0, charCount);

  return (
    <Row
      fitWidth
      vertical="center"
      gap="8"
      paddingX="20"
      paddingY="12"
      radius="full"
      border="brand-alpha-medium"
      background="brand-alpha-weak"
      wrap
      style={{ backdropFilter: "blur(var(--static-space-4))" }}
    >
      <span className={styles.srOnly}>Experienced in {phrases.join(", ")}</span>
      <Text variant="heading-strong-m" aria-hidden="true">
        Experienced in
      </Text>
      <Text variant="heading-default-m" onBackground="brand-medium" aria-hidden="true">
        {visible}
        {!reducedMotion && <span className={styles.caret} />}
      </Text>
    </Row>
  );
}
