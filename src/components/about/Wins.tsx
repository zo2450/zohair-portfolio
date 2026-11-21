"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { IconButton } from "@once-ui-system/core";
import type { AboutExtras } from "@/types";
import styles from "./AboutSections.module.scss";

type Proof = { title: string; caption: string; image: string };

/**
 * The two real wins, then certificates as one quiet line. Anything with a scan opens it in a
 * native dialog (Esc / backdrop / close button; focus returns to the trigger).
 */
export function Wins({
  wins,
  certificates,
}: {
  wins: AboutExtras["wins"];
  certificates: AboutExtras["certificates"];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Proof | null>(null);

  const show = (proof: Proof) => {
    setOpen(proof);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <section className={styles.sheet} aria-labelledby="wins">
      <h2 id="wins" className={styles.sectionTitle}>
        Wins
      </h2>
      <ul className={styles.wins}>
        {wins.map((win) => (
          <li key={win.title} className={styles.win}>
            <div>
              <p className={styles.winTitle}>{win.title}</p>
              <p className={styles.winDetail}>{win.detail}</p>
            </div>
            <div className={styles.winSide}>
              <span className={styles.winDate}>{win.date}</span>
              {win.image && (
                <button
                  type="button"
                  className={styles.textButton}
                  onClick={() =>
                    show({ title: win.title, caption: win.detail, image: win.image as string })
                  }
                >
                  View certificate
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.certificates}>
        <span className={styles.certLabel}>Certificates: </span>
        {certificates.map((cert, index) => (
          <span key={cert.title}>
            <button
              type="button"
              className={styles.textButton}
              onClick={() => show({ title: cert.title, caption: cert.issuer, image: cert.image })}
            >
              {cert.issuer} {cert.title}
            </button>
            {index < certificates.length - 1 && ", "}
          </span>
        ))}
      </p>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="proof-title"
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
      >
        {open && (
          <div className={styles.dialogBody}>
            <div className={styles.dialogHeader}>
              <div>
                <p className={styles.winDetail}>{open.caption}</p>
                <h3 id="proof-title" className={styles.dialogTitle}>
                  {open.title}
                </h3>
              </div>
              <IconButton icon="close" variant="tertiary" aria-label="Close" onClick={close} />
            </div>
            <Image src={open.image} alt={`${open.title} certificate`} width={1200} height={900} />
          </div>
        )}
      </dialog>
    </section>
  );
}
