"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./content-image.module.css";

interface ContentImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  orientation?: "landscape" | "portrait" | "square";
  sizes?: string;
  quality?: number;
  priority?: boolean;
  caption?: string;
  className?: string;
  isFirst?: boolean;
  "data-image-index"?: number;
}

export default function ContentImage({
  src,
  alt,
  width,
  height,
  orientation,
  sizes,
  quality = 60,
  priority = false,
  caption,
  className,
  isFirst = false,
  "data-image-index": dataImageIndex,
}: ContentImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const paddingBottom = getPaddingBottom(width, height);
  const aspectRatio = width / height;
  const detectedOrientation =
    orientation ||
    (aspectRatio > 1.2
      ? "landscape"
      : aspectRatio < 0.8
        ? "portrait"
        : "square");
  const figureClasses = [
    styles["img-figure"],
    isFirst && styles["first-image"],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleImageClick = () => {
    // If data-image-index is set, let the parent handle zoom
    if (dataImageIndex !== undefined) {
      return;
    }
    setIsZoomed(true);
  };

  const handleZoomedClick = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <figure className={figureClasses}>
        {/* biome-ignore lint/a11y/useValidAnchor: MIMO uses anchor tags for image zoom */}
        <a
          href="#"
          className={styles["img-wrapper"]}
          data-orientation={detectedOrientation}
          style={{ paddingBottom: `${paddingBottom}%` }}
          onClick={(e) => {
            e.preventDefault();
            handleImageClick();
          }}
          aria-label={`View ${alt || "image"} in full size`}
          data-image-index={dataImageIndex}
        >
          <Image
            alt={alt}
            className={styles.img}
            src={src}
            width={width}
            height={height}
            sizes={sizes}
            quality={quality}
            priority={priority}
          />
        </a>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      {isZoomed && (
        <Image
          alt={alt}
          className={styles.zoomed}
          src={src}
          width={width}
          height={height}
          quality={90}
          onClick={handleZoomedClick}
        />
      )}
    </>
  );
}

function getPaddingBottom(width: number, height: number): number {
  return (height / width) * 100;
}
