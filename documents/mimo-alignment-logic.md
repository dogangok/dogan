# MIMO Alignment Logic and Common Mistakes

## Understanding MIMO's Text Alignment System

### The Core Principle

MIMO uses a two-level alignment system:

1. **Container Level**: The editor container is `text-align: center`
2. **Content Level**: Text content within is `text-align: left`

This creates a layout where:
- Images and block elements are **centered** (inheriting from container)
- Text content is **left-aligned** (explicitly set on text elements)

### How MIMO's CSS Works

```css
/* Container is centered */
.default .editor {
  text-align: center;
}

/* But text content is left-aligned */
.default .editor * {
  text-align: left;
}
```

This clever approach works because:
- `text-align: center` on the container centers block-level elements like `<figure>`
- `text-align: left` on `*` affects inline content (text inside `<p>`, `<h2>`, etc.)
- Images wrapped in `<figure>` elements remain centered because the figure is a block element

### Variant-Specific Behavior

Different page types have different alignment needs:

- **Article/Default Pages**: Center container, left-align text
- **Mood Pages**: Everything centered (no left-align override)
- **Gallery Pages**: Inherit from parent variant

## Common Mistakes We Keep Making

### Mistake 1: Overly Broad Selectors

❌ **Wrong:**
```css
.editor {
  text-align: center;
}
.editor * {
  text-align: left;  /* This affects ALL variants! */
}
```

✅ **Correct:**
```css
.editor.default {
  text-align: center;
}
.editor.default * {
  text-align: left;  /* Only affects default variant */
}
```

### Mistake 2: Wrong Selector Order

Our React component outputs: `<div class="editor default">`
MIMO's HTML structure is: `<div class="default"><div class="editor">`

❌ **Wrong (MIMO's selectors in our code):**
```css
.default .editor { }  /* Expects nested elements */
```

✅ **Correct (for our structure):**
```css
.editor.default { }  /* Both classes on same element */
```

### Mistake 3: Forgetting Variant Combinations

❌ **Wrong:**
```css
.gallery {
  padding-bottom: 3rem;  /* Applies to ALL galleries */
}
```

✅ **Correct:**
```css
.mood.gallery {
  padding-bottom: 3rem;  /* Only mood galleries */
}
```

### Mistake 4: Breaking Image Centering

When we change alignment rules, we often forget that images need to stay centered:

❌ **Wrong:**
```css
.default * {
  text-align: left;  /* Makes EVERYTHING left-aligned */
}
```

✅ **Correct:**
```css
.editor.default {
  text-align: center;  /* Centers block elements (figures) */
}
.editor.default * {
  text-align: left;   /* Left-aligns text content */
}
```

## The Rules to Remember

1. **Container sets the base alignment** - This centers images and block elements
2. **Star selector (*) overrides for text** - This left-aligns paragraph text
3. **Be specific with variants** - Don't apply rules globally
4. **Check your CSS selector structure** - Match your component's class output
5. **Test both pages when changing alignment** - Architecture AND Moods pages

## Quick Reference

### For Article/Architecture Pages
- Container: `text-align: center` (centers images)
- Text: `text-align: left` (readable articles)
- Result: Centered images, left-aligned text

### For Mood/Gallery Pages
- Container: `text-align: center`
- Text: No override (inherits center)
- Result: Everything centered

## Testing Checklist

When modifying alignment:
1. ✓ Architecture page: Images centered, text left-aligned?
2. ✓ Moods page: Everything centered?
3. ✓ Check CSS specificity: Are selectors specific to variants?
4. ✓ Verify selector structure matches component output?

## The Golden Rule

**"When in doubt, check MIMO's main.css and match the specificity exactly."**

Remember: MIMO's approach is intentional and battle-tested. Our job is to translate it correctly to our React component structure, not to "improve" it.