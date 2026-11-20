import Image from "next/image";
import type { CSSProperties } from "react";
import {
  Avatar,
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  RevealFx,
  Row,
  Text,
} from "@once-ui-system/core";
import { about, home, person, work } from "@/resources";
import styles from "./HomeHero.module.scss";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

/** Two-column hero: headline on the left, photo with floating game-themed badges on the right. */
export function HomeHero() {
  return (
    <Row
      fillWidth
      gap="xl"
      vertical="center"
      horizontal="between"
      paddingX="l"
      s={{ direction: "column-reverse", gap: "l", paddingX: "8" }}
    >
      <Column flex={1} gap="0" s={{ horizontal: "center", align: "center" }}>
        {home.featured.display && (
          <RevealFx horizontal="start" paddingBottom="24" s={{ horizontal: "center" }}>
            <Badge
              background="brand-alpha-weak"
              paddingX="12"
              paddingY="4"
              onBackground="neutral-strong"
              textVariant="label-default-s"
              arrow={false}
              href={home.featured.href}
            >
              <Row paddingY="2">{home.featured.title}</Row>
            </Badge>
          </RevealFx>
        )}
        <RevealFx translateY="4" horizontal="start" paddingBottom="16" s={{ horizontal: "center" }}>
          <Heading wrap="balance" variant="display-strong-l">
            {home.headline}
          </Heading>
        </RevealFx>
        <RevealFx
          translateY="8"
          delay={200}
          horizontal="start"
          paddingBottom="32"
          s={{ horizontal: "center" }}
        >
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
            {home.subline}
          </Text>
        </RevealFx>
        <RevealFx delay={400} horizontal="start" s={{ horizontal: "center" }}>
          <Row gap="12" wrap s={{ horizontal: "center" }}>
            <Button href={work.path} variant="primary" size="m" arrowIcon data-border="rounded">
              See my work
            </Button>
            <Button
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              data-border="rounded"
            >
              <Row gap="8" vertical="center" paddingRight="4">
                <Avatar
                  style={{ marginLeft: "-0.75rem" }}
                  src={person.avatar}
                  size="m"
                  aria-hidden
                />
                About me
              </Row>
            </Button>
          </Row>
        </RevealFx>
      </Column>

      <div className={styles.photoWrap}>
        <Image
          src={person.avatar}
          alt={`${person.name} in a suit and sunglasses, smiling outdoors`}
          width={320}
          height={320}
          priority
          className={styles.photo}
        />
        <Image
          src="/images/icons/controller.png"
          alt=""
          aria-hidden
          width={110}
          height={110}
          className={`${styles.float} ${styles.controller}`}
          style={delay(0.8)}
        />
        <span
          className={`${styles.float} ${styles.badge} ${styles.robot}`}
          style={delay(1)}
          title="AI agents"
          aria-hidden
        >
          <Icon name="robot" size="l" onBackground="brand-strong" />
        </span>
        <span
          className={`${styles.float} ${styles.badge} ${styles.mountain}`}
          style={delay(1.2)}
          title="Rock climbing"
          aria-hidden
        >
          <Icon name="mountain" size="l" onBackground="accent-strong" />
        </span>
      </div>
    </Row>
  );
}
