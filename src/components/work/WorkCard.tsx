"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Heading, Row, Tag, Text } from "@once-ui-system/core";
import styles from "./WorkBento.module.scss";

export interface WorkCardProps {
  href: string;
  title: string;
  summary: string;
  role?: string;
  image?: string;
  outcomes?: string[];
  /** Grid columns this card spans (1–3) */
  span: number;
  priority?: boolean;
}

const MAX_TILT = 7; // degrees

/**
 * Case study card: 3D tilt toward the pointer (layers lift at different depths) and a glowing
 * border segment that follows the pointer around the edge. Tilt is mouse-only and off with
 * reduced motion; keyboard focus shows the glow.
 */
export function WorkCard({
  href,
  title,
  summary,
  role,
  image,
  outcomes,
  span,
  priority,
}: WorkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 90;
    el.style.setProperty("--angle", `${angle.toFixed(1)}deg`);
    el.style.setProperty("--glow", "1");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rx = (y / rect.height - 0.5) * -2 * MAX_TILT;
    const ry = (x / rect.width - 0.5) * 2 * MAX_TILT;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glow", "0");
  };

  return (
    <div className={styles.cell} style={{ gridColumn: `span ${span}` }}>
      <Link
        ref={ref}
        href={href}
        className={styles.card}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className={styles.glow} aria-hidden="true" />
        {image && (
          <div className={`${styles.layer} ${styles.cover}`}>
            <Image
              src={image}
              alt=""
              fill
              priority={priority}
              sizes={
                span > 1 ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 380px"
              }
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <div className={`${styles.layer} ${styles.body}`}>
          {role && (
            <Text variant="label-default-s" onBackground="neutral-weak">
              {role}
            </Text>
          )}
          <Heading as="h3" variant="heading-strong-l" wrap="balance">
            {title}
          </Heading>
          <Text variant="body-default-s" onBackground="neutral-weak" wrap="balance">
            {summary}
          </Text>
          {outcomes && outcomes.length > 0 && (
            <Row gap="8" wrap paddingTop="4">
              {outcomes.slice(0, span > 1 ? 3 : 2).map((outcome) => (
                <Tag key={outcome} size="m">
                  {outcome}
                </Tag>
              ))}
            </Row>
          )}
          <Text variant="label-strong-s" className={styles.cta}>
            Read case study →
          </Text>
        </div>
      </Link>
    </div>
  );
}
