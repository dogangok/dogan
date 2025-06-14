# Image System Guide

This document provides a comprehensive overview of the image system used throughout the Minimalissimo project, including all image components, variants, and their interactions with different content types.

## Overview

The image system is built around the `ContentImage` component which provides a flexible, responsive image solution that adapts to different contexts (articles, galleries, moods) while maintaining consistent behavior and styling.

## Core Components

### 1. ContentImage Component

**Location**: `/src/components/content/image/content-image.tsx`

The main image component that handles all image rendering across the site. This is a client component due to zoom functionality.

**Props**:
```typescript
interface ContentImageProps {
  src: string;                    // Image source path
  alt: string;                    // Alt text for accessibility
  width: number;                  // Original image width
  height: number;                 // Original image height
  orientation?: "landscape" | "portrait" | "square";  // Image orientation
  sizes?: string;                 // Responsive sizes attribute
  quality?: number;               // Image quality (default: 60)
  priority?: boolean;             // Next.js priority loading
  caption?: string;               // Optional image caption
  className?: string;             // Additional CSS classes
  isFirst?: boolean;              // First image in article (larger sizing)
  isGallery?: boolean;            // Gallery context flag
  isMood?: boolean;               // Mood gallery context flag
  onImageClick?: () => void;      // Custom click handler (used by gallery)
}
```

**Features**:
- Automatic orientation detection based on aspect ratio
- Responsive sizing with Next.js Image optimization
- Dynamic padding-bottom for aspect ratio preservation
- Support for image captions
- Context-aware styling (first image, gallery, mood)
- Built-in zoom functionality for individual images
- Integration with gallery navigation system

### 2. ContentGallery Component

**Location**: `/src/components/content/gallery/content-gallery.tsx`

A client component that provides gallery functionality with keyboard navigation for zoomed images.

**Usage**:
```tsx
<ContentGallery>
  <ContentImage ... />
  <ContentImage ... />
</ContentGallery>
```

**Features**:
- Centers child images with `text-align: center`
- Works in conjunction with ContentEditor variants
- Manages zoom state for all child images
- Keyboard navigation for zoomed images:
  - **Left Arrow**: Previous image (loops to last)
  - **Right Arrow**: Next image (loops to first)
  - **Escape**: Close zoomed view
- Click anywhere to close zoomed image
- Maintains zoom quality at 90 for better detail viewing

## Image Contexts and Variants

### 1. Article Images (Default Context)

Used within `ContentEditor variant="default"` for standard article layouts.

**Characteristics**:
- Full width on mobile (`width: 100%`)
- Responsive widths on larger screens
- First image gets special treatment (larger size)
- 3rem top margin for spacing

**Size Breakpoints**:
```css
/* Regular images */
Portrait/Square: 268px → 366px → 366px (mobile → tablet → desktop)
Landscape: 402px → 550px → 550px

/* First image (larger) */
Portrait/Square: 100% → 366px → 468px
Landscape: 100% → 550px → 702px
```

### 2. Gallery Images

Used within `ContentEditor variant="gallery"` with `ContentGallery`.

**Characteristics**:
- Auto width for centering (`width: auto`)
- Inline-block display for horizontal arrangement
- Centered by parent's `text-align: center`
- Standard responsive sizing

### 3. Mood Gallery Images

Used within mood pages for curated image collections.

**Characteristics**:
- All gallery features plus mood-specific enhancements
- Larger margins that scale with viewport
- Hover effect with radial gradient overlay
- More dramatic spacing between images

**Mood-Specific Margins**:
```css
Mobile: 3rem 0 0
Small (580px+): 3rem 1.5rem 0
Medium (1200px+): 4rem 2rem 0
Large (1500px+): 5rem 2.5rem 0
```

**Hover Effect**:
- Radial gradient from transparent center to 35% black edges
- 300ms opacity transition
- Creates subtle vignette effect on hover

## Responsive Image Sizing

The system uses Next.js Image component with responsive `sizes` attribute to serve appropriately sized images based on viewport.

### Standard Size Configurations

**Portrait/Square Images**:
```tsx
sizes="(max-width: 446px) 402px, (max-width: 600px) 336px, 468px"
```

