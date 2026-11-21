import Image from "next/image";
import { Button, Column, Heading, Icon, Row, Tag, Text } from "@once-ui-system/core";
import { about, aboutExtras, person, social } from "@/resources";
import type { IconName } from "@/resources/icons";
import { GlowCard } from "@/components/GlowCard";
import heroStyles from "@/components/home/HomeHero.module.scss";
import styles from "./AboutSections.module.scss";

const isPlaceholder = (text: string) => text.startsWith("[") && text.endsWith("]");
/** Placeholders show (amber) in dev previews only; the live site never shows them. */
const showPlaceholders = process.env.NODE_ENV !== "production";

/** Renders "[placeholder]" text in amber italics in dev, and nothing in production. */
function Copy({ text }: { text: string }) {
  if (isPlaceholder(text)) {
    return showPlaceholders ? <span className={styles.placeholder}>{text}</span> : null;
  }
  return <span>{text}</span>;
}

function IconTile({ name }: { name: IconName }) {
  return (
    <span className={styles.iconTile} aria-hidden="true">
      <Icon name={name} size="s" />
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  id,
}: { eyebrow: string; title: string; id: string }) {
  return (
    <Column gap="4" marginBottom="24">
      <Text variant="label-strong-s" className={styles.eyebrow}>
        {eyebrow}
      </Text>
      <Heading as="h2" id={id} variant="display-strong-s">
        {title}
      </Heading>
    </Column>
  );
}

/** Header "character sheet": photo, name, role, stats, links and the intro story. */
export function AboutHeader() {
  return (
    <GlowCard as="section" aria-labelledby="about-name" className={styles.section}>
      <div className={styles.header}>
        <Image
          src={person.avatar}
          alt={`Portrait of ${person.name}`}
          width={400}
          height={400}
          priority
          className={styles.headerPhoto}
        />
        <Column gap="16" s={{ horizontal: "center" }}>
          <Column gap="4">
            <Heading as="h1" id="about-name" variant="display-strong-l">
              {person.name}
            </Heading>
            <Text variant="heading-default-l" onBackground="neutral-weak">
              {person.role}
            </Text>
          </Column>
          <dl className={styles.stats}>
            {aboutExtras.characterSheet.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <Row gap="8" wrap s={{ horizontal: "center" }}>
            {social
              .filter((item) => item.essential && item.link)
              .map((item) => (
                <Button
                  key={item.name}
                  href={item.link}
                  prefixIcon={item.icon}
                  size="s"
                  variant="secondary"
                  data-border="rounded"
                  className={
                    item.name === "Resume"
                      ? `${heroStyles.glassButton} ${heroStyles.glassAccent}`
                      : heroStyles.glassButton
                  }
                >
                  {item.name}
                </Button>
              ))}
          </Row>
        </Column>
        {about.intro.display && (
          <Column className={styles.intro} textVariant="body-default-l" gap="m">
            {about.intro.description}
          </Column>
        )}
      </div>
    </GlowCard>
  );
}

/** "Now" strip: what's happening at the moment, with a last-updated date. */
export function NowStrip() {
  const { now } = aboutExtras;
  return (
    <section className={styles.section} aria-labelledby="now">
      <Row horizontal="between" vertical="end" wrap gap="8" marginBottom="16">
        <Column gap="4">
          <Text variant="label-strong-s" className={styles.eyebrow}>
            Status
          </Text>
          <Heading as="h2" id="now" variant="heading-strong-xl">
            Right now
          </Heading>
        </Column>
        <Text variant="label-default-s" onBackground="neutral-weak">
          Updated {now.updated}
        </Text>
      </Row>
      <div className={styles.grid3}>
        {now.items
          .filter((item) => showPlaceholders || !isPlaceholder(item.value))
          .map((item) => (
            <Row key={item.label} className={styles.panel} gap="12" vertical="center">
              <IconTile name={item.icon} />
              <Column gap="2" minWidth={0}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {item.label}
                </Text>
                <Text variant="body-strong-m">
                  <Copy text={item.value} />
                </Text>
              </Column>
            </Row>
          ))}
      </div>
    </section>
  );
}

/** "How I work" principles. */
export function Principles() {
  return (
    <section className={styles.section} aria-labelledby="how-i-work">
      <SectionHeading eyebrow="Playstyle" title="How I work" id="how-i-work" />
      <div className={styles.grid2}>
        {aboutExtras.principles.map((principle) => (
          <Column key={principle.title} className={styles.panel} gap="12">
            <IconTile name={principle.icon} />
            <Text variant="heading-strong-m">{principle.title}</Text>
            <Text variant="body-default-m" onBackground="neutral-medium">
              {principle.description}
            </Text>
          </Column>
        ))}
      </div>
    </section>
  );
}

/** Tools grouped by area (no skill bars). */
export function Loadout() {
  return (
    <section className={styles.section} aria-labelledby="loadout">
      <SectionHeading eyebrow="Inventory" title="Loadout" id="loadout" />
      <div className={styles.grid3}>
        {aboutExtras.loadout.map((group) => (
          <Column key={group.title} className={styles.panel} gap="12">
            <Text variant="label-strong-m">{group.title}</Text>
            <Row gap="8" wrap>
              {group.tools.map((tool) => (
                <Tag key={tool} size="m">
                  {tool}
                </Tag>
              ))}
            </Row>
          </Column>
        ))}
      </div>
    </section>
  );
}

/** Education card with school logo. */
export function Education() {
  return (
    <section className={styles.section} aria-labelledby="education">
      <SectionHeading eyebrow="Training grounds" title={about.studies.title} id="education" />
      <Column gap="12">
        {about.studies.institutions.map((institution) => (
          <Row key={institution.name} className={styles.panel} gap="16" vertical="center">
            {institution.logo ? (
              <Image
                src={institution.logo}
                alt=""
                width={56}
                height={56}
                style={{ borderRadius: 12, background: "#fff", objectFit: "contain", padding: 6 }}
              />
            ) : (
              <IconTile name="graduation" />
            )}
            <Column gap="4">
              <Text variant="heading-strong-m">{institution.name}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {institution.description}
              </Text>
            </Column>
          </Row>
        ))}
      </Column>
    </section>
  );
}

/** Hobbies and life outside work. */
export function SideQuests() {
  return (
    <section className={styles.section} aria-labelledby="side-quests">
      <SectionHeading eyebrow="Off the clock" title="Side quests" id="side-quests" />
      <div className={styles.grid4}>
        {aboutExtras.sideQuests.map((quest) => (
          <Column key={quest.title} className={styles.panel} gap="12">
            <IconTile name={quest.icon} />
            <Text variant="heading-strong-s">{quest.title}</Text>
            <Text variant="body-default-s" onBackground="neutral-medium">
              <Copy text={quest.description} />
            </Text>
          </Column>
        ))}
      </div>
    </section>
  );
}
