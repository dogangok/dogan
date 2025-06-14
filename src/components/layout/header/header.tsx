"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "../../common/logo/logo";
import SearchForm from "../../common/search-form/search-form";
import styles from "./header.module.css";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleColorScheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Blur any focused element to prevent validation popups
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const searchForm = document.querySelector("[data-search-form]");
      const searchButton = document.querySelector(`.${styles.btnSearch}`);

      // Early return if elements not found
      if (!searchForm || !searchButton) return;

      // If clicking the search button, do nothing - let toggleSearch handle it
      if (searchButton.contains(target)) return;

      // If clicking inside the search form, keep it open
      if (searchForm.contains(target)) return;

      // Otherwise close the search
      setIsSearchOpen(false);
    };

    // Add listener on next tick to avoid catching the opening click
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className={styles.header} ref={headerRef}>
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
