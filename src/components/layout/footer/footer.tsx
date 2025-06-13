import { FOOTER_LINKS, SOCIAL_LINKS } from "@/constants";
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
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              className={styles.footerLink}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </span>

        <span
          className={`${styles.footerLinkContainer} ${styles.footerSocials}`}
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              className={`${styles.footerLink} ${styles.footerSocial}`}
              target="_blank"
              href={link.href}
              rel={link.rel}
            >
              {link.label}
            </a>
          ))}
        </span>
      </nav>
    </footer>
  );
}