**Landscape Images**:
```tsx
sizes="(max-width: 446px) 402px, (max-width: 600px) 504px, 702px"
```

### How Sizes Work
1. Browser evaluates media conditions from left to right
2. Uses first matching condition's size
3. Falls back to last value for larger screens
4. Next.js generates optimized images at these breakpoints

## CSS Architecture

### Base Styles (`content-image.module.css`)

```css
.imgFigure {
  display: inline-block;
  vertical-align: middle;
  margin: 3rem 0 0;
  width: 100%;
}

.imgWrapper {
  width: 100%;
  display: block;
  position: relative;
  border: none;      /* Important for button element */
  padding: 0;        /* Reset button defaults */
  background: none;  /* Remove button background */
  cursor: zoom-in;
}

.img {
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: zoom-in;
}
```

**Note**: The `.imgWrapper` is now a `<button>` element for accessibility, so we reset button styles.

### Context-Specific Classes

1. **`.firstImage`** - Larger sizing for article hero images
2. **`.galleryImage`** - Auto width for gallery centering
3. **`.moodImage`** - Enhanced margins and hover effects

### Spacing System

Images follow a consistent spacing pattern:
- **Vertical**: 3rem minimum, scaling up to 5rem for mood galleries
- **Horizontal**: 0 on mobile, up to 2.5rem for mood galleries
- **Following content**: Additional 3rem margin when after text
- **Gallery bottom margin**: 3rem !important on ContentGallery component

**Important**: Use `!important` for gallery and mood-specific spacing to ensure consistency across different contexts and override any inherited styles.

## Integration with ContentEditor

The image system works closely with ContentEditor variants:

### Default Variant
- Standard article layout
- Left-aligned text with centered images
- First image prominence

### Gallery Variant
- All content centered
- Images display inline for grid effect
- Consistent spacing between images

### Mood Variant
- Enhanced spacing throughout
- Special hover effects
- Larger margins for premium feel

## Zoom Functionality

The image system includes built-in zoom capabilities that enhance the viewing experience:

### Individual Image Zoom
- Click any image to view in fullscreen
- Semi-transparent black overlay (rgba(0, 0, 0, 0.75))
- Image displayed with `object-fit: contain` and 2rem padding
- Cursor changes to `zoom-in` on hover, `zoom-out` when zoomed
- Click anywhere to close

### Gallery Navigation
When images are within a `ContentGallery`:
- Keyboard navigation enabled in zoom mode
- Arrow keys cycle through images with wrap-around
- Escape key closes zoom view
- Smooth transitions between images
- Higher quality (90) for zoomed images

**Important**: ContentGallery respects external `onImageClick` handlers. If provided, it won't override with its own zoom state, allowing for page-level navigation systems.

### Unified Page-Level Navigation
For pages with multiple image groups that need unified navigation:
```tsx
// Architecture page example with unified navigation
const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
const allImages = [...]; // Array of all image props

// In render:
<ContentImage
  {...allImages[0]}
  onImageClick={() => setZoomedIndex(0)}
/>
<ContentGallery>
  <ContentImage {...allImages[1]} onImageClick={() => setZoomedIndex(1)} />
  <ContentImage {...allImages[2]} onImageClick={() => setZoomedIndex(2)} />
</ContentGallery>

// Custom zoom overlay with page-level navigation
{zoomedIndex !== null && (
  <button type="button" onClick={() => setZoomedIndex(null)}>
    <img src={allImages[zoomedIndex].src} />
  </button>
)}
```

This pattern enables keyboard navigation across ALL images on a page, not just within individual galleries.

### CSS Implementation
```css
.zoomed {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 9999;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 2rem;
  cursor: zoom-out;
}
```

## Performance Considerations

### Priority Loading
- First/hero images should use `priority={true}`
- Improves Largest Contentful Paint (LCP)
- Only use for above-the-fold images

### Quality Settings
- Default quality: 60 (good balance)
- Can increase for hero images
- Lower for thumbnails or numerous images
- Zoomed images automatically use quality: 90

### Format Optimization
- Next.js automatically serves WebP where supported
- Falls back to original format for older browsers
- Automatic image optimization on build

## Accessibility Features

