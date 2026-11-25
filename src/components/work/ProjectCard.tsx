"use client";

import Link from "next/link";
import { Icon } from "@once-ui-system/core";
import type { Project } from "@/types";
import bento from "./WorkBento.module.scss";
import styles from "./ProjectGrid.module.scss";
import { useTilt } from "./useTilt";

/**
 * A project in the bento: same tilt and glow as the case-study cards. The whole card opens the
 * code (or Figma file) through a cover link; the case study and live site links sit on top of it.
 */
export function ProjectCard({
  project,
  span,
  casePath,
  headingLevel = "h2",
}: {
  project: Project;
  span: number;
  casePath: string;
  headingLevel?: "h2" | "h3";
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>();
  const Heading = headingLevel;
  const { links } = project;
  const primary = links.code ?? links.figma;

  return (
    <div className={bento.cell} style={{ gridColumn: `span ${span}` }}>
      <article
        ref={ref}
        className={`${bento.card} ${styles.card} ${span > 1 ? bento.wide : ""}`}
        data-draft={project.draft || undefined}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {primary && (
          <a
            href={primary}
            target="_blank"
            rel="noreferrer"
            className={styles.cover}
            aria-label={`${project.name}: ${links.code ? "view the code on GitHub" : "open in Figma"}`}
          />
        )}
        <span className={bento.glow} aria-hidden="true" />
        <div className={bento.body}>
          <Heading className={bento.headline}>{project.headline ?? project.name}</Heading>
          <p className={bento.summary}>{project.summary}</p>
          {project.stats && project.stats.length > 0 && (
            <figure className={styles.stats}>
              <dl>
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
              {project.statsSource && <figcaption>{project.statsSource}</figcaption>}
            </figure>
          )}
        </div>
        <div className={bento.footer}>
          <div className={bento.meta}>
            <p className={bento.project}>{project.name}</p>
            <p className={`${bento.detail} ${styles.source}`}>
              <Icon name={project.kind === "figma" ? "figma" : "github"} size="xs" />
              {project.source}
            </p>
            <p className={bento.detail}>{project.role}</p>
            <p className={bento.tools}>{project.tags.join(", ")}</p>
            {(links.caseStudy || links.live) && (
              <div className={styles.extraLinks}>
                {links.caseStudy && (
                  <Link href={`${casePath}/${links.caseStudy}`} className={styles.extraLink}>
                    Case study
                    <Icon name="arrowRight" size="xs" />
                  </Link>
                )}
                {links.live && (
                  <a href={links.live} target="_blank" rel="noreferrer" className={styles.extraLink}>
                    Live site
                    <Icon name="arrowUpRight" size="xs" />
                  </a>
                )}
              </div>
            )}
          </div>
          {primary && (
            <span className={bento.arrow} aria-hidden="true">
              <Icon name={links.code ? "github" : "figma"} size="m" />
            </span>
          )}
        </div>
      </article>
    </div>
  );
}
