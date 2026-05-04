# CLAUDE.md

## 📋 Projet : Expert Boucles — Refonte complète

**Client** : Yannick — Coiffeur spécialisé cheveux bouclés, Paris 75009
**Date** : Mai 2026
**Stack** : Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + PostgreSQL + Prisma + Acuity Scheduling
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
- **Database** : PostgreSQL (Supabase ou Railway)
- **ORM** : Prisma
- **Auth** : ~~NextAuth.js~~ — supprimé (Acuity gère les clients)
- **API Routes** : `/api/services`, `/api/google-reviews`, `/api/instagram-feed`, `/api/contact`, `/api/webhooks/acuity`

### Intégrations
- **Booking** : Acuity Scheduling ($16/mois) — gère entièrement disponibilités, paiements Stripe, emails
- **Paiement** : Stripe via Acuity (pas de custom Stripe)
- **Avis clients** : Google Places API → composant ReviewCarousel 100% dynamique
- **Réalisations** : Instagram Graph API → composant InstagramFeed
- **Email contact** : Resend (uniquement formulaire contact, pas emails RDV)
- **Maps** : Google Maps Embed API

### Database Schema (Prisma)
```prisma
- Service (id, slug, name, price, duration, category, description, includes[], image, acuityServiceId, active, createdAt, updatedAt)
- Booking (id, acuityId, serviceId, date, time, status, clientName, clientEmail, clientPhone, notes, createdAt, updatedAt)
  — miroir léger des RDV Acuity, alimenté par webhook uniquement

❌ SUPPRIMÉS : User, Account (NextAuth) — Acuity gère les clients
```

---

## 📁 Structure de dossiers

```
expert-boucles/
├── .env.local                 # Variables d'environnement
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
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
│       ├── services/route.ts + [slug]/route.ts
│       ├── google-reviews/route.ts
│       ├── instagram-feed/route.ts
│       ├── webhooks/acuity/route.ts
│       └── contact/route.ts
│   # ❌ SUPPRIMÉS : auth/[...nextauth]/, bookings/me/
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
│   ├── api/
│   │   ├── services.ts
│   │   ├── acuity.ts
│   │   ├── instagram.ts
│   │   ├── google.ts
│   │   └── email.ts
│   ├── db.ts
│   └── types/
│       ├── service.ts
│       ├── booking.ts
│       └── review.ts
│   # ❌ SUPPRIMÉS : auth.ts, types/user.ts
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

### 2. **Booking 100% Acuity Scheduling**
- Pas de système de réservation custom (Calendar, TimeSlotPicker, etc.)
- Widget Acuity iframe intégré sur pages prestations
- Paiement Stripe géré nativement par Acuity
- Webhook Acuity sync RDV en DB (table Booking — lecture seule pour clients)
- Yannick gère tout depuis interface Acuity admin

### 3. **17 Services**
- Seed initial en DB Prisma
- Champs : name, slug, price, duration, category, description, includes[], image, acuityServiceId
- acuityServiceId renseigné après création des services dans Acuity (Agent 4)
- Route `/prestations/[slug]` dynamique (données depuis DB)

### 4. **Instagram Feed — Dynamique**
- API Instagram Graph récupère posts @expert_boucles
- Composant InstagramFeed affiche grille masonry
- Cache 6h

### 5. **Pas d'authentification utilisateur**
- ⚠️ NextAuth.js supprimé — Acuity gère les clients nativement
- Pas de pages connexion/inscription/mon-compte
- Pas de middleware de protection de routes
- Pas de tables User/Account en DB

### 6. **Email**
- Resend : uniquement formulaire contact
- ⚠️ Emails RDV (confirmation, rappel, annulation) gérés nativement par Acuity
- Pas de custom email system

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
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# ❌ SUPPRIMÉ : NextAuth (NEXTAUTH_URL, NEXTAUTH_SECRET)

# Acuity Scheduling
NEXT_PUBLIC_ACUITY_OWNER_ID=...
ACUITY_USER_ID=...
ACUITY_API_KEY=...

# Instagram API
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# Google APIs
GOOGLE_PLACES_API_KEY=...
GOOGLE_MAPS_API_KEY=...

# Email (Resend)
RESEND_API_KEY=...
ADMIN_EMAIL=contact@expert-boucles.com
```

---

## 🚀 Commandes utiles

```bash
# Development
npm run dev                    # Démarrer dev server (localhost:3000)
npm run build                  # Build production
npm run start                  # Run production build

# Database
npx prisma migrate dev         # Créer/appliquer migrations
npx prisma studio             # GUI Prisma
npx prisma db seed            # Lancer seed scripts

# Testing
npm run test                   # Tests (si configured)
npm run lint                   # ESLint + Prettier

# Deployment (Vercel)
git push origin main           # Auto-deploy depuis GitHub
vercel env pull               # Télécharger env vars Vercel
```

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
- [ ] Database PostgreSQL créée et accessible
- [ ] Migrations Prisma appliquées
- [ ] 17 services seedés en DB
- [ ] Acuity Scheduling configuré (17 services, Stripe Live)
- [ ] acuityServiceId renseigné en DB
- [ ] Google APIs configurées + clés obtenues
- [ ] Instagram Access Token obtenu
- [ ] Resend API key configurée
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
