import type { CSSProperties } from "react";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import enter from "@/components/home/Enter.module.scss";
import { home, about, person, baseURL } from "@/resources";
import { WorkBento } from "@/components/work/WorkBento";
import projectStyles from "@/components/work/ProjectsPage.module.scss";
import { HomeHero } from "@/components/home/HomeHero";
import { MetricsStrip } from "@/components/home/MetricsStrip";
import { ContactCard } from "@/components/home/ContactCard";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default function Home() {
  return (
    <Column maxWidth="l" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <HomeHero />
      <div className={enter.enter} style={{ "--i": 4, width: "100%" } as CSSProperties}>
        <MetricsStrip />
      </div>
      <section className={projectStyles.page} aria-labelledby="selected-projects">
        <Heading as="h2" id="selected-projects" variant="display-strong-s" marginBottom="24">
          Selected projects
        </Heading>
        <WorkBento headingLevel="h3" />
      </section>
      <ContactCard />
    </Column>
  );
}
