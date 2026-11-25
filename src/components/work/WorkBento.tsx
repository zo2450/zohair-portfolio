import { getPosts } from "@/utils/utils";
import { WorkCard } from "./WorkCard";
import styles from "./WorkBento.module.scss";

interface WorkBentoProps {
  /** Slugs to leave out (e.g. the case study currently being viewed) */
  exclude?: string[];
  /** Heading level for each card's headline (h3 when nested under a section heading) */
  headingLevel?: "h2" | "h3";
}

// Big / small / small / big across a 3-column grid
const PATTERN = [2, 1, 1, 2];

/** Spans for n cards: follow PATTERN; a leftover card fills its row so there are no gaps. */
export function spansFor(count: number) {
  const spans = Array.from({ length: count }, (_, i) => PATTERN[i % PATTERN.length]);
  const used = spans.reduce((sum, s) => sum + s, 0);
  const remainder = used % 3;
  if (remainder !== 0 && count > 0) spans[count - 1] += 3 - remainder;
  return spans.map((s) => Math.min(s, 3));
}

/** Projects as a bento grid of text-only cards that tilt and glow. */
export function WorkBento({ exclude = [], headingLevel = "h2" }: WorkBentoProps) {
  const posts = getPosts(["src", "app", "work", "projects"])
    .filter((post) => !exclude.includes(post.slug))
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    );
  const spans = spansFor(posts.length);

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <WorkCard
          key={post.slug}
          href={`/work/${post.slug}`}
          headline={post.metadata.headline || post.metadata.title}
          title={post.metadata.title}
          summary={post.metadata.summary}
          role={post.metadata.role}
          timeframe={post.metadata.timeframe}
          tools={post.metadata.tools}
          span={spans[index]}
          headingLevel={headingLevel}
        />
      ))}
    </div>
  );
}
