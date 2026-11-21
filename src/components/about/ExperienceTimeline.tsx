"use client";

import { useEffect, useRef } from "react";
import { Column, SmartLink, Text } from "@once-ui-system/core";
import { CompanyLogo } from "./CompanyLogo";
import styles from "./ExperienceTimeline.module.scss";

export interface TimelineItem {
  company: string;
  role: string;
  timeframe: string;
  logo?: string;
  caseStudyHref?: string;
  achievements: React.ReactNode[];
}

/**
 * Scroll timeline (in the style of Aceternity's Timeline): each role's header sticks while its
 * details scroll, and a gradient beam fills the line as you scroll down.
 */
export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55; // the beam tip tracks ~55% down the viewport
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
          <li key={`${item.company}-${item.role}-${index}`} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.dot} aria-hidden="true" />
              <CompanyLogo name={item.company} src={item.logo} size={44} />
              <Column gap="2">
                <Text id={item.company} variant="heading-strong-m">
                  {item.company}
                </Text>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {item.timeframe}
                </Text>
              </Column>
            </div>
            <Column className={styles.content} gap="12">
              <Text variant="body-strong-m" style={{ color: "#c4b5fd" }}>
                {item.role}
              </Text>
              <Column as="ul" gap="12" className={styles.achievements}>
                {item.achievements.map((achievement, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static content, order never changes
                  <Text as="li" key={i} variant="body-default-m" onBackground="neutral-medium">
                    {achievement}
                  </Text>
                ))}
              </Column>
              {item.caseStudyHref && (
                <SmartLink
                  href={item.caseStudyHref}
                  suffixIcon="arrowRight"
                  style={{ width: "fit-content", margin: 0 }}
                >
                  <Text variant="body-default-s">Read the case study</Text>
                </SmartLink>
              )}
            </Column>
          </li>
        ))}
      </ol>
    </div>
  );
}
