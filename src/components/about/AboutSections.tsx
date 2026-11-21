import Image from "next/image";
import { Button, Row } from "@once-ui-system/core";
import { about, aboutExtras, person, social } from "@/resources";
import { StatusDot } from "@/components/StatusDot";
import heroStyles from "@/components/home/HomeHero.module.scss";
import styles from "./AboutSections.module.scss";

/** Header: photo, name, role, what's happening now, a few plain facts, links, and the story. */
export function AboutHeader() {
  return (
    <section className={`${styles.sheet} ${styles.header}`} aria-labelledby="about-name">
      <Image
        src={person.avatar}
        alt={`Portrait of ${person.name}`}
        width={400}
        height={400}
        priority
        className={styles.photo}
      />
      <div className={styles.identity}>
        <h1 id="about-name" className={styles.name}>
          {person.name}
        </h1>
        <p className={styles.role}>{person.role}</p>
        <p className={styles.now}>
          <StatusDot />
          <span>
            <span className={styles.nowLabel}>Now: </span>
            {aboutExtras.now}
          </span>
        </p>
        <dl className={styles.stats}>
          {aboutExtras.stats.map((stat) => (
            <div key={stat.label}>
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
                size="l"
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
      </div>
      {about.intro.display && <div className={styles.story}>{about.intro.description}</div>}
    </section>
  );
}

/** "How I work": a plain typographic list of principles, each backed by a result. */
export function Principles() {
  return (
    <section className={styles.sheet} aria-labelledby="how-i-work">
      <h2 id="how-i-work" className={styles.sectionTitle}>
        How I work
      </h2>
      <dl className={styles.principles}>
        {aboutExtras.principles.map((principle) => (
          <div key={principle.title} className={styles.principle}>
            <dt>{principle.title}</dt>
            <dd>{principle.description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
