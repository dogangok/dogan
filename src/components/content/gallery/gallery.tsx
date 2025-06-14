"use client";

import { type ReactNode, useEffect, useState } from "react";
import styles from "./gallery.module.css";

interface GalleryProps {
  children: ReactNode;
  className?: string;
  images: Array<{
    src: string;
    alt: string;
  }>;
}

// Gallery component with built-in zoom functionality
export default function Gallery({ children, className, images }: GalleryProps) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (zoomedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setZoomedIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : images.length - 1,
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setZoomedIndex((prev) =>
            prev !== null && prev < images.length - 1 ? prev + 1 : 0,
          );
          break;
        case "Escape":
          e.preventDefault();
          setZoomedIndex(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomedIndex, images.length]);

  // Handle clicks on images with data-image-index
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const imageButton = target.closest("[data-image-index]");
      if (imageButton) {
        const index = Number.parseInt(
          imageButton.getAttribute("data-image-index") || "0",
        );
        setZoomedIndex(index);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className={`${styles.gallery} ${className || ""}`}>{children}</div>
      {zoomedIndex !== null && (
        <button
          type="button"
          className={styles.zoomOverlay}
          onClick={() => setZoomedIndex(null)}
          aria-label="Close zoomed image"
        >
          <img
            alt={images[zoomedIndex].alt}
            src={images[zoomedIndex].src}
            className={styles.zoomedImage}
          />
        </button>
      )}
    </>
  );
}
