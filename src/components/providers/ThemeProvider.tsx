"use client";

import { type ReactNode, useEffect } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("colorScheme");

    if (savedTheme === "inverted") {
      document.documentElement.classList.add("inverted");
    } else {
      // Remove inverted class if it exists
      document.documentElement.classList.remove("inverted");
    }
  }, []);

  return <>{children}</>;
}
