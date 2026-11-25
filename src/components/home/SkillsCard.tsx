import { Icon } from "@once-ui-system/core";
import bento from "@/components/work/WorkBento.module.scss";
import styles from "./HomeBento.module.scss";

const repo = "https://github.com/zo2450/threejs-projects/tree/main/skills-carousel";
// Deployed URL of the carousel; the local dev server outside production.
const url =
  process.env.NEXT_PUBLIC_SKILLS_CAROUSEL_URL ??
  (process.env.NODE_ENV === "production" ? null : "http://localhost:3005");

/** Small Home bento card: the Three.js skills carousel (work in progress) in an iframe. */
export function SkillsCard({ span }: { span: number }) {
  return (
    <div className={bento.cell} style={{ gridColumn: `span ${span}` }}>
      <section className={`${bento.card} ${styles.skills}`} aria-label="Skills carousel, work in progress">
        <p className={styles.wip}>Work in progress</p>
        {url ? (
          <iframe
            src={`${url}/?embed`}
            title="Skills carousel: logos of the tools I use on a 3D ring. Drag to spin."
            loading="lazy"
            className={styles.frame}
          />
        ) : (
          <p className={styles.fallback}>
            A 3D carousel of the tools I use: Python, TypeScript, React, Next.js, Three.js, Figma and more.
          </p>
        )}
        <div className={styles.skillsFooter}>
          <span className={styles.skillsName}>Skills carousel</span>
          <a href={repo} target="_blank" rel="noreferrer" className={styles.iconLink} aria-label="Skills carousel source code on GitHub" title="Source on GitHub">
            <Icon name="github" size="s" />
          </a>
        </div>
      </section>
    </div>
  );
}
