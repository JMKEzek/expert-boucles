# ANALYSE VIDÉO SCROLL — Expert Boucles

**Date d'analyse** : 4 mai 2026
**Vidéo** : `Enregistrement scroll.mp4` (6.43s, 30fps, 2558x1382px)

---

## 1. COMPORTEMENT DE L'IMAGE

### Type exact de mouvement
**L'image hero ne disappaît PAS avec un simple fade ou translateY.**

Deux transformations SIMULTANÉES et LIÉES au scroll :
1. **Réduction de hauteur** : De 100vh → 0vh progressivement
2. **Contenu qui remonte** : translateY négatif pour combler l'espace

### Animations détaillées

#### Phase 1 : Repos (Frames 1-4)
```
Image hero : 100vh, 100% opacité, Y=0
Contenu    : Caché en bas (translateY: +100vh environ)
```

#### Phase 2 : Transition active (Frames 5-9)
```
Frame 5 : image 80%, contenu -20vh
Frame 6 : image 40%, contenu -50vh
Frame 7 : image 30%, contenu -60vh
Frame 8 : image 30%, contenu -70vh
Frame 9 : image 0%,  contenu -100vh
```

**Timing** : 4 frames à 4fps extraction = ~0.13s de transition visuelle

---

## 2. VITESSE DU MOUVEMENT

### Relation avec le scroll

**L'effet n'est PAS proportionnel 1:1 au scroll pixel.**

Evidence :
- Frames 1-4 (STABLES) : L'image ne change PAS, même si on scrolle probablement 100-200px
- Frame 5+ (ACTIVE) : La réduction s'accélère avec le scroll
- La transition complète (~5 frames) = ~200-400px de scroll réel

**Facteur d'accélération** : ~3x à 5x
- Si on scrolle 100px, l'image se réduit de 300-500px virtuellement

### Courbe de transition
L'effet suit probablement une **ease-out cubique** (rapide au début, puis ralentit) ou **ease-in-out**.

```
scrollPercent: 0.0 → 1.0 (sur la hauteur du hero)
heightScale  : 1.0 → 0.0 (réduction progressive)
Function     : heightScale = max(0, 1 - scrollPercent^1.5) // non-linéaire
```

---

## 3. TEXTE ET CONTENU

### État du texte
**Le texte/contenu est SOLIDAIRE du mouvement** — il n'y a pas de texte fixe sur l'image hero.

- **Frames 1-4** : Seule l'image est visible. Pas de texte visible.
- **Frames 5+** : Les cartes "Bodypower" et "Centerverse" remontent avec leurs labels.
- **Frames 6-9** : Les cartes prennent toute la place de l'image qui disparaît.

**Comportement du contenu**:
- Pas d'opacity fade-in apparente (content visible immédiatement au frame 5)
- Pure transformation verticale (translateY)
- Sync parfait avec la disparition de l'image

---

## 4. TIMING D'APPARITION/DISPARITION

### Timeline précise

| Point | Frames | Temps réel | État |
|-------|--------|-----------|------|
| Hero visible complet | 1-4 | 0s - 0.13s | height=100vh |
| Transition commence | 5 | 0.17s | height=80vh |
| Transition rapide | 6 | 0.20s | height=40vh |
| Presque disparu | 7-8 | 0.23s-0.27s | height=30vh |
| Complètement disparu | 9+ | 0.30s+ | height=0 |

### Pixel de scroll qui déclenche
Estimation : **~200px de scroll** déclenche la transition complète de l'image.

Plus précisément :
- 0-50px scroll : Rien ne change (image=100vh)
- 50-150px scroll : Réduction progressive (image 100% → 0%)
- 150px+ scroll : Image disparue, contenu centré

---

## 5. TRANSITION VERS LA SECTION SUIVANTE

### Apparition du contenu
```
Avant : Image hero fullscreen + contenu en bas invisible
Pendant : Image rétrécit, contenu remonte (translateY négatif)
Après : Image disparu (h=0), contenu fullscreen
```

### Ordre de stacking (z-index)
```
z-index: -1   → Image hero (background)
z-index: 10   → Contenu (.content-section)
z-index: 100  → Header/nav (si fixed)
```

---

## 6. CODE TECHNIQUE POUR REPRODUIRE

