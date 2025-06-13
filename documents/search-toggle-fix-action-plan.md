# Search Toggle Fix - Action Plan

## Current Issue

When the search form is open and the user clicks the search icon again, the search form should close but currently remains open. This creates a poor user experience where the only way to close the search is by clicking outside.

## Root Cause Analysis

### Current Implementation
```typescript
// In header.tsx
const toggleSearch = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  setIsSearchOpen(!isSearchOpen);
};

// In useEffect
const handleClickOutside = (event: MouseEvent) => {
  // Early return if clicking search button
  if (searchButton.contains(target)) return;
  // This prevents the button from working when search is open!
};
```

### The Problem
1. When search is open, clicking the search button triggers `handleClickOutside`
2. The handler returns early when detecting a search button click
3. This prevents `toggleSearch` from being called
4. Result: Search stays open

## Solution Options

### Option 1: Remove Early Return (Simplest)
```typescript
useEffect(() => {
  if (!isSearchOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const searchForm = document.querySelector("[data-search-form]");
    
    // Remove the searchButton check entirely
    if (!searchForm) return;
    
    // Only check if clicking inside form
    if (searchForm.contains(target)) return;
    
    setIsSearchOpen(false);
  };
  
  // Let the button's onClick handle its own logic
}, [isSearchOpen]);
```

**Pros:**
- Simple fix
- Button onClick always works
- Clear separation of concerns

**Cons:**
- Might cause timing issues with event order

### Option 2: Check Event Target in Toggle (More Robust)
```typescript
const toggleSearch = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  
  // Force close if already open
  setIsSearchOpen(prev => !prev);
};

// Add pointer-events control
<SearchForm 
  isOpen={isSearchOpen}
  style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }}
/>
```

### Option 3: Use Capture Phase (Most Reliable)
```typescript
useEffect(() => {
  if (!isSearchOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const searchForm = document.querySelector("[data-search-form]");
    const searchButton = document.querySelector(`.${styles.btnSearch}`);
    
    if (!searchForm || !searchButton) return;
    
    // Check if click is outside both form AND button
    if (!searchForm.contains(target) && !searchButton.contains(target)) {
      setIsSearchOpen(false);
    }
  };

  // Use capture phase to run before onClick
  document.addEventListener("click", handleClickOutside, true);
  
  return () => {
    document.removeEventListener("click", handleClickOutside, true);
  };
}, [isSearchOpen]);
```

### Option 4: Modern Approach with Refs (Best Practice)
```typescript
export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isSearchOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // If clicking the button, let onClick handle it
      if (searchButtonRef.current?.contains(target)) {
        return;
      }
      
      // If clicking outside form, close it
      if (searchFormRef.current && !searchFormRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
    };

    // Delay to avoid catching the opening click
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  // Rest of component...
}
```

## Recommended Solution

**Option 4 (Modern Approach with Refs)** is recommended because:

1. **Predictable**: Uses refs instead of querySelector
2. **React-idiomatic**: Follows React best practices
3. **Type-safe**: Full TypeScript support
4. **Reliable**: No timing issues or event conflicts
5. **Maintainable**: Clear intent and easy to debug

## Implementation Steps

### 1. Add Refs
```typescript
const searchButtonRef = useRef<HTMLButtonElement>(null);
const searchFormRef = useRef<HTMLFormElement>(null);
```

### 2. Update Button
```typescript
<button
  ref={searchButtonRef}
  type="button"
  className={`${styles.headerBtn} ${styles.btnSearch}`}
  onClick={toggleSearch}
  aria-label="Search"
  aria-expanded={isSearchOpen}
>
```

### 3. Update SearchForm
Pass ref through forwardRef if needed:
```typescript
const SearchForm = forwardRef<HTMLFormElement, SearchFormProps>(
  ({ isOpen }, ref) => {
    return <form ref={ref} ... />
  }
);
```

### 4. Test Scenarios
- [ ] Click search button to open
- [ ] Click search button again to close
- [ ] Click inside form (should stay open)
- [ ] Click outside form (should close)
- [ ] Press Escape key (should close)
- [ ] Submit search (should close)

## Additional Improvements

### 1. Keyboard Navigation
```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isSearchOpen) {
      setIsSearchOpen(false);
      searchButtonRef.current?.focus(); // Return focus
    }
  };
  
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [isSearchOpen]);
```

### 2. Focus Management
```typescript
useEffect(() => {
  if (isSearchOpen) {
    // Focus search input when opened
    searchInputRef.current?.focus();
  }
}, [isSearchOpen]);
```

### 3. Animation State
```typescript
const [isAnimating, setIsAnimating] = useState(false);

const toggleSearch = () => {
  if (isAnimating) return; // Prevent during animation
  
  setIsAnimating(true);
  setIsSearchOpen(prev => !prev);
  
  setTimeout(() => setIsAnimating(false), 300); // Match CSS transition
};
```

## Testing Checklist

- [ ] Search button toggles search form open/closed
- [ ] Clicking outside closes search
- [ ] Clicking inside search form keeps it open
- [ ] Escape key closes search and returns focus
- [ ] Search submission closes form
- [ ] No event listener memory leaks
- [ ] Works on mobile (touch events)
- [ ] Accessible with screen readers

## Timeline

- Fix implementation: 30 minutes
- Testing: 30 minutes
- Accessibility testing: 30 minutes
- Total: ~1.5 hours

## Next Steps

1. Create git stash checkpoint
2. Implement Option 4 (ref-based approach)
3. Test all scenarios
4. Add keyboard navigation
5. Ensure accessibility compliance

---

**Note**: This fix aligns with the MIMO reference implementation while using modern React patterns for better maintainability.