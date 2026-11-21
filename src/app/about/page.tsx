import React from "react";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, aboutExtras, person, work } from "@/resources";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { RolesCarousel } from "@/components/about/RolesCarousel";
import { AchievementBadges } from "@/components/about/AchievementBadges";
import {
  AboutHeader,
  Education,
  Loadout,
  NowStrip,
  Principles,
  SectionHeading,
  SideQuests,
} from "@/components/about/AboutSections";
import { ContactCard } from "@/components/home/ContactCard";

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

/**
 * About page order: header (character sheet + story) → now → how I work → experience
 * → loadout → achievements → education → side quests → contact.
 */
export default function About() {
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
      <NowStrip />
      <Principles />

      {about.work.display && (
        <section style={{ width: "100%", marginBottom: "var(--static-space-64)" }}>
          <SectionHeading eyebrow="Main quest" title={about.work.title} id="experience" />
          <ExperienceTimeline
            items={about.work.experiences.map((experience) => ({
              company: experience.company,
              role: experience.role,
              timeframe: experience.timeframe,
              logo: experience.logo,
              logoIcon: experience.logoIcon,
              logoText: experience.logoText,
              logoColor: experience.logoColor,
              highlight: experience.highlight,
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
          {about.work.earlier && about.work.earlier.length > 0 && (
            <Column fillWidth gap="16">
              <Column gap="4">
                <h3 style={{ margin: 0, fontSize: "var(--font-size-heading-xl, 1.5rem)" }}>
                  Earlier roles
                </h3>
              </Column>
              <RolesCarousel roles={about.work.earlier} />
            </Column>
          )}
        </section>
      )}

      <Loadout />

      <section style={{ width: "100%", marginBottom: "var(--static-space-64)" }}>
        <SectionHeading eyebrow="Trophy case" title="Achievements unlocked" id="achievements" />
        <AchievementBadges items={aboutExtras.achievements} />
      </section>

      <Education />
      <SideQuests />
      <ContactCard />
    </Column>
  );
}
