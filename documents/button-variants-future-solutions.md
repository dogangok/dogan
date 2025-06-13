# Button Variants - Future Solutions

A focused guide on modernizing button components in this project using React 19 and Next.js 15 best practices.

## Current State

Currently, buttons are styled using:
- Global `.button` class in `globals.css`
- Component-specific overrides (e.g., `.archivesButton`)
- CSS specificity conflicts requiring workarounds

## Proposed Solution: CSS Custom Properties with Data Attributes

### Why This Approach?

1. **Aligns with project philosophy**: Keeps styling in CSS, minimal JavaScript
2. **Matches MIMO patterns**: Clean, semantic markup
3. **Modern CSS features**: Leverages native CSS capabilities
4. **Type-safe**: Can be typed with TypeScript
5. **Performance**: No runtime style calculations

### Implementation Plan

#### Phase 1: Create Base Button Component

```typescript
// components/common/button/button.tsx
interface ButtonProps {
  variant?: 'default' | 'filled' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  as?: 'button' | 'a' | typeof Link;
  // ... other props
}
```

#### Phase 2: CSS Architecture

```css
/* button.module.css */
.button {
  /* Base styles using custom properties */
  background: var(--button-bg, transparent);
  color: var(--button-color, gray);
  border: var(--button-border, 1px solid var(--c-detail));
  
  /* Transitions */
  transition-property: background, color, border;
  transition-duration: var(--a-speed);
}

/* Variants via data attributes */
.button[data-variant="filled"] {
  --button-bg: var(--c-text);
  --button-color: var(--c-detail);
  --button-border: 1px solid var(--c-text);
}

.button[data-variant="ghost"]:hover {
  --button-bg: transparent;
  --button-color: var(--c-detail);
}
```

### Benefits Over Current Approach

1. **Single source of truth**: All button styles in one place
2. **No specificity battles**: Data attributes don't increase specificity
3. **Runtime themeable**: Can change custom properties dynamically
4. **Maintainable**: Clear variant definitions

## To-Do List

### Immediate Tasks

- [ ] **Audit current buttons**: List all button instances and their styles
  - [ ] Global `.button` usage
  - [ ] Archives button
  - [ ] Search submit button
  - [ ] Header buttons (theme toggle, search)
  - [ ] Menu button

- [ ] **Create test branch**: `experiment/button-variants`

- [ ] **Implement base component**:
  - [ ] Create `/components/common/button/` directory
  - [ ] Design TypeScript interface
  - [ ] Build polymorphic component (renders as button/link)

### Technical Implementation

- [ ] **CSS Architecture**:
  - [ ] Define CSS custom properties for all states
  - [ ] Create variant styles using data attributes
  - [ ] Ensure dark mode compatibility
  - [ ] Test with all existing button instances

- [ ] **Type Safety**:
  - [ ] Create ButtonVariants type
  - [ ] Add JSDoc comments
  - [ ] Ensure Link component compatibility

### Testing & Migration

- [ ] **Test in isolation**:
  - [ ] Create Storybook-like test page
  - [ ] Verify all variants and states
  - [ ] Check keyboard navigation
  - [ ] Test with screen readers

- [ ] **Gradual migration**:
  - [ ] Start with archives button
  - [ ] Move to header buttons
  - [ ] Update search button last (most complex)

### Documentation

- [ ] **Component documentation**:
  - [ ] Usage examples
  - [ ] Variant showcase
  - [ ] Migration guide from old buttons

## Alternative Approaches (Considered but Not Recommended)

### 1. **Tailwind-style Utility Classes**
```jsx
<button className="bg-text text-detail hover:bg-transparent">
```
- ❌ Conflicts with CSS Modules approach
- ❌ Adds build complexity

### 2. **CSS-in-JS**
```jsx
const Button = styled.button`
  ${props => props.variant === 'filled' && css`...`}
`
```
- ❌ Adds runtime overhead
- ❌ Against project's CSS-first philosophy

### 3. **Inline Styles with Props**
```jsx
<Button 
  bgColor="var(--c-text)" 
  hoverBgColor="transparent"
/>
```
- ❌ Poor developer experience
- ❌ Hard to maintain consistency

## Success Criteria

- [ ] All buttons use the new component
- [ ] No CSS specificity conflicts
- [ ] Maintains current visual design exactly
- [ ] Improved developer experience
- [ ] Type-safe variant system
- [ ] Performance: No increase in bundle size
- [ ] Accessibility: Maintains or improves a11y

## Code Example Preview

```tsx
// Usage examples after implementation
<Button variant="filled" as={Link} href="/membership">
  Become a Member
</Button>

<Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
  <ThemeIcon />
</Button>

<Button size="small" type="submit">
  Search
</Button>
```

## Timeline Estimate

- Research & Planning: 2 hours
- Implementation: 3-4 hours  
- Testing: 2 hours
- Migration: 2-3 hours
- Documentation: 1 hour

**Total: ~1.5 days of focused work**

## Next Steps

1. Get approval on approach
2. Create experiment branch using git stash method
3. Build proof of concept with archives button
4. If successful, proceed with full implementation

---

**Note**: This approach maintains the project's minimalist philosophy while solving current pain points and preparing for future scalability.