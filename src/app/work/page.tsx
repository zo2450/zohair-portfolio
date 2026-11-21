import { Button, Column, Heading, Meta, Row, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { WorkBento } from "@/components/work/WorkBento";
import heroStyles from "@/components/home/HomeHero.module.scss";
import styles from "@/components/work/ProjectsPage.module.scss";

export async function generateMetadata() {
  const metadata = Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default function Work() {
  return (
    <Column maxWidth="l" paddingTop="24" paddingX="l" s={{ paddingX: "0" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <section className={styles.page} aria-labelledby="projects-heading">
        <header className={styles.intro}>
          <Heading as="h1" id="projects-heading" className={styles.heading}>
            Agents I&apos;ve shipped, and the camp I started.
          </Heading>
          <Text as="p" className={styles.lede}>
            Each project leads with what changed. Open one for the problem, what I did, and the
            numbers behind it.
          </Text>
        </header>

        <WorkBento />

        <footer className={styles.closer}>
          <Text as="p" className={styles.closerText}>
            Got something that needs an agent built, or a PM who builds? Player 2, let&apos;s talk.
          </Text>
          <Row gap="12" wrap>
            <Button href={`mailto:${person.email}`} prefixIcon="email" variant="primary" size="m">
              Email me
            </Button>
            <Button
              href="/resume.pdf"
              prefixIcon="document"
              variant="secondary"
              size="m"
              className={heroStyles.glassButton}
            >
              Resume
            </Button>
          </Row>
        </footer>
      </section>
    </Column>
  );
}
