"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Column, Heading, IconButton, Row, Text } from "@once-ui-system/core";
import styles from "./AlienDefender.module.scss";

// Logical playfield size (scaled to fit the dialog)
const W = 480;
const H = 640;
const BEST_KEY = "alien-defender-best";

type Phase = "ready" | "playing" | "over";

interface AlienDefenderProps {
  open: boolean;
  onClose: () => void;
}

/**
 * "Alien Defender": a small original arcade shooter, unlocked by the Konami code.
 * Move with ← → (or A/D), fire with Space. Waves get faster; best score is kept in localStorage.
 */
export function AlienDefender({ open, onClose }: AlienDefenderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startRef = useRef<() => void>(() => {});
  const input = useRef({ left: false, right: false, fire: false });
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  // Open / close the native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      canvasRef.current?.focus();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Game loop (only while open)
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    setBest(Number(localStorage.getItem(BEST_KEY) || 0));
    setPhase("ready");
    setScore(0);

    const alienImg = new Image();
    alienImg.src = "/images/icons/alien-monster.png";

    type Alien = { x: number; y: number; alive: boolean };
    type Shot = { x: number; y: number; vy: number };
    type Spark = { x: number; y: number; vx: number; vy: number; life: number; color: string };

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 30 + 12,
    }));
    const player = { x: W / 2, y: H - 64 };
    let lives = 3;
    let points = 0;
    let wave = 1;
    let invulnerable = 0;
    let cooldown = 0;
    let bombTimer = 1.2;
    let direction = 1;
    let aliens: Alien[] = [];
    let shots: Shot[] = [];
    let bombs: Shot[] = [];
    let sparks: Spark[] = [];
    let running = false;
    let frame = 0;
    let last = performance.now();

    const spawnWave = () => {
      aliens = [];
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 7; col++) {
          aliens.push({ x: 84 + col * 52, y: 90 + row * 42, alive: true });
        }
      }
      direction = 1;
      shots = [];
      bombs = [];
    };

    const burst = (x: number, y: number, color: string, count = 14) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 160;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.5 + Math.random() * 0.4,
          color,
        });
      }
    };

    const start = () => {
      lives = 3;
      points = 0;
      wave = 1;
      invulnerable = 0;
      cooldown = 0;
      bombTimer = 1.2;
      player.x = W / 2;
      sparks = [];
      spawnWave();
      running = true;
      last = performance.now();
      setScore(0);
      setPhase("playing");
      canvas.focus();
    };
    startRef.current = start;

    const end = () => {
      if (!running) return;
      running = false;
      setScore(points);
      setPhase("over");
      const previous = Number(localStorage.getItem(BEST_KEY) || 0);
      if (points > previous) {
        localStorage.setItem(BEST_KEY, String(points));
        setBest(points);
      }
    };

    spawnWave(); // show the formation behind the start screen

    const update = (dt: number) => {
      for (const star of stars) {
        star.y += star.speed * dt;
        if (star.y > H) {
          star.y = 0;
          star.x = Math.random() * W;
        }
      }
      sparks = sparks.filter((s) => {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= 0.96;
        s.vy *= 0.96;
        s.life -= dt;
        return s.life > 0;
      });
      if (!running) return;

      const keys = input.current;
      player.x += ((keys.right ? 1 : 0) - (keys.left ? 1 : 0)) * 280 * dt;
      player.x = Math.max(24, Math.min(W - 24, player.x));

      cooldown -= dt;
      if (keys.fire && cooldown <= 0 && shots.length < 3) {
        shots.push({ x: player.x, y: player.y - 18, vy: -540 });
        cooldown = 0.26;
      }
      for (const s of shots) s.y += s.vy * dt;
      shots = shots.filter((s) => s.y > -20);
      for (const b of bombs) b.y += b.vy * dt;
      bombs = bombs.filter((b) => b.y < H + 20);

      // Formation marches side to side, stepping down at the edges; speeds up as it thins out
      const alive = aliens.filter((a) => a.alive);
      const speed = 26 + wave * 12 + (28 - alive.length) * 2.4;
      const dx = direction * speed * dt;
      let minX = Number.POSITIVE_INFINITY;
      let maxX = Number.NEGATIVE_INFINITY;
      for (const a of alive) {
        minX = Math.min(minX, a.x);
        maxX = Math.max(maxX, a.x);
      }
      if (maxX + dx > W - 22 || minX + dx < 22) {
        direction *= -1;
        for (const a of aliens) a.y += 16;
      } else {
        for (const a of aliens) a.x += dx;
      }

      // Aliens drop bombs
      bombTimer -= dt;
      if (bombTimer <= 0 && alive.length > 0) {
        const shooter = alive[Math.floor(Math.random() * alive.length)];
        bombs.push({ x: shooter.x, y: shooter.y + 14, vy: 170 + wave * 22 });
        bombTimer = Math.max(0.35, 1.3 - wave * 0.12) * (0.6 + Math.random() * 0.8);
      }

      // Player shots hit aliens
      for (const s of shots) {
        for (const a of alive) {
          if (a.alive && Math.abs(s.x - a.x) < 16 && Math.abs(s.y - a.y) < 15) {
            a.alive = false;
            s.y = -999;
            points += 10 * wave;
            setScore(points);
            burst(a.x, a.y, Math.random() > 0.5 ? "#a78bfa" : "#e879f9");
            break;
          }
        }
      }

      // Bombs hit the player
      invulnerable -= dt;
      if (invulnerable <= 0) {
        for (const b of bombs) {
          if (Math.abs(b.x - player.x) < 18 && Math.abs(b.y - player.y) < 14) {
            b.y = H + 999;
            lives -= 1;
            invulnerable = 1.5;
            burst(player.x, player.y, "#2dd4bf", 24);
            if (lives <= 0) end();
            break;
          }
        }
      }

      // Aliens reach the ship: game over
      if (aliens.some((a) => a.alive && a.y > player.y - 34)) end();

      // Wave cleared
      if (running && aliens.every((a) => !a.alive)) {
        wave += 1;
        points += 50;
        setScore(points);
        spawnWave();
      }
    };

    const drawShip = (x: number, y: number, t: number) => {
      // Thruster flame
      const flame = 8 + Math.sin(t * 40) * 3;
      ctx.fillStyle = "#2dd4bf";
      ctx.beginPath();
      ctx.moveTo(x - 6, y + 8);
      ctx.lineTo(x, y + 14 + flame);
      ctx.lineTo(x + 6, y + 8);
      ctx.fill();
      // Hull
      const hull = ctx.createLinearGradient(x, y - 18, x, y + 12);
      hull.addColorStop(0, "#e879f9");
      hull.addColorStop(1, "#7c3aed");
      ctx.fillStyle = hull;
      ctx.beginPath();
      ctx.moveTo(x, y - 18);
      ctx.lineTo(x + 20, y + 12);
      ctx.lineTo(x + 7, y + 6);
      ctx.lineTo(x - 7, y + 6);
      ctx.lineTo(x - 20, y + 12);
      ctx.closePath();
      ctx.fill();
      // Cockpit
      ctx.fillStyle = "#99f6e4";
      ctx.beginPath();
      ctx.ellipse(x, y - 2, 3.5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (t: number) => {
      ctx.fillStyle = "#07060d";
      ctx.fillRect(0, 0, W, H);

      for (const star of stars) {
        ctx.fillStyle = `rgba(255,255,255,${0.25 + star.size * 0.3})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      const imageReady = alienImg.complete && alienImg.naturalWidth > 0;
      for (const a of aliens) {
        if (!a.alive) continue;
        const bob = Math.sin(t * 4 + a.x * 0.05) * 2;
        if (imageReady) ctx.drawImage(alienImg, a.x - 17, a.y - 17 + bob, 34, 34);
        else {
          ctx.fillStyle = "#8b5cf6";
          ctx.fillRect(a.x - 14, a.y - 10 + bob, 28, 20);
        }
      }

      ctx.shadowBlur = 10;
      ctx.shadowColor = "#c4b5fd";
      ctx.fillStyle = "#ede9fe";
      for (const s of shots) ctx.fillRect(s.x - 1.5, s.y - 8, 3, 14);
      ctx.shadowColor = "#f472b6";
      ctx.fillStyle = "#f472b6";
      for (const b of bombs) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      const blink = invulnerable > 0 && Math.floor(t * 12) % 2 === 0;
      if (running && !blink) drawShip(player.x, player.y, t);
      if (!running) drawShip(player.x, player.y, t);

      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life * 1.6);
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x - 2, s.y - 2, 4, 4);
      }
      ctx.globalAlpha = 1;

      // HUD
      ctx.font = "600 15px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#ede9fe";
      ctx.textAlign = "left";
      ctx.fillText(`SCORE ${points}`, 16, 28);
      ctx.textAlign = "center";
      ctx.fillStyle = "#c4b5fd";
      ctx.fillText(`WAVE ${wave}`, W / 2, 28);
      ctx.textAlign = "right";
      ctx.fillStyle = "#2dd4bf";
      ctx.fillText("♥".repeat(Math.max(0, lives)), W - 16, 28);
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      update(dt);
      draw(now / 1000);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const setKey = (event: KeyboardEvent, down: boolean) => {
      const key = event.key;
      const keys = input.current;
      if (key === "ArrowLeft" || key === "a" || key === "A") {
        keys.left = down;
        event.preventDefault();
      } else if (key === "ArrowRight" || key === "d" || key === "D") {
        keys.right = down;
        event.preventDefault();
      } else if (key === " " || key === "ArrowUp" || key === "w" || key === "W") {
        keys.fire = down;
        event.preventDefault();
        if (down && !running && !event.repeat) start();
      } else if (key === "ArrowDown") {
        event.preventDefault();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => setKey(event, true);
    const onKeyUp = (event: KeyboardEvent) => setKey(event, false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      input.current = { left: false, right: false, fire: false };
      startRef.current = () => {};
    };
  }, [open]);

  // Touch controls: hold to move / fire
  const hold = (key: "left" | "right" | "fire") => ({
    onPointerDown: (event: React.PointerEvent) => {
      event.preventDefault();
      input.current[key] = true;
    },
    onPointerUp: () => {
      input.current[key] = false;
    },
    onPointerLeave: () => {
      input.current[key] = false;
    },
    onPointerCancel: () => {
      input.current[key] = false;
    },
  });

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="alien-defender-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <Column gap="12" padding="16">
        <Row horizontal="between" vertical="center">
          <Heading as="h2" id="alien-defender-title" variant="heading-strong-m">
            Alien Defender
          </Heading>
          <IconButton
            icon="close"
            variant="tertiary"
            aria-label="Close game"
            onClick={() => dialogRef.current?.close()}
          />
        </Row>

        <div className={styles.stage}>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            tabIndex={0}
            aria-label={`Game area. Score ${score}.`}
          />
          {phase !== "playing" && (
            <div className={styles.overlay}>
              {phase === "ready" ? (
                <>
                  <Text variant="label-strong-s" style={{ color: "#c4b5fd" }}>
                    Cheat code accepted
                  </Text>
                  <Heading as="p" variant="display-strong-xs">
                    Defend the portfolio!
                  </Heading>
                  <Text variant="body-default-s" onBackground="neutral-medium" align="center">
                    ← → or A / D to move · Space to fire
                  </Text>
                </>
              ) : (
                <>
                  <Heading as="p" variant="display-strong-xs">
                    Game over
                  </Heading>
                  <Text variant="body-default-m" onBackground="neutral-medium" aria-live="polite">
                    Score {score} · Best {Math.max(best, score)}
                  </Text>
                </>
              )}
              <Button variant="primary" size="m" onClick={() => startRef.current()}>
                {phase === "ready" ? "Start" : "Play again"}
              </Button>
            </div>
          )}
        </div>

        <div className={styles.touchControls}>
          <button type="button" className={styles.touchButton} aria-label="Move left" {...hold("left")}>
            ←
          </button>
          <button type="button" className={styles.touchButton} aria-label="Fire" {...hold("fire")}>
            Fire
          </button>
          <button type="button" className={styles.touchButton} aria-label="Move right" {...hold("right")}>
            →
          </button>
        </div>

        <Text variant="body-default-xs" onBackground="neutral-weak" align="center">
          Best: {best} · Esc to close
        </Text>
      </Column>
    </dialog>
  );
}
