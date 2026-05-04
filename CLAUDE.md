# CLAUDE.md

## 📋 Projet : Expert Boucles — Refonte complète

**Client** : Yannick — Coiffeur spécialisé cheveux bouclés, Paris 75009
**Date** : Mai 2026
**Stack** : Next.js 14 + TypeScript + Tailwind CSS + Acuity Scheduling
**Déploiement** : Vercel
**Timeline** : 8-10 semaines

---

## 🏗️ Architecture globale

### Frontend
- **Framework** : Next.js 14 (App Router)
- **Styling** : Tailwind CSS + CSS Variables (noir/or/blanc)
- **Components** : shadcn/ui + composants custom (ServiceCard, ReviewCarousel, AcuityEmbed)
- **Pages publiques** : Accueil, Prestations, À Propos, Réalisations, Contact, CGV, Mentions légales

### Backend
- ❌ **Database** : Supprimée (pas de persistance nécessaire)
- ❌ **ORM** : Supprimé (Prisma)
- **API Routes** : `/api/google-reviews` uniquement (pour les avis clients)
- **Auth** : ❌ Supprimée — Acuity gère les clients nativement

### Intégrations
- **Services** : 17 services figés dans `lib/constants/services.ts` (pas de DB)
- **Booking** : Acuity Scheduling ($16/mois) — gère entièrement disponibilités, paiements Stripe, emails
- **Paiement** : Stripe via Acuity (pas de custom Stripe)
- **Avis clients** : Google Places API → composant ReviewCarousel 100% dynamique
- **Réalisations** : Instagram Graph API → composant InstagramFeed (optionnel)
- **Email contact** : Resend (uniquement formulaire contact, pas emails RDV)
- **Maps** : Google Maps Embed API

---

## 📁 Structure de dossiers

```
expert-boucles/
├── .env.local                 # Variables d'environnement
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── (public)/
│   │   ├── prestations/page.tsx + [slug]/page.tsx
│   │   ├── realisations/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── a-propos/page.tsx
│   │   └── layout.tsx
│   ├── (legal)/
│   │   ├── cgv/page.tsx
│   │   ├── mentions-legales/page.tsx
│   │   └── remboursement-annulation/page.tsx
│   └── api/
│       └── google-reviews/route.ts    # Avis clients depuis Google Places API
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── booking/
│   │   └── AcuityEmbed.tsx
│   ├── services/
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceGrid.tsx
│   │   └── ServiceDetail.tsx
│   └── reviews/
│       ├── ReviewCarousel.tsx (100% dynamique API)
│       └── ReviewCarousel.types.ts
├── lib/
│   ├── constants/
│   │   └── services.ts          # 17 services figés (données en dur)
│   └── types/
│       └── review.ts            # Types pour les avis Google
├── public/
│   ├── logo.svg
│   ├── hero.jpg
│   └── images/
├── node_modules/
└── package.json
```

---

## 🎯 Points clés de la conception

### 1. **Composant ReviewCarousel — 100% DYNAMIQUE**
- ⚠️ **Aucune donnée en dur** — tout vient de Google Places API
- Route API `/api/google-reviews` récupère les avis en temps réel
- Cache 24h pour éviter trop d'appels API
- Header affiche rating global + nombre d'avis
- Carrousel affiche : auteur, stars, texte, photo profil, date
- Navigation flèches, responsive

### 2. **17 Services — Données Figées**
- ✅ Fichier `lib/constants/services.ts` — tableau TypeScript avec tous les services
- Champs : id, slug, name, price, duration, category, description, includes[], image
- ✅ **Pas de DB, pas de seed** — données en dur, toujours disponibles
- Routes `/prestations` et `/prestations/[slug]` utilisent les données constants
- Pages statiques générées avec `generateStaticParams()`

### 3. **Booking 100% Acuity Scheduling**
- Pas de système de réservation custom (Calendar, TimeSlotPicker, etc.)
- Widget Acuity iframe intégré sur les pages prestations
- Paiement Stripe géré nativement par Acuity
- Yannick gère tout depuis interface Acuity admin

### 4. **Instagram Feed — Optionnel**
- API Instagram Graph récupère posts @expert_boucles (optionnel)
- Composant InstagramFeed affiche grille masonry
- Cache 6h

### 5. **Pas d'authentification utilisateur**
- Acuity gère les clients nativement
- Pas de pages connexion/inscription/mon-compte
- Pas de middleware de protection de routes

### 6. **Email**
- Resend : uniquement formulaire contact (optionnel)
- Emails RDV gérés nativement par Acuity

### 7. **Design System Tailwind**
- CSS Variables : noir #0A0A0A, or #C9A96E, blanc #F5F5F0
- Fonts : Cormorant Garamond (titres) + Inter (corps)
- Responsive : mobile (< 425px) → tablet (425-768px) → desktop (> 768px)
- Animations : scroll reveal, image hover, header scroll

