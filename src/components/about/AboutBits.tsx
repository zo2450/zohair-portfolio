"use client";

/** Opens the Alien Defender mini game (KonamiEgg listens for this event). */
export function PlayGameButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("open-alien-defender"))}
    >
      Play the kind of game they build
    </button>
  );
}
