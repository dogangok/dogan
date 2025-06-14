import ContentEditor from "@/components/content/editor/content-editor";
import Gallery from "@/components/content/gallery/gallery";
import ContentImage from "@/components/content/image/content-image";
import ContentIntro from "@/components/content/intro/content-intro";
import ContentMeta from "@/components/content/meta/content-meta";
import styles from "./page.module.css";

// Responsive image sizes constants
const PORTRAIT_SIZES =
  "(max-width: 446px) 402px, (max-width: 600px) 336px, 468px";
const LANDSCAPE_SIZES =
  "(max-width: 446px) 402px, (max-width: 600px) 504px, 702px";

const allImages = [
  {
    alt: "The Unfolding Home by ACOS",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-10.jpg",
    width: 1500,
    height: 1000,
    sizes: LANDSCAPE_SIZES,
    isFirst: true,
    priority: true,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-3.jpg",
    width: 1200,
    height: 1800,
    sizes: PORTRAIT_SIZES,
    priority: true,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-7.jpg",
    width: 1200,
    height: 1799,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-8.jpg",
    width: 1200,
    height: 1801,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-5.jpg",
    width: 1200,
    height: 1800,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-4.jpg",
    width: 1200,
    height: 1801,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-6.jpg",
    width: 1200,
    height: 1800,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-9.jpg",
    width: 1200,
    height: 1801,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-1.jpg",
    width: 1200,
    height: 1800,
    sizes: PORTRAIT_SIZES,
  },
  {
    alt: "",
    src: "/images/the-unfolding-home-acos/the-unfolding-home-acos-2.jpg",
    width: 1200,
    height: 1800,
    sizes: PORTRAIT_SIZES,
  },
];

export default function ArchitecturePage() {
  const metaItems = [
    { title: "Location", text: "Słupsk, Poland" },
    { title: "Architecture", link: "ACOS", href: "http://acos.design/" },
    { title: "Website", link: "acos.design", href: "http://acos.design/" },
    { title: "Photography", text: "PION Studio" },
  ];

  return (
    <div className={styles.default}>
      <ContentIntro
        pretitle="Interiors, Architecture"
        title="The Unfolding Home"
        author="Words by Jillian Japka"
      />

      <ContentEditor variant="default">
        <Gallery images={allImages} className={styles.contentWrapper}>
          <div className={styles.imageGroup}>
            <ContentImage {...allImages[0]} isGallery data-image-index={0} />
          </div>

          <p>
            There is perhaps nothing more true to minimalism than having
            something that serves multiple functions. The more multi-purpose an
            object is, the less need there is for more.{" "}
            <a
              href="http://acos.design/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ACOS
            </a>{" "}
            took this concept and applied it to an entire home. Meet The
            Unfolding Home, a dwelling with no walls and no limits. The
            Unfolding Home is a living space designed to adapt to changing
            needs.
          </p>

          <div className={styles.imageGroup}>
            <ContentImage {...allImages[1]} isGallery data-image-index={1} />
            <ContentImage {...allImages[2]} isGallery data-image-index={2} />
            <ContentImage {...allImages[3]} isGallery data-image-index={3} />
          </div>

          <p>
            ACOS&apos;s unique home features a completely open floor plan. The
            mass of the home is located in a central core, with the ability to
            fully circulate. Flexible screens allow areas of the home to be
            sectioned off for privacy. One side of the home holds the kitchen,
            and the other side holds the master bedroom, where it is most
            private. The rest of the space is used alternatively for a living
            room, library, guest room, and play area.
          </p>

          <div className={styles.imageGroup}>
            <ContentImage {...allImages[4]} isGallery data-image-index={4} />
            <ContentImage {...allImages[5]} isGallery data-image-index={5} />
            <ContentImage {...allImages[6]} isGallery data-image-index={6} />
          </div>

          <p>
            The furniture in The Unfolding Home needs to be as multi-purpose as
            the walls around it. Extra-large shelving has room for anything that
            needs holding, whether it be art, plants, or books. Bench cushions
            can be easily swapped for a mattress for a bed. The chairs
            throughout the home match, so they can be added together for dining
            or separated and used where needed.
          </p>

          <p>
            With the absence of walls, an interior could easily feel too open
            and cold. The Unfolding House counteracts this with soft textures
            and warm colours. Light tan hardwood floors are used throughout,
            balancing the effect of the white walls and dark cabinetry. Floor to
            ceiling curtains cover every window, bringing a remarkable amount of
            softness to the rooms. Additional warmth is provided by the brass
            fixtures and wooden furniture.
          </p>

          <p>
            The Unfolding Home keeps the principles of minimalism close and
            proves that smart and simple can create the loveliest designs.
          </p>

          <div className={styles.imageGroup}>
            <ContentImage {...allImages[7]} isGallery data-image-index={7} />
            <ContentImage {...allImages[8]} isGallery data-image-index={8} />
            <ContentImage {...allImages[9]} isGallery data-image-index={9} />
          </div>
        </Gallery>
      </ContentEditor>

      <ContentMeta items={metaItems} />
    </div>
  );
}
