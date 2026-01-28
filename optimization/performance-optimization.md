# Portfolio Performance Optimization

## Problem

The portfolio website suffered from choppy, non-fluid page animations. Users reported that page transitions appeared to render at roughly 10 frames instead of smooth 60fps motion. Lighthouse flagged a performance score of 87 with the following diagnostics:

- **FCP**: 2.3s | **LCP**: 3.1s | **TBT**: 230ms | **SI**: 2.9s
- 15 non-composited animated elements
- Render-blocking resources (510ms savings potential)
- 486 KiB of unused JavaScript
- 13 long main-thread tasks
- Large DOM size

---

## Root Cause Analysis

### 1. Non-Composited CSS `filter` Transition on Background
The `Background` component in `App.tsx` was transitioning a CSS `filter: blur(16px)` property on a full-screen element whenever a modal opened. CSS `filter` is **not composited** by the browser — it forces a full-screen repaint on every animation frame, which is the primary cause of the choppy transitions.

### 2. `transition-all` Used Across the Entire Codebase
Every interactive element used `transition-all`, which instructs the browser to watch and animate **every** CSS property. Properties like `width`, `height`, `padding`, `border`, and `background-color` are non-composited and trigger layout recalculation or repaint when animated.

### 3. Framer Motion JS Animations on Home Page
The Home page had 10+ `motion.div` components with staggered delays up to 500ms. Each framer-motion instance runs JavaScript on the **main thread** to compute animation frames, competing with React rendering for CPU time.

### 4. `backdrop-filter: blur()` on Multiple Simultaneous Widgets
Every widget on the Home page used `backdrop-blur-md` (Tailwind), which applies `backdrop-filter: blur(12px)`. Having multiple blurred elements visible simultaneously is an expensive GPU operation that compounds with other animation work.

### 5. Render-Blocking Google Fonts
The Google Fonts stylesheet was loaded via a standard `<link rel="stylesheet">` tag, which blocks the browser's first render until the CSS file is fully downloaded and parsed.

### 6. `AnimatePresence mode="wait"` Blocking Transitions
The modal system used `AnimatePresence mode="wait"`, which forces the exit animation to fully complete before the enter animation begins — doubling the perceived transition time.

### 7. Mount-Based Animations on Project Cards
All 17 project cards in the Projects page animated on mount with sequential delays up to 1.7 seconds, creating a long stagger that blocked interactivity and felt sluggish.

---

## Solutions Applied

### 1. Background Transition Rewrite (`App.tsx`)

**Before:** Single background div transitioning `filter: blur(0px)` to `filter: blur(16px)`.

**After:** Two-layer approach:
- **Layer 1**: Static background image with fixed `filter: brightness(0.9)` (never transitions)
- **Layer 2**: Dark overlay (`rgba(0, 0, 0, 0.65)`) that toggles via `opacity` only

`opacity` is a **composited property** — the GPU handles it without any main-thread involvement or repaint.

### 2. Main Content Transition Fix (`App.tsx`)

**Before:** `transition-all duration-500` with inline blur filter.

**After:** `transition-[transform,opacity] duration-300` with only `transform` and `opacity` in inline styles. Both are GPU-composited properties. Duration reduced from 500ms to 300ms.

### 3. Home Page: Framer Motion Replaced with CSS Animations (`Home.tsx`)

**Before:** 10+ `motion.div` components importing framer-motion, each computing animations on the main thread.

