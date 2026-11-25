import { Fragment } from "react";
import Image from "next/image";
import { Button } from "@once-ui-system/core";
import { about, aboutExtras, person, social, work } from "@/resources";
import { ContactCard } from "@/components/home/ContactCard";
import heroStyles from "@/components/home/HomeHero.module.scss";
import { isProduction, hook, lookingFor, wins } from "./data";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { EarlierRoles } from "./EarlierRoles";
import earlierStyles from "./EarlierRoles.module.scss";
import { PlayGameButton } from "./AboutBits";
import { HowIWork } from "./HowIWork";
import { ProjectEmbed, miniProjects } from "./ProjectEmbed";
import styles from "./AboutPage.module.scss";

/**
 * About page: a bento of facts. Hero with the hook, then mixed-size cards that each carry one
 * real fact or a live mini project (each in its own repo), then a plain timeline, wins and contact.
 */
export function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {/* Hero */}
        <section className={`${styles.card} ${styles.hero}`} aria-labelledby="about-name">
          <Image
            src={person.avatar}
            alt={`Portrait of ${person.name}`}
            width={360}
            height={360}
            priority
            className={styles.photo}
          />
          <div className={styles.heroText}>
            <h1 id="about-name" className={styles.title}>
              Hi, I&apos;m Zohair.
            </h1>
            <p className={styles.lede}>
              {hook} {lookingFor}
            </p>
            <div className={styles.actions}>
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
            </div>
          </div>
        </section>

        {/* Mini project: pocket island */}
        <ProjectEmbed
          project={miniProjects.island}
          title="Pocket island: a 3D island of my story. Drag to spin, tap a place."
          className={styles.island}
          fallback={<p className={styles.caption}>A tiny 3D island of my story: Toronto, Laurier, GameCraft Camp, work and games.</p>}
        />

        {/* GameCraft */}
        <section className={`${styles.card} ${styles.camp}`} aria-labelledby="camp-title">
          <h2 id="camp-title" className={styles.cardTitle}>
            1,500+ kids have built their first game at the camp I co-founded.
          </h2>
          <p className={styles.caption}>GameCraft Camp, since 2023. Ages 8 to 12, in C++.</p>
          <PlayGameButton className={styles.playButton} />
        </section>

        {/* Mini project: inbox agent */}
        <ProjectEmbed
          project={miniProjects.inbox}
          title="Inbox agent demo: watch an agent triage a shared inbox"
          className={styles.inbox}
          fallback={<p className={styles.caption}>An agent that triages a food bank's shared inbox: labels, FAQ lookups and draft replies.</p>}
        />

        {/* How I work */}
        <section className={`${styles.card} ${styles.work}`} aria-labelledby="work-title">
          <HowIWork titleId="work-title" />
        </section>

      </div>

      <section className={styles.sheet} aria-labelledby="experience">
        <h2 id="experience" className={styles.sectionTitle}>
          Experience
        </h2>
        <ExperienceTimeline
          items={about.work.experiences
            .filter((experience) => !(isProduction && experience.hiddenInProduction))
            .map((experience) => ({
              company: experience.company,
              role: experience.role,
              timeframe: experience.timeframe,
              logo: experience.logo,
              logoIcon: experience.logoIcon,
              logoText: experience.logoText,
              logoColor: experience.logoColor,
              headline: experience.headline,
              tags: experience.tags,
              current: experience.current,
              expanded: experience.expanded,
              caseStudyHref: experience.caseStudy ? `${work.path}/${experience.caseStudy}` : undefined,
              // Keyed so the array can cross the server -> client boundary without warnings
              achievements: experience.achievements.map((achievement, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content, order never changes
                <Fragment key={i}>{achievement}</Fragment>
              )),
            }))}
        />
        {aboutExtras.otherTools.length > 0 && (
          <p className={earlierStyles.otherTools}>
            <strong>Also work with: </strong>
            {aboutExtras.otherTools.join(", ")}
          </p>
        )}
        {about.work.earlier && about.work.earlier.length > 0 && <EarlierRoles roles={about.work.earlier} />}
        <h2 className={styles.subTitle}>Wins</h2>
        <ul className={styles.wins}>
          {wins.map((win) => (
            <li key={win.title}>
              <strong>{win.title}</strong>
              <span>
                {win.detail}, {win.date}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <ContactCard />
    </div>
  );
}
