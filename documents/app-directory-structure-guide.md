# Next.js 15 App Directory Structure Guide

## Overview

This guide presents modern, scalable approaches for organizing the Next.js 15 app directory in 2025. As projects grow from simple portfolios to complex applications, the initial file structure decisions become critical for maintainability, team collaboration, and development velocity.

## Current Issues with Flat Structure

Before exploring solutions, let's understand why the default flat structure becomes problematic:

### The Problem

```
/src/app
  favicon.ico
  globals.css
  layout.tsx
  page.tsx
  page.module.css
  about.tsx
  about.module.css
  blog.tsx
  blog.module.css
  contact.tsx
  contact.module.css
  error.tsx
  error.module.css
  not-found.tsx
  not-found.module.css
```

### Issues

1. **CSS Module Clutter**: Mixing `.module.css` files with route files creates visual noise
2. **Naming Conflicts**: Each page needs a unique CSS module name
3. **Poor Scalability**: 20+ pages means 40+ files in one directory
4. **No Logical Grouping**: Related functionality scattered across files
5. **Difficult Navigation**: Hard to find specific files in large projects
6. **Component Organization Mismatch**: Components follow directory structure, pages don't

## Option 1: Route Modules Pattern

### Structure

```
/src/app
  layout.tsx
  globals.css
  favicon.ico
  
  /(pages)/
    /page.tsx                    # Home page
    /_components/                # Shared page components
      /error-layout/
        /error-layout.tsx
        /error-layout.module.css
    
    /about/
      /page.tsx
      /_components/
        /about-hero.tsx
        /about-hero.module.css
        /about-team.tsx
        /about-team.module.css
    
    /projects/
      /page.tsx
      /layout.tsx               # Projects-specific layout
      /_components/
        /project-grid.tsx
        /project-grid.module.css
      /[slug]/
        /page.tsx
        /_components/
          /project-detail.tsx
          /project-detail.module.css
    
    /blog/
      /page.tsx
      /_components/
        /blog-list.tsx
        /blog-list.module.css
      /[slug]/
        /page.tsx
        /_components/
          /blog-post.tsx
          /blog-post.module.css
        
  /(system)/                    # System pages group
    /not-found.tsx
    /error.tsx
    /_components/
      /error-container/
        /error-container.tsx
        /error-container.module.css
```

### Pros

- **Clear Separation**: Routes and their components are co-located
- **Self-Contained Routes**: Each route has everything it needs
- **Excellent Scalability**: Adding new routes doesn't clutter existing ones
- **Next.js 15 Best Practice**: Follows official recommendations
- **Easy Navigation**: Predictable file locations
- **Component Reusability**: Shared components in `_components`
- **TypeScript Friendly**: Easy to set up path aliases per route

### Cons

- **More Directories**: Deeper nesting can feel overwhelming initially
- **Potential Duplication**: Similar components might be created in different routes
- **Import Paths**: Longer import paths without proper aliases
- **Learning Curve**: Team needs to understand the structure

### When to Use

- Medium to large projects
- Projects expected to grow significantly
- Teams with multiple developers
- When routes have distinct component needs

## Option 2: Feature-Based Architecture

### Structure

```
/src/app
  layout.tsx
  globals.css
  favicon.ico
  
  /(home)/
    /page.tsx
    /_components/
      /hero/
      /features/
    /_styles/
      /home.module.css
    /_hooks/
      /use-home-animation.ts
    
  /(portfolio)/
    /projects/
      /page.tsx
      /[slug]/page.tsx
    /about/
      /page.tsx
    /_components/
      /_styles/
      /_lib/
      /_hooks/
    
  /(blog)/
    /page.tsx
    /[slug]/page.tsx
    /categories/
      /[category]/page.tsx
    /_components/
    /_styles/
    /_lib/
    /_api/
    
  /(commerce)/
    /products/
      /page.tsx
      /[id]/page.tsx
    /cart/
      /page.tsx
    /checkout/
      /page.tsx
    /_components/
    /_lib/
    /_hooks/
    
  /_shared/                     # Shared across features
    /_components/
      /error-boundary/
      /loading-states/
    /_hooks/
    /_lib/
    /_types/
```

