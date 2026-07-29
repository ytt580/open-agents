# Transitions.dev Skill

## Purpose
Pre-built, consistent UI transitions for web applications. Simple visual feedback animations for buttons, cards, modals, and page changes.

## When to Use
- Adding hover effects to buttons/cards
- Modal open/close animations
- Page/route transitions
- Loading state animations
- Form field focus effects
- Any micro-interaction needing consistent timing

## Core Transitions

### 1. Fade
```css
.fade-enter { opacity: 0; }
.fade-enter-active { opacity: 1; transition: opacity 300ms ease-out; }
.fade-exit { opacity: 1; }
.fade-exit-active { opacity: 0; transition: opacity 200ms ease-in; }
```

### 2. Slide Up
```css
.slide-up-enter {
  opacity: 0;
  transform: translateY(20px);
}
.slide-up-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}
.slide-up-exit {
  opacity: 1;
  transform: translateY(0);
}
.slide-up-exit-active {
  opacity: 0;
  transform: translateY(-10px);
  transition: all 200ms ease-in;
}
```

### 3. Scale (Modal)
```css
.scale-enter {
  opacity: 0;
  transform: scale(0.95);
}
.scale-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: all 200ms ease-out;
}
.scale-exit {
  opacity: 1;
  transform: scale(1);
}
.scale-exit-active {
  opacity: 0;
  transform: scale(0.95);
  transition: all 150ms ease-in;
}
```

### 4. Slide Right
```css
.slide-right-enter {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-right-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms ease-out;
}
```

### 5. Slide Down
```css
.slide-down-enter {
  opacity: 0;
  transform: translateY(-20px);
}
.slide-down-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}
```

## React Patterns

### CSS Transition Classes
```tsx
"use client"
import { useState } from "react"

export function Modal({ isOpen, onClose, children }) {
  return (
    <div className={`modal-overlay ${isOpen ? "fade-enter-active" : "fade-exit-active"}`}>
      <div className={`modal-content ${isOpen ? "scale-enter-active" : "scale-exit-active"}`}>
        {children}
      </div>
    </div>
  )
}
```

### Headless UI Transitions
```tsx
import { Transition } from "@headlessui/react"

<Transition
  show={isOpen}
  enter="transition ease-out duration-300"
  enterFrom="opacity-0 translate-y-4"
  enterTo="opacity-100 translate-y-0"
  leave="transition ease-in duration-200"
  leaveFrom="opacity-100 translate-y-0"
  leaveTo="opacity-0 translate-y-4"
>
  <div>Content</div>
</Transition>
```

### React Transition Group
```tsx
import { CSSTransition } from "react-transition-group"

<CSSTransition
  in={isOpen}
  timeout={300}
  classNames="scale"
  unmountOnExit
>
  <div className="modal">Content</div>
</CSSTransition>
```

## Common UI Transition Recipes

### Button Hover
```css
.btn {
  transition: all 200ms ease;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Card Hover
```css
.card {
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
  border-color: var(--color-primary);
}
```

### Focus Ring
```css
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.3);
  border-color: var(--color-primary);
  transition: box-shadow 200ms ease, border-color 200ms ease;
}
```

### Dropdown Menu
```css
.dropdown-menu {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
  transition: all 150ms ease;
  pointer-events: none;
}
.dropdown-menu.open {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
```

### Toast Notification
```css
.toast {
  transform: translateX(100%);
  opacity: 0;
  transition: all 300ms ease-out;
}
.toast.show {
  transform: translateX(0);
  opacity: 1;
}
```

### Accordion
```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease, padding 300ms ease;
}
.accordion-content.open {
  max-height: 500px;
}
```

### Loading Spinner
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.spinner {
  animation: spin 0.8s linear infinite;
}
```

### Skeleton Loading
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

## Timing Reference
| Duration | Use Case |
|----------|----------|
| 100ms | Micro-interactions (hover, focus) |
| 150ms | Button press, toggle |
| 200ms | Dropdown, tooltip |
| 300ms | Modal, slide, fade |
| 500ms | Page transitions |
| 700ms+ | Complex sequences |

## Easing Reference
| Name | Curve | When to Use |
|------|-------|-------------|
| ease-out | Decelerate | Elements entering view |
| ease-in | Accelerate | Elements leaving view |
| ease-in-out | Both | Smooth transforms |
| linear | Constant | Progress bars, loading |
| cubic-bezier(0.34, 1.56, 0.64, 1) | Overshoot | Bouncy effects |

## Accessibility
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Best Practices
1. **Keep under 300ms** for UI feedback - users shouldn't wait
2. **Use ease-out for entering, ease-in for exiting**
3. **Same timing = same element type** - consistency matters
4. **Animate transform and opacity** - GPU-accelerated, no layout thrashing
5. **Don't animate layout properties** (width, height, top, left) - use transform instead
6. **Always respect prefers-reduced-motion**
7. **Use will-change sparingly** - only for known animations
