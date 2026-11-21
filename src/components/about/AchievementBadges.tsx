"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Column, Heading, Icon, IconButton, Row, Text } from "@once-ui-system/core";
import type { AboutExtras } from "@/types";
import styles from "./AboutSections.module.scss";

type Achievement = AboutExtras["achievements"][number];

/** Compact achievement badges; ones with a certificate image open it in a dialog. */
export function AchievementBadges({ items }: { items: Achievement[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Achievement | null>(null);

  const show = (item: Achievement) => {
    setOpen(item);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <div className={styles.grid3}>
        {items.map((item) => (
          <button
            type="button"
            key={item.title}
            className={styles.badge}
            onClick={() => item.image && show(item)}
            disabled={!item.image}
            aria-label={
              item.image
                ? `${item.title}, ${item.issuer}. View certificate`
                : `${item.title}, ${item.issuer}. ${item.detail}`
            }
          >
            <span
              className={`${styles.iconTile} ${item.icon === "trophy" ? styles.gold : ""}`}
              aria-hidden="true"
            >
              <Icon name={item.icon} size="s" />
            </span>
            <Column gap="2" minWidth={0}>
              <Text variant="label-strong-m">{item.title}</Text>
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {item.issuer} · {item.detail}
              </Text>
            </Column>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="achievement-title"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {open && (
          <Column gap="16" padding="24">
            <Row horizontal="between" vertical="start" gap="16">
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {open.issuer} · {open.detail}
                </Text>
                <Heading as="h3" id="achievement-title" variant="heading-strong-l">
                  {open.title}
                </Heading>
              </Column>
              <IconButton icon="close" variant="tertiary" aria-label="Close" onClick={close} />
            </Row>
            {open.image && (
              <Image
                src={open.image}
                alt={`${open.issuer} ${open.title} certificate`}
                width={1200}
                height={900}
              />
            )}
          </Column>
        )}
      </dialog>
    </>
  );
}
