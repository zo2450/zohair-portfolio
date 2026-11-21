import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import { canViewPath } from "@/utils/pageAccessServer";
import Link from "next/link";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Icon,
  Media,
  Text,
  SmartLink,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { WorkBento } from "@/components/work/WorkBento";
import heroStyles from "@/components/home/HomeHero.module.scss";
import styles from "@/components/work/CaseStudy.module.scss";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const metadata = Meta.generate({
    title: `${post.metadata.title} – ${person.name}`,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
  // Meta.generate writes a canonical only alongside language alternates.
  return { ...metadata, alternates: { canonical: metadata.openGraph.url } };
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  // Password-protected: render nothing without access (RouteGuard shows the form).
  if (!(await canViewPath(`${work.path}/${post.slug}`))) {
    return null;
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
      "aria-label": person.name,
    })) || [];

  return (
    <Column maxWidth="m" horizontal="center" gap="40">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <section className={styles.sheet} aria-labelledby="case-study-title">
        <Link href="/work" className={styles.back}>
          <Icon name="arrowRight" size="s" className={styles.backIcon} />
          All projects
        </Link>
        <h1 id="case-study-title" className={styles.title}>
          {post.metadata.headline || post.metadata.title}
        </h1>
        {post.metadata.summary && <p className={styles.lede}>{post.metadata.summary}</p>}

        {(post.metadata.role || post.metadata.outcomes?.length) && (
          <dl className={styles.facts} aria-label="Project summary">
            <div>
              <dt>Project</dt>
              <dd>{post.metadata.title}</dd>
            </div>
            {post.metadata.role && (
              <div>
                <dt>Role</dt>
                <dd>{post.metadata.role}</dd>
              </div>
            )}
            {post.metadata.timeframe && (
              <div>
                <dt>Timeline</dt>
                <dd>{post.metadata.timeframe}</dd>
              </div>
            )}
            {post.metadata.tools && post.metadata.tools.length > 0 && (
              <div>
                <dt>Tools</dt>
                <dd>{post.metadata.tools.join(", ")}</dd>
              </div>
            )}
            {post.metadata.outcomes && post.metadata.outcomes.length > 0 && (
              <div className={styles.results}>
                <dt>Results</dt>
                <dd>
                  <ul>
                    {post.metadata.outcomes.map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        )}
        {post.metadata.team.length > 0 && (
          <Row gap="16" vertical="center" marginTop="24">
            <AvatarGroup reverse avatars={avatars} size="s" />
            <Text variant="label-default-m" onBackground="neutral-medium">
              {post.metadata.team.map((member, idx) => (
                <span key={member.name}>
                  {idx > 0 && ", "}
                  <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                </span>
              ))}
            </Text>
          </Row>
        )}
        {post.metadata.images.length > 0 && (
          <Media
            priority
            aspectRatio="16 / 9"
            radius="m"
            marginTop="40"
            alt={`${post.metadata.title} cover image`}
            src={post.metadata.images[0]}
          />
        )}
        <article className={styles.article}>
          <CustomMDX source={post.content} />
        </article>

        <footer className={styles.closer}>
          <p>Want the longer version of this story? I&apos;m happy to walk through it.</p>
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

      <section className={styles.more} aria-labelledby="more-projects">
        <h2 id="more-projects" className={styles.moreHeading}>
          More projects
        </h2>
        <WorkBento exclude={[post.slug]} headingLevel="h3" />
      </section>
      <ScrollToHash />
    </Column>
  );
}
