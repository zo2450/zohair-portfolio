import React from "react";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, aboutExtras, person, work } from "@/resources";
import { AboutHeader, Principles } from "@/components/about/AboutSections";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { EarlierRoles } from "@/components/about/EarlierRoles";
import { Wins } from "@/components/about/Wins";
import { ContactCard } from "@/components/home/ContactCard";
import styles from "@/components/about/AboutSections.module.scss";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

const isProduction = process.env.NODE_ENV === "production";

/**
 * About page order: header (who, now, facts, story) → how I work → experience (timeline,
 * other tools, earlier roles) → wins → contact. Every section sits on a solid surface.
 */
export default function About() {
  const experiences = about.work.experiences.filter(
    (experience) => !(isProduction && experience.hiddenInProduction),
  );

  return (
    <Column maxWidth="l" paddingX="l" s={{ paddingX: "0" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <AboutHeader />
      <Principles />

      {about.work.display && (
        <section className={styles.sheet} aria-labelledby="experience">
          <h2 id="experience" className={styles.sectionTitle}>
            {about.work.title}
          </h2>
          <ExperienceTimeline
            items={experiences.map((experience) => ({
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
              caseStudyHref: experience.caseStudy
                ? `${work.path}/${experience.caseStudy}`
                : undefined,
              // Keyed so the array can cross the server -> client boundary without warnings
              achievements: experience.achievements.map((achievement, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static content, order never changes
                <React.Fragment key={i}>{achievement}</React.Fragment>
              )),
            }))}
          />
          {aboutExtras.otherTools.length > 0 && (
            <p className={styles.otherTools}>
              <strong>Also work with: </strong>
              {aboutExtras.otherTools.join(", ")}
            </p>
          )}
          {about.work.earlier && about.work.earlier.length > 0 && (
            <EarlierRoles roles={about.work.earlier} />
          )}
        </section>
      )}

      <Wins wins={aboutExtras.wins} certificates={aboutExtras.certificates} />

      <ContactCard />
    </Column>
  );
}
