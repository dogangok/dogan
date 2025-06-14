import ContentEditor from "@/components/content/editor/content-editor";
import Gallery from "@/components/content/gallery/gallery";
import ContentImage from "@/components/content/image/content-image";
import ContentIntro from "@/components/content/intro/content-intro";
import styles from "./page.module.css";

// Image data with dimensions estimated from aspect ratios
const moodImages = [
  {
    src: "/images/moods/flat-white-8.jpg",
    alt: "Flat White Minimalism",
    width: 1200,
    height: 1800,
    orientation: "portrait" as const,
  },
  {
    src: "/images/moods/flat-white-3.jpg",
    alt: "Flat White Minimalism",
    width: 1500,
    height: 1000,
    orientation: "landscape" as const,
  },
  {
    src: "/images/moods/flat-white-4.jpg",
    alt: "Flat White Minimalism",
    width: 1200,
    height: 1200,
    orientation: "square" as const,
  },
  {
    src: "/images/moods/flat-white-5.jpg",
    alt: "Flat White Minimalism",
    width: 1200,
    height: 1800,
    orientation: "portrait" as const,
  },
  {
    src: "/images/moods/flat-white-1.jpg",
    alt: "Flat White Minimalism",
    width: 1500,
    height: 1000,
    orientation: "landscape" as const,
  },
  {
    src: "/images/moods/flat-white-2.jpg",
    alt: "Flat White Minimalism",
    width: 1200,
    height: 1200,
    orientation: "square" as const,
  },
  {
    src: "/images/moods/flat-white-7.jpg",
    alt: "Flat White Minimalism",
    width: 1500,
    height: 1000,
    orientation: "landscape" as const,
  },
  {
    src: "/images/moods/flat-white-6.jpg",
    alt: "Flat White Minimalism",
    width: 1500,
    height: 1000,
    orientation: "landscape" as const,
  },
];

export default function MoodsPage() {
  return (
    <div className={styles.mood}>
      <ContentIntro
        pretitle="Moods"
        title="Flat White"
        author="Curated by Carl MH Barenbrug"
        className={styles.intro}
      />

      <ContentEditor variant="mood">
        <p>
          No, this is not a curation of coffee. Rather, it is a celebration of
          white primary forms with clean geometric lines. White is synonymous
          with minimalism because it is a canvas from which to express the
          essence of something. White also just looks great with anything.
        </p>
      </ContentEditor>

      <ContentEditor variant="gallery">
        <Gallery images={moodImages}>
          {moodImages.map((image, index) => (
            <ContentImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              orientation={image.orientation}
              isGallery
              isMood
              priority={index < 2}
              sizes={
                image.orientation === "landscape"
                  ? "(max-width: 446px) 402px, (max-width: 600px) 504px, 702px"
                  : "(max-width: 446px) 402px, (max-width: 600px) 336px, 468px"
              }
              data-image-index={index}
            />
          ))}
        </Gallery>
      </ContentEditor>
    </div>
  );
}
