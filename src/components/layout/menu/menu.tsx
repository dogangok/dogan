"use client";

import { MAIN_NAVIGATION } from "@/constants/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside or on logo
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const menu = target.closest(`.${styles.menu}`);
      const logo = target.closest('[aria-label="Homepage"]');

      // Close if clicking logo or outside menu
      if (logo || !menu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <div className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}>
      <button
        type="button"
        className={`${styles.menuBtn} border-bottom`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        Menu
      </button>
      <nav className={`${styles.menuInner} border-bottom`}>
        {MAIN_NAVIGATION.map((item) => (
          <Link
            key={item.href}
            className={styles.menuItem}
            href={item.href}
            target={item.target}
            rel={"rel" in item ? item.rel : undefined}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
