import Link from "next/link";
import styles from "./archives.module.css";

export default function Archives() {
  return (
    <nav className={styles.archives}>
      <div className={`${styles.archivesInner} border-top`}>
        <h2 className={styles.archivesTitle}>Support What We Do</h2>
        <Link className={`button ${styles.archivesButton}`} href="/membership">
          Become a Member
        </Link>
      </div>
    </nav>
  );
}
