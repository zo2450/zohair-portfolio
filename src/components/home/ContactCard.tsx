import Image from "next/image";
import type { CSSProperties } from "react";
import { Button, Column, Heading, Row, SmartLink, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import { GlowCard } from "@/components/GlowCard";
import { CopyEmailButton } from "./CopyEmailButton";
import heroStyles from "./HomeHero.module.scss";
import styles from "./ContactCard.module.scss";

const delay = (seconds: number) => ({ "--delay": `${seconds}s`, height: "auto" }) as CSSProperties;
const linkedin = social.find((s) => s.name === "LinkedIn")?.link;

/** Contact section: solid card with a cursor-following glowing border and a click-to-copy email. */
export function ContactCard() {
  return (
    <GlowCard as="section" id="contact" aria-labelledby="contact-heading" className={styles.card}>
      <Row
        fillWidth
        gap="xl"
        vertical="center"
        padding="xl"
        s={{ direction: "column-reverse", padding: "l", gap: "l" }}
      >
        <Column flex={1} gap="16" s={{ horizontal: "center", align: "center" }}>
          {/* The game wink lives in the headline itself, not in a label above it */}
          <Heading
            as="h2"
            id="contact-heading"
            variant="display-strong-s"
            wrap="balance"
            className={styles.centerOnMobile}
          >
            Player 2, ready? Let&apos;s build something agentic.
          </Heading>
          <Text
            variant="body-default-l"
            onBackground="neutral-medium"
            wrap="balance"
            className={styles.centerOnMobile}
          >
            Have an AI product, an automation, or a PM role in mind? Email is the fastest way to
            reach me.
          </Text>
          <Row gap="12" wrap paddingTop="8" vertical="center" s={{ horizontal: "center" }}>
            <CopyEmailButton email={person.email} />
            {linkedin && (
              <Button
                href={linkedin}
                prefixIcon="linkedin"
                variant="secondary"
                size="l"
                data-border="rounded"
                className={heroStyles.glassButton}
              >
                LinkedIn
              </Button>
            )}
            <Button
              href="/resume.pdf"
              prefixIcon="document"
              variant="secondary"
              size="l"
              data-border="rounded"
              className={`${heroStyles.glassButton} ${heroStyles.glassAccent}`}
            >
              Resume
            </Button>
          </Row>
          <SmartLink
            href={`mailto:${person.email}`}
            style={{ margin: 0, minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            <Text variant="body-default-s" onBackground="neutral-weak">
              or open it in your mail app
            </Text>
          </SmartLink>
        </Column>

        <div className={styles.photoWrap}>
          <Image
            src="/images/contact.jpg"
            alt={`${person.firstName} giving a thumbs up`}
            width={280}
            height={280}
            className={styles.photo}
          />
          {/* 3D icons: Microsoft Fluent Emoji (MIT), see public/images/icons/LICENSE-fluentui-emoji.txt */}
          <Image
            src="/images/icons/joystick.png"
            unoptimized
            alt=""
            aria-hidden
            width={256}
            height={256}
            className={`${styles.float} ${styles.bottomLeft}`}
            style={delay(0)}
          />
          <Image
            src="/images/icons/alien-monster.png"
            unoptimized
            alt=""
            aria-hidden
            width={256}
            height={256}
            className={`${styles.float} ${styles.topRight}`}
            style={delay(0.6)}
          />
        </div>
      </Row>
    </GlowCard>
  );
}
