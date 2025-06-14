import styles from "./content-intro.module.css";

interface ContentIntroProps {
  pretitle?: string;
  title: string;
  author?: string;
  className?: string;
}

export default function ContentIntro({
  pretitle,
  title,
  author,
  className,
}: ContentIntroProps) {
  return (
    <div className={`${styles.intro} ${className || ""}`}>
      {pretitle && <small className={styles.introPretitle}>{pretitle}</small>}
      <h1 className={styles.introTitle}>{title}</h1>
      {author && <h2 className={styles.introAuthor}>{author}</h2>}
    </div>
  );
}
