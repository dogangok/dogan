"use client";

import { MAIN_NAVIGATION } from "@/constants/navigation";
import Link from "next/link";
import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.menu} ${isOpen ? styles.isOpen : ""}`}>
      <button
        type="button"
        className={`${styles.menuBtn} border-bottom`}
        onClick={toggleMenu}
        aria-label="Light/Dark Mode"
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
            rel={item.rel}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
