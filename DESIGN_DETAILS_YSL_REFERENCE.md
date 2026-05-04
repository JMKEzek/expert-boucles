# DESIGN DETAILS — YSL Reference & Visual Guidelines

**Analyse détaillée des éléments YSL à adapter pour Expert Boucles**

---

## 📚 Table des matières

1. [Éléments visuels clés observés](#1-éléments-visuels-clés-observés)
2. [Patterns & templates](#2-patterns--templates)
3. [Navigation & UX](#3-navigation--ux)
4. [Typography in context](#4-typography-in-context)
5. [Color usage by component](#5-color-usage-by-component)
6. [Spacing in practice](#6-spacing-in-practice)
7. [Common mistakes to avoid](#7-common-mistakes-to-avoid)

---

## 1. ÉLÉMENTS VISUELS CLÉS OBSERVÉS

### 1.1 Hero Section (YSL Homepage)

**Visual structure:**
```
┌──────────────────────────────────────────────┐
│                                              │
│           [LARGE PHOTO - 16:9]              │
│           (Model on sofa, red jacket)        │
│                                              │
│           ┌─────────────────────────────┐   │
│           │  SPRING SUMMER 26           │   │
│           │  (White text, centered)     │   │
│           │  EXPLORER                   │   │
│           └─────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key observations:**
- Full-screen or near-full-screen height
- Image positioned `object-position: right center` (product in right)
- Text overlay in white, UPPERCASE
- H1 at 48-56px
- Button below text with white text on dark background
- No visual clutter, pure photography + minimal text
- Heavy bottom padding before next section (120px)

**Adaptation for Expert Boucles:**
```
┌──────────────────────────────────────────────┐
│                                              │
│      [HERO IMAGE - Hair specialist]         │
│      (Coiffure, client satisfaction)         │
│                                              │
│           SPÉCIALISTE CHEVEUX BOUCLÉS       │
│           Beauté, santé et brillance         │
│           [RÉSERVER UN SOIN]                │
│                                              │
└──────────────────────────────────────────────┘
```

---

### 1.2 Product Grid Section

**YSL structure:**
```
SECTION TITLE (24px bold)
Subtitle/description
─────────────────────────

[Card] [Card] [Card] [Card]
[Card] [Card] [Card] [Card]
[Card] [Card]

Gap between cards: 24px
Card width: Responsive (25% desktop, 50% tablet, 100% mobile)
```

**Card internal structure (0.8 ratio):**
```
┌────────────────────┐
│                    │
│   [IMAGE 4:5]      │  ← aspect-ratio: 0.8
│   (Product photo)  │
│                    │
├────────────────────┤
│ Product Name       │  ← 12px, bold, uppercase
│ Description        │  ← 12px, gray
│ € 550    [LINK]    │  ← Price (bold) + Action link
└────────────────────┘

No padding on image (flush to edges)
Padding on text content: 16px horizontal, 12px vertical
Border: 1px solid light gray
Shadow on hover: subtle
Scale image on hover: +5%
```

**Adaptation for Expert Boucles (Services):**
```
┌────────────────────┐
│   [SERVICE IMAGE]  │  ← 16:9 ratio
│                    │
├────────────────────┤
│ SERVICE NAME       │
│ Description        │
│ 60 min  € 120      │
│ [EN SAVOIR +]      │
└────────────────────┘
```

---

### 1.3 Section Dividers & Spacing

**YSL uses:**
- Empty space between sections (80-120px padding)
- Subtle line dividers (1px solid light gray)
- Rarely visible borders
- Breathing room is the primary visual separator

```css
/* Between sections */
margin: 0;
padding: 80px 0px 120px;

/* Subtle divider if needed */
border-top: 1px solid #E5E5E0;
margin-top: 120px;
padding-top: 80px;
```

**Never use:**
- Heavy thick lines
- Colored backgrounds to separate
- Complex visual dividers

---

### 1.4 Navigation Behavior

**YSL Navigation:**
```
┌────────────────────────────────────────────┐
│ ≡ HIGHLIGHTS FEMME HOMME ... SL PROD ...   │
│                  [YSL Logo]                 │
│ LA MAISON BOUTIQUES SERVICE CLIENT ...  ⊙ □ │
└────────────────────────────────────────────┘
```

**Characteristics:**
- Fixed/sticky at top
- Minimal, always visible
- Very subtle background (white, opacity 0.9)
- Text: 12px, bold, uppercase
- Logo centered
- Very tight line-height (12px)
- Left menu, center logo, right menu
- Hover effect: color change to lighter gray
- No dropdown menus visible by default
- Subtle transition on scroll (opacity fade in)

---

### 1.5 Footer Section

**YSL Footer structure:**
```
┌──────────────────────────────────────────┐
│  [Heavy padding top: 120px]              │
│                                          │
│  COLUMN1        COLUMN2   COLUMN3  COL4 │
│  ────────       ────────  ────────  ──  │
│  Link           Link      Link      ... │
│  Link           Link      Link      ... │
│  Link           Link      Link      ... │
│                                          │
│  ────────────────────────────────────────│
│  © 2026 Expert Boucles                  │
│  Social icons (small, 4 icons)          │
└──────────────────────────────────────────┘
```

**Characteristics:**
- Black background (#0A0A0A)
- White text (#F5F5F0)
- 4 column layout (desktop)
- Column headers: 12px, bold, uppercase
- Links: 12px, regular, white
- Heavy padding top (120px minimum)
- Divider line above copyright
- Social icons: small (24px), spacing between (24px)
- No additional decoration

---

## 2. PATTERNS & TEMPLATES

### 2.1 "Image + Text" Pattern (Side-by-side)

Used in YSL for "About" sections.

```
Desktop (> 768px):
┌─────────────────┬──────────────────┐
│   [Image]       │   Title          │
│   (16:9 or      │   Description    │
│    custom)      │   [Button]       │
│                 │                  │
└─────────────────┴──────────────────┘

Image: 50% width
Text: 50% width with padding (40px)
Gap between: 60px
```

**CSS:**
```css
.image-text-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 768px) {
  grid-template-columns: 1fr;
  gap: 40px;
}

.image {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.text {
  padding: 40px;
}

.text h2 {
  margin-bottom: 24px;
}

.text p {
  margin-bottom: 24px;
}
```

---

### 2.2 "Centered CTA" Pattern

Used in YSL for conversion sections.

```
┌──────────────────────────────────┐
│       [Dark background]          │
│                                  │
│    LARGE CENTERED HEADING        │
│    (36-48px)                     │
│                                  │
│    Supporting text (optional)    │
│    (14-16px)                     │
│                                  │
│        [PRIMARY BUTTON]          │
│                                  │
└──────────────────────────────────┘

Background: Dark (black or accent)
Text color: White or light
Padding: 120px vertical
Max-width for text: 600px
```

**CSS:**
```css
.cta-section {
  background-color: #0A0A0A;
  color: #F5F5F0;
  padding: 120px 40px;
  text-align: center;
}

.cta-section h2 {
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 24px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.cta-section p {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.cta-section button {
  margin-top: 16px;
}
```

---

### 2.3 "Testimonial" Pattern

```
┌────────────────────────────────┐
│                                │
│  "Texte du testimonial qui     │
│   parle du produit, service    │
│   ou experience client..."     │
│                                │
│  — NOM CLIENT                  │
│  Position / Company            │
│                                │
└────────────────────────────────┘
```

**CSS:**
```css
.testimonial {
  padding: 40px;
  border-left: 3px solid #C9A96E;
  background-color: #F0F0ED;
  border-radius: 0px;
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.8;
  font-style: italic;
  color: #555555;
  margin-bottom: 20px;
}

.testimonial-author {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0A0A0A;
  margin-bottom: 4px;
}

.testimonial-position {
  font-size: 12px;
  color: #888888;
}
```

---

## 3. NAVIGATION & UX

### 3.1 Navigation States & Interactions

**Default state:**
```css
nav {
  position: fixed;
  top: 0;
  z-index: 50;
  background-color: #FFFFFF;
  opacity: 0.9;
  backdrop-filter: blur(4px);
}

nav a {
  color: #0A0A0A;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  transition: color 0.25s linear;
}
```

**Hover state:**
```css
nav a:hover {
  color: #C9A96E;
}
```

**Active/Current state:**
```css
nav a.active {
  color: #C9A96E;
  border-bottom: 2px solid #C9A96E;
}
```

---

### 3.2 Mobile Menu (Hamburger)

**Hidden by default on desktop:**
```css
.mobile-menu {
  display: none;
}

@media (max-width: 768px) {
  .mobile-menu {
    display: block;
  }

  .desktop-nav {
    display: none;
  }
}
```

**Menu animation on open:**
```css
.mobile-menu.open {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

---

### 3.3 Links & Underlines

**YSL link behavior:**

```css
a {
  color: #0A0A0A;
  text-decoration: none;
  position: relative;
  transition: color 0.25s linear;
}

/* Option 1: Subtle bottom border on hover */
a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #C9A96E;
  transition: width 0.25s linear;
}

a:hover::after {
  width: 100%;
}

/* Option 2: Direct color change (simpler) */
a:hover {
  color: #C9A96E;
}
```

---

## 4. TYPOGRAPHY IN CONTEXT

### 4.1 Title Combinations

**Example 1: Main title + Subtitle**
```
EXPERTISES (48px, white, light)
Nos spécialités capillaires (18px, white, light)
```

**Example 2: Section title + Description**
```
SERVICES (24px, black, bold)
Découvrez nos soins spécialisés (14px, gray, regular)
```

**Example 3: Product card title + Details**
```
Soin Boucles (12px, black, bold, uppercase)
Traitement spécialisé (12px, gray, regular)
€ 120 | 60 min (12px, black, bold)
```

---

### 4.2 Text Hierarchy in Long-form Content

```
H1: 48px, 400 weight, light
─────────────────────────

Intro paragraph (lead):
16px, 400 weight, 1.8 line-height, max-width 600px, color #555

Body text:
14px, 400 weight, 1.6 line-height, max-width 600px, color #555

Highlighted quote:
16px, 400 weight, italic, left border gold, background light gray

H2 within content:
24px, 700 weight, margin-top 48px, margin-bottom 24px

List items:
14px, 400 weight, line-height 1.8, margin-bottom 12px
```

---

### 4.3 Form Labels & Placeholders

```
Label text: 12px, 700 weight, UPPERCASE, color #0A0A0A
Input text: 14px, 400 weight, color #0A0A0A
Placeholder: 14px, color #CCCCCC (light gray)
Helper text: 12px, color #888888
Error text: 12px, color #D32F2F

Input spacing:
- Padding: 12px vertical, 0px horizontal (bottom-border style)
- Border: 1px solid #E5E5E0 (bottom only)
- Focus: border color #C9A96E, shadow subtle
```

---

## 5. COLOR USAGE BY COMPONENT

### 5.1 Buttons

**Primary (Black background)**
```
Default: bg #0A0A0A, text white
Hover: bg white, text #0A0A0A, border #0A0A0A
Active: opacity 0.7
Disabled: opacity 0.5
```

**Secondary (Gold border)**
```
Default: bg white, text #0A0A0A, border #C9A96E
Hover: bg #C9A96E, text white
Active: opacity 0.8
Disabled: opacity 0.5
```

**Tertiary (No background, underline)**
```
Default: bg transparent, text black, border-bottom black
Hover: text gold, border-bottom gold
Disabled: opacity 0.5
```

---

### 5.2 Cards

**Standard card:**
```
Background: white (#FFFFFF)
Border: 1px solid #E5E5E0
Shadow: none (default)
Hover: shadow md, border color gold
```

**Dark card:**
```
Background: #0A0A0A
Border: none
Text: white
Shadow: lg
```

---

### 5.3 Forms

**Input focus state:**
```
Border-color: #C9A96E (from #E5E5E0)
Box-shadow: 0px 0px 0px 3px rgba(201, 169, 110, 0.3)
```

**Error state:**
```
Border-color: #D32F2F
Text color: #D32F2F
Background: rgba(211, 47, 47, 0.05)
```

---

### 5.4 Backgrounds

**Primary backgrounds (page):**
```
Home: White (#F5F5F0)
Sections: White, very light gray (#F0F0ED)
Overlays: Black with opacity (rgba(0, 0, 0, 0.5))
```

**Section backgrounds:**
```
Hero: Image-based (no solid background)
CTA: Dark (#0A0A0A)
Testimonial: Light gray (#F0F0ED)
```

---

## 6. SPACING IN PRACTICE

### 6.1 Page-level spacing

```
Header height: 72px (56px padding + nav)
Page padding-top: 32px (after header)

Hero section:
- padding-top: 32px
- padding-bottom: 0px
- min-height: 60vh

Content sections:
- padding: 80px 0px (top/bottom)
- padding: 40px (left/right on mobile, 80px on desktop)

Between sections:
- margin: 0px
- Extra padding-bottom: +40px between sections

Footer:
- padding-top: 120px
- padding-bottom: 40px
```

---

### 6.2 Component-level spacing

**Card spacing:**
```
padding: 16px (text content inside card)
gap: 24px (between cards in grid)
margin-bottom: 24px (between card groups)
```

**Button spacing:**
```
padding: 16px 24px (primary/secondary)
margin-top: 16px (below text)
margin-bottom: 24px (after button group)
gap: 12px (between button group items)
```

**Form spacing:**
```
gap: 24px (between fields)
margin-bottom: 24px (after form section)
padding: 12px 0px (inside inputs)
```

---

## 7. COMMON MISTAKES TO AVOID

### ❌ Mistake #1: Using Rounded Corners
**Wrong:**
```css
border-radius: 8px; /* YSL never uses this */
```
**Correct:**
```css
border-radius: 0px; /* Sharp corners only */
```

---

### ❌ Mistake #2: Inconsistent Shadows
**Wrong:**
```css
box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3); /* Too heavy */
```
**Correct:**
```css
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08); /* Subtle */
```

---

### ❌ Mistake #3: Too Many Font Colors
**Wrong:**
```css
color: #FF5733; /* Random colors */
color: #0A6BA6; /* Non-YSL colors */
```
**Correct:**
```css
color: #0A0A0A; /* Black */
color: #C9A96E; /* Gold */
color: #555555; /* Gray */
color: #888888; /* Light gray */
```

---

### ❌ Mistake #4: Excessive Spacing
**Wrong:**
```css
padding: 200px 0px; /* Too much */
gap: 60px; /* Cards too far apart */
```
**Correct:**
```css
padding: 80px 0px; /* Breathing room */
gap: 24px; /* Natural grid spacing */
```

---

### ❌ Mistake #5: Animated Transitions Too Long
**Wrong:**
```css
transition: all 2s ease; /* Too slow */
transition: all 0.05s linear; /* Too fast */
```
**Correct:**
```css
transition: color 0.25s linear; /* Color */
transition: opacity 0.35s cubic-bezier(...); /* Fade */
transition: transform 0.4s cubic-bezier(...); /* Movement */
```

---

### ❌ Mistake #6: Busy Navigation
**Wrong:**
```
Many dropdown menus
Lots of menu items
Animations everywhere
```
**Correct:**
```
Simple top navigation
Max 8-10 items visible
Subtle hover effects only
```

---

### ❌ Mistake #7: Images Too Small
**Wrong:**
```css
width: 200px; /* Product image too small */
aspect-ratio: 1 / 1; /* Wrong ratio for clothing */
```
**Correct:**
```css
width: 100%;
max-width: 600px;
aspect-ratio: 0.8; /* 4:5 for products */
```

---

### ❌ Mistake #8: Text Max-width Too Wide
**Wrong:**
```css
p { max-width: 100%; } /* Hard to read */
p { max-width: 1200px; } /* Too many chars per line */
```
**Correct:**
```css
p { max-width: 600px; } /* 70-80 chars per line */
```

---

### ❌ Mistake #9: Inconsistent Button Styles
**Wrong:**
```
Some buttons have shadows
Some have borders
Some are rounded
Different paddings
```
**Correct:**
```
Consistent primary/secondary/tertiary
Same padding sizes
All sharp corners
Same transition timing
```

---

### ❌ Mistake #10: Too Many Decorative Elements
**Wrong:**
```
Lots of dividers
Fancy borders
Patterns everywhere
Unnecessary icons
```
**Correct:**
```
Minimal decorative elements
White space as separator
Clean, minimal design
Icons only when functional
```

---

## VISUAL EXAMPLES — Before/After

### Example 1: Service Card

**Before (Generic):**
```
┌─────────────────────┐
│                     │
│  [Rounded Image]    │ ← Too much rounding
│                     │
├─────────────────────┤
│Service Name         │ ← No hierarchy
│Description          │
│€ 120 [Button]       │
│                     │
└─────────────────────┘
```

**After (YSL-inspired):**
```
┌─────────────────────┐
│                     │
│  [Sharp Image 0.8]  │ ← Perfect ratio
│                     │
├─────────────────────┤
│SERVICE NAME         │ ← Uppercase, bold
│Description fine...  │ ← Lighter gray
│60 MIN  € 120        │ ← Clear hierarchy
│[EN SAVOIR +]        │ ← Tertiary button
│                     │
└─────────────────────┘

Hover: Border → Gold, Shadow subtle
```

---

### Example 2: Hero Section

**Before (Cluttered):**
```
┌────────────────────────────────┐
│ [Image with many text overlays]│
│ HUGE TITLE TEXT               │
│ Subtitle 1                     │
│ Subtitle 2                     │
│ [Multiple buttons all over]    │
│ [Floating icons]               │
└────────────────────────────────┘
```

**After (Luxury minimal):**
```
┌────────────────────────────────┐
│                                │
│      [Clean Image 16:9]        │
│                                │
│     SPÉCIALISTE CHEVEUX       │
│     BOUCLÉS                   │
│                                │
│     [Primary Button]           │
│                                │
│                                │
└────────────────────────────────┘

Bottom padding: 120px for next section
```

---

### Example 3: Form

**Before (Cramped):**
```
Name: [________]    Email: [________]
Subject [________]
Message [____________]
         [SUBMIT]
```

**After (Luxury spacing):**
```
NAME *
[_____________________]

EMAIL *
[_____________________]

MESSAGE *
[_____________________
_____________________]

[ENVOYER]
```

- Clear labels (12px, bold, uppercase)
- Ample spacing (24px between fields)
- Bottom border inputs (clean look)
- Gold focus state
- Full-width on mobile

---

## FINAL CHECKLIST — Visual Quality

- [ ] All buttons: consistent style, no rounded corners
- [ ] All images: correct aspect ratios (0.8, 16:9, 1:1)
- [ ] All text: proper hierarchy (H1-H6 sizes correct)
- [ ] All spacing: 4px scale respected
- [ ] All colors: YSL palette only (#0A0A0A, #C9A96E, #F5F5F0, grays)
- [ ] All shadows: subtle (not heavy)
- [ ] All transitions: 0.25s, 0.35s, or 0.4s
- [ ] All cards: 1px border, no radius
- [ ] All forms: bottom-border style, gold focus
- [ ] Navigation: fixed, 72px height, subtle background
- [ ] Footer: black background, 4 columns, proper hierarchy
- [ ] Mobile: hamburger menu, single column, proper touch targets
- [ ] No rounded corners anywhere (except optional subtle 2px)
- [ ] No heavy shadows (only subtle)
- [ ] No bright colors (only YSL palette)
- [ ] No animated auto-play (transitions on user action)
- [ ] No scrolling text (static, readable)
- [ ] No multiple hover states conflicting
- [ ] No fonts other than Helvetica/Arial
- [ ] No decorative elements that don't add value

---

**Document créé**: mai 2026
**Référence**: YSL.com live analysis
**Status**: Visual guidelines complètes pour Expert Boucles