---

## 🔄 Workflow des 5 Agents

| Agent | Spécialité | Semaines | Livrables |
|-------|-----------|----------|-----------|
| **1** | Infrastructure & DB | 1-2 | Next.js, Prisma, PostgreSQL (sans auth) |
| **2** | Frontend & UI | 2-3 | Pages publiques, Design System, Composants |
| **3** | API Routes & DB Logic | 2-4 | Services API, Webhooks Acuity, Seed data |
| **4** | Intégrations tierces | 3-4 | Acuity, Instagram, Google APIs, Email |
| **5** | Tests & Deployment | 5-6 | Tests end-to-end, SEO, Vercel, Formation |

Voir **AGENT_BRIEFS_NEXTJS.md** pour briefings détaillés par agent.

---

## 📝 Convention de code

### TypeScript
- Utiliser types explicites (pas `any`)
- Interfaces pour données externes (API)
- Enums pour énumérations (categories, statuts)

### React/Next.js
- Composants fonctionnels avec hooks
- shadcn/ui pour composants UI de base
- Props validées (TypeScript)
- Suspense pour async components si needed

### Styling
- Tailwind CSS prioritaire
- CSS Variables pour couleurs (global)
- Éviter inline styles
- Mobile-first responsive

### API Routes
- `/api/*` pour toutes les routes
- Input validation systématique
- Error handling cohérent
- Types Request/Response explicites

### Database
- Prisma pour tous les accès DB
- Migrations versionées
- Relations déclarées dans schema
- Seed data pour dev

---

## ⚙️ Variables d'environnement

```
# Google Places API — Pour les avis clients
GOOGLE_PLACES_API_KEY=AIza...
GOOGLE_PLACE_ID=ChIJ...

# Instagram API (optionnel)
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# Acuity Scheduling (intégration booking)
ACUITY_USER_ID=...
ACUITY_API_KEY=...
NEXT_PUBLIC_ACUITY_OWNER_ID=...

# Resend API (email contact, optionnel)
RESEND_API_KEY=...
ADMIN_EMAIL=contact@expert-boucles.com

# URL publique
NEXT_PUBLIC_APP_URL=https://expert-boucles.com
```

**NOTE** : ❌ Pas de `DATABASE_URL` — base de données supprimée !

---

## 🚀 Commandes utiles

```bash
# Development
npm run dev                    # Démarrer dev server (localhost:3000)
npm run build                  # Build production
npm run start                  # Run production build

# Testing
npm run lint                   # ESLint + Prettier

# Deployment (Vercel)
git push origin main           # Auto-deploy depuis GitHub
vercel env pull               # Télécharger env vars Vercel
```

**NOTE** : ❌ Plus de commandes Prisma — DB supprimée !

---

## 📚 Documentation

- **IMPLEMENTATION_PLAN.md** : Plan d'implémentation complet (6 phases)
- **AGENT_BRIEFS_NEXTJS.md** : Briefings détaillés pour chaque agent
- **Next.js Docs** : https://nextjs.org/docs
- **Prisma Docs** : https://www.prisma.io/docs/
- **Tailwind Docs** : https://tailwindcss.com/docs
- **Acuity API** : https://developer.acuityscheduling.com/

---

## ✅ Checklist avant lancement

- [ ] Repo GitHub créé et connecté à Vercel
- [ ] ✅ 17 services figurés dans `lib/constants/services.ts`
- [ ] Acuity Scheduling configuré (17 services, Stripe Live)
- [ ] Google APIs configurées + clés obtenues
- [ ] Instagram Access Token obtenu (optionnel)
- [ ] Resend API key configurée (optionnel)
- [ ] Tous les tests passent
- [ ] Lighthouse score > 90
- [ ] Vercel deployment réussi
- [ ] Domaine expert-boucles.com pointé
- [ ] SSL certificate actif
- [ ] Google Search Console configurée
- [ ] Formation Yannick complétée
- [ ] Documentation remise

---

## 🆘 Support & Contacts

**Client (Yannick)**
- Email : contact@expert-boucles.com
- Tel : 07 81 31 30 94

**Services**
- Vercel : https://vercel.com/support
- Acuity : https://help.acuityscheduling.com/
- Supabase/Railway : documentation
- Resend : https://resend.com/docs

**Escalade technique**
- 500 errors → Vérifier logs Vercel
- Database down → Vérifier Supabase/Railway dashboard
- Booking errors → Vérifier webhook Acuity
- Email errors → Vérifier Resend console

---

**Dernière mise à jour** : Mai 2026
**Architecture** : Next.js 14 + Acuity Scheduling
**Status** : ✅ Prêt pour lancement
