# DESIGN.md - Open-Agents

## Design System: Neural Network Dark

**Creative North Star:** A dark, sophisticated interface inspired by neural networks and AI connectivity. Deep space backgrounds with electric purple and cyan accents create a futuristic, technical atmosphere.

## Color System

### Core Palette

#### Backgrounds (Deep Space)
- **Void:** `#06060b` - Deepest background
- **Primary:** `#0a0a12` - Main page ground
- **Secondary:** `#0f0f1a` - Panel backgrounds
- **Tertiary:** `#161625` - Elevated surfaces
- **Elevated:** `#1c1c30` - Cards and modals

#### Neural Purple (Primary Accent)
- **50:** `#f5f3ff` - Lightest
- **100:** `#ede9fe`
- **200:** `#ddd6fe`
- **300:** `#c4b5fd`
- **400:** `#a78bfa` - Primary hover
- **500:** `#8b5cf6` - Primary default
- **600:** `#7c3aed` - Primary active
- **700:** `#6d28d9`
- **800:** `#5b21b6`
- **900:** `#4c1d95`

#### Electric Cyan (Secondary Accent)
- **50:** `#ecfeff` - Lightest
- **100:** `#cffafe`
- **200:** `#a5f3fc`
- **300:** `#67e8f9`
- **400:** `#22d3ee` - Secondary default
- **500:** `#06b6d4`
- **600:** `#0891b2`
- **700:** `#0e7490`
- **800:** `#155e75`
- **900:** `#164e63`

#### Plasma Green (Success)
- **50:** `#ecfdf5` - Lightest
- **100:** `#d1fae5`
- **200:** `#a7f3d0`
- **300:** `#6ee7b7`
- **400:** `#34d399` - Success default
- **500:** `#10b981`
- **600:** `#059669`
- **700:** `#047857`
- **800:** `#065f46`
- **900:** `#064e3b`

#### Hot Pink (Error/Warning)
- **50:** `#fdf2f8` - Lightest
- **100:** `#fce7f3`
- **200:** `#fbcfe8`
- **300:** `#f9a8d4`
- **400:** `#f472b6` - Warning default
- **500:** `#ec4899`
- **600:** `#db2777`
- **700:** `#be185d`
- **800:** `#9d174d`
- **900:** `#831843`

### Text Colors

- **Primary:** `#f8fafc` - Headlines, important text
- **Secondary:** `#94a3b8` - Body text
- **Tertiary:** `#64748b` - Captions, metadata
- **Muted:** `#475569` - Disabled text

### Border Colors

- **Default:** `rgba(255, 255, 255, 0.06)` - Subtle borders
- **Subtle:** `rgba(255, 255, 255, 0.03)` - Very subtle
- **Hover:** `rgba(255, 255, 255, 0.12)` - Interactive states
- **Active:** `#8b5cf6` - Focus states

### Surface Colors

- **Default:** `rgba(255, 255, 255, 0.02)` - Card backgrounds
- **Hover:** `rgba(255, 255, 255, 0.04)` - Interactive hover
- **Active:** `rgba(255, 255, 255, 0.06)` - Pressed states
- **Elevated:** `rgba(255, 255, 255, 0.03)` - Modals, dropdowns

## Typography

### Font Families

- **Sans:** `'Inter', system-ui, -apple-system, sans-serif` - Primary UI font
- **Mono:** `'JetBrains Mono', 'Fira Code', monospace` - Code, technical text

### Type Scale

| Role | Size | Weight | Line Height | Use Case |
|------|------|--------|-------------|----------|
| Display | `clamp(3.4rem, 6.5vw, 5.6rem)` | 800 | 1.02 | Hero headlines |
| H1 | `3rem` | 700 | 1.1 | Page titles |
| H2 | `2.25rem` | 600 | 1.2 | Section headers |
| H3 | `1.5rem` | 600 | 1.3 | Subsection headers |
| H4 | `1.25rem` | 600 | 1.4 | Card titles |
| Body Large | `1.125rem` | 400 | 1.6 | Lead paragraphs |
| Body | `1rem` | 400 | 1.6 | Default text |
| Body Small | `0.875rem` | 400 | 1.5 | Secondary text |
| Caption | `0.75rem` | 400 | 1.4 | Labels, metadata |
| Mono | `0.875rem` | 500 | 1.5 | Code, technical |

### Typography Rules

1. **Display sizes use Inter at weight 800** for maximum impact
2. **Body text uses weight 400** for readability
3. **Technical content uses JetBrains Mono** for clarity
4. **Line height 1.6-1.8 for body text** on dark backgrounds
5. **Max width 65-75ch** for readable paragraphs