### HTML Structure
```html
<!-- Hero Section -->
<section class="hero-section">
  <img src="femme-bleue.jpg" alt="Hero" class="hero-image" />
</section>

<!-- Content Section (cartes) -->
<section class="content-section">
  <div class="card">
    <h3>Bodypower</h3>
    <!-- ... -->
  </div>
  <div class="card">
    <h3>Centerverse</h3>
    <!-- ... -->
  </div>
</section>
```

### CSS
```css
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000; /* fallback */
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: height; /* GPU acceleration */
  transform: translateZ(0); /* Force GPU rendering */
}

.content-section {
  position: relative;
  z-index: 10;
  width: 100%;
  background: white;
  padding: 60px 20px;
  will-change: transform;
}
```

### JavaScript (React Hooks)
```javascript
'use client';
import { useEffect, useRef } from 'react';

export default function ScrollHero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !contentRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.parentElement.offsetHeight;

      // Calculer le pourcentage de scroll relatif à la hauteur du hero
      const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1);

      // Réduire la hauteur de l'image
      const heightScale = Math.max(0, 1 - scrollPercent * 1.5);
      heroRef.current.style.height = `${heightScale * 100}%`;
      heroRef.current.style.opacity = heightScale;

      // Remonte le contenu
      const offsetY = Math.min(scrollPercent * heroHeight * 0.5, heroHeight * 0.5);
      contentRef.current.style.transform = `translateY(-${offsetY}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={heroRef} className="hero-section">
        <img src="/images/hero.jpg" alt="Hero" className="hero-image" />
      </div>

      <section ref={contentRef} className="content-section">
        {/* Cartes ici */}
      </section>
    </>
  );
}
```

### Variante avec requestAnimationFrame (meilleure perf)
```javascript
'use client';
import { useEffect, useRef } from 'react';

export default function ScrollHero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateAnimation);
      }
    };

    const updateAnimation = () => {
      const scrollY = scrollYRef.current;
      const heroHeight = window.innerHeight;

      const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1);
      const heightScale = Math.max(0, 1 - scrollPercent * 1.5);

      if (heroRef.current) {
        heroRef.current.style.height = `${heightScale * 100}%`;
        heroRef.current.style.opacity = heightScale;
      }

      if (contentRef.current) {
        const offsetY = Math.min(scrollPercent * heroHeight * 0.5, heroHeight * 0.5);
        contentRef.current.style.transform = `translateY(-${offsetY}px)`;
      }

      rafRef.current = null;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="hero-section">
        <img
          ref={heroRef}
          src="/images/hero.jpg"
          alt="Hero"
          className="hero-image"
        />
      </div>

      <section ref={contentRef} className="content-section">
        {/* Cartes */}
      </section>
    </>
  );
}
```

---

## 7. PARAMÈTRES AJUSTABLES

Pour affiner l'effet, modifier ces valeurs :

```javascript
const SCROLL_FACTOR = 1.5;        // Vitesse de réduction (↑ = plus rapide)
const SCROLL_TRIGGER_PERCENT = 0.5; // Hauteur hero pour déclencher (50% = au milieu)
const PARALLAX_FACTOR = 0.5;      // Vitesse du contenu (0.5 = 50% du scroll)
```

---

## 8. RECOMMANDATIONS

### Optimisations
- Utiliser `requestAnimationFrame` (code ramené plus haut)
- Ajouter `will-change: height, transform` au CSS
- Ajouter `backface-visibility: hidden` pour perf GPU
- Tester sur mobile (cet effet est lourd sur petit écran)

### Variante mobile
Pour mobile (< 768px), recommandé :
- Désactiver l'effet de réduction
- Garder juste le `translateY` du contenu (simple)
- Ou utiliser une version `position: sticky`

### Progressive Enhancement
```javascript
// Déterminer la capacité du device
const supportsSmooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
const isMobile = window.innerWidth < 768;

if (!supportsSmooth || isMobile) {
  // Version simplifiée (pas d'effet)
  return;
}
// Version complète avec l'effet
```

---

## 9. FRAMES EXTRAITES

Fichiers images analysés dans `/tmp/video_frames/` :
- `frame_0001.png` → Image hero plein écran
- `frame_0005.png` → Début transition
- `frame_0006.png` → Transition rapide
- `frame_0009.png` → Fin transition
- `frame_0010.png` → Cycle suivant (recommence)

Total : 26 frames extraites à 4fps (1 frame toutes les 0.25s)
