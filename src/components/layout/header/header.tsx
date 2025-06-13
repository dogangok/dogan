"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "../../common/logo/logo";
import SearchForm from "../../common/search-form/search-form";
import styles from "./header.module.css";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleColorScheme = () => {
    document.documentElement.classList.toggle("inverted");
    // Save preference to localStorage
    const isInverted = document.documentElement.classList.contains("inverted");
    localStorage.setItem("colorScheme", isInverted ? "inverted" : "default");
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.headerInner} border-bottom`}>
        <button
          type="button"
          className={`${styles.headerBtn} ${styles.btnScheme}`}
          onClick={toggleColorScheme}
          aria-label="Reading Mode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            role="img"
            aria-label="Theme Toggle"
          >
            <title>Theme Toggle</title>
            <circle className={styles.outer} cx="10" cy="10" r="8" />
            <circle className={styles.inner} cx="10" cy="10" r="6" />
          </svg>
        </button>

        <Link className={styles.headerHome} href="/" aria-label="Homepage">
          <Logo />
        </Link>

        <button
          type="button"
          className={`${styles.headerBtn} ${styles.btnSearch}`}
          onClick={toggleSearch}
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
            role="img"
            aria-label="Search"
          >
            <title>Search</title>
            <path
              fillRule="nonzero"
              d="M14.906 16.32a8 8 0 1 1 1.414-1.414l3.751 3.751-1.414 1.414-3.751-3.751zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            />
          </svg>
        </button>

        <SearchForm isOpen={isSearchOpen} />
      </div>
    </header>
  );
}
