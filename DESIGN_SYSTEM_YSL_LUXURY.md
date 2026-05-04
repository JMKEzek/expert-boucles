# DESIGN SYSTEM — Expert Boucles x YSL Luxury Edition

**Analysé depuis YSL.com (mai 2026)**
**Pour Expert Boucles — Luxury Hair Specialist, Paris 75009**

---

## 📖 Table des matières

1. [Typographie](#1-typographie-luxury)
2. [Palette de couleurs](#2-palette-de-couleurs)
3. [Système d'espacements](#3-système-despacement)
4. [Grille & Layout](#4-grille--layout)
5. [Images & Proportions](#5-images--proportions)
6. [Éléments graphiques](#6-éléments-graphiques)
7. [Shadows & Elevation](#7-shadows--elevation)
8. [Transitions & Animations](#8-transitions--animations)
9. [Composants visuels](#9-composants-visuels)
10. [Règles de composition](#10-règles-de-composition)

---

## 1. TYPOGRAPHIE LUXURY

### 1.1 Police signature

**Primary Font Stack:** `Helvetica, Helvetica_Regular, Arial, sans-serif`
- **Weight**: 400 (Regular) | 700 (Bold)
- **Rendering**: Crisp, minimalist, luxurious
- **Usage**: YSL utilise Helvetica pour toute sa typographie, pas de serif fancy
- **Philosophy**: Elegance par la simplicité, pas de fioritures

### 1.2 Hiérarchie typographique complète

#### Niveau H1 (Page Titles / Heroes)
```css
/* Exemple: "SPRING SUMMER 26" */
font-family: Helvetica, Arial, sans-serif;
font-size: 48px;     /* Desktop: 48px, Tablet: 36px, Mobile: 28px */
font-weight: 400;    /* Regular — jamais bold pour les H1 */
line-height: 1.1;    /* 48px * 1.1 = 52.8px */
letter-spacing: 0;   /* Normal spacing */
text-transform: uppercase;
color: #FFFFFF;      /* Sur dark backgrounds */
```

**Cas d'usage:**
- Titre de la page (hero section)
- Grandes annonces de collections
- Section headlines principales

**Exemple Tailwind:**
```tsx
className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-normal text-white"
```

---

#### Niveau H2 (Section Headings)
```css
/* Exemple: "VÊTEMENTS FEMME" */
font-size: 24px;     /* Desktop: 24px, Tablet: 20px, Mobile: 18px */
font-weight: 700;    /* Bold — distingue des H1 */
line-height: 1.2;    /* 24px * 1.2 = 28.8px */
letter-spacing: 0;
text-transform: none;
color: #0A0A0A;      /* Noir pour sections */
margin-bottom: 16px; /* Spacing après titre */
```

**Cas d'usage:**
- Titres de sections
- Catégories produits
- Subtitles importants

**Exemple Tailwind:**
```tsx
className="text-xl md:text-2xl lg:text-3xl font-bold text-black"
```

---

#### Niveau H3 (Subsections)
```css
/* Exemple: "COLLECTION NOUVEAUTÉS" */
font-size: 16px;
font-weight: 700;
line-height: 1.25;   /* 16px * 1.25 = 20px */
letter-spacing: 0;
text-transform: none;
color: #0A0A0A;
margin-bottom: 12px;
```

**Cas d'usage:**
- Sous-titres
- Card headers
- Petites sections

**Exemple Tailwind:**
```tsx
className="text-lg font-bold text-black mb-3"
```

---

#### Niveau H4 (Labels & Minor Headings)
```css
font-size: 14px;
font-weight: 700;
line-height: 1.3;    /* 14px * 1.3 = 18.2px */
letter-spacing: 0;
text-transform: none;
color: #0A0A0A;
margin-bottom: 8px;
```

---

#### Body Text (Paragraphes)
```css
/* Exemple: Description produit */
font-size: 14px;
font-weight: 400;
line-height: 1.6;    /* 14px * 1.6 = 22.4px — très aéré */
letter-spacing: 0;
text-align: left;
color: #555555;      /* Gris moyen pour lisibilité */
max-width: 600px;    /* Jamais laisser texte trop large */
```

**Cas d'usage:**
- Descriptions produits
- Texte juridique
- Contenu long

**Exemple Tailwind:**
```tsx
className="text-sm md:text-base font-normal leading-relaxed text-gray-600"
```

---

#### Small Text / Fine Print
```css
font-size: 12px;
font-weight: 400;
line-height: 1.5;
letter-spacing: 0;
color: #888888;
text-transform: none;
```

**Cas d'usage:**
- Conditions de vente
- Notes de pied
- Détails articles

---

#### Navigation Text
```css
/* Exemple: "FEMME", "HOMME", "PRESTATIONS" */
font-size: 12px;
font-weight: 700;
line-height: 1;       /* Tight line-height */
letter-spacing: 0;
text-transform: uppercase;
color: #0A0A0A;
transition: color 0.25s linear;
```

**Cas d'usage:**
- Menu principal
- Navigation secondaire
- Breadcrumbs

**Exemple Tailwind:**
```tsx
className="text-xs font-bold uppercase tracking-wide text-black hover:text-gold transition-colors"
```

---

#### CTA & Button Text
```css
/* Exemple: "EXPLORER", "AJOUTER AU PANIER" */
font-size: 14px;
font-weight: 700;
line-height: 1.2;
letter-spacing: 0;
text-transform: uppercase;
color: #FFFFFF; /* ou #0A0A0A selon bouton */
transition: color 0.25s linear, opacity 0.25s linear;
```

**Cas d'usage:**
- Boutons principaux (CTAs)
- Links action

---

### 1.3 Tableau récapitulatif typographie

| Élément | Taille | Weight | Line-Height | Color | Usage |
|---------|--------|--------|-------------|-------|-------|
| **H1** | 48px | 400 | 1.1 | #FFF | Hero titles |
| **H2** | 24px | 700 | 1.2 | #000 | Section headings |
| **H3** | 16px | 700 | 1.25 | #000 | Subsections |
| **H4** | 14px | 700 | 1.3 | #000 | Minor headings |
| **Body** | 14px | 400 | 1.6 | #555 | Paragraphes |
| **Small** | 12px | 400 | 1.5 | #888 | Fine print |
| **Nav** | 12px | 700 | 1.0 | #000 | Navigation |
| **Button** | 14px | 700 | 1.2 | #FFF/#000 | CTAs |

---

### 1.4 Responsive Typography

```css
/* Mobile First Approach */

/* Mobile (< 425px) */
h1 { font-size: 28px; }
h2 { font-size: 18px; }
body { font-size: 14px; }

/* Tablet (425px - 768px) */
@media (min-width: 425px) {
  h1 { font-size: 36px; }
  h2 { font-size: 20px; }
}

/* Desktop (> 768px) */
@media (min-width: 768px) {
  h1 { font-size: 48px; }
  h2 { font-size: 24px; }
}
```

---

## 2. PALETTE DE COULEURS

### 2.1 Couleurs primaires (Luxury Core)

#### Noir — #0A0A0A
```css
/* RGB: (10, 10, 10) */
color: #0A0A0A;
background-color: #0A0A0A;
```
- **Usage**: Texte principal, dark backgrounds, borders crisp
- **Opacity variants**:
  - 100% : #0A0A0A (texte, éléments solides)
  - 90% : rgba(10, 10, 10, 0.9) (hover overlays)
  - 50% : rgba(10, 10, 10, 0.5) (semi-transparent overlays)
  - 10% : rgba(10, 10, 10, 0.1) (subtle dividers)

#### Or — #C9A96E
```css
/* RGB: (201, 169, 110) */
color: #C9A96E;
background-color: #C9A96E;
```
- **Usage**: Accents luxury, hover states, highlights
- **Opacity variants**:
  - 100% : #C9A96E (accents)
  - 80% : rgba(201, 169, 110, 0.8) (hover buttons)
  - 50% : rgba(201, 169, 110, 0.5) (background tints)
  - 30% : rgba(201, 169, 110, 0.3) (very subtle backgrounds)

#### Blanc — #F5F5F0
```css
/* RGB: (245, 245, 240) */
color: #F5F5F0;
background-color: #F5F5F0;
```
- **Usage**: Backgrounds principaux, texte sur dark
- **Opacity variants**:
  - 100% : #F5F5F0 (main background)
  - 95% : rgba(245, 245, 240, 0.95) (subtle tint)
  - 90% : rgba(245, 245, 240, 0.9) (header avec transparency)
  - 50% : rgba(245, 245, 240, 0.5) (overlay semi)

---

### 2.2 Couleurs secondaires (Grays)

#### Gris 100 — #FAFAF8
```css
/* Très clair, backgrounds subtiles */
background-color: #FAFAF8;
```

#### Gris 200 — #F0F0ED
```css
/* Light gray, section backgrounds */
background-color: #F0F0ED;
```

#### Gris 300 — #E5E5E0
```css
/* Medium-light, borders */
border-color: #E5E5E0;
```

#### Gris 400 — #CCCCCC
```css
/* Medium, inactive elements */
color: #CCCCCC;
```

#### Gris 500 — #888888
```css
/* Medium-dark, secondary text */
color: #888888;
```

#### Gris 600 — #555555
```css
/* Dark gray, primary body text */
color: #555555;
```

---

### 2.3 États & feedback colors

#### Success — #2E8B57
```css
/* RGB: (46, 139, 87) */
color: #2E8B57;
background-color: rgba(46, 139, 87, 0.1); /* Light tint */
border-color: #2E8B57;
```
**Cas d'usage**: Confirmations, checkmarks, successful actions

#### Warning — #FF9800
```css
/* RGB: (255, 152, 0) */
color: #FF9800;
background-color: rgba(255, 152, 0, 0.1);
border-color: #FF9800;
```
**Cas d'usage**: Avertissements, stock limite

#### Error — #D32F2F
```css
/* RGB: (211, 47, 47) */
color: #D32F2F;
background-color: rgba(211, 47, 47, 0.1);
border-color: #D32F2F;
```
**Cas d'usage**: Erreurs, éléments critiques

#### Info — #3B82F6
```css
/* RGB: (59, 130, 246) */
color: #3B82F6;
background-color: rgba(59, 130, 246, 0.1);
border-color: #3B82F6;
```
**Cas d'usage**: Infos, tips, notifications

---

### 2.4 Pallette complète (CSS Variables)

```css
/* app/globals.css */

:root {
  /* Primary Colors */
  --color-black: #0A0A0A;
  --color-gold: #C9A96E;
  --color-white: #F5F5F0;

  /* Grays */
  --color-gray-50: #FAFAF8;
  --color-gray-100: #F0F0ED;
  --color-gray-200: #E5E5E0;
  --color-gray-300: #CCCCCC;
  --color-gray-400: #888888;
  --color-gray-500: #555555;

  /* States */
  --color-success: #2E8B57;
  --color-warning: #FF9800;
  --color-error: #D32F2F;
  --color-info: #3B82F6;

  /* Semantic */
  --color-text-primary: #0A0A0A;
  --color-text-secondary: #555555;
  --color-text-tertiary: #888888;
  --color-bg-primary: #F5F5F0;
  --color-bg-secondary: #F0F0ED;
  --color-border: #E5E5E0;
  --color-accent: #C9A96E;
}
```

---

### 2.5 Gradient patterns (Optional)

YSL utilise rarement des gradients. Voici les subtils utilisés:

#### Gradient subtle (backgrounds)
```css
background: linear-gradient(135deg, #F5F5F0 0%, #F0F0ED 100%);
```

#### Gradient overlay (hero images)
```css
background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
```

---

## 3. SYSTÈME D'ESPACEMENT

YSL utilise une grille d'espacement basée sur **4px**.

### 3.1 Spacing scale

```css
/* Base = 4px */
--spacing-0: 0px;
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-7: 32px;
--spacing-8: 40px;
--spacing-9: 48px;
--spacing-10: 56px;
--spacing-11: 64px;
--spacing-12: 72px;
--spacing-13: 80px;
--spacing-14: 96px;
--spacing-15: 120px;
```

### 3.2 Usage par élément

#### Padding (Internal spacing)

**Cards & Containers:**
```css
padding: 16px;        /* Small cards */
padding: 24px;        /* Medium sections */
padding: 48px;        /* Large sections */
```

**Inputs & Buttons:**
```css
padding: 12px 16px;   /* Small button */
padding: 16px 24px;   /* Medium button */
padding: 0px 12px;    /* Input horizontal padding */
padding: 8px 0px;     /* Input vertical padding */
```

**Navigation:**
```css
padding: 12px 0px;    /* Nav items */
padding: 0px 24px;    /* Horizontal spacing nav */
```

---

#### Margin (External spacing)

**Between sections:**
```css
margin-bottom: 80px;  /* Section to section */
margin-bottom: 48px;  /* Subsection spacing */
margin-bottom: 24px;  /* Component spacing */
margin-bottom: 16px;  /* Element spacing */
margin-bottom: 8px;   /* Tight spacing */
```

**Top spacing (less used than bottom):**
```css
margin-top: 0px;      /* Utiliser margin-bottom au contraire */
```

**Horizontal spacing:**
```css
margin: 0px 24px;     /* Horizontal margin */
margin: 0px;          /* Pas de margin horizontal par défaut */
```

---

#### Gap (Grid & Flexbox spacing)

**Product grids:**
```css
gap: 24px;            /* Between product cards */
```

**Flex layouts:**
```css
gap: 16px;            /* Between items */
gap: 8px;             /* Tight layouts */
```

---

### 3.3 Section spacing specifics

**Hero section:**
```css
padding: 120px 0px 80px; /* Top: generous, Bottom: breathing room */
```

**Navigation area:**
```css
padding: 20px 0px;
margin-bottom: 0px;
```

**Product grid section:**
```css
padding: 80px 0px 120px;
```

**Footer:**
```css
padding: 120px 0px 0px;
margin-top: 0px;
```

---

## 4. GRILLE & LAYOUT

### 4.1 Grille principale (12 colonnes)

**Desktop (> 768px)**
```css
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 24px;
max-width: 1440px;
margin: 0 auto;
padding: 0px 40px;
```

**Tablet (425px - 768px)**
```css
display: grid;
grid-template-columns: repeat(8, 1fr);
gap: 20px;
padding: 0px 24px;
```

**Mobile (< 425px)**
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 16px;
padding: 0px 16px;
```

---

### 4.2 Breakpoints standard

```javascript
/* Tailwind config */
screens: {
  'sm': '425px',    // Mobile landscape / small tablet
  'md': '768px',    // Tablet minimum
  'lg': '1024px',   // Desktop minimum
  'xl': '1280px',   // Large desktop
  '2xl': '1440px'   // Extra large (max container)
}
```

---

### 4.3 Container queries

**Max width content:**
```css
max-width: 1440px;
```

**Product grid span:**
```
Desktop: 3 colonnes (4 colonnes max 1440px)
Tablet: 2 colonnes
Mobile: 1 colonne
```

---

### 4.4 Alignments rules

**Horizontal:**
- `margin: 0 auto;` pour centrer
- Pas d'alignement droite sauf textes fine print
- Left-aligned par défaut

**Vertical:**
- Text naturellement top-aligned
- Images: `object-fit: cover;` avec `object-position: center;`

---

## 5. IMAGES & PROPORTIONS

### 5.1 Image ratios observed from YSL

#### Produits (Most important)
**Ratio: 0.80 (4:5 ou 9:11.25)**
```
Width: 409px
Height: 511px
Ratio: 409/511 = 0.8004
```

**Cas d'usage**: Product cards, service cards, portfolio items
**Crop guideline**: Centré verticalement, focus sur centre du sujet

```css
/* Talwind / CSS */
aspect-ratio: 0.8 / 1;
object-fit: cover;
object-position: center;
width: 100%;
height: auto;
```

---

#### Heroes & Full-width
**Ratio: 16:9 (1.777)**
```
Width: 1920px
Height: 1080px
```

**Cas d'usage**: Section heroes, bannières, accueil
**Crop guideline**: Sujet en haut-droite (comme YSL — model sur canapé)

```css
aspect-ratio: 16 / 9;
object-fit: cover;
object-position: right center;
width: 100vw;
height: auto;
```

---

#### Thumbnails & Small images
**Ratio: 1:1 (square)**
```
Width: 200px
Height: 200px
```

**Cas d'usage**: Team photos, testimonials, icons
**Crop guideline**: Centered face/subject

```css
aspect-ratio: 1 / 1;
object-fit: cover;
object-position: center;
border-radius: 2px;
```

---

#### Wide banners
**Ratio: 21:9 (2.333)**
```
Width: 1890px
Height: 810px
```

**Cas d'usage**: Section annonces, promos larges
**Crop guideline**: Landscape-friendly, less crop waste

```css
aspect-ratio: 21 / 9;
object-fit: cover;
object-position: center;
```

---

### 5.2 Image sizing guidelines

```css
/* Minimum sizes pour qualité */
Product image: min-width: 300px; /* Jamais < 300px */
Hero image: min-width: 800px;
Thumbnail: min-width: 100px;

/* Maximum sizes */
Product image: max-width: 600px;
Hero image: max-width: 100vw;
Thumbnail: max-width: 300px;
```

---

### 5.3 Image spacing

```css
/* Margin around images */
margin-bottom: 24px;  /* Below images */
margin-bottom: 48px;  /* Hero images */

/* Padding in cards */
padding: 0px;         /* Images flush edges */
```

---

### 5.4 Image optimization

```css
/* Lazy loading */
loading: "lazy";

/* Responsive images */
srcset: "image-300w.jpg 300w, image-600w.jpg 600w, image-1200w.jpg 1200w";
sizes: "(max-width: 425px) 100vw, (max-width: 768px) 90vw, 50vw";

/* Quality */
image-rendering: crisp-edges; /* Ou auto pour photos */
```

---

## 6. ÉLÉMENTS GRAPHIQUES

### 6.1 Lignes & dividers

#### Horizontal divider (section separator)
```css
border-top: 1px solid #E5E5E0;
margin: 80px 0px;
```

**Cas d'usage**: Entre sections principales

#### Subtle divider (light)
```css
border-top: 1px solid #F0F0ED;
margin: 24px 0px;
```

**Cas d'usage**: Entre items dans liste

#### Vertical divider (rare)
```css
border-left: 1px solid #E5E5E0;
margin: 0px 16px;
height: 100%;
```

**Cas d'usage**: Entre colonnes de contenu

---

### 6.2 Borders & Outlines

**Card border:**
```css
border: 1px solid #E5E5E0;
border-radius: 0px;  /* YSL: sharp corners, pas rounded */
```

**Focus states:**
```css
border-color: #C9A96E;
outline: 1px solid #C9A96E;
outline-offset: 2px;
```

**Disabled states:**
```css
border-color: #CCCCCC;
opacity: 0.5;
```

---

### 6.3 Ornaments & decorative elements

YSL utilise **très peu** d'ornaments. Si utilisés:

```css
/* Gold underline for emphasis (rare) */
::after {
  content: '';
  display: block;
  width: 40px;
  height: 2px;
  background-color: #C9A96E;
  margin: 12px 0px;
}
```

**Cas d'usage**: Très rarrement, sous un titre important

---

### 6.4 Patterns & textures

YSL utilise des **textures subtiles** (grain de papier) sur backgrounds.

```css
background-color: #F5F5F0;
background-image:
  repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
```

**Alternative**: Utiliser une image très subtile en repeat.

---

## 7. SHADOWS & ELEVATION

### 7.1 Shadow system (observé)

**Shadow système YSL (très subtle):**
```css
/* Shadow 1 — Subtle (cartes légères) */
box-shadow: rgba(0, 0, 0, 0.04) 0px 2px 4px;

/* Shadow 2 — Medium (cartes principales) */
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 8px;

/* Shadow 3 — Strong (modals, dropdowns) */
box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 16px;

/* Shadow 4 — Very strong (top-level overlays) */
box-shadow: rgba(0, 0, 0, 0.15) 0px 12px 24px;
```

**Note**: YSL préfère les ombres très légères et bien diffuses.

---

### 7.2 Elevation levels (Tailwind)

```javascript
/* tailwind.config.js */
boxShadow: {
  'none': 'none',
  'subtle': '0px 2px 4px rgba(0, 0, 0, 0.04)',
  'sm': '0px 2px 4px rgba(0, 0, 0, 0.08)',
  'md': '0px 4px 8px rgba(0, 0, 0, 0.08)',
  'lg': '0px 8px 16px rgba(0, 0, 0, 0.12)',
  'xl': '0px 12px 24px rgba(0, 0, 0, 0.15)',
  'focus': '0px 0px 0px 3px rgba(201, 169, 110, 0.3)',
}
```

---

### 7.3 Usage par composant

```css
/* Buttons (no shadow default) */
box-shadow: none;

/* Cards (on hover) */
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

/* Modals & Overlays */
box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);

/* Inputs (on focus) */
box-shadow: 0px 0px 0px 3px rgba(201, 169, 110, 0.3);

/* Dropdowns */
box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.12);
```

---

## 8. TRANSITIONS & ANIMATIONS

### 8.1 Transition values observées

YSL utilise des transitions **spécifiques** et **bien pensées**:

#### Standard transitions

**Color change (fast)**
```css
transition: color 0.25s linear;
```
**Usage**: Links hover, text color changes

**Opacity fade (medium)**
```css
transition: opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1);
```
**Usage**: Modal appears/disappears, overlay fades

**Transform movement (smooth)**
```css
transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
```
**Usage**: Menu slide, image scale

**Combo transition (complex)**
```css
transition:
  color 0.25s linear,
  opacity 0.25s linear;
```
**Usage**: Button hover (color + opacity change)

---

### 8.2 Easing functions

**cubic-bezier(0.25, 0.1, 0.25, 1)**
- Ease-in-out smooth (default YSL)
- Fast start, slow end
- Used for most UX transitions

**linear**
- No easing, constant speed
- Used for color/opacity changes

**cubic-bezier(0.22, 1, 0.36, 1)**
- Elastic ease-out
- Fast acceleration, bouncy ending
- Used for transform/movement

---

### 8.3 Timing (durations)

| Duration | Usage |
|----------|-------|
| **0.15s** | Very fast (micro-interactions) |
| **0.25s** | Fast (color, opacity) |
| **0.35s** | Medium (modals, fades) |
| **0.4s** | Standard (transforms, slides) |
| **0.5s** | Slow (page transitions) |
| **0.75s+** | Very slow (large animations) |

---

### 8.4 Animation keyframes (rare)

YSL utilise rarement des animations. Si nécessaire:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.element {
  animation: fadeIn 0.4s ease-in-out;
}
```

**Autre exemple — Slide in:**
```css
@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.element {
  animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 9. COMPOSANTS VISUELS

### 9.1 Buttons

#### Primary Button

```jsx
<button className="
  px-6 py-3
  bg-black text-white
  font-bold text-sm uppercase
  border border-black
  rounded-none
  transition-all duration-250
  hover:bg-white hover:text-black
  active:opacity-70
  disabled:opacity-50 disabled:cursor-not-allowed
">
  EXPLORER
</button>
```

**CSS Detail:**
```css
button.primary {
  background-color: #0A0A0A;
  color: #F5F5F0;
  border: 1px solid #0A0A0A;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.25s linear,
    color 0.25s linear,
    border-color 0.25s linear;
  border-radius: 0px;
}

button.primary:hover {
  background-color: #F5F5F0;
  color: #0A0A0A;
  border-color: #0A0A0A;
}

button.primary:active {
  opacity: 0.7;
}

button.primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

#### Secondary Button (Gold accent)

```jsx
<button className="
  px-6 py-3
  bg-white text-black
  border border-gold
  font-bold text-sm uppercase
  rounded-none
  transition-all duration-250
  hover:bg-gold hover:text-white
  active:opacity-70
">
  RÉSERVER
</button>
```

**CSS:**
```css
button.secondary {
  background-color: #F5F5F0;
  color: #0A0A0A;
  border: 1px solid #C9A96E;
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  transition:
    background-color 0.25s linear,
    color 0.25s linear;
}

button.secondary:hover {
  background-color: #C9A96E;
  color: #F5F5F0;
}
```

---

#### Tertiary Button (Subtle)

```jsx
<button className="
  px-6 py-2
  bg-transparent text-black
  border-b-2 border-black
  font-bold text-sm uppercase
  rounded-none
  transition-colors duration-250
  hover:text-gold hover:border-gold
">
  DÉCOUVRIR
</button>
```

---

### 9.2 Cards

#### Product Card

```jsx
<div className="
  flex flex-col
  w-full
  overflow-hidden
  rounded-none
  transition-all duration-300
  hover:shadow-lg
">
  <div className="aspect-[4/5] overflow-hidden bg-gray-100">
    <img
      src="product.jpg"
      alt="Produit"
      className="w-full h-full object-cover object-center
        transition-transform duration-400
        hover:scale-105
      "
    />
  </div>

  <div className="py-4 px-0">
    <h3 className="text-sm font-bold uppercase tracking-wide mb-2">
      Nom produit
    </h3>
    <p className="text-xs text-gray-500 mb-2">
      Description courte
    </p>
    <div className="flex justify-between items-center">
      <span className="text-sm font-bold">€ 550</span>
      <button className="text-xs font-bold uppercase">
        VOIR
      </button>
    </div>
  </div>
</div>
```

**CSS Details:**
```css
.card-product {
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 0px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  padding: 0px;
}

.card-product:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
}

.card-product__image {
  aspect-ratio: 0.8;
  overflow: hidden;
  background-color: #F0F0ED;
}

.card-product__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-product:hover .card-product__image img {
  transform: scale(1.05);
}

.card-product__content {
  padding: 16px 0px;
}
```

---

#### Service Card (Expert Boucles)

```jsx
<div className="
  p-6
  border border-gray-200
  rounded-none
  bg-white
  transition-all duration-300
  hover:border-gold hover:shadow-md
">
  <h3 className="text-lg font-bold mb-2">
    Soin Boucles Signature
  </h3>
  <p className="text-sm text-gray-600 mb-4">
    Traitement spécialisé pour cheveux bouclés...
  </p>
  <div className="flex justify-between items-center">
    <span className="text-sm font-bold">60 min</span>
    <button className="text-xs font-bold uppercase border-b-2 border-black hover:border-gold">
      EN SAVOIR +
    </button>
  </div>
</div>
```

---

### 9.3 Forms & Inputs

#### Text Input

```jsx
<input
  type="text"
  placeholder="Votre nom"
  className="
    w-full
    px-4 py-3
    border-b border-gray-300
    bg-transparent
    text-black
    text-sm
    rounded-none
    transition-colors duration-250
    placeholder-gray-400
    focus:outline-none
    focus:border-gold
    focus:shadow-sm
  "
/>
```

**CSS:**
```css
input[type="text"],
input[type="email"],
textarea {
  border: none;
  border-bottom: 1px solid #E5E5E0;
  padding: 12px 0px;
  background-color: transparent;
  font-size: 14px;
  color: #0A0A0A;
  transition: border-color 0.25s linear;
  outline: none;
}

input:focus {
  border-bottom-color: #C9A96E;
  box-shadow: 0px 0px 0px 3px rgba(201, 169, 110, 0.2);
}

input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input::placeholder {
  color: #CCCCCC;
}
```

---

### 9.4 Navigation

#### Main Navigation

```jsx
<nav className="
  flex items-center justify-between
  px-8 py-6
  bg-white
  sticky top-0 z-50
  transition-all duration-300
  hover:bg-gray-50
">
  <a href="/" className="flex items-center">
    <img src="logo.svg" alt="Logo" className="h-6" />
  </a>

  <div className="flex gap-8">
    {['PRESTATIONS', 'À PROPOS', 'RÉALISATIONS', 'CONTACT'].map(item => (
      <a
        key={item}
        href={`#${item.toLowerCase()}`}
        className="
          text-xs font-bold uppercase
          text-black
          transition-colors duration-250
          hover:text-gold
        "
      >
        {item}
      </a>
    ))}
  </div>

  <button className="text-black hover:text-gold transition-colors">
    MENU
  </button>
</nav>
```

---

### 9.5 Footer

```jsx
<footer className="
  bg-black text-white
  pt-32 pb-8
  mt-32
">
  <div className="max-w-6xl mx-auto px-8">
    <div className="grid grid-cols-4 gap-8 mb-16">
      {/* Column groups */}
      <div>
        <h4 className="text-xs font-bold uppercase mb-4">À Propos</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm hover:text-gold">À Propos de nous</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 pt-8">
      <p className="text-xs text-gray-400">© 2026 Expert Boucles</p>
    </div>
  </div>
</footer>
```

---

## 10. RÈGLES DE COMPOSITION

### 10.1 Whitespace philosophy

YSL utilise un **maximalisme de l'espace blanc** — beaucoup d'air entre les éléments.

**Règles**:
- Sections de large padding (80-120px vertical)
- Espacements généreux entre composants
- Jamais d'éléments "compressés"
- Blanc respire et donne de la classe

```css
/* Section spacing */
section {
  padding: 80px 0px;  /* Min spacing */
  margin: 0px;        /* No additional margin */
}

section + section {
  padding-top: 120px; /* Extra space between major sections */
}

@media (max-width: 768px) {
  section {
    padding: 48px 0px;  /* Tablet reduced */
  }
}

@media (max-width: 425px) {
  section {
    padding: 32px 0px;  /* Mobile minimal */
  }
}
```

---

### 10.2 Text alignment rules

```css
/* Default: Left-aligned (Western reading flow) */
text-align: left;

/* Center only for: */
- Main headings (H1 on hero)
- Centered panels/quotes
- Footer copyright

/* Right-aligned never except: */
- Price tags (rare)
- Form labels (optional)

/* Justified: Never */
```

---

### 10.3 Text max-width for readability

```css
/* Paragraph max-width (golden rule) */
max-width: 600px;     /* Approx 70-80 characters per line */

/* Long-form content */
max-width: 800px;

/* Never exceed 900px for body text */
```

---

### 10.4 Hero section composition

**Structure standard:**
```
[Large Image 16:9]
└─ Overlay text (light/white)
   └─ H1 (48px, white, top-left positioning)
   └─ Subtitle (18px, white, sub-h1)
   └─ CTA Button (primary or secondary)
```

**Height:**
```css
/* Desktop */
min-height: 60vh;
max-height: 80vh;

/* Tablet */
min-height: 50vh;

/* Mobile */
min-height: 40vh;
```

**Image positioning:**
```css
background-image: url(...);
background-attachment: fixed;  /* Parallax optional */
background-position: center right;  /* Or 'center' */
background-size: cover;
```

---

### 10.5 Section patterns (Expert Boucles)

**Pattern 1: Full-width hero**
```
+─────────────────────+
|                     |
|   [Large Image]     |
|   TITRE H1          |
|   [CTA Button]      |
|                     |
+─────────────────────+
```

**Pattern 2: Image + Text side-by-side**
```
+─────────────────────+─────────────────────+
|                     |                     |
|   [Image 16:9]      |  Title H2           |
|                     |  Description        |
|                     |  [CTA]              |
|                     |                     |
+─────────────────────+─────────────────────+
```

**Pattern 3: Grid de services/produits**
```
H2: SERVICES
─────────────────────
[Card] [Card] [Card] [Card]
[Card] [Card] [Card] [Card]
[Card] [Card]
```

**Pattern 4: Testimonial section**
```
H2: NOS CLIENTS PARLENT DE NOUS
─────────────────────────
[Quote Text]
- Name (Avatar, small)

[Quote Text]
- Name (Avatar, small)
```

---

### 10.6 Mobile-first breakpoint strategy

```css
/* BASE: Mobile < 425px */
- Single column layouts
- 100% widths with padding
- Larger touch targets (48px min)
- Simplified navigation (hamburger menu)

/* TABLET: 425px - 768px */
- 2-column grids
- More breathing room
- Expand navigation

/* DESKTOP: > 768px */
- 3-4 column grids
- Full layouts
- Desktop navigation always visible
```

---

### 10.7 Responsive Image handling

```css
/* Responsive containers */
.hero {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
}

img {
  width: 100%;
  height: auto;
  max-width: 600px;    /* Constraint */
  object-fit: cover;
  object-position: center;
}

/* Lazy loading attributes */
<img loading="lazy" decoding="async" ... />
```

---

### 10.8 Accessibility considerations

```css
/* Focus states mandatory */
:focus {
  outline: 2px solid #C9A96E;
  outline-offset: 2px;
}

/* Minimum contrast ratios */
text-color: #0A0A0A on #F5F5F0 → 18:1 (AAA)
text-color: #555555 on #F5F5F0 → 9:1 (AAA)
text-color: #F5F5F0 on #0A0A0A → 18:1 (AAA)

/* Button minimum size */
min-width: 44px;
min-height: 44px;
```

---

## RÉSUMÉ — Quick Reference

### Colors
- **Black**: #0A0A0A
- **Gold**: #C9A96E
- **White**: #F5F5F0
- **Grays**: #F0F0ED → #555555

### Typography
- **Font**: Helvetica, Arial, sans-serif
- **H1**: 48px, 400, white
- **H2**: 24px, 700, black
- **Body**: 14px, 400, #555555, line-height 1.6

### Spacing
- Base: 4px scale
- Sections: 80px padding
- Cards: 16-24px padding
- Gap: 24px grids

### Images
- **Products**: 0.8 ratio (4:5)
- **Heroes**: 16:9 ratio
- **Thumbnails**: 1:1 ratio
- **Object-fit**: cover, centered

### Buttons
- Font: Bold, 14px, uppercase
- States: Normal → Hover → Active → Disabled
- Border-radius: 0px (sharp corners)

### Transitions
- Colors: 0.25s linear
- Opacity: 0.35s cubic-bezier
- Transforms: 0.4s cubic-bezier

### Shadows
- Subtle: 0px 2px 4px rgba(0,0,0,0.04)
- Medium: 0px 4px 8px rgba(0,0,0,0.08)
- Strong: 0px 8px 16px rgba(0,0,0,0.12)

---

**Document créé**: mai 2026
**Source**: Analyse complète YSL.com
**Status**: Prêt pour implémentation Expert Boucles
