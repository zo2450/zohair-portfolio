import Image from "next/image";
import type { CSSProperties } from "react";
import { Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./ContactCard.module.scss";

const delay = (seconds: number) => ({ "--delay": `${seconds}s`, height: "auto" }) as CSSProperties;
const linkedin = social.find((s) => s.name === "LinkedIn")?.link;

/** Glowing contact card with direct links (no form backend). */
export function ContactCard() {
  return (
    <Row
      as="section"
      id="contact"
      aria-labelledby="contact-heading"
      fillWidth
      className={styles.card}
      background="surface"
      radius="xl"
      padding="xl"
      gap="xl"
      vertical="center"
      s={{ direction: "column", padding: "l", gap: "l" }}
    >
      <Column flex={1} gap="16" s={{ horizontal: "center", align: "center" }}>
        <Heading as="h2" id="contact-heading" variant="display-strong-s">
          Drop me a line
        </Heading>
        <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
          Want to collaborate, hire me, or just say hi? Email is the fastest way to reach me.
        </Text>
        <Row gap="12" wrap paddingTop="8" s={{ horizontal: "center" }}>
          <Button href={`mailto:${person.email}`} prefixIcon="email" variant="primary" size="m">
            Email me
          </Button>
          {linkedin && (
            <Button href={linkedin} prefixIcon="linkedin" variant="secondary" size="m">
              LinkedIn
            </Button>
          )}
          <Button href="/resume.pdf" prefixIcon="document" variant="tertiary" size="m">
            Resume
          </Button>
        </Row>
      </Column>

      <div className={styles.photoWrap}>
        <Image
          src="/images/contact.jpg"
          alt={`${person.firstName} giving a thumbs up`}
          width={280}
          height={280}
          className={styles.photo}
        />
        <Image
          src="/images/icons/figma.png"
          unoptimized
          alt=""
          aria-hidden
          width={72}
          height={72}
          className={`${styles.float} ${styles.topRight}`}
          style={delay(0)}
        />
        <Image
          src="/images/icons/js.png"
          unoptimized
          alt=""
          aria-hidden
          width={64}
          height={64}
          className={`${styles.float} ${styles.bottomRight}`}
          style={delay(0.4)}
        />
        <Image
          src="/images/icons/ga.png"
          unoptimized
          alt=""
          aria-hidden
          width={464}
          height={235}
          className={`${styles.float} ${styles.bottomLeft}`}
          style={delay(0.8)}
        />
      </div>
    </Row>
  );
}
