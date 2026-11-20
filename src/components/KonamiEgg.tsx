"use client";

import { useEffect } from "react";
import { useToast } from "@once-ui-system/core";

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

/** Easter egg: typing the Konami code shows an "achievement unlocked" toast. */
export function KonamiEgg() {
  const { addToast } = useToast();

  useEffect(() => {
    let progress = 0;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          addToast({
            variant: "success",
            message: "Achievement unlocked: you found the cheat code. +1,000 XP",
          });
        }
      } else {
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addToast]);

  return null;
}
