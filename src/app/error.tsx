"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./error.module.css";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>Something went wrong</h1>
          <div className={styles.errorActions}>
            <button
              type="button"
              className={styles.errorButton}
              onClick={reset}
            >
              Try again
            </button>
            <Link href="/" className={styles.errorLink}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
