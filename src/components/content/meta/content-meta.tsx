import styles from "./content-meta.module.css";

interface MetaItem {
  title: string;
  text?: string;
  link?: string;
  href?: string;
}

interface ContentMetaProps {
  items: MetaItem[];
  className?: string;
}

export default function ContentMeta({ items, className }: ContentMetaProps) {
  return (
    <section className={`${styles.meta} ${className || ""}`}>
      <dl className={styles["meta-content"]}>
        {items.map((item) => (
          <>
            <dt key={`${item.title}-dt`} className={styles["meta-title"]}>
              {item.title}
            </dt>
            <dd key={`${item.title}-dd`} className={styles["meta-text"]}>
              {item.link && item.href ? (
                <a href={item.href}>{item.link}</a>
              ) : (
                item.text || ""
              )}
            </dd>
          </>
        ))}
      </dl>
    </section>
  );
}