**After:** Removed `framer-motion` import entirely from Home page. Created a CSS `@keyframes fade-in-up` animation in `index.css` that runs on the **compositor thread**:

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(8px) translateZ(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateZ(0);
  }
}
```

Each widget uses a helper function `fadeIn(delayMs)` that returns inline animation styles. All stagger delays reduced from 0-500ms to 0-200ms.

### 4. Removed `backdrop-filter` from All Widgets (`Home.tsx`)

**Before:** Every widget had `backdrop-blur-md` (Tailwind class applying `backdrop-filter: blur(12px)`).

**After:** Replaced with `bg-white/15` (semi-transparent white background) and `border border-white/10`. No `backdrop-filter` on any Home page widget.

### 5. Modal System Optimization (`SectionModal.tsx`)

- **Animation type**: Changed from spring physics to tween with duration 0.28s and custom cubic bezier `[0.32, 0.72, 0, 1]`
- **AnimatePresence**: Removed `mode="wait"` so enter/exit can overlap
- **Backdrop**: Removed `backdrop-blur-[8px]`, replaced with solid `bg-black/70`
- **Modal panel**: Removed `backdropFilter: "blur(16px)"`, increased background opacity to 0.98/0.99 to compensate
- **Close button**: `transition-all` replaced with `transition-colors`
- **GPU hint**: Removed `willChange: "transform, opacity"` (causes permanent layer promotion), replaced with `transform: "translateZ(0)"`

### 6. Viewport-Based Animations for Projects (`Projects.tsx`)

**Before:** All 17 project cards used `animate` (triggers on mount) with `delay: index * 0.1` — up to 1.7s total stagger.

**After:** Changed to `whileInView` with `viewport={{ once: true, margin: "-40px" }}`. Cards only animate when they scroll into view, and each only animates once. Delay capped at 150ms: `Math.min(index * 0.04, 0.15)`.

Additional fixes:
- Card hover: `transition-all duration-300` replaced with `transition-[transform,box-shadow] duration-200`
- Code/Demo buttons: `transition-all` replaced with `transition-colors`
- Removed `backdrop-blur-sm` from UnavailablePopup

### 7. Viewport-Based Animations for About (`About.tsx`)

- Skills cards: `animate` changed to `whileInView` with `viewport={{ once: true, margin: "-20px" }}`
- Delay capped: `Math.min(i * 0.05, 0.15)`
- Experience cards: Same viewport-based approach with `Math.min(i * 0.06, 0.15)`
- Social buttons: `transition-all` replaced with `transition-colors`

### 8. Contact Page Transition Fixes (`Contact.tsx`)

- All `transition-all group` replaced with `transition-[colors,box-shadow,border-color] group`
- Submit button: `transition-all` replaced with `transition-[box-shadow,opacity]`
- Removed `backdrop-blur-sm` from header

### 9. Settings Page Transition Fixes (`Settings.tsx`)

- All `transition-all duration-300` replaced with `transition-[colors,border-color,box-shadow,transform] duration-200`
- Preview window: `transition-all` replaced with `transition-[border-color]`

### 10. NavBar Optimization (`NavBar.tsx`)

- Backdrop blur reduced: `blur(20px)` to `blur(12px)`
- Background opacity increased from 0.15 to 0.18 to compensate for reduced blur
- Added `transform: "translateZ(0)"` for GPU layer promotion
- Tightened spring animations: liquid bubble stiffness 350 to 400, damping 30 to 35
- Icon spring: stiffness 400 to 500, damping 20 to 30
- Icon color transition: `duration-500` to `duration-200`

### 11. Non-Render-Blocking Font Loading (`index.html`)

**Before:**
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
```

**After:**
```html
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" /></noscript>
```

### 12. CSS Keyframe Addition (`index.css`)

Added the `fade-in-up` keyframe animation inside the `@theme inline` block, providing the Home page with a compositor-thread animation that replaces all framer-motion JS animations.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/App.tsx` | Background rewrite (opacity overlay), main content transition fix |
| `src/pages/Home.tsx` | Removed framer-motion, CSS animations, removed backdrop-blur |
| `src/components/SectionModal.tsx` | Tween animation, removed backdrop-blur, removed mode="wait" |
| `src/pages/Projects.tsx` | Viewport-based animations, capped delays, specific transitions |
| `src/pages/About.tsx` | Viewport-based animations, capped delays, specific transitions |
| `src/pages/Contact.tsx` | Replaced transition-all, removed backdrop-blur |
| `src/pages/Settings.tsx` | Replaced transition-all with specific properties |
| `src/components/NavBar.tsx` | Reduced blur, tightened springs, GPU hints |
| `index.html` | Non-render-blocking font loading |
| `src/index.css` | Added fade-in-up keyframe animation |

---

## Summary

The core principle applied throughout: **only animate composited CSS properties** (`opacity` and `transform`). Every change targets one of three goals:

1. **Eliminate non-composited animations** (filter, backdrop-filter, transition-all)
2. **Move animation work off the main thread** (CSS keyframes instead of JS, viewport-triggered instead of mount-triggered)
3. **Reduce total animation duration and overlap** (shorter delays, concurrent enter/exit, tighter springs)
