import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>404 — Page not found</h1>
          <Link href="/" className={styles.errorLink}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
