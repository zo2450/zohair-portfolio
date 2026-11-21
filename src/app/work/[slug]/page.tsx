import { notFound } from "next/navigation";
import "katex/dist/katex.min.css";
import { getPosts } from "@/utils/utils";
import { canViewPath } from "@/utils/pageAccessServer";
import {
  Meta,
  Schema,
  AvatarGroup,
  Button,
  Column,
  Flex,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Avatar,
  Line,
  Tag,
} from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { WorkBento } from "@/components/work/WorkBento";

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
    title: post.metadata.title,
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
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
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
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">Case studies</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.timeframe ||
            (post.metadata.publishedAt && formatDate(post.metadata.publishedAt))}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
        {post.metadata.summary && (
          <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance">
            {post.metadata.summary}
          </Text>
        )}
      </Column>
      {(post.metadata.role || post.metadata.outcomes?.length) && (
        <Column
          maxWidth="s"
          gap="20"
          padding="l"
          radius="l"
          border="brand-alpha-medium"
          background="brand-alpha-weak"
          style={{ backdropFilter: "blur(var(--static-space-4))" }}
          aria-label="Case study summary"
        >
          <Row gap="xl" wrap s={{ gap: "l" }}>
            {post.metadata.role && (
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Role
                </Text>
                <Text variant="body-strong-m">{post.metadata.role}</Text>
              </Column>
            )}
            {post.metadata.timeframe && (
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Timeline
                </Text>
                <Text variant="body-strong-m">{post.metadata.timeframe}</Text>
              </Column>
            )}
            {post.metadata.tools && post.metadata.tools.length > 0 && (
              <Column gap="4">
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Tools
                </Text>
                <Text variant="body-strong-m">{post.metadata.tools.join(", ")}</Text>
              </Column>
            )}
          </Row>
          {post.metadata.outcomes && post.metadata.outcomes.length > 0 && (
            <Column gap="8">
              <Text variant="label-default-s" onBackground="neutral-weak">
                Results
              </Text>
              <Row gap="8" wrap>
                {post.metadata.outcomes.map((outcome) => (
                  <Tag key={outcome} size="l">
                    {outcome}
                  </Tag>
                ))}
              </Row>
            </Column>
          )}
        </Column>
      )}
      <Row marginBottom="32" horizontal="center">
        <Row gap="16" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="s" />}
          <Text variant="label-default-m" onBackground="brand-weak">
            {post.metadata.team?.map((member, idx) => (
              <span key={idx}>
                {idx > 0 && (
                  <Text as="span" onBackground="neutral-weak">
                    ,{" "}
                  </Text>
                )}
                <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
              </span>
            ))}
          </Text>
        </Row>
      </Row>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt={`${post.metadata.title} cover image`}
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={post.content} />
      </Column>
      <Column fillWidth gap="40" horizontal="center" marginTop="40">
        <Line maxWidth="40" />
        <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
          More projects
        </Heading>
        <WorkBento exclude={[post.slug]} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
