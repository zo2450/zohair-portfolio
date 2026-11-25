"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon } from "@once-ui-system/core";
import { work } from "@/resources";
import { principles } from "./data";
import styles from "./HowIWork.module.scss";

/** Wraps the highlight word of a title in the accent colour. */
function Title({ text, highlight }: { text: string; highlight?: string }) {
  const index = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || index < 0) return <>{text}.</>;
  return (
    <>
      {text.slice(0, index)}
      <span className={styles.highlight}>{highlight}</span>
      {text.slice(index + highlight.length)}.
    </>
  );
}

/**
 * "How I work": each principle opens to the real example behind it and its case study.
 * One open at a time; the first starts open so the pattern is obvious.
 */
export function HowIWork({ titleId }: { titleId: string }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <>
      <h2 id={titleId} className={styles.title}>
        How I work
      </h2>
      <ol className={styles.list}>
        {principles.map((principle, index) => {
          const isOpen = open === index;
          const panelId = `${baseId}-panel-${index}`;
          return (
            <li key={principle.title} className={styles.item} data-open={isOpen || undefined}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span className={styles.principle}>
                  <Title text={principle.title} highlight={principle.highlight} />
                </span>
                <Icon name="chevronDown" size="s" className={styles.chevron} />
              </button>
              <div id={panelId} className={styles.panel} hidden={!isOpen}>
                <div className={styles.panelInner}>
                  <p className={styles.proof}>{principle.description}</p>
                  {principle.caseStudy && (
                    <Link href={`${work.path}/${principle.caseStudy.slug}`} className={styles.link}>
                      {principle.caseStudy.label}
                      <Icon name="arrowRight" size="xs" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