## Spacing System

Base unit: `4px`

| Token | Value | Use Case |
|-------|-------|----------|
| xs | `4px` | Tight spacing |
| sm | `8px` | Small gaps |
| md | `16px` | Default spacing |
| lg | `24px` | Component padding |
| xl | `32px` | Section spacing |
| 2xl | `48px` | Large sections |
| 3xl | `64px` | Page sections |
| 4xl | `96px` | Hero spacing |

## Border Radius

| Token | Value | Use Case |
|-------|-------|----------|
| none | `0` | Sharp edges |
| sm | `6px` | Small elements |
| md | `10px` | Buttons, inputs |
| lg | `14px` | Cards |
| xl | `20px` | Large cards |
| 2xl | `28px` | Modals |
| full | `9999px` | Pills, badges |

## Elevation System

### Shadows

- **sm:** `0 1px 2px rgba(0, 0, 0, 0.4)` - Subtle depth
- **md:** `0 4px 12px rgba(0, 0, 0, 0.4)` - Cards
- **lg:** `0 12px 40px rgba(0, 0, 0, 0.5)` - Dropdowns
- **xl:** `0 24px 60px rgba(0, 0, 0, 0.6)` - Modals
- **glow:** `0 0 30px rgba(139, 92, 246, 0.12)` - Accent glow
- **glow-strong:** `0 0 60px rgba(139, 92, 246, 0.25)` - Strong accent

### Elevation Rules

1. **Cards use `shadow-md`** at rest
2. **Interactive cards use `shadow-lg`** on hover
3. **Modals use `shadow-xl`** for maximum depth
4. **Accent elements use glow shadows** for emphasis
5. **No decorative shadows** - only functional elevation

## Component Patterns

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, #7c3aed, #8b5cf6);
  color: white;
  border: none;
  border-radius: 14px;
  padding: 12px 24px;
  font-weight: 600;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.12);
  transition: all 200ms ease-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 60px rgba(139, 92, 246, 0.25);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.02);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 200ms ease-out;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.12);
}
```

### Cards

```css
.card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: all 200ms ease-out;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
}
```

### Inputs

```css
.input-field {
  background: #0f0f1a;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  color: #f8fafc;
  padding: 12px 16px;
  transition: all 200ms ease-out;
}

.input-field:focus {
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.12);
}
```

## Animation System

### Timing

- **Fast:** `120ms` - Micro-interactions
- **Normal:** `200ms` - Standard transitions
- **Slow:** `350ms` - Complex animations
- **Slower:** `500ms` - Page transitions

### Easing

- **Out:** `cubic-bezier(0.16, 1, 0.3, 1)` - Elements entering
- **In:** `cubic-bezier(0.7, 0, 0.84, 0)` - Elements exiting
- **In-Out:** `cubic-bezier(0.65, 0, 0.35, 1)` - Smooth transforms
- **Spring:** `cubic-bezier(0.34, 1.56, 0.64, 1)` - Bouncy effects

### Animation Patterns

#### Fade In
```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

#### Glow Pulse
```css
@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.animate-glow-pulse {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

## Layout System

### Grid

- **Max width:** `1280px`
- **Gutters:** `24px`
- **Columns:** 12-column grid

### Breakpoints

- **sm:** `640px` - Mobile landscape
- **md:** `768px` - Tablet
- **lg:** `1024px` - Desktop
- **xl:** `1280px` - Large desktop
- **2xl:** `1536px` - Ultra wide

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid #8b5cf6;
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Contrast Ratios

- **Normal text:** 4.5:1 minimum
- **Large text:** 3:1 minimum
- **Interactive elements:** 3:1 minimum

## Anti-Patterns to Avoid

1. **No pure black or white** - Always use tinted colors
2. **No gray text on colored backgrounds** - Use appropriate contrast
3. **No nested cards** - Keep hierarchy flat
4. **No bounce/elastic easing** - Use smooth transitions
5. **No decorative shadows** - Only functional elevation
6. **No glassmorphism** - Keep surfaces solid
7. **No purple gradients as brand** - Use as accent only

## Design Tokens Reference

All colors, spacing, and typography values are defined as CSS custom properties in `globals.css`. Use these tokens consistently across all components.

```css
:root {
  /* Colors */
  --neural-500: #8b5cf6;
  --electric-400: #22d3ee;
  --plasma-400: #34d399;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Borders */
  --radius-lg: 14px;
  --radius-xl: 20px;
}
```
