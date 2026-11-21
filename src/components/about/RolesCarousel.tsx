"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Column, Heading, IconButton, Row, Text } from "@once-ui-system/core";
import styles from "./RolesCarousel.module.scss";

export interface CarouselRole {
  company: string;
  role: string;
  timeframe: string;
  logo?: string;
  achievements?: string[];
}

// Card glow colours cycle through the background ribbon palette
const TINTS = ["#4f46e5", "#7c3aed", "#a855f7", "#d946ef", "#14b8a6"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

/**
 * Horizontal card carousel (in the style of Aceternity's Apple Cards Carousel).
 * Cards scroll with snap points and arrow buttons; clicking a card opens its details in a
 * native <dialog> (Esc / close button to dismiss, focus handled by the browser).
 */
export function RolesCarousel({ roles }: { roles: CarouselRole[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<CarouselRole | null>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  const show = (role: CarouselRole) => {
    setOpen(role);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <Column fillWidth gap="16">
      <div ref={trackRef} className={styles.track}>
        {roles.map((role, index) => (
          <button
            type="button"
            key={`${role.company}-${role.role}-${index}`}
            className={styles.card}
            style={{ "--tint": TINTS[index % TINTS.length] } as React.CSSProperties}
            onClick={() => show(role)}
            aria-label={`${role.role} at ${role.company}, ${role.timeframe}. Open details`}
          >
            <span className={styles.logo} aria-hidden="true">
              {role.logo ? (
                <Image src={role.logo} alt="" width={72} height={72} unoptimized />
              ) : (
                <span className={styles.initials}>{initials(role.company)}</span>
              )}
            </span>
            <span className={styles.meta}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                {role.timeframe}
              </Text>
              <Text variant="heading-strong-s" wrap="balance">
                {role.role}
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {role.company}
              </Text>
            </span>
          </button>
        ))}
      </div>

      <Row gap="8" horizontal="end">
        <IconButton
          icon="arrowRight"
          variant="secondary"
          aria-label="Scroll roles left"
          style={{ transform: "scaleX(-1)" }}
          onClick={() => scrollBy(-1)}
        />
        <IconButton
          icon="arrowRight"
          variant="secondary"
          aria-label="Scroll roles right"
          onClick={() => scrollBy(1)}
        />
      </Row>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="role-dialog-title"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close(); // click on backdrop
        }}
      >
        {open && (
          <Column gap="16" padding="32">
            <Row horizontal="between" vertical="start" gap="16">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {open.timeframe}
                </Text>
                <Heading as="h3" id="role-dialog-title" variant="heading-strong-xl">
                  {open.role}
                </Heading>
                <Text variant="body-default-m" style={{ color: "#c4b5fd" }}>
                  {open.company}
                </Text>
              </Column>
              <IconButton icon="close" variant="tertiary" aria-label="Close" onClick={close} />
            </Row>
            {open.achievements && open.achievements.length > 0 ? (
              <Column as="ul" gap="12" style={{ margin: 0, paddingLeft: "var(--static-space-20)" }}>
                {open.achievements.map((achievement) => (
                  <Text
                    as="li"
                    key={achievement}
                    variant="body-default-m"
                    onBackground="neutral-medium"
                  >
                    {achievement}
                  </Text>
                ))}
              </Column>
            ) : (
              <Text variant="body-default-m" onBackground="neutral-weak">
                Details coming soon.
              </Text>
            )}
          </Column>
        )}
      </dialog>
    </Column>
  );
}
