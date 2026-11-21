import { Badge, Button, Column, Heading, RevealFx, Row, Text } from "@once-ui-system/core";
import { home, person, work } from "@/resources";
import { HeroVisual } from "./HeroVisual";

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
          <Heading as="h1" wrap="balance" variant="display-strong-l">
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
              href="/resume.pdf"
              prefixIcon="document"
              variant="secondary"
              size="m"
              data-border="rounded"
            >
              Resume
            </Button>
            <Button
              href={`mailto:${person.email}`}
              prefixIcon="email"
              variant="tertiary"
              size="m"
              data-border="rounded"
            >
              Email me
            </Button>
          </Row>
        </RevealFx>
      </Column>

      <HeroVisual />
    </Row>
  );
}
