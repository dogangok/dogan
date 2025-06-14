# Content Components Guide

This document describes the content components located in `/src/components/content/` that are used for building article and content pages in the Minimalissimo design system.

## Overview

The content components provide a comprehensive system for creating rich article layouts with proper typography, responsive images, and well-structured metadata. All components follow the project's conventions using CSS Modules and kebab-case naming.

## Components

### 1. ContentEditor

**Location**: `/src/components/content/editor/`

The main content container that wraps article content and provides consistent text formatting.

**Usage**:
```tsx
import ContentEditor from '@/components/content/editor/content-editor';

<ContentEditor variant="default">
  <p>Your article content goes here...</p>
</ContentEditor>
```

**Props**:
- `children` (required): Article content
- `variant`: Layout variant - `"default"` | `"gallery"` | `"mood"`
- `className`: Additional CSS classes

**Features**:
- Centers content with optimal reading width
- Animated link underlines
- Responsive typography
- Three layout variants for different content types

### 2. ContentIntro

**Location**: `/src/components/content/intro/`

Article header component for displaying title, pretitle, and author information.

**Usage**:
```tsx
import ContentIntro from '@/components/content/intro/content-intro';

<ContentIntro
  pretitle="Case Study"
  title="Minimal Design in Modern Architecture"
  author="John Doe"
/>
```

**Props**:
- `title` (required): Main article title
- `pretitle`: Small text above title
- `author`: Author name
- `className`: Additional CSS classes

### 3. ContentImage

**Location**: `/src/components/content/image/`

Responsive image component with automatic sizing and caption support.

**Usage**:
```tsx
import ContentImage from '@/components/content/image/content-image';

<ContentImage
  src="/images/architecture.jpg"
  alt="Modern minimal building"
  width={1600}
  height={900}
  orientation="landscape"
  caption="Architect: Jane Smith, 2024"
  priority
/>
```

**Props**:
- `src` (required): Image source path
- `alt` (required): Alt text for accessibility
- `width` (required): Original image width
- `height` (required): Original image height
- `orientation`: `"landscape"` | `"portrait"` | `"square"` (auto-detected if not provided)
- `caption`: Optional image caption
- `sizes`: Responsive sizes attribute
- `quality`: Image quality (default: 60)
- `priority`: Next.js priority loading flag
- `className`: Additional CSS classes

**Features**:
- Automatic orientation detection based on aspect ratio
- Responsive sizing with different breakpoints
- Maintains aspect ratio during loading
- First image in ContentEditor gets special sizing

### 4. ContentMeta

**Location**: `/src/components/content/meta/`

Metadata section for displaying article details like date, category, and tags.

**Usage**:
```tsx
import ContentMeta from '@/components/content/meta/content-meta';

<ContentMeta
  items={[
    { title: 'Date', text: 'December 15, 2024' },
    { title: 'Category', link: 'Architecture', href: '/architecture' },
    { title: 'Tags', link: 'Minimal, Modern', href: '/tags/minimal' }
  ]}
/>
```

**Props**:
- `items` (required): Array of metadata items
- `className`: Additional CSS classes

**MetaItem structure**:
- `title`: Label for the metadata
- `text`: Plain text value (use for non-linked content)
- `link`: Link text (use with `href` for linked content)
- `href`: Link URL

### 5. ContentGallery

**Location**: `/src/components/content/gallery/`

Container component for gallery-style layouts.

**Usage**:
```tsx
import ContentGallery from '@/components/content/gallery/content-gallery';
import ContentEditor from '@/components/content/editor/content-editor';

<ContentEditor variant="gallery">
  <ContentGallery>
    <ContentImage ... />
    <ContentImage ... />
    <ContentImage ... />
  </ContentGallery>
</ContentEditor>
```

**Props**:
- `children` (required): Gallery content (typically ContentImage components)
- `className`: Additional CSS classes

## Common Patterns

### Complete Article Layout

```tsx
<ContentEditor>
  <ContentIntro
    pretitle="Featured Article"
    title="The Beauty of Minimalism"
    author="Jane Doe"
  />
  
  <ContentImage
    src="/hero.jpg"
    alt="Minimalist interior"
    width={1600}
    height={900}
    priority
  />
  
  <p>Article introduction paragraph...</p>
  
  <ContentImage
    src="/detail.jpg"
    alt="Interior detail"
    width={800}
    height={1200}
    orientation="portrait"
    caption="Photo: John Smith"
  />
  
  <p>More article content...</p>
  
  <ContentMeta
    items={[
      { title: 'Published', text: 'December 15, 2024' },
      { title: 'Category', link: 'Design', href: '/design' }
    ]}
  />
</ContentEditor>
```

### Gallery Layout

```tsx
<ContentEditor variant="gallery">
  <ContentIntro title="Project Gallery" />
  
  <ContentGallery>
    <ContentImage ... />
    <ContentImage ... />
    <ContentImage ... />
  </ContentGallery>
  
  <ContentMeta ... />
</ContentEditor>
```

## Design Tokens

All content components use the following design tokens from `globals.css`:

- **Typography**: `--l-text` for optimal reading width
- **Colors**: `--c-text`, `--c-detail` for text and borders
- **Animation**: `--a-speed`, `--a-ease` for transitions
- **Spacing**: Consistent padding and margins

## Best Practices

1. **Always provide alt text** for ContentImage components
2. **Use appropriate orientation** for images to ensure proper sizing
3. **Include metadata** at the end of articles for better context
4. **Use priority loading** for above-the-fold images
5. **Match variant types** between ContentEditor and child components
6. **Keep captions concise** and credit photographers when appropriate

## Accessibility

- All components use semantic HTML elements
- Images require alt text for screen readers
- Metadata uses definition list markup for proper structure
- Links have animated underlines for visual feedback
- Text maintains readable contrast ratios

## Responsive Behavior

- ContentEditor constrains text width on larger screens
- ContentImage adapts sizes based on viewport
- Typography scales appropriately across devices
- Gallery layouts stack on mobile devices