# GSAP Skill

## Purpose
GreenSock Animation Platform for high-performance, timeline-based animations. Best for creative/artistic sites, hero sections, parallax, SVG animations.

## When to Use
- Hero section with complex sequencing
- Parallax scrolling effects
- SVG path animations
- Text reveal animations
- Creative/artistic portfolios
- Complex multi-step animations

## Installation
```bash
npm install gsap
# Plugins (if needed)
npm install @gsap/react
```

## Quick Start

### Basic Animation
```tsx
"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function FadeIn() {
  const ref = useRef(null)
  
  useEffect(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    })
  }, [])
  
  return <div ref={ref}>Fades in</div>
}
```

## Core Concepts

### 1. Basic Tween
```js
import { gsap } from "gsap"

// To: animate TO target values
gsap.to(element, {
  duration: 1,
  x: 100,
  opacity: 1,
  ease: "power2.out"
})

// From: animate FROM values to current
gsap.from(element, {
  duration: 1,
  x: -100,
  opacity: 0
})

// FromTo: explicit start and end
gsap.fromTo(element,
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 1 }
)
```

### 2. Timeline (Sequencing)
```js
const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

tl.from(".hero-title", { y: 50, opacity: 0, duration: 0.8 })
  .from(".hero-subtitle", { y: 30, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".hero-cta", { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.3")
  .from(".hero-image", { x: 100, opacity: 0, duration: 1 }, "-=0.5")
```
- `"-=0.4"`: Overlap with previous by 0.4s
- `"+=0.2"`: Add 0.2s gap after previous
- Position parameter: absolute time or relative

### 3. ScrollTrigger
```js
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

// Scroll-based animation
gsap.from(".section-title", {
  scrollTrigger: {
    trigger: ".section",
    start: "top 80%",
    end: "bottom 20%",
    scrub: true, // smooth scrubbing
    pin: true, // pin element
  },
  y: 100,
  opacity: 0
})

// Parallax
gsap.to(".parallax-bg", {
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  },
  y: 200,
  ease: "none"
})

// Batch animations
ScrollTrigger.batch(".card", {
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.6
    })
  }
})
```

### 4. React Integration
```tsx
"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AnimatedSection() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
    }, sectionRef)

    return () => ctx.revert() // cleanup
  }, [])

  return (
    <section ref={sectionRef}>
      <h2 ref={titleRef}>Animated Title</h2>
    </section>
  )
}
```

### 5. Text Split Animation
```js
import { SplitText } from "gsap/SplitText"

const split = new SplitText(".title", { type: "chars, words, lines" })

gsap.from(split.chars, {
  opacity: 0,
  y: 20,
  rotationX: -90,
  stagger: 0.03,
  ease: "back.out(1.7)",
  duration: 0.6
})
```

### 6. SVG Animations
```js
// Draw SVG path
gsap.from(".svg-path", {
  drawSVG: 0,
  duration: 2,
  ease: "power2.inOut"
})

// Morph shapes
gsap.to(".shape", {
  morphSVG: ".target-shape",
  duration: 1,
  ease: "power2.inOut"
})
```

### 7. Flip Animations (Layout)
```js
import { Flip } from "gsap/Flip"

const state = Flip.getState(".element")
// ... DOM changes ...
Flip.from(state, {
  duration: 0.6,
  ease: "power2.inOut",
  absolute: true
})
```

## Available Plugins
| Plugin | Purpose | Free? |
|--------|---------|-------|
| ScrollTrigger | Scroll-based animations | Yes |
| SplitText | Text splitting | Yes (preview) |
| Flip | Layout transitions | Yes |
| MotionPathPlugin | Animate along paths | Yes |
| DrawSVGPlugin | SVG stroke animations | Club |
| MorphSVGPlugin | SVG shape morphing | Club |
| ScrambleTextPlugin | Text scramble effects | Club |
| SplitTextAdvanced | Advanced text splitting | Club |

## Easing Reference
| Ease | Curve | Use Case |
|------|-------|----------|
| power1.out | Gentle | Subtle fade-ins |
| power2.out | Standard | Most UI animations |
| power3.out | Strong | Dramatic entrances |
| power4.out | Very strong | Impact animations |
| back.out(1.7) | Overshoot | Playful bounce |
| elastic.out(1, 0.3) | Elastic | Bouncy effects |
| steps(10) | Step-based | Typewriter, counters |
| expo.out | Exponential | Fast deceleration |
| circ.out | Circular | Smooth deceleration |

## React Cleanup Pattern
```tsx
"use client"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function AnimatedComponent() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // All animations here
      gsap.to(ref.current, { x: 100, duration: 1 })
    }, ref) // scope to ref

    return () => ctx.revert() // cleanup all animations
  }, [])

  return <div ref={ref}>Animate me</div>
}
```

## Best Practices
1. **Always use `gsap.context()`** in React for proper cleanup
2. **Use GSAP for creative/artistic, NOT product UI** - Use Motion.dev for product
3. **Prefer `ScrollTrigger` with `scrub`** for parallax effects
4. **Timeline for sequenced, `stagger` for repeated** animations
5. **Kill animations on unmount**: `return () => gsap.killTweensOf(element)`
6. **Use `Flip` for layout transitions** when elements change position
7. **Register plugins once**: `gsap.registerPlugin(ScrollTrigger)`
