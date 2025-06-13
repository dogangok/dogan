"use client";

import type { FormEvent } from "react";
import styles from "./newsletter.module.css";

export default function Newsletter() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Open popup window for newsletter subscription
    window.open("https://buttondown.email/minimalissimo", "popupwindow");
    // Submit the form
    form.submit();
  };

  return (
    <section className={styles.newsletter}>
      <div className={`${styles.newsletterContainer} border-top`}>
        <form
          className={`${styles.newsletterForm} embeddable-buttondown-form`}
          action="https://buttondown.email/api/emails/embed-subscribe/minimalissimo"
          method="post"
          target="popupwindow"
          onSubmit={handleSubmit}
        >
          <input
            id="bd-email"
            name="email"
            type="email"
            className={styles.newsletterInput}
            placeholder="Subscribe to the newsletter"
            required
          />
          <label className={styles.newsletterLabel} htmlFor="bd-email">
            Email Address
          </label>
          <input type="hidden" value="1" name="embed" />
          <input type="submit" value="→" className={styles.newsletterBtn} />
        </form>
      </div>
    </section>
  );
}