1. **Required Alt Text**: Every image must have descriptive alt text
2. **Semantic HTML**: Uses `<figure>` and `<figcaption>` elements
3. **Keyboard Support**: 
   - Images wrapped in semantic `<button>` elements for keyboard access
   - Full keyboard navigation in galleries (arrow keys + escape)
   - Proper focus management
4. **Screen Reader Support**: 
   - Proper ARIA attributes inherited from Next.js Image
   - Descriptive aria-labels on interactive elements
   - Button elements for all clickable areas

## Common Patterns

### Article with Hero Image
```tsx
<ContentEditor variant="default">
  <ContentImage
    src="/hero.jpg"
    alt="Descriptive text"
    width={1600}
    height={900}
    isFirst
    priority
    sizes={LANDSCAPE_SIZES}
  />
  <p>Article content...</p>
</ContentEditor>
```

### Image Gallery
```tsx
<ContentEditor variant="gallery">
  <ContentGallery>
    {images.map((image, index) => (
      <ContentImage
        key={image.src}
        {...image}
        isGallery
        priority={index === 0}
      />
    ))}
  </ContentGallery>
</ContentEditor>
```

### Mood Gallery
```tsx
<ContentEditor variant="gallery">
  <ContentGallery>
    {moodImages.map((image, index) => (
      <ContentImage
        key={image.src}
        {...image}
        isGallery
        isMood
        priority={index === 0}
      />
    ))}
  </ContentGallery>
</ContentEditor>
```

## Future Improvements & Tasks

### 1. Code Organization
- [ ] Extract image size constants to a shared config file
- [ ] Create a `useImageOrientation` hook for orientation detection
- [ ] Move image-related types to a dedicated types file

### 2. Component Architecture
- [ ] Create variant-specific image components (ArticleImage, GalleryImage, MoodImage)
- [ ] Implement a compound component pattern for image groups
- [ ] Add image loading states with skeleton screens

### 3. TypeScript Improvements
- [ ] Add stricter types for image dimensions (min/max constraints)
- [ ] Create branded types for image paths vs URLs
- [ ] Implement type guards for orientation detection
- [ ] Add const assertions for size configurations

### 4. Modern React 19 Features
- [ ] Utilize React 19's improved image loading with Suspense
- [ ] Implement React Server Components for image metadata
- [ ] Use the new `use()` hook for async image data
- [ ] Explore React 19's built-in image optimization features

### 5. Performance Enhancements
- [ ] Implement blur placeholder generation
- [ ] Add LQIP (Low Quality Image Placeholder) support
- [ ] Create responsive image sets with `srcSet`
- [ ] Implement intersection observer for lazy loading control

### 6. DRY Improvements
- [ ] Create a single source of truth for breakpoints
- [ ] Extract repeated CSS patterns into mixins
- [ ] Consolidate margin/padding values into design tokens
- [ ] Create reusable image wrapper components

### 7. Enhanced Features
- [x] Add zoom functionality for detailed image viewing
- [x] Implement image galleries with navigation
- [ ] Add support for video content
- [ ] Create masonry layout option for galleries
- [ ] Add image loading animations/transitions
- [ ] Implement pinch-to-zoom on mobile devices
- [ ] Add image download functionality in zoom mode
- [ ] Create lightbox navigation indicators (1 of 8, etc.)

### 8. Developer Experience
- [ ] Add Storybook stories for all image variants
- [ ] Create visual regression tests for image layouts
- [ ] Add JSDoc comments for all props
- [ ] Create a image usage playground/demo page

### 9. Accessibility Enhancements
- [ ] Add automatic alt text validation
- [ ] Implement focus management for galleries
- [ ] Add ARIA labels for image groups
- [ ] Support reduced motion preferences

### 10. Configuration & Flexibility
- [ ] Make quality settings configurable per context
- [ ] Add theme-aware image filters
- [ ] Support custom aspect ratios
- [ ] Allow pluggable image optimization strategies

## Conclusion

The image system provides a flexible, performant foundation for displaying images across different contexts. By leveraging Next.js Image optimization and responsive design patterns, it delivers an optimal user experience while maintaining developer ergonomics. The suggested improvements would further enhance type safety, performance, and maintainability while embracing modern React patterns.