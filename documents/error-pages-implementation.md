# Error Pages Implementation Guide

## Overview

This document details the implementation of custom 404 (Not Found) and error pages in the Next.js application. These pages follow a minimal design approach with centered content, providing a clean and focused user experience when errors occur.

## Page Components

### 404 Page (`not-found.tsx`)

The 404 page is displayed when users navigate to a non-existent route.

**Key Features:**
- Minimal centered design with clear "404 — Page not found" message
- Back to home link with arrow prefix (←) for easy navigation
- Semantic HTML structure using `<main>` element
- Responsive layout that works on all screen sizes

**Implementation Details:**
```tsx
// src/app/not-found.tsx
export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>404 — Page not found</h1>
          <Link href="/" className={styles.errorLink}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
```

### Error Page (`error.tsx`)

The error page serves as a client-side error boundary that catches JavaScript errors during rendering.

**Key Features:**
- Client-side component using "use client" directive
- Displays "Something went wrong" message for unexpected errors
- "Try again" button that resets the error state
- Back to home link for alternative navigation
- Logs errors to console for debugging purposes

**Implementation Details:**
```tsx
// src/app/error.tsx
"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.main}>
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <h1 className={styles.errorTitle}>Something went wrong</h1>
          <div className={styles.errorActions}>
            <button type="button" className={styles.errorButton} onClick={reset}>
              Try again
            </button>
            <Link href="/" className={styles.errorLink}>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
```

## Styling Approach

### Design Principles

1. **Minimal Design**: Clean, uncluttered interface focusing on essential information
2. **Centered Layout**: Content centered both horizontally and vertically
3. **Consistent Typography**: Uses existing design tokens for font sizes and spacing
4. **Responsive**: Adapts to different screen sizes with proper padding
5. **Accessible**: Semantic HTML and clear visual hierarchy

### CSS Structure

Both error pages share similar styling patterns:

```css
.main {
  width: 100%;
}

.errorContainer {
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
}

.errorContent {
  max-width: 23rem;
  text-align: center;
}

.errorTitle {
  font-size: calc(var(--f-size) * var(--f-scale-l));
  font-weight: 400;
  margin: 0;
  line-height: 1.2;
}
```

### Design Tokens Usage

The error pages leverage the existing design system:
- **Typography**: `--f-size`, `--f-scale-l` for larger error titles
- **Colors**: `--c-text`, `--c-bg`, `--c-detail` for theming
- **Animation**: `--a-speed`, `--a-ease` for smooth transitions
- **Layout**: Consistent spacing using rem units

## Layout Integration

### Positioning in Layout

The error pages are rendered as children within the main layout structure:
```
Header
Menu
{children} <- Error pages render here
Archives
Newsletter
Sponsors
Footer
```

### Layout Visibility

Unlike some error page implementations that hide all layout components, this approach:
- Keeps all layout components visible (header, footer, etc.)
- Maintains site navigation and branding
- Provides a consistent user experience
- Uses `min-height: 50vh` to ensure proper spacing

## User Experience Considerations

### Navigation Options

1. **Primary Action**: 
   - 404: "Back to home" link
   - Error: "Try again" button to reset error state

2. **Secondary Navigation**:
   - Full site navigation remains available
   - Users can navigate to other sections without going home first

### Visual Feedback

- Arrow prefix (←) on links provides clear directional cue
- Hover states on interactive elements
- Consistent button styling with border treatment

### Error Recovery

The error page provides two recovery paths:
1. **Reset**: Try the same action again (useful for transient errors)
2. **Navigate Away**: Return home or use site navigation

## Technical Implementation Notes

### Next.js App Router

- Uses App Router conventions for error handling
- `not-found.tsx` automatically handles 404 errors
- `error.tsx` acts as an error boundary for the page tree

### Client-Side Error Handling

The error page includes:
- Error logging to console for debugging
- Error digest for error tracking services
- Proper TypeScript typing for error props

### Accessibility

- Semantic HTML structure
- Clear heading hierarchy
- Keyboard navigable elements
- Sufficient color contrast

## Future Enhancements

Potential improvements for error pages:

1. **Error Categorization**: Different messages for different error types
2. **Internationalization**: Multi-language error messages
3. **Analytics Integration**: Track error occurrences
4. **Custom Illustrations**: Add minimal graphics for visual interest
5. **Search Functionality**: Add search box on 404 page
6. **Suggested Links**: Show popular pages on 404

## Testing Error Pages

### Testing 404 Page
Navigate to any non-existent route: `/any-invalid-path`

### Testing Error Page
Create a test page that throws an error:
```tsx
"use client";
export default function TestError() {
  throw new Error("Test error page");
}
```

## Maintenance Notes

When updating error pages:
1. Maintain consistency with overall site design
2. Test on various screen sizes
3. Ensure theme compatibility (light/dark modes)
4. Verify all navigation links work correctly
5. Check error logging functionality