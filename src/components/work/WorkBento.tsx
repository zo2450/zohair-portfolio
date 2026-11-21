import { getPosts } from "@/utils/utils";
import { WorkCard } from "./WorkCard";
import styles from "./WorkBento.module.scss";

interface WorkBentoProps {
  /** Slugs to leave out (e.g. the case study currently being viewed) */
  exclude?: string[];
  /** Optional cap on the number of cards */
  limit?: number;
}

// Big / small / small / big across a 3-column grid
const PATTERN = [2, 1, 1, 2];

/** Spans for n cards: follow PATTERN, and stretch the last card to fill a partial row. */
function spansFor(count: number) {
  const spans = Array.from({ length: count }, (_, i) => PATTERN[i % PATTERN.length]);
  const used = spans.reduce((sum, s) => sum + s, 0);
  const remainder = used % 3;
  if (remainder !== 0 && count > 0) spans[count - 1] += 3 - remainder;
  return spans.map((s) => Math.min(s, 3));
}

/** Case studies as a bento grid of tilting, glowing cards. */
export function WorkBento({ exclude = [], limit }: WorkBentoProps) {
  let posts = getPosts(["src", "app", "work", "projects"])
    .filter((post) => !exclude.includes(post.slug))
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
    );
  if (limit) posts = posts.slice(0, limit);
  const spans = spansFor(posts.length);

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <WorkCard
          key={post.slug}
          href={`/work/${post.slug}`}
          title={post.metadata.title}
          summary={post.metadata.summary}
          role={post.metadata.role}
          image={post.metadata.images[0]}
          outcomes={post.metadata.outcomes}
          span={spans[index]}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
