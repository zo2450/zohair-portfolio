"use client";

import { useEffect, useRef, useState } from "react";
import { Text, useToast } from "@once-ui-system/core";
import { AlienDefender } from "./game/AlienDefender";
import styles from "./KonamiEgg.module.scss";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Easter egg: the Konami code shows an "achievement unlocked" toast and opens the
 * Alien Defender mini game. Touch devices (no keyboard) get a small "tap to play" link.
 */
export function KonamiEgg() {
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      if (openRef.current) return; // the game uses the same keys
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          addToast({
            variant: "success",
            message: "Achievement unlocked: you found the cheat code. +1,000 XP",
          });
          setOpen(true);
        }
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    // Other components can open the game directly (e.g. a "play" button on the About page)
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-alien-defender", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-alien-defender", onOpen);
    };
  }, [addToast]);

  return (
    <>
      <Text variant="label-default-xs" onBackground="neutral-weak" paddingBottom="8">
        Psst: ↑ ↑ ↓ ↓ ← → ← → B A{" "}
        <button type="button" className={styles.tapToPlay} onClick={() => setOpen(true)}>
          (tap to play)
        </button>
      </Text>
      <AlienDefender open={open} onClose={() => setOpen(false)} />
    </>
  );
}
