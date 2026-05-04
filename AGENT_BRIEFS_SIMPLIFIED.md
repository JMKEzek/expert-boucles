# 📋 BRIEFS AGENTS — ARCHITECTURE SIMPLIFIÉE (SANS DB)
## Expert Boucles — Refonte Next.js 14 + Acuity Scheduling

**Date** : Mai 2026
**Client** : Yannick — Coiffeur expert cheveux bouclés, Paris 75009
**Stack** : Next.js 14 + TypeScript + Tailwind CSS + Acuity Scheduling
**Déploiement** : Vercel
**Timeline** : 6-8 semaines

> 🎯 **ARCHITECTURE SIMPLIFIÉE** (Mai 4, 2026)
>
> ❌ **Base de données SUPPRIMÉE** — Prisma et PostgreSQL supprimés
>
> ✅ **Services figés dans le code** — `lib/constants/services.ts` contient tous les 17 services
>
> ✅ **Pages statiques générées** — 30 pages HTML pré-générées avec `generateStaticParams()`
>
> Avantages : Zéro coûts infra, déploiement Vercel simplifié, performance maximale

---

## 🏗️ ARCHITECTURE GLOBALE

```
┌──────────────────────────────────────────────────────┐
│            EXPERT BOUCLES — SITE VITRINE              │
│        Next.js 14 + Acuity Booking + Reviews          │
├──────────────────────────────────────────────────────┤
│                                                       │
│ Frontend (Next.js App Router)                         │
│ ├─ Pages publiques (Accueil, Prestations, etc.)      │
│ ├─ Pages légales (CGV, Mentions, Remboursement)      │
│ └─ Components (UI, ReviewCarousel, AcuityEmbed)      │
│                                                       │
│ Data Layer (Constants)                                │
│ └─ lib/constants/services.ts (17 services figés)     │
│                                                       │
│ API Routes (minimal)                                  │
│ └─ /api/google-reviews (avis clients dynamiques)     │
│                                                       │
│ Intégrations tierces                                  │
│ ├─ Acuity Scheduling (booking + paiements Stripe)    │
│ ├─ Google Places API (avis clients)                   │
│ ├─ Instagram API (feed réalisations, optionnel)      │
│ ├─ Resend (email contact, optionnel)                 │
│ └─ Google Maps Embed                                 │
│                                                       │
│ Déploiement                                           │
│ ├─ Code : GitHub                                     │
│ ├─ Hosting : Vercel                                  │
│ └─ ❌ Database : AUCUNE                              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## 📌 AGENT 1 : API ROUTES & INTÉGRATIONS EXTERNES
**Spécialité** : Google Places API, Instagram API, Resend, Acuity Webhooks

### 🎯 Objectif principal
Implémenter les API routes pour les données dynamiques (avis, Instagram, contact).
Toutes les pages statiques et services constants sont **déjà en place**.

### ⏰ Timeline
**Semaines 1-2** — 4-5 jours

### 📌 État actuel du projet

Le projet Next.js est **opérationnel** avec :
- ✅ Next.js 14 + TypeScript + Tailwind CSS v3.3.0
- ✅ 17 services figés dans `lib/constants/services.ts`
- ✅ 30 pages statiques générées (dont 17 détails services)
- ✅ Composants UI : Header, Footer, ServiceCard, ServiceGrid, ReviewCarousel, AcuityEmbed, InstagramFeed, FullScreenScroll
- ✅ Design system noir/or/blanc avec Cormorant Garamond + Inter
- ✅ Pages légales (CGV, Mentions légales, Remboursement/Annulation)
- ✅ `npm run build` → succès, 30 pages générées

**Ce qui manque (à implémenter par Agent 1) :**
- ❌ `/api/google-reviews` — Intégration Google Places API
- ❌ `/api/instagram-feed` (optionnel) — Intégration Instagram Graph API
- ❌ `/api/contact` (optionnel) — Formulaire contact + Resend
- ❌ Webhook Acuity (optionnel) — Synchronisation des RDV

### 📌 Livrables attendus

#### 1. **API Route : GET /api/google-reviews** ✅ DÉJÀ EXISTE
```
- Récupère les avis depuis Google Places API
- Cache 24h en local (fichier `.cache/google-reviews.json`)
- Retour : { reviews[], averageRating, totalReviews }
- Filtre : avis >= 4.5 étoiles uniquement
- Env vars : GOOGLE_PLACES_API_KEY, GOOGLE_PLACE_ID
```

Status : ✅ API existante, à tester avec les vraies clés API

#### 2. **API Route : GET /api/instagram-feed** (OPTIONNEL)
```
- Récupère posts @expert_boucles depuis Instagram Graph API
- Cache 6h
- Retour : { posts[] }
- Env vars : INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_BUSINESS_ACCOUNT_ID
```

#### 3. **API Route : POST /api/contact** (OPTIONNEL)
```
- Formulaire contact formulaire + envoi email via Resend
- Input validation (email, message obligatoires)
- Retour : { success, message }
- Env vars : RESEND_API_KEY, ADMIN_EMAIL
```

#### 4. **Composants/Pages utilisant les APIs**
- ✅ `components/reviews/ReviewCarousel.tsx` — Affiche les avis Google
- ✅ `app/(public)/realisations/page.tsx` — Affiche feed Instagram
- ⚠️ `app/(public)/contact/page.tsx` — Formulaire contact (à wirer avec /api/contact)

#### 5. **Variables d'environnement**
À renseigner dans `.env.local` :
```bash
# Google Places API
GOOGLE_PLACES_API_KEY=AIza...
GOOGLE_PLACE_ID=ChIJ...

