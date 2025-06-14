# MIMO Alignment Branch

## Purpose
This experimental branch aims to align our implementation more closely with the original MIMO design system while maintaining React 19 best practices.

## Key Changes
1. CSS class naming: Converting camelCase to kebab-case to match MIMO
2. Simplifying component logic to match MIMO's CSS-based approach
3. Removing unnecessary wrapper elements and props
4. Fixing gradient animations to match MIMO exactly
5. Simplifying image zoom functionality
6. Removing all !important flags
7. Cleaning up duplicate styles

## Principles
- Simplicity over complexity
- CSS solutions over JavaScript state
- Match MIMO's HTML structure exactly
- Keep React 19 server component benefits
- Maintain accessibility

## Breaking Changes
- CSS class names will change from camelCase to kebab-case
- Some component props will be removed
- Image zoom behavior will be simplified
- Some wrapper elements will be removed