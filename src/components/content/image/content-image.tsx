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
  isGallery?: boolean;
  isMood?: boolean;
  onImageClick?: () => void;
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
  isGallery = false,
  isMood = false,
  onImageClick,
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
    styles.imgFigure,
    isFirst && styles.firstImage,
    isGallery && styles.galleryImage,
    isMood && styles.moodImage,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick();
    } else {
      setIsZoomed(true);
    }
  };

  const handleZoomedClick = () => {
    setIsZoomed(false);
  };

  return (
    <>
      <figure className={figureClasses}>
        <button
          type="button"
          className={styles.imgWrapper}
          data-orientation={detectedOrientation}
          style={{ paddingBottom: `${paddingBottom}%` }}
          onClick={handleImageClick}
          aria-label={`View ${alt || "image"} in full size`}
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
        </button>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      {isZoomed && !onImageClick && (
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
