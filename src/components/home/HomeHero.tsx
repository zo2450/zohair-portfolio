import type { CSSProperties } from "react";
import { Badge, Button, Column, Heading, Row, Text } from "@once-ui-system/core";
import { home, person, work } from "@/resources";
import { HeroVisual } from "./HeroVisual";
import styles from "./HomeHero.module.scss";
import enter from "./Enter.module.scss";

/** Stagger index for the shared entrance animation (see Enter.module.scss) */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/** Two-column hero: status, headline, proof and actions on the left; interactive photo on the right. */
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
          <Row paddingBottom="24" className={enter.enter} style={step(0)}>
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
          </Row>
        )}
        <Row fillWidth paddingBottom="16" className={enter.enter} style={step(1)}>
          <Heading as="h1" wrap="balance" variant="display-strong-l">
            {home.headline}
          </Heading>
        </Row>
        <Row fillWidth paddingBottom="32" className={enter.enter} style={step(2)}>
          <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-l">
            {home.subline}
          </Text>
        </Row>
        <Row gap="12" wrap s={{ horizontal: "center" }} className={enter.enter} style={step(3)}>
          <Button href={work.path} variant="primary" size="m" arrowIcon data-border="rounded">
            See my work
          </Button>
          <Button
            href="/resume.pdf"
            prefixIcon="document"
            variant="secondary"
            size="m"
            data-border="rounded"
            className={`${styles.glassButton} ${styles.glassAccent}`}
          >
            Resume
          </Button>
          <Button
            href={`mailto:${person.email}`}
            prefixIcon="email"
            variant="secondary"
            size="m"
            data-border="rounded"
            className={styles.glassButton}
          >
            Email me
          </Button>
        </Row>
      </Column>

      <HeroVisual />
    </Row>
  );
}
