import type { ComponentType } from "react";
import ElloLogo from "./logos/ello-logo";
import GestaltenLogo from "./logos/gestalten-logo";
import styles from "./sponsors.module.css";

interface Sponsor {
  logo: ComponentType<{ className?: string }>;
  tagline: string;
  href: string;
}

const sponsors: Sponsor[] = [
  {
    logo: ElloLogo,
    tagline: "Create an Exceptional Website",
    href: "https://minimalissimo.com/sponsor/squarespace?ref=minimalissimo",
  },
  {
    logo: GestaltenLogo,
    tagline: "Perfect Basics",
    href: "https://minimalissimo.com/sponsor/handvaerk?ref=minimalissimo",
  },
  {
    logo: ElloLogo,
    tagline: "Live More with Less",
    href: "https://minimalissimo.com/sponsor/minimalismlife?ref=minimalissimo",
  },
  {
    logo: GestaltenLogo,
    tagline: "Publisher of Creative Books",
    href: "https://minimalissimo.com/sponsor/gestalten?ref=minimalissimo",
  },
  {
    logo: ElloLogo,
    tagline: "No-Code Website Builder",
    href: "https://minimalissimo.com/sponsor/webflow?ref=minimalissimo",
  },
  {
    logo: GestaltenLogo,
    tagline: "The Creators Network",
    href: "https://minimalissimo.com/sponsor/ello?ref=minimalissimo",
  },
];

export default function Sponsors() {
  return (
    <section className={styles.sponsors}>
      <div className={`${styles.sponsorsInner} border-top`}>
        {sponsors.map((sponsor, index) => {
          const LogoComponent = sponsor.logo;
          return (
            <figure
              key={`${sponsor.href}-${index}`}
              className={styles.sponsorContainer}
            >
              <a
                className={styles.sponsorLink}
                target="_blank"
                aria-label="Visit Sponsor"
                href={sponsor.href}
                rel="noopener noreferrer"
              >
                <LogoComponent className={styles.sponsorLogo} />
              </a>
              <figcaption className={styles.sponsorTagline}>
                {sponsor.tagline}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
