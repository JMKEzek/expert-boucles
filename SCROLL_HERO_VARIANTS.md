# VARIANTES D'IMPLÉMENTATION — ScrollHero

Basé sur l'analyse vidéo du 4 mai 2026.

---

## VARIANTE 1 : Réduction de HEIGHT (Recommandée)

**Meilleure performance** — Utilise `height` CSS et `requestAnimationFrame`.

### Code
```javascript
const updateAnimation = () => {
  const scrollY = window.scrollY;
  const heroHeight = document.querySelector('.hero-section').offsetHeight;
  const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1);

  const heightScale = Math.max(0, 1 - scrollPercent * 1.5);
  heroImage.style.height = `${heightScale * 100}%`;
};
```

### Avantages
- Simple et direct
- Compatible tous les navigateurs
- GPU acceleration possible

### Inconvénients
- Peut causer des reflows (layout recalculation)
- Image peut apparaître "squashée" visuellement

---

## VARIANTE 2 : transform scaleY (Plus performant GPU)

**Meilleure performance GPU** — Utilise `transform: scaleY()`.

### Code
```javascript
const heightScale = Math.max(0, 1 - scrollPercent * 1.5);
heroImage.style.transform = `scaleY(${heightScale})`;
heroImage.style.transformOrigin = 'top center';
```

### CSS
```css
.hero-image {
  will-change: transform;
  backface-visibility: hidden; /* GPU acceleration */
}
```

### Avantages
- **Zero reflows** — Pure GPU transformation
- Performance optimale
- Pas de layout shift
- Plus rapide sur mobile

### Inconvénients
- Image "squashée" (moins naturel visuellement)
- Nécessite `transform-origin` correct
- Peut déplacer le texte (si du texte est sur l'image)

**Recommandé pour** : Mobile, scrolling rapide, animations fluides

---

## VARIANTE 3 : clip-path (Effet de crop)

**Effet plus naturel** — Crop l'image au lieu de la réduire.

### Code
```javascript
const heightScale = Math.max(0, 1 - scrollPercent * 1.5);
const clipHeight = heightScale * 100;
heroImage.style.clipPath = `inset(0 0 ${100 - clipHeight}% 0)`;
```

### CSS
```css
.hero-image {
  will-change: clip-path;
}
```

### Avantages
- Effet très naturel (partie du bas disparaît)
- Pas de réduction d'image
- L'image reste à sa taille réelle

### Inconvénients
- Performance inférieure à `scaleY()`
- Pas supporté en IE
- Impossible de centrer le crop facilement

**Recommandé pour** : Design premium, pas de contrainte perf

---

## VARIANTE 4 : translateY + opacity (Parallax soft)

**Soft transition** — Combine mouvement vertical et opacité.

### Code
```javascript
const scrollPercent = Math.min(scrollY / (heroHeight * 0.3), 1);
const offsetY = -scrollPercent * 200;
const opacity = Math.max(0, 1 - scrollPercent * 1.2);

heroImage.style.transform = `translateY(${offsetY}px)`;
heroImage.style.opacity = opacity;
```

### Avantages
- Effect parallax classique
- Fade-out doux
- Plus naturel visuellement

### Inconvénients
- Contenu dépasse le conteneur (overflow)
- Plus de pixels à animer
- Peut lag sur mobile

---

## VARIANTE 5 : CSS-only Sticky (Pas de JavaScript)

**Zéro JavaScript** — Utilise CSS `position: sticky`.

### HTML
```html
<div class="hero-sticky">
  <img src="hero.jpg" class="hero-sticky-img" />
</div>
<div class="content-section">...</div>
```

### CSS
```css
.hero-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 5;
}

.hero-sticky-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-section {
  position: relative;
  z-index: 10;
  background: white;
}
```

### Avantages
- Zéro JavaScript (Perf maximale)
- Très compatible
- Simple à mettre en place

### Inconvénients
- **Pas d'effet de réduction** (image reste fullscreen)
- Le contenu passe "par-dessus" l'image
- Pas contrôlable via JavaScript

**Note** : Ceci ne reproduit PAS l'effet vidéo. C'est une alternative simplifiée.

---

## VARIANTE 6 : IntersectionObserver + CSS Transition

**Optimisé** — Déclenche une transition au lieu d'écouter chaque scroll.

### Code
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('collapsed');
    } else {
      entry.target.classList.add('collapsed');
    }
  });
});

observer.observe(document.querySelector('.hero-image'));
```

### CSS
```css
.hero-image {
  height: 100vh;
  opacity: 1;
  transition: height 0.5s ease-out, opacity 0.5s ease-out;
}

