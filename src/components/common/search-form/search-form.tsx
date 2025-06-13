"use client";

import type { FormEvent } from "react";
import styles from "./search-form.module.css";

interface SearchFormProps {
  isOpen?: boolean;
}

export default function SearchForm({ isOpen = false }: SearchFormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search submission
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("s");
    console.log("Search for:", searchQuery);
  };

  return (
    <form
      className={`${styles.searchForm} ${isOpen ? styles.isOpen : ""}`}
      action="/"
      method="get"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        name="s"
        id="s"
        className={`${styles.searchInput} border-around`}
        required
        placeholder="Search…"
      />
      <button
        className={styles.searchSubmit}
        type="submit"
        aria-label="Search Submit"
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
    </form>
  );
}
