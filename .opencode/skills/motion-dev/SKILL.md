# Motion.dev Skill

## Purpose
Production-quality animations for React/Next.js. Micro-interactions, page transitions, scroll reveals, gesture-driven animations, and layout animations.

## When to Use
- Adding hover/tap feedback to buttons, cards, inputs
- Creating smooth page transitions
- Animating list reorders, enters, exits
- Building gesture-driven UI (drag, swipe)
- Scroll-triggered reveal animations
- Staggered entrance animations

## Installation
```bash
npm install motion
# or
yarn add motion
# or
pnpm add motion
```

## Quick Start

### Basic Animation
```tsx
"use client"
import { motion } from "motion/react"

export function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      Content fades in
    </motion.div>
  )
}
```

## Core Concepts

### 1. Animation States
- `initial`: Starting state (before animation)
- `animate`: Target state (what to animate to)
- `exit`: State when unmounting (requires AnimatePresence)
- `whileHover`: State on mouse hover
- `whileTap`: State on click/tap
- `whileInView`: State when scrolled into view
- `whileDrag`: State during drag

### 2. Transition Types

#### Spring (Recommended for natural feel)
```tsx
<motion.div
  animate={{ scale: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
/>
```
- `stiffness`: How stiff the spring (higher = faster)
- `damping`: How much to dampen (higher = less bounce)
- `mass`: Weight of the element (higher = slower)

#### Tween (Precise timing)
```tsx
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```
- `duration`: Time in seconds
- `ease`: "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "backIn" | "backOut"

#### Keyframes
```tsx
<motion.div
  animate={{ rotate: [0, 90, 180, 270, 360] }}
  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
/>
```

### 3. Stagger Children
```tsx
"use client"
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function StaggerList({ items }) {
  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {items.map(item => (
        <motion.div key={item.id} variants={item}>
          {item.name}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### 4. AnimatePresence (Unmount Animations)
```tsx
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function Modal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            Modal content
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### 5. Scroll-triggered Animations
```tsx
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5 }}
>
  Reveals on scroll
</motion.div>
```
- `once: true`: Animate only once
- `margin: "-100px"`: Trigger 100px before element enters viewport

### 6. Layout Animations
```tsx
"use client"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"

export function ReorderableList({ items, onReorder }) {
  return (
    <LayoutGroup>
      <motion.div layout>
        <AnimatePresence>
          {items.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {item.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  )
}
```

### 7. Gesture Animations
```tsx
<motion.div
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  drag
  dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
  dragElastic={0.1}
>
  Drag me
</motion.div>
```

### 8. Shared Layout Animations
```tsx
"use client"
import { motion } from "motion/react"

export function ExpandableCard({ isExpanded, children }) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        height: isExpanded ? 400 : 200,
        width: isExpanded ? "100%" : "50%"
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 9. CSS Variable Animations
```tsx
<motion.div
  animate={{
    "--primary": ["#8b5cf6", "#22d3ee", "#06d6a0"],
    "--shadow": ["0 0 20px rgba(139,92,246,0.3)", "0 0 30px rgba(34,211,238,0.3)"]
  }}
  transition={{ duration: 3, repeat: Infinity }}
/>
```

### 10. Path Drawing Animation
```tsx
<motion.svg viewBox="0 0 100 100">
  <motion.path
    d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2, ease: "easeInOut" }}
  />
</motion.svg>
```

## Common Patterns

### Page Transition Wrapper
```tsx
"use client"
import { motion } from "motion/react"

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### Hover Card Effect
```tsx
<motion.div
  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.15)" }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
  className="card"
>
  Hover me
</motion.div>
```

### Floating Label Input
```tsx
"use client"
import { motion } from "motion/react"

export function FloatingInput({ label, ...props }) {
  return (
    <div className="relative">
      <motion.label
        className="absolute left-3 top-3 text-sm"
        animate={{
          y: props.value ? -20 : 0,
          scale: props.value ? 0.8 : 1,
          color: props.value ? "var(--color-primary)" : "var(--color-text-tertiary)"
        }}
      >
        {label}
      </motion.label>
      <input className="input-field pt-6" {...props} />
    </div>
  )
}
```

## Easing Reference
| Name | Curve | Best For |
|------|-------|----------|
| easeOut | Decelerating | Elements entering |
| easeIn | Accelerating | Elements exiting |
| easeInOut | Both | Smooth transitions |
| backOut | Overshoot | Playful bouncy |
| circOut | Circular | Gentle deceleration |
| spring | Physics-based | Natural interactions |

## Performance Tips
1. **Use `transform` and `opacity`** - These are GPU-accelerated
2. **Avoid animating layout properties** - width, height, top, left cause reflows
3. **Use `will-change` sparingly** - Only for known animations
4. **Prefer `layout` prop** - For automatic layout animations
5. **Use `viewport={{ once: true }}`** - For scroll reveals (animate once)

## Best Practices
1. Use `spring` for natural feel, `tween` for precise timing
2. Keep animations under 300ms for UI feedback
3. Use `layout` for reorder animations
4. Prefer `whileInView` with `viewport={{ once: true }}` for scroll reveals
5. Use `AnimatePresence` for exit animations
6. Combine with Tailwind classes for complex states
7. Always test with `prefers-reduced-motion`
