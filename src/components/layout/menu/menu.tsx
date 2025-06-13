"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./menu.module.css";

interface MenuItem {
  href: string;
  label: string;
  target?: "_self" | "_blank";
  rel?: string;
}

const menuItems: MenuItem[] = [
  { href: "/creators", label: "Conversations", target: "_self" },
  { href: "/architecture", label: "Architecture", target: "_self" },
  { href: "/interiors", label: "Interiors", target: "_self" },
  { href: "/furniture", label: "Furniture", target: "_self" },
  { href: "/homewares", label: "Homewares", target: "_self" },
  { href: "/moods", label: "Moods", target: "_self" },
  {
    href: "https://minimalissimo.shop",
    label: "Shop",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  { href: "/about", label: "About", target: "_self" },
];

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
        {menuItems.map((item) => (
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
