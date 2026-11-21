import styles from "./StatusDot.module.scss";

/** Small pulsing "live" dot. Static when the visitor prefers reduced motion. */
export function StatusDot() {
  return <span className={styles.dot} aria-hidden="true" />;
}
