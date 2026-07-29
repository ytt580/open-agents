# Material Design 3 Skill

## Purpose
Google's Material Design 3 (Material You) for mobile-first, adaptive UI components with dynamic color theming.

## When to Use
- Android/mobile app development
- Cross-platform apps with React Native/Expo
- Need adaptive color and dynamic theming
- Following Google's design language
- Building enterprise/data-heavy UIs

## Core Principles

### 1. Dynamic Color
Material 3 generates a full palette from a single seed color:
```css
:root {
  /* Primary */
  --md-primary: #6750A4;
  --md-on-primary: #FFFFFF;
  --md-primary-container: #EADDFF;
  --md-on-primary-container: #21005D;
  
  /* Secondary */
  --md-secondary: #625B71;
  --md-on-secondary: #FFFFFF;
  --md-secondary-container: #E8DEF8;
  --md-on-secondary-container: #1D192B;
  
  /* Tertiary */
  --md-tertiary: #7D5260;
  --md-on-tertiary: #FFFFFF;
  --md-tertiary-container: #FFD8E4;
  --md-on-tertiary-container: #31111D;
  
  /* Error */
  --md-error: #B3261E;
  --md-on-error: #FFFFFF;
  --md-error-container: #F9DEDC;
  --md-on-error-container: #410E0B;
  
  /* Surface */
  --md-surface: #FEF7FF;
  --md-on-surface: #1D1B20;
  --md-surface-variant: #E7E0EC;
  --md-on-surface-variant: #49454F;
  --md-surface-container: #F3EDF7;
  --md-surface-container-low: #F7F2FA;
  --md-surface-container-high: #ECE6F0;
  --md-surface-container-highest: #E6E0E9;
  
  /* Outline */
  --md-outline: #79747E;
  --md-outline-variant: #CAC4D0;
}
```

### 2. Typography Scale (Roboto)
```css
:root {
  /* Display */
  --md-display-large: 57px/64px Roboto;
  --md-display-medium: 45px/52px Roboto;
  --md-display-small: 36px/44px Roboto;
  
  /* Headline */
  --md-headline-large: 32px/40px Roboto;
  --md-headline-medium: 28px/36px Roboto;
  --md-headline-small: 24px/32px Roboto;
  
  /* Title */
  --md-title-large: 22px/28px Roboto;
  --md-title-medium: 16px/24px Roboto Medium;
  --md-title-small: 14px/20px Roboto Medium;
  
  /* Body */
  --md-body-large: 16px/24px Roboto;
  --md-body-medium: 14px/20px Roboto;
  --md-body-small: 12px/16px Roboto;
  
  /* Label */
  --md-label-large: 14px/20px Roboto Medium;
  --md-label-medium: 12px/16px Roboto Medium;
  --md-label-small: 11px/16px Roboto Medium;
}
```

### 3. Elevation Levels
```css
/* Level 0 - No shadow */
.md-elevation-0 { box-shadow: none; }

/* Level 1 - Subtle */
.md-elevation-1 {
  box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
}

/* Level 2 - Medium */
.md-elevation-2 {
  box-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15);
}

/* Level 3 - High */
.md-elevation-3 {
  box-shadow: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3);
}

/* Level 4 - Higher */
.md-elevation-4 {
  box-shadow: 0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3);
}

/* Level 5 - Highest */
.md-elevation-5 {
  box-shadow: 0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3);
}
```

### 4. Shape Scale
```css
:root {
  --md-shape-none: 0;
  --md-shape-extra-small: 4px;
  --md-shape-small: 8px;
  --md-shape-medium: 12px;
  --md-shape-large: 16px;
  --md-shape-extra-large: 28px;
  --md-shape-full: 9999px;
}
```

## Component Patterns

### FAB (Floating Action Button)
```css
.md-fab {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--md-primary-container);
  color: var(--md-on-primary-container);
  box-shadow: var(--md-elevation-3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-fab:hover {
  box-shadow: var(--md-elevation-4);
}
.md-fab:active {
  box-shadow: var(--md-elevation-3);
}
```

### Card
```css
.md-card {
  border-radius: 12px;
  background: var(--md-surface);
  box-shadow: var(--md-elevation-1);
  padding: 16px;
  transition: box-shadow 200ms ease;
}
.md-card:hover {
  box-shadow: var(--md-elevation-2);
}
.md-card-filled {
  background: var(--md-surface-container-highest);
  box-shadow: none;
}
.md-card-outlined {
  border: 1px solid var(--md-outline-variant);
  box-shadow: none;
}
```

### Chip
```css
.md-chip {
  height: 32px;
  border-radius: 8px;
  border: 1px solid var(--md-outline);
  padding: 0 16px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.md-chip-selected {
  background: var(--md-secondary-container);
  color: var(--md-on-secondary-container);
  border-color: transparent;
}
```

### Navigation Bar
```css
.md-nav-bar {
  height: 80px;
  background: var(--md-surface-container);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.md-nav-item {
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 0 16px;
}
.md-nav-item-indicator {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: var(--md-secondary-container);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Top App Bar
```css
.md-top-bar {
  height: 64px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.md-top-bar-title {
  font-size: 22px;
  font-weight: 400;
  padding: 0 16px;
}
```

### Bottom Sheet
```css
.md-bottom-sheet {
  border-radius: 28px 28px 0 0;
  background: var(--md-surface-container-low);
  padding: 0 24px 24px;
}
.md-bottom-sheet-handle {
  width: 32px;
  height: 4px;
  border-radius: 2px;
  background: var(--md-on-surface-variant);
  margin: 22px auto 16px;
}
```

### Dialog
```css
.md-dialog {
  border-radius: 28px;
  background: var(--md-surface);
  padding: 24px;
  min-width: 280px;
  max-width: 560px;
}
.md-dialog-title {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
}
.md-dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
}
```

### Snackbar
```css
.md-snackbar {
  border-radius: 4px;
  background: var(--md-inverse-surface);
  color: var(--md-inverse-on-surface);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 48px;
}
```

## React Native / Expo Integration

```tsx
import { PaperProvider, MD3LightTheme } from "react-native-paper"

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    secondary: '#625B71',
    tertiary: '#7D5260',
    surface: '#FEF7FF',
  }
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <YourApp />
    </PaperProvider>
  )
}
```

## Accessibility Requirements
- **Minimum touch target**: 48x48dp
- **Contrast ratio**: 4.5:1 for normal text, 3:1 for large text
- **Dynamic type scaling**: Support system font size
- **Semantic colors**: Use primary/on-primary, not purple/white
- **Focus indicators**: 2dp outlined, primary color
- **Content description**: All images must have alt text

## Best Practices
1. **Use Material Theme Builder** for color palette generation
2. **Follow the type scale exactly** - don't customize font sizes
3. **Use elevation levels consistently** - level 1 for cards, level 3 for FABs
4. **Implement ripple effects** on all interactive elements
5. **Support dark theme** with proper surface colors (not just inverted)
6. **Use semantic color tokens** - never hardcode colors
7. **Follow motion guidelines** - 100-500ms, standard easing
8. **Test with TalkBack/VoiceOver** for screen reader compatibility