# Instagram API (optionnel)
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# Resend (optionnel)
RESEND_API_KEY=...
ADMIN_EMAIL=contact@expert-boucles.com

# Acuity (pour AcuityEmbed)
NEXT_PUBLIC_ACUITY_OWNER_ID=...
```

### ✅ Checklist Agent 1

- [ ] Tester `/api/google-reviews` avec vraies clés API
  - [ ] Vérifier le cache fonctionne (check `.cache/google-reviews.json`)
  - [ ] Vérifier fallback en cas d'erreur API
  - [ ] Vérifier filtre 4.5+ étoiles

- [ ] Implémenter `/api/instagram-feed` (optionnel)
  - [ ] Récupérer posts depuis Instagram Graph API
  - [ ] Cache 6h
  - [ ] Wirer `app/(public)/realisations/page.tsx`

- [ ] Implémenter `/api/contact` (optionnel)
  - [ ] Validation input (email, message)
  - [ ] Envoi email via Resend
  - [ ] Wirer formulaire dans `app/(public)/contact/page.tsx`

- [ ] Tester les APIs en local
  - [ ] Vérifier env vars configurées
  - [ ] Vérifier réponses JSON valides
  - [ ] Vérifier gestion erreurs

- [ ] Build final
  - [ ] `npm run build` → succès
  - [ ] Aucune erreur TypeScript
  - [ ] Pages statiques générées

### 📚 Ressources

- **Google Places API** : https://developers.google.com/maps/documentation/places/web-service/overview
- **Instagram Graph API** : https://developers.facebook.com/docs/instagram-api/
- **Resend** : https://resend.com/docs
- **Next.js API Routes** : https://nextjs.org/docs/app/building-your-application/routing/route-handlers

---

## 📌 AGENT 2 : PAGES & COMPOSANTS DYNAMIQUES
**Spécialité** : Pages Next.js, Composants React, Design System

### 🎯 Objectif principal
Finaliser les pages dynamiques et connecter les intégrations API.

### ⏰ Timeline
**Semaines 2-3** — 4-5 jours

### 📌 État actuel

**Déjà complété :**
- ✅ Pages statiques : Accueil, Prestations, À Propos, Contact, CGV, Mentions légales
- ✅ Pages dynamiques : `/prestations/[slug]` (17 pages)
- ✅ Composants : Header, Footer, Navigation, ServiceCard, ServiceGrid, AcuityEmbed, ReviewCarousel, InstagramFeed, FullScreenScroll
- ✅ Design system complet (tokens Tailwind)

**À améliorer/finaliser :**
- [ ] `/app/(public)/realisations/page.tsx` — Connecter InstagramFeed à `/api/instagram-feed`
- [ ] `/app/(public)/contact/page.tsx` — Connecter formulaire à `/api/contact`
- [ ] ReviewCarousel — S'assurer qu'il utilise `/api/google-reviews`
- [ ] Responsive design — Vérifier mobile/tablet/desktop
- [ ] SEO — Meta tags, Open Graph, Sitemap
- [ ] Performance — Images optimisées, lazy loading

### 📌 Livrables attendus

#### 1. **Page Réalisations** (`app/(public)/realisations/page.tsx`)
```typescript
- Intégrer <InstagramFeed /> connectée à /api/instagram-feed
- Afficher grille masonry de posts Instagram
- Responsive (mobile: 2 colonnes, desktop: 4 colonnes)
- Loading state pendant fetch
- Fallback si API indisponible
```

#### 2. **Page Contact** (`app/(public)/contact/page.tsx`)
```typescript
- Formulaire (email, nom, message)
- Input validation côté client
- Submit via POST /api/contact
- Success/error toasts
- Rate limiting (max 1 soumission/5s)
```

#### 3. **ReviewCarousel** (`components/reviews/ReviewCarousel.tsx`)
```typescript
- Fetch depuis /api/google-reviews
- Affiche avis en carrousel (slick/swiper)
- Header : rating global + total avis
- Chaque avis : auteur, stars, texte, photo, date
- Navigation : flèches + points
- Responsive
```

#### 4. **SEO & Meta Tags**
- [ ] `next/head` ou `Metadata` pour pages statiques
- [ ] Open Graph images
- [ ] Canonical URLs
- [ ] Structured data (Schema.org)

#### 5. **Performance**
- [ ] Images optimisées (next/image)
- [ ] Lazy loading composants lourds
- [ ] Code splitting
- [ ] Lighthouse score > 90

### ✅ Checklist Agent 2

- [ ] Réalisations — Feed Instagram connecté
- [ ] Contact — Formulaire connecté à API
- [ ] ReviewCarousel — Avis dynamiques affichés
- [ ] SEO — Meta tags et structured data
- [ ] Responsive — Mobile/tablet/desktop OK
- [ ] Performance — Lighthouse > 90
- [ ] Build final → succès

---

## 📌 AGENT 3 : CONFIGURATIONS & DEPLOYMENT
**Spécialité** : Vercel, Environment Variables, GitHub Actions

### 🎯 Objectif principal
Finaliser la configuration et déployer sur Vercel.

### ⏰ Timeline
**Semaines 3-4** — 3-4 jours

### 📌 Livrables attendus

#### 1. **GitHub Repository Setup**
- [ ] Repository créé
- [ ] `.gitignore` complet (`.env.local`, `node_modules/`, `.next/`)
- [ ] `README.md` avec instructions setup

#### 2. **Vercel Deployment**
- [ ] Connecter GitHub → Vercel
- [ ] Auto-deploy sur push à `main`
- [ ] Environment variables configurées
- [ ] Build process optimisé
- [ ] Preview deployments activés

#### 3. **Environment Variables**
```bash
# Production (.env.prod)
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...
RESEND_API_KEY=...
ADMIN_EMAIL=contact@expert-boucles.com
NEXT_PUBLIC_ACUITY_OWNER_ID=...
NEXT_PUBLIC_APP_URL=https://expert-boucles.com
```

#### 4. **Custom Domain Setup**
- [ ] Domaine expert-boucles.com pointé vers Vercel
- [ ] SSL certificate configuré
- [ ] Redirects HTTP → HTTPS

#### 5. **Monitoring & Analytics**
- [ ] Google Search Console configurée
- [ ] Google Analytics v4 (optionnel)
- [ ] Sentry pour error tracking (optionnel)

#### 6. **Checklist finale**
- [ ] Build Vercel succès
- [ ] Site accessible sur expert-boucles.com
- [ ] Pages dynamiques (prestations) chargent correctement
- [ ] APIs fonctionnelles (avis, Instagram, contact)
- [ ] Lighthouse score > 90
- [ ] Mobile friendly ✓
- [ ] SSL certificate actif

---

## 🔄 WORKFLOW SIMPLIFIÉ

```
Agent 1 (Semaines 1-2)
↓
Implémenter APIs (Google Reviews, Instagram, Contact)
↓
Agent 2 (Semaines 2-3)
↓
Connecter pages aux APIs, SEO, Performance
↓
Agent 3 (Semaines 3-4)
↓
Deploy Vercel, Setup domaine, Monitoring
↓
✅ PRODUCTION LIVE
```

---

## 📚 RESSOURCES PRINCIPALES

### Documentation
- **Next.js 14** : https://nextjs.org/docs
- **TypeScript** : https://www.typescriptlang.org/docs/
- **Tailwind CSS** : https://tailwindcss.com/docs
- **Vercel** : https://vercel.com/docs

### APIs & Services
- **Google Places API** : https://developers.google.com/maps/documentation/places/web-service/overview
- **Instagram Graph API** : https://developers.facebook.com/docs/instagram-api/
- **Resend** : https://resend.com/docs
- **Acuity Scheduling** : https://developer.acuityscheduling.com/

### Outils
- **Prettier** : Code formatting
- **ESLint** : Linting
- **TypeScript** : Type checking

---

## ✅ DÉFINITIONS DE SUCCÈS

### Général
- [ ] `npm run build` → succès, 0 erreurs
- [ ] `npm run dev` → site accessible localhost:3000
- [ ] Lighthouse score > 90 (performance + accessibility)
- [ ] Tous les tests passent (si configurés)

### Agent 1
- [ ] APIs testées et documentées
- [ ] Env vars configurées en local

### Agent 2
- [ ] Pages dynamiques connectées aux APIs
- [ ] SEO + Performance OK
- [ ] Responsive mobile/tablet/desktop

### Agent 3
- [ ] Déployé sur Vercel
- [ ] Domaine configuré
- [ ] Monitoring en place

---

## 🆘 ESCALADE

**Issues techniques** → Vérifier CLAUDE.md dans la racine du projet (architecture de référence)
**Questions design** → Consulter DESIGN_SYSTEM_YSL_LUXURY.md
**Memory issues** → Consulter memory/ folder (historique des bugs rencontrés)

---

**Dernière mise à jour** : Mai 4, 2026
**Architecture** : Next.js 14 + Acuity Scheduling (SANS DB)
**Status** : ✅ Prêt pour Agent 1
