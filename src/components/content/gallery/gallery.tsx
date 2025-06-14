import type { ReactNode } from "react";
import styles from "./gallery.module.css";

interface GalleryProps {
  children: ReactNode;
  className?: string;
}

// Simple gallery wrapper component - matching MIMO's approach
export default function Gallery({ children, className }: GalleryProps) {
  return (
    <div className={`${styles.gallery} ${className || ""}`}>{children}</div>
  );
}
