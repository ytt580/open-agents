# Design System Skill

## Purpose
Establish a reusable, documented design system for any project. Ensures visual consistency, brand coherence, and component reusability across all pages and features.

## When to Use
- Starting a new UI project (web, mobile, or multi-platform)
- Building multi-page applications with unified visual language
- Need consistent typography, colors, spacing, and components
- Want to avoid "AI slop" (random, inconsistent outputs)
- Refactoring an existing UI to follow systematic patterns

## Core Workflow

### Phase 1: Discovery
Before writing any code, answer these:
1. **Brand Identity**: What is the project's personality? (professional, playful, minimal, bold)
2. **Target Audience**: Who uses this? (developers, designers, general users)
3. **Platform**: Web, mobile, or both?
4. **Inspiration**: Reference 2-3 existing products/brands as style anchors
5. **Dark/Light**: Which mode? Both?

### Phase 2: Define Tokens

#### Color System
```css
:root {
  /* Core palette */
  --color-primary: #8b5cf6;
  --color-primary-light: #a78bfa;
  --color-primary-dark: #7c3aed;
  
  --color-secondary: #22d3ee;
  --color-secondary-light: #67e8f9;
  --color-secondary-dark: #0891b2;
  
  /* Backgrounds */
  --color-bg: #0a0a0f;
  --color-bg-secondary: #12121a;
  --color-bg-tertiary: #1a1a25;
  --color-surface: #15151f;
  --color-surface-elevated: #1a1a28;
  
  /* Text */
  --color-text: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-tertiary: #64748b;
  
  /* Borders */
  --color-border: #1e293b;
  --color-border-subtle: #1a1a2e;
  
  /* Semantic */
  --color-success: #06d6a0;
  --color-warning: #fbbf24;
  --color-error: #f43f5e;
  --color-info: #22d3ee;
  
  /* Glow / Effects */
  --color-glow-primary: rgba(139, 92, 246, 0.15);
  --color-glow-strong: rgba(139, 92, 246, 0.3);
}
```

#### Typography Scale
```css
:root {
  /* Font families */
  --font-sans: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Font sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

#### Spacing Scale (Base: 8px)
```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

#### Border Radius
```css
:root {
  --radius-sm: 0.375rem;  /* 6px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;
}
```

#### Shadows
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.4);
  --shadow-glow: 0 0 20px var(--color-glow-primary);
  --shadow-glow-strong: 0 0 40px var(--color-glow-strong);
}
```

#### Breakpoints
```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}
```

### Phase 3: Create DESIGN.md

Create a `DESIGN.md` file in the project root:

```markdown
# [Project Name] Design System

## Brand Personality
- **Tone**: [professional / playful / minimal / bold]
- **Voice**: [technical / friendly / authoritative]
- **Visual Style**: [dark-mode-first / light / adaptive]

## Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #8b5cf6 | CTAs, links, active states |
| primary-light | #a78bfa | Hover states, highlights |
| secondary | #22d3ee | Accents, badges, accents |
| bg | #0a0a0f | Page background |
| surface | #15151f | Card backgrounds |
| text | #f1f5f9 | Body text |
| border | #1e293b | Dividers, card borders |
| success | #06d6a0 | Positive feedback |
| warning | #fbbf24 | Caution states |
| error | #f43f5e | Errors, destructive actions |

## Typography
- **Font**: Space Grotesk (400, 500, 600, 700)
- **Mono**: JetBrains Mono (400, 500)
- **H1**: 30px / bold / -0.02em tracking
- **H2**: 24px / bold / -0.01em tracking
- **H3**: 20px / semibold
- **Body**: 16px / normal / 1.5 line-height
- **Small**: 14px / normal
- **Caption**: 12px / normal

## Spacing
Base unit: 8px
Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80

## Components
### Buttons
- **Primary**: bg primary, white text, rounded-xl, glow shadow
- **Secondary**: border, surface bg, text color, rounded-xl
- **Ghost**: transparent, text color, hover bg-secondary
- **Danger**: bg error, white text, rounded-xl

### Cards
- **Default**: surface bg, 1px border, rounded-2xl, shadow-md
- **Elevated**: surface-elevated bg, shadow-lg
- **Interactive**: hover:border-primary, hover:shadow-glow

### Inputs
- Height: 48px (3rem)
- Padding: 0 16px
- Border: 1px solid border
- Focus: border-primary, glow shadow
- Placeholder: text-tertiary

### Modals
- Backdrop: rgba(0,0,0,0.7) + blur(4px)
- Content: surface bg, rounded-2xl, shadow-xl
- Header: border-bottom, padding 16px
- Footer: border-top, padding 16px

### Badges/Pills
- Small: rounded-full, px-3 py-1, text-xs
- Color: bg with alpha, matching text color

## Motion
- **Duration**: 200ms (micro), 300ms (standard), 500ms (complex)
- **Easing**: ease-out (enter), ease-in (exit), spring (bouncy)
- **Hover**: translateY(-1px) + shadow increase
- **Focus**: ring with primary color + alpha

## Accessibility
- Minimum contrast: 4.5:1 (normal text), 3:1 (large text)
- Focus visible: 2px solid primary, 2px offset
- Touch targets: minimum 44x44px
- Reduced motion: respect prefers-reduced-motion

## Code References
- CSS variables: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component library: `components/`
```

### Phase 4: Implement in Code

#### Tailwind Config Integration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'var(--color-primary)', light: 'var(--color-primary-light)', dark: 'var(--color-primary-dark)' },
        secondary: { DEFAULT: 'var(--color-secondary)', light: 'var(--color-secondary-light)', dark: 'var(--color-secondary-dark)' },
        bg: { DEFAULT: 'var(--color-bg)', secondary: 'var(--color-bg-secondary)', tertiary: 'var(--color-bg-tertiary)' },
        surface: { DEFAULT: 'var(--color-surface)', elevated: 'var(--color-surface-elevated)' },
        border: { DEFAULT: 'var(--color-border)', subtle: 'var(--color-border-subtle)' },
      },
      fontFamily: { sans: ['Space Grotesk', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', '2xl': 'var(--radius-2xl)' },
      boxShadow: { glow: 'var(--shadow-glow)', 'glow-strong': 'var(--shadow-glow-strong)' },
    }
  }
}
```

#### Component Patterns
```tsx
// Button pattern
<button className="btn-primary">Primary</button>
<button className="btn-secondary">Secondary</button>
<button className="btn-ghost">Ghost</button>

// Card pattern
<div className="card">Content</div>
<div className="card-elevated">Elevated</div>
<div className="card hover:border-primary transition-all">Interactive</div>

// Input pattern
<input className="input-field" placeholder="Type..." />
```

## Reference Resources
- **getdesign.md**: Pre-made DESIGN.md files for Airbnb, Apple, Meta, Spotify
- **Mobbin**: 600k+ real product screens for reference
- **Figma MCP**: Direct design-to-code with Figma
- **shadcn/ui**: Deterministic component library

## Best Practices
1. **Document first, code second** - Always create DESIGN.md before writing components
2. **Use semantic tokens** - Never hardcode colors (use `var(--color-primary)` not `#8b5cf6`)
3. **Component variants** - One component with variants, not separate components
4. **Test contrast** - Verify accessibility ratios before shipping
5. **Version control** - Track design system changes with changelog
6. **Reference real designs** - Use Mobbin/getdesign.md for inspiration, not random generation
7. **Consistent naming** - Use BEM or Tailwind utility classes, not ad-hoc styles
8. **Dark mode first** - Design for dark, adapt for light (easier than reverse)