### Pros

- **Domain Isolation**: Each feature is completely self-contained
- **Team Scalability**: Different teams can work on different features
- **Easy Feature Removal**: Delete a directory to remove a feature
- **Clear Boundaries**: Obvious where code belongs
- **Microservice Ready**: Easy to extract features later
- **Testing Isolation**: Feature-specific tests are co-located
- **Performance**: Can optimize bundles per feature

### Cons

- **Overhead for Small Projects**: Too much structure initially
- **Cross-Feature Complexity**: Sharing between features needs planning
- **Route Group Limitations**: Some Next.js features work better with traditional routes
- **Steeper Learning Curve**: Requires understanding of domain boundaries

### When to Use

- Large applications with distinct features
- Multi-team projects
- Projects that might split into microservices
- E-commerce or SaaS applications

## Option 3: Hybrid Approach

### Structure

```
/src/app
  layout.tsx
  globals.css
  favicon.ico
  page.tsx                      # Home uses root
  not-found.tsx                 # System pages at root
  error.tsx
  
  /_components/                 # App-level components
    /pages/                     # Page-specific components
      /home/
        /home-hero.tsx
        /home-hero.module.css
        /home-features.tsx
        /home-features.module.css
      /error/
        /error-content.tsx
        /error-content.module.css
      /not-found/
        /not-found-content.tsx
        /not-found-content.module.css
    /shared/                    # Truly shared components
      /section/
      /grid/
    
  /about/
    /page.tsx                   # Simple pages just have page.tsx
  
  /projects/
    /page.tsx
    /[slug]/
      /page.tsx
      
  /blog/
    /page.tsx
    /[category]/
      /page.tsx
      /[slug]/
        /page.tsx
```

### Pros

- **Clean Routes**: Route files stay minimal
- **Flexible**: Can start simple and grow complex
- **Easy Migration**: Good stepping stone from flat structure
- **Clear Intent**: Obvious what's a route vs component
- **Reduced Nesting**: Flatter than pure route modules
- **Quick Development**: Less setup for new pages

### Cons

- **Mixed Patterns**: Inconsistency between simple and complex pages
- **Component Discovery**: Need to check multiple locations
- **Unclear Boundaries**: When does a page need its own directory?
- **Refactoring Overhead**: Moving between patterns as pages grow

### When to Use

- Projects transitioning from simple to complex
- Mixed content sites (blog + app)
- Small teams wanting flexibility
- Rapid prototyping phases

## Option 4: Domain-Driven Design (DDD)

### Structure

```
/src/app                        # Purely routing
  layout.tsx
  globals.css
  favicon.ico
  
  /page.tsx                     # Renders HomeView
  /not-found.tsx               # Renders NotFoundView
  /error.tsx                   # Renders ErrorView
  
  /about/page.tsx              # Renders AboutView
  /projects/page.tsx           # Renders ProjectsView
  /projects/[slug]/page.tsx    # Renders ProjectDetailView
  
/src/features/                  # Business logic & components
  /home/
    /components/
      /home-view.tsx
      /home-view.module.css
      /hero-section.tsx
      /feature-grid.tsx
    /hooks/
      /use-home-data.ts
    /lib/
      /home-utils.ts
    /types/
      /home.types.ts
    
  /portfolio/
    /components/
      /projects-view.tsx
      /project-detail-view.tsx
      /project-card.tsx
    /hooks/
    /lib/
    /api/
    /types/
    
  /blog/
    /components/
    /hooks/
    /lib/
    /api/
    /types/
    
  /error-pages/
    /components/
      /error-view.tsx
      /error-view.module.css
      /not-found-view.tsx
      /not-found-view.module.css
    
  /shared/                      # Shared across domains
    /components/
    /hooks/
    /lib/
    /types/
```