.hero-image.collapsed {
  height: 0;
  opacity: 0;
}
```

### Avantages
- Déclenche une transition une seule fois
- Très performant
- Zéro continual scroll listening

### Inconvénients
- **Pas d'effet progressif** (transition discrète)
- Réduction binaire (visible → invisible)
- Ne reproduit pas l'effet vidéo fidèlement

---

## COMPARAISON — Quelle variante choisir?

| Variante | Perf GPU | Mobile | Contrôle Scroll | Visuellement naturel | Complexité |
|----------|----------|--------|-----------------|----------------------|-----------|
| **1. Height** | ⭐⭐⭐ | ⭐⭐ | ✅ Excellent | ⭐⭐ | Moyen |
| **2. scaleY** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ Excellent | ⭐ | Moyen |
| **3. clip-path** | ⭐⭐⭐ | ⭐⭐ | ✅ Excellent | ⭐⭐⭐⭐ | Avancé |
| **4. translateY+opacity** | ⭐⭐⭐⭐ | ⭐⭐ | ✅ Excellent | ⭐⭐⭐ | Moyen |
| **5. CSS sticky** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ Aucun | ⭐ | Très simple |
| **6. IntersectionObserver** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ Limité | ⭐ | Simple |

---

## RECOMMANDATION FINALE

### Pour reproduire EXACTEMENT la vidéo :
→ **VARIANTE 2 : transform scaleY()**

```javascript
// Recommandé
const heightScale = Math.max(0, 1 - (scrollY / heroHeight) * 1.5);
heroImage.style.transform = `scaleY(${heightScale})`;
heroImage.style.transformOrigin = 'top center';

// + Variante 1 pour le contenu
contentSection.style.transform = `translateY(${-scrollY * 0.5}px)`;
```

### Pour la meilleure performance tout écran :
→ **VARIANTE 2 + VARIANTE 5 (Hybrid)**

```javascript
// Desktop
if (window.innerWidth > 1024) {
  useVariante2(); // scaleY + transform
}

// Mobile
if (window.innerWidth <= 1024) {
  useVariante5(); // CSS sticky simple
}
```

### Pour la plus grande compatibilité :
→ **VARIANTE 1 : Height** avec `requestAnimationFrame`

```javascript
// Classique et stable
heroImage.style.height = `${heightScale * 100}%`;
```

---

## CODE FINAL COMBINÉ (Recommandé)

```typescript
'use client';
import { useEffect, useRef } from 'react';

export function ScrollHero({ heroImage, children }) {
  const heroRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Déterminer la variante selon le device
    const isMobile = window.innerWidth < 768;
    const useScaleY = !isMobile; // GPU transform sur desktop
    const useHeight = isMobile; // Height sur mobile (plus stable)

    let rafId: number | null = null;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1);
        const scale = Math.max(0, 1 - scrollPercent * 1.5);

        if (useScaleY && heroRef.current) {
          // VARIANTE 2 : scaleY (Desktop)
          heroRef.current.style.transform = `scaleY(${scale})`;
          heroRef.current.style.transformOrigin = 'top center';
        } else if (useHeight && heroRef.current) {
          // VARIANTE 1 : Height (Mobile)
          heroRef.current.style.height = `${scale * 100}%`;
        }

        // Contenu remonte
        if (contentRef.current) {
          const offset = Math.min(scrollY * 0.5, heroHeight * 0.5);
          contentRef.current.style.transform = `translateY(-${offset}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <img
          ref={heroRef}
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover will-change-transform"
        />
      </div>
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </>
  );
}
```

---

## TESTS DE PERFORMANCE

### Mesurer le FPS
```javascript
let frameCount = 0;
let lastTime = performance.now();

function measurePerf() {
  const currentTime = performance.now();
  frameCount++;

  if (currentTime - lastTime >= 1000) {
    console.log(`FPS: ${frameCount}`);
    frameCount = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(measurePerf);
}

measurePerf();
```

**Cible** : 60+ FPS (pas de jank lors du scroll)

---

## DEBUGGING

### Activer le debug mode
```javascript
// Dans scroll-hero.css
.scroll-hero-debug { }

// Ajouter la classe au conteneur
document.querySelector('.hero-section').classList.add('scroll-hero-debug');
```

### Afficher les valeurs actuelles
```javascript
const log = () => {
  console.log(`
    scrollY: ${window.scrollY}
    scale: ${1 - (window.scrollY / window.innerHeight) * 1.5}
    heroHeight: ${heroRef.current?.offsetHeight}
  `);
};

window.addEventListener('scroll', log);
```

---

## RESSOURCES

- MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
- Performance: https://web.dev/animations-guide/
- ClipPath: https://css-tricks.com/clipping-masking-css/
- IntersectionObserver: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
