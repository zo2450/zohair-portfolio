import { Icon } from "@once-ui-system/core";
import styles from "./AboutPage.module.scss";

/** Mini projects shown on the About page. Each one lives in its own repo and is deployed on its own. */
export const miniProjects = {
  inbox: {
    name: "Inbox agent",
    repo: "https://github.com/zo2450/inbox-agent",
    // Deployed URL of the repo's /embed view. Falls back to the local dev server outside production.
    url:
      process.env.NEXT_PUBLIC_INBOX_AGENT_URL ??
      (process.env.NODE_ENV === "production" ? null : "http://localhost:3003"),
    path: "/embed",
  },
  island: {
    name: "Pocket island",
    repo: "https://github.com/zo2450/threejs-projects/tree/main/pocket-island",
    url:
      process.env.NEXT_PUBLIC_POCKET_ISLAND_URL ??
      (process.env.NODE_ENV === "production" ? null : "http://localhost:3004"),
    path: "/?embed",
  },
} as const;

interface Props {
  project: (typeof miniProjects)[keyof typeof miniProjects];
  title: string;
  className?: string;
  /** Shown instead of the live embed when the project isn't deployed yet. */
  fallback: React.ReactNode;
}

/** A mini project in an iframe, with links to the full version and the source. */
export function ProjectEmbed({ project, title, className, fallback }: Props) {
  return (
    <section className={`${styles.card} ${styles.embedCard} ${className ?? ""}`} aria-label={project.name}>
      {project.url ? (
        <iframe
          src={`${project.url}${project.path}`}
          title={title}
          loading="lazy"
          className={styles.frame}
        />
      ) : (
        <div className={styles.embedFallback}>{fallback}</div>
      )}
      <div className={styles.embedLinks}>
        <span className={styles.embedName}>{project.name}</span>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className={styles.embedLink}
            aria-label={`Open ${project.name} in a new tab`}
            title="Open full version"
          >
            <Icon name="arrowUpRight" size="s" />
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className={styles.embedLink}
          aria-label={`${project.name} source code on GitHub`}
          title="Source on GitHub"
        >
          <Icon name="github" size="s" />
        </a>
      </div>
    </section>
  );
}