### Pros

- **Complete Separation**: Routing entirely separate from logic
- **Maximum Testability**: Features can be tested in isolation
- **Clean App Directory**: Only routing concerns in `/app`
- **Reusability**: Features can be used in different contexts
- **Framework Agnostic**: Features don't depend on Next.js specifics
- **Clear Architecture**: Follows clean architecture principles
- **Type Safety**: Easy to enforce boundaries with TypeScript

### Cons

- **Indirection**: Need to look in multiple places
- **Over-Engineering**: Too much for simple projects
- **Next.js Features**: Some features work better with co-location
- **Mental Model**: Requires understanding of DDD principles
- **Initial Setup**: More boilerplate to get started

### When to Use

- Enterprise applications
- Projects with complex business logic
- When planning for multiple frontends
- Teams familiar with DDD/Clean Architecture

## Comparison Matrix

| Aspect | Route Modules | Feature-Based | Hybrid | DDD |
|--------|--------------|---------------|---------|-----|
| **Initial Setup** | Medium | High | Low | High |
| **Scalability** | Excellent | Excellent | Good | Excellent |
| **Team Collaboration** | Good | Excellent | Fair | Excellent |
| **Learning Curve** | Medium | High | Low | High |
| **Flexibility** | Good | Fair | Excellent | Good |
| **Next.js Alignment** | Excellent | Good | Good | Fair |
| **Testing** | Good | Excellent | Fair | Excellent |
| **Refactoring** | Good | Fair | Medium | Excellent |
| **Small Projects** | Overkill | Overkill | Perfect | Overkill |
| **Large Projects** | Perfect | Perfect | Challenging | Perfect |

## Migration Strategies

### From Flat to Route Modules

1. Create route groups: `/(pages)`, `/(system)`
2. Move each page into its own directory
3. Co-locate CSS modules with their pages
4. Extract shared components to `_components`

### From Any to Feature-Based

1. Identify distinct features/domains
2. Create feature directories outside `/app`
3. Move related components, hooks, and utilities
4. Update imports to use feature boundaries

### Gradual Migration

1. Start with Hybrid approach
2. Move complex pages to Route Modules
3. Extract features as they become clear
4. Refactor shared code last

## Best Practices for 2025

### 1. Use Route Groups

```
/(marketing)    # Public pages
/(app)         # Authenticated pages
/(admin)       # Admin pages
```

### 2. Prefix Private Folders

```
/_components   # Not exposed as routes
/_lib         
/_hooks
```

### 3. Co-locate Related Files

```
/blog
  /page.tsx
  /loading.tsx
  /error.tsx
  /layout.tsx
  /opengraph-image.tsx
```

### 4. Parallel Routes for Complex UIs

```
/@modal
/@sidebar
/page.tsx
```

### 5. Type-Safe Imports

```typescript
// tsconfig.json paths
"@/features/*": ["src/features/*"],
"@/app/*": ["src/app/*"]
```

## Recommendations by Project Type

### Portfolio/Blog (5-20 pages)
- **Recommended**: Hybrid Approach
- **Alternative**: Simple Route Modules

### SaaS Application (20-100 pages)
- **Recommended**: Route Modules Pattern
- **Alternative**: Feature-Based Architecture

### E-commerce Platform
- **Recommended**: Feature-Based Architecture
- **Alternative**: DDD with Route Modules

### Enterprise Application
- **Recommended**: Domain-Driven Design
- **Alternative**: Feature-Based Architecture

### Startup MVP
- **Recommended**: Hybrid Approach
- **Alternative**: Simple flat structure (refactor later)

## Conclusion

The "best" structure depends on:
- Project size and growth expectations
- Team size and experience
- Business domain complexity
- Performance requirements
- Maintenance expectations

Start simple and refactor as needed. The patterns presented here provide clear upgrade paths as your project grows. Remember: the goal is maintainable, scalable code that your team can work with efficiently.