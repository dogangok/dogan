import Link from "next/link";
import Logo from "../../common/logo/logo";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={`${styles.footerLinks} border-top`}>
        <Link className={styles.footerHome} href="/" aria-label="Homepage">
          <Logo className={styles.footerLogo} />
        </Link>

        <span className={styles.footerLinkContainer}>
          <Link className={styles.footerLink} href="/about">
            Contacts
          </Link>
          <Link className={styles.footerLink} href="/sponsors">
            Sponsors
          </Link>
          <Link className={styles.footerLink} href="/privacy">
            Privacy
          </Link>
        </span>

        <span
          className={`${styles.footerLinkContainer} ${styles.footerSocials}`}
        >
          <a
            className={`${styles.footerLink} ${styles.footerSocial}`}
            target="_blank"
            href="https://twitter.com/minimalissimo/"
            rel="noreferrer"
          >
            Twitter
          </a>
          <a
            className={`${styles.footerLink} ${styles.footerSocial}`}
            target="_blank"
            href="https://www.instagram.com/minimalissimo/"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className={`${styles.footerLink} ${styles.footerSocial}`}
            target="_blank"
            href="https://www.facebook.com/minimalissimo"
            rel="noreferrer"
          >
            Facebook
          </a>
        </span>
      </nav>
    </footer>
  );
}
