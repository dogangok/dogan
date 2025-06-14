# Modern Aspect Ratio Migration Guide

## Overview
This document outlines how to migrate from the padding-bottom hack to modern CSS `aspect-ratio` for responsive images while maintaining the same visual output.

## Current Implementation (Padding-Bottom Hack)

### How it works
The padding-bottom technique uses percentage padding to create a responsive container that maintains aspect ratio:
- Padding percentages are calculated relative to the element's width
- A 66.67% padding-bottom creates a 3:2 aspect ratio (height = width × 0.6667)
- The image is absolutely positioned to fill the container

### Current code structure
```css
/* CSS */
.imgWrapper {
  width: 100%;
  display: block;
  position: relative;
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
}
```

```jsx
/* JSX with inline styles */
<div 
  className={styles.imgWrapper}
  data-orientation="landscape"
  style={{ paddingBottom: "66.666666666667%" }}
>
  <Image className={styles.img} ... />
</div>
```

## Modern Implementation (CSS aspect-ratio)

### Benefits
- Cleaner code without inline styles
- More semantic and easier to understand
- Better performance (no layout recalculation)
- Native browser support for aspect ratios

### Migration steps

1. **Update CSS Module** (`architecture/page.module.css`)
```css
.imgWrapper {
  width: 100%;
  display: block;
  position: relative;
  /* Remove the need for absolute positioning */
}

/* Define aspect ratios by data attribute */
.imgWrapper[data-orientation="landscape"] {
  aspect-ratio: 3 / 2;
}

.imgWrapper[data-orientation="portrait"] {
  aspect-ratio: 2 / 3;
}

.imgWrapper[data-orientation="square"] {
  aspect-ratio: 1 / 1;
}

.img {
  display: block;
  width: 100%;
  height: 100%;
  /* Remove absolute positioning */
  position: static;
  object-fit: cover;
}
```

2. **Remove inline styles** from JSX
```jsx
// Before
<div 
  className={styles.imgWrapper}
  data-orientation="landscape"
  style={{ paddingBottom: "66.666666666667%" }}
>

// After
<div 
  className={styles.imgWrapper}
  data-orientation="landscape"
>
```

## Aspect Ratio Calculations

Common aspect ratios used in the project:
- **Landscape**: 3/2 (66.67% padding → `aspect-ratio: 3 / 2`)
- **Portrait**: 2/3 (150% padding → `aspect-ratio: 2 / 3`)
- **Square**: 1/1 (100% padding → `aspect-ratio: 1 / 1`)

For custom ratios:
- 149.92% padding → `aspect-ratio: 1000 / 1499`
- 150.08% padding → `aspect-ratio: 1000 / 1501`

## Browser Support

`aspect-ratio` is supported in all modern browsers:
- Chrome 88+
- Firefox 89+
- Safari 15+
- Edge 88+

For older browser support, you could use:
```css
@supports not (aspect-ratio: 1) {
  /* Fallback to padding-bottom hack */
  .imgWrapper[data-orientation="landscape"] {
    padding-bottom: 66.666666666667%;
  }
}
```

## Implementation Considerations

1. **Visual parity**: The output should be visually identical to the current implementation
2. **Responsive behavior**: Ensure images still scale properly across breakpoints
3. **Next.js Image component**: Works well with aspect-ratio since it handles intrinsic dimensions
4. **Testing**: Thoroughly test across different screen sizes and browsers

## Future Enhancements

Once migrated to `aspect-ratio`, you could:
- Remove the `data-orientation` attribute and use intrinsic image dimensions
- Simplify the CSS by removing unnecessary positioning rules
- Consider using CSS custom properties for dynamic aspect ratios
- Implement container queries for more advanced responsive behaviors

## References
- [MDN: aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)
- [CSS Tricks: Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/)
- [Web.dev: New aspect-ratio CSS property](https://web.dev/aspect-ratio/)