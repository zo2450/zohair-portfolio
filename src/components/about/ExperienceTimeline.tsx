"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, SmartLink, Tag } from "@once-ui-system/core";
import { StatusDot } from "@/components/StatusDot";
import type { IconName } from "@/resources/icons";
import { CompanyLogo } from "./CompanyLogo";
import styles from "./ExperienceTimeline.module.scss";

export interface TimelineItem {
  company: string;
  role: string;
  timeframe: string;
  logo?: string;
  logoIcon?: IconName;
  logoText?: string;
  logoColor?: string;
  caseStudyHref?: string;
  headline?: string;
  tags?: string[];
  current?: boolean;
  expanded?: boolean;
  achievements: React.ReactNode[];
}

/** URL-safe id from a company name ("Achēv" → "achev", "Picnic Game Labs" → "picnic-game-labs"). */
function slug(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** One role: company heading, role, the result as a sentence, tools, and expandable details. */
function Role({ item, index }: { item: TimelineItem; index: number }) {
  const [open, setOpen] = useState(Boolean(item.expanded));
  const detailsId = `role-details-${index}`;
  const count = item.achievements.length;

  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <span className={styles.dot} aria-hidden="true" />
        <CompanyLogo
          name={item.company}
          src={item.logo}
          icon={item.logoIcon}
          text={item.logoText}
          color={item.logoColor}
          size={44}
        />
        <div className={styles.headerText}>
          <h3 id={slug(item.company)} className={styles.company}>
            {item.company}
          </h3>
          <p className={styles.timeframe}>{item.timeframe}</p>
          {item.current && (
            <span className={styles.current}>
              <StatusDot />
              Current
            </span>
          )}
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.role}>{item.role}</p>
        {item.headline && <p className={styles.headline}>{item.headline}</p>}
        {item.tags && item.tags.length > 0 && (
          <div className={styles.tags}>
            {item.tags.map((tag) => (
              <Tag key={tag} size="s">
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {count > 0 && (
          <div id={detailsId} className={styles.details} data-open={open}>
            <div className={styles.detailsInner}>
              <ul className={styles.achievements}>
                {item.achievements.map((achievement, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static content, order never changes
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {count > 0 && (
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Hide details" : `Show details (${count})`}
              <Icon name="chevronDown" size="xs" className={styles.chevron} data-open={open} />
            </button>
          )}
          {item.caseStudyHref && (
            <SmartLink href={item.caseStudyHref} suffixIcon="arrowRight" className={styles.caseLink}>
              Read the case study
            </SmartLink>
          )}
        </div>
      </div>
    </li>
  );
}

/**
 * Experience timeline: each role's header sticks while its details scroll, and a beam fills the
 * line as you scroll (static and full when the visitor prefers reduced motion).
 */
export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--progress", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty("--progress", progress.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.timeline}>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.beam} />
      </div>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <Role key={`${item.company}-${item.role}`} item={item} index={index} />
        ))}
      </ol>
    </div>
  );
}
