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
      <dl className={styles.metaContent}>
        {items.map((item) => (
          <div key={item.title} className={styles.metaItem}>
            <dt className={styles.metaTitle}>{item.title}</dt>
            <dd className={styles.metaText}>
              {item.link && item.href ? (
                <a href={item.href}>{item.link}</a>
              ) : (
                item.text || ""
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
