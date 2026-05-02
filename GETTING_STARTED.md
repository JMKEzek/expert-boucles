# Getting Started - Expert Boucles Frontend

Bienvenue dans le projet Expert Boucles ! Ce guide vous aide à démarrer rapidement.

## Prérequis

- Node.js 18+ (vérifiez avec `node --version`)
- npm 9+ ou yarn
- Git

## Installation rapide

```bash
# 1. Cloner et entrer dans le dossier
cd expert-boucles

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000 dans le navigateur
```

## Scripts disponibles

```bash
npm run dev          # Serveur de dev (localhost:3000)
npm run build        # Build production optimisé
npm start            # Lancer la build production
npm run lint         # ESLint check
```

## Structure du projet

```
app/
├── layout.tsx           # Root layout + fonts + metadata
├── page.tsx             # Home page
├── globals.css          # Design system + CSS Variables
├── (public)/            # Pages publiques
│   ├── prestations/     # Services listing + detail
│   ├── a-propos/        # À Propos
│   ├── realisations/    # Galerie + testimonials
│   └── contact/         # Formulaire contact
├── (auth)/              # Pages authentification
│   ├── connexion/       # Login
│   ├── inscription/     # Register
│   └── mon-compte/      # User dashboard
└── (legal)/             # Pages légales
    ├── cgv/             # Conditions générales
    ├── mentions-legales/
    └── remboursement-annulation/

components/
├── layout/              # Header, Footer
├── services/            # Service components
├── reviews/             # ReviewCarousel, Instagram feed
├── booking/             # AcuityEmbed
└── ui/                  # shadcn/ui components
```

## Design System

### Couleurs
```css
--color-noir: #0a0a0a;      /* Primary dark */
--color-or: #c9a96e;        /* Accent gold */
--color-blanc: #f5f5f0;     /* Background white */
```

### Typography
- **Titres**: Cormorant Garamond (serif)
- **Corps**: Inter (sans-serif)

### Utilisation Tailwind

```tsx
// Couleurs personnalisées
<div className="text-gold bg-noir text-blanc">

// Responsive
<div className="text-xl md:text-3xl lg:text-5xl">

// Animations custom
<div className="reveal hover-lift">
```

## Ajouter des pages

### Nouvelle page publique
```tsx
// app/(public)/nouvelle-page/page.tsx
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NouvellePage() {
  return (
    <>
      <Header />
      <section className="pt-32 pb-20 bg-white">
        {/* Contenu */}
      </section>
      <Footer />
    </>
  );
}
```

### Nouvelle page d'authentification
```tsx
// app/(auth)/nouvelle-page/page.tsx
// Même structure, le layout (auth) ajoute Header + Footer automatiquement
```

## Ajouter des composants

### Nouveau composant service
```tsx
// components/services/NouveauComposant.tsx
export interface NouveauComposantProps {
  title: string;
  // ...props
}

export function NouveauComposant({ title }: NouveauComposantProps) {
  return <div>{title}</div>;
}
```

Puis l'importer dans les pages :
```tsx
import { NouveauComposant } from '@/components/services/NouveauComposant';
```

## Mock data → API

Actuellement, tous les composants utilisent des **données mock** (hardcodées).

Pour intégrer l'API (Agent 3) :

### Avant (mock data)
```tsx
const mockServices = [
  { id: '1', name: 'Coupe', price: 60 },
];
```

### Après (API call)
```tsx
const response = await fetch('/api/services');
const services = await response.json();
```

## Responsive Design

Le design est **mobile-first**. Testé sur :
- Mobile: 375px (iPhone 12)
- Tablet: 768px (iPad)
- Desktop: 1024px+ (Laptop)

### Breakpoints Tailwind
```
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
```

## Aide rapide

### Impossible de faire démarrer?
```bash
# Supprimer node_modules + réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur de build?
```bash
# Nettoyer le cache Next.js
rm -rf .next
npm run build
```

### TypeScript errors?
```bash
# Vérifier les types
npm run lint
```

## Prochaines étapes (Agent 3+)

1. **API Routes** : Ajouter les endpoints `/api/*`
2. **Database** : Connecter Prisma + PostgreSQL
3. **Authentification** : NextAuth.js
4. **Intégrations** : Acuity, Instagram, Google APIs
5. **Tests** : Ajouter les tests end-to-end

## Documentation

- **Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org/docs

## Besoin d'aide?

- Vérifier la console du navigateur (F12)
- Regarder les logs du serveur de dev
- Consulter `AGENT2_DELIVERABLES.md` pour plus de détails

---

**Bon développement!** ✨
