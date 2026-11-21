import { Icon } from "@once-ui-system/core";
import type { About } from "@/types";
import styles from "./AboutSections.module.scss";

type EarlierRole = NonNullable<About["work"]["earlier"]>[number];

/**
 * Earlier roles as a compact list grouped by kind of work. Roles with details expand in place
 * (native <details>, keyboard and screen-reader friendly); the rest are a single line.
 */
export function EarlierRoles({ roles }: { roles: EarlierRole[] }) {
  const groups = roles.reduce<Record<string, EarlierRole[]>>((acc, role) => {
    acc[role.group] = acc[role.group] ?? [];
    acc[role.group].push(role);
    return acc;
  }, {});

  return (
    <div className={styles.earlier}>
      <h3 className={styles.subTitle}>Earlier roles</h3>
      <div className={styles.earlierGroups}>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <h4 className={styles.groupTitle}>{group}</h4>
            <ul className={styles.earlierList}>
              {items.map((role) => {
                const line = (
                  <>
                    <span className={styles.earlierRole}>{role.role}</span>
                    <span className={styles.earlierMeta}>
                      {role.company}, {role.timeframe}
                    </span>
                  </>
                );
                return (
                  <li key={`${role.company}-${role.role}`}>
                    {role.achievements && role.achievements.length > 0 ? (
                      <details className={styles.earlierItem}>
                        <summary>
                          <span className={styles.earlierText}>{line}</span>
                          <Icon name="chevronDown" size="s" className={styles.earlierChevron} />
                        </summary>
                        <ul className={styles.earlierDetails}>
                          {role.achievements.map((achievement) => (
                            <li key={achievement}>{achievement}</li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <div className={`${styles.earlierItem} ${styles.earlierStatic}`}>
                        <span className={styles.earlierText}>{line}</span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
