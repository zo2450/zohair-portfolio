"use client";

import Link from "next/link";
import { Icon } from "@once-ui-system/core";
import { CompanyLogo } from "@/components/about/CompanyLogo";
import type { IconName } from "@/resources/icons";
import bento from "@/components/work/WorkBento.module.scss";
import { useTilt } from "@/components/work/useTilt";
import styles from "./HomeBento.module.scss";

export interface Internship {
  company: string;
  role: string;
  timeframe: string;
  headline?: string;
  logo?: string;
  logoIcon?: IconName;
  logoText?: string;
  logoColor?: string;
}

/** Big Home bento card: my three most recent tech internships, then a button to the About page. */
export function InternshipsCard({ items, span }: { items: Internship[]; span: number }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>();

  return (
    <div className={bento.cell} style={{ gridColumn: `span ${span}` }}>
      <article
        ref={ref}
        className={`${bento.card} ${bento.wide} ${styles.internships}`}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-labelledby="internships-title"
      >
        <span className={bento.glow} aria-hidden="true" />
        <div className={bento.body}>
          <h3 id="internships-title" className={bento.headline}>
            My impact at {items.map((item) => item.company).join(", ").replace(/, ([^,]*)$/, " and $1")}
          </h3>
          <ul className={styles.roles}>
            {items.map((item) => (
              <li key={item.company}>
                <CompanyLogo
                  name={item.company}
                  src={item.logo}
                  icon={item.logoIcon}
                  text={item.logoText}
                  color={item.logoColor}
                  size={44}
                />
                <div>
                  <p className={styles.roleLine}>
                    <strong>{item.company}</strong> {item.role}
                  </p>
                  {item.headline && <p className={styles.result}>{item.headline}</p>}
                  <p className={styles.when}>{item.timeframe}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.cta}>
          <Link href="/about" className={styles.ctaButton}>
            More about me
            <Icon name="arrowRight" size="s" />
          </Link>
        </div>
      </article>
    </div>
  );
}
