import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <h1 className={styles.introText}>
        PRODn is a boutique production agency, offering small to large-scale
        production, and coordination of editorial and advertising photo shoots.
        Our range of services include all aspects of production and executive
        production, with a specialization in location scouting, casting and
        behind-the-scenes coordination. Our goal is to accomplish the creative
        vision of our clients while providing a high-end service ensuring a
        smooth production from start to finish.
      </h1>
    </main>
  );
}
