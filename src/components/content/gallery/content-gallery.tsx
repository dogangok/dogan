"use client";

import Image from "next/image";
import {
  Children,
  type ReactElement,
  cloneElement,
  useEffect,
  useState,
} from "react";
import styles from "./content-gallery.module.css";

interface ContentGalleryProps {
  children: ReactElement | ReactElement[];
  className?: string;
}

export default function ContentGallery({
  children,
  className,
}: ContentGalleryProps) {
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const childrenArray = Children.toArray(children) as ReactElement[];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomedIndex === null) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          setZoomedIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : childrenArray.length - 1,
          );
          break;
        case "ArrowRight":
          e.preventDefault();
          setZoomedIndex((prev) =>
            prev !== null && prev < childrenArray.length - 1 ? prev + 1 : 0,
          );
          break;
        case "Escape":
          e.preventDefault();
          setZoomedIndex(null);
          break;
      }
    };

    if (zoomedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [zoomedIndex, childrenArray.length]);

  const enhancedChildren = childrenArray.map((child, index) => {
    if (child.type && child.props) {
      // Only add onImageClick if it's not already provided
      const props = child.props.onImageClick
        ? child.props
        : { ...child.props, onImageClick: () => setZoomedIndex(index) };
      return cloneElement(child, props);
    }
    return child;
  });

  const currentImage = zoomedIndex !== null ? childrenArray[zoomedIndex] : null;

  return (
    <>
      <div className={`${styles.gallery} ${className || ""}`}>
        {enhancedChildren}
      </div>
      {zoomedIndex !== null && currentImage && (
        <button
          type="button"
          className={styles.zoomOverlay}
          onClick={() => setZoomedIndex(null)}
          aria-label="Close zoomed image"
        >
          <Image
            src={currentImage.props.src}
            alt={currentImage.props.alt}
            width={currentImage.props.width}
            height={currentImage.props.height}
            className={styles.zoomedImage}
            quality={90}
            onClick={() => setZoomedIndex(null)}
          />
        </button>
      )}
    </>
  );
}
