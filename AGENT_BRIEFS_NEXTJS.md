# BRIEFS AGENTS SPÉCIALISÉS — NEXT.JS ARCHITECTURE
## Expert Boucles — Refonte complète avec Next.js 14 + PostgreSQL + Acuity Scheduling

**Date** : Mai 2026
**Client** : Yannick — Coiffeur expert cheveux bouclés, Paris 75009
**Stack** : Next.js 14 + TypeScript + Tailwind CSS + Prisma + PostgreSQL + Acuity Scheduling
**Booking** : Acuity Scheduling ($16/mois) — délégation complète du booking et des disponibilités
**Déploiement** : Vercel
**Timeline estimée** : 6-8 semaines

> ⚠️ **Décision architecturale (Mai 2026)** : Le système de booking custom (Calendar, TimeSlotPicker,
> API bookings/availability, Stripe Checkout) a été remplacé par **Acuity Scheduling**.
> Yannick gère ses disponibilités directement depuis l'interface Acuity (sans accès au code).
> Le paiement Stripe est géré nativement par Acuity. Un webhook synchronise les RDV en DB.
>
> ⚠️ **Décision architecturale (Mai 2026)** : **Aucune gestion utilisateur** — NextAuth.js supprimé.
> Acuity gère les clients nativement (compte client, historique RDV, emails).
> Pas de pages connexion/inscription/mon-compte. Pas de tables User/Account.

---

## 🏗️ ARCHITECTURE GLOBALE

```
┌─────────────────────────────────────────────────────────┐
│                    EXPERT BOUCLES                        │
│               Next.js 14 — Site vitrine + Booking        │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Next.js App Router)                           │
│  ├─ Pages publiques (Accueil, Prestations, Réalisations) │
│  ├─ Pages légales (CGV, Mentions, Remboursements)        │
│  └─ Components (UI + AcuityEmbed)                        │
│  ❌ Pas de pages auth (connexion/inscription/mon-compte) │
│                                                          │
│  Database (PostgreSQL + Prisma)                          │
│  ├─ Services (17 prestations + acuityServiceId)          │
│  └─ Bookings (miroir RDV Acuity, alimenté par webhook)   │
│  ❌ Pas de modèles User/Account                          │
│                                                          │
│  Intégrations tierces                                    │
│  ├─ Acuity Scheduling (booking + paiements Stripe)       │
│  ├─ Instagram API (feed réalisations)                    │
│  ├─ Google Reviews API (avis)                            │
│  ├─ Resend (emails contact uniquement)                   │
│  └─ Google Maps Embed                                    │
│                                                          │
│  Déploiement                                             │
│  ├─ Code : GitHub                                        │
│  ├─ Hosting : Vercel                                     │
│  └─ Database : Supabase ou Railway                       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 AGENT 1 : INFRASTRUCTURE & DATABASE SETUP
**Spécialité** : Prisma, PostgreSQL

> ⚠️ **Contexte Mai 2026** : L'Agent 2 a déjà livré le projet Next.js complet avec toutes les pages UI.
> Le projet existe dans `expert-boucles/` (dossier racine du workspace).
> **L'Agent 1 ne recrée pas le projet** — il branche l'infrastructure (DB, Prisma) sur l'existant.

### 🎯 Objectif principal
Brancher les **fondations techniques** sur le projet Next.js existant :
base de données PostgreSQL avec les schémas Prisma et variables d'environnement.
**Pas d'authentification** — Acuity gère les clients.

### ⏰ Timeline
**Semaines 1-2** — 4-5 jours (projet Next.js déjà en place)

### 📌 État actuel du projet (livré par Agent 2)

Le projet Next.js est **opérationnel** avec :
- ✅ Next.js 14 + TypeScript + Tailwind CSS v3.3.0
- ✅ Structure complète : `/app`, `/components`, `/hooks`, `/public`
- ✅ Pages statiques générées (public, legal)
- ✅ Composants UI : Header, Footer, ServiceCard, ServiceGrid, ServiceDetail, AcuityEmbed, ReviewCarousel, InstagramFeed, FullScreenScroll
- ✅ Design system noir/or/blanc avec Cormorant Garamond + Inter
- ✅ Données mockées dans les pages (services, reviews, instagram posts)
- ✅ `npm run build` → succès, 0 erreur TypeScript
- ✅ `swiper` installé (FullScreenScroll homepage)

**Ce qui manque et doit être ajouté par Agent 1 :**
- ❌ `prisma`, `@prisma/client` (pas installé)
- ❌ `schema.prisma` (à créer dans `/prisma/`)
- ❌ `/lib/db.ts` (Prisma client singleton)
- ❌ `.env.local` (à créer)
- ❌ Base de données PostgreSQL (Supabase ou Railway)

### 📌 Livrables attendus

#### 1. Dépendances à installer
```bash
# Dans expert-boucles/
npm install prisma @prisma/client --legacy-peer-deps
# ❌ Ne pas installer next-auth, bcryptjs — supprimés
# ❌ Ne pas installer stripe — paiement géré par Acuity nativement
```

> ⚠️ Utiliser `--legacy-peer-deps` si des conflits de dépendances apparaissent (cf. mémoire projet)

#### 2. PostgreSQL + Prisma setup
- ✅ Base de données créée (Supabase ou Railway)
- ✅ Connection string testée
- ✅ `schema.prisma` complet avec les 2 modèles
- ✅ Migrations initiales appliquées (`npx prisma migrate`)
- ✅ Prisma Studio accessible pour debug

#### 3. Schéma de base de données

> ℹ️ Schéma minimal — Acuity gère les disponibilités, paiements et clients.
> Seulement 2 modèles : Service et Booking (miroir webhook).
> ❌ Pas de modèles User, Account.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Prestations — acuityServiceId lie au service Acuity correspondant
model Service {
  id              String    @id @default(cuid())
  slug            String    @unique
  name            String
  price           Float?    // null = "Devis"
  duration        Int       // minutes
  category        String    // 'coupe' | 'couleur' | 'soin' | 'extension' | 'combo'
  description     String    @db.Text
  includes        String[]  // array de textes
  image           String?
  acuityServiceId Int?      // ID du service côté Acuity Scheduling (renseigné par Agent 4)
  active          Boolean   @default(true)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  bookings        Booking[]
}

// Réservations — miroir des RDV Acuity (alimenté par webhook, lecture seule)
// Paiement et disponibilités gérés par Acuity, pas ici.
model Booking {
  id            String    @id @default(cuid())
  acuityId      Int       @unique  // ID du RDV côté Acuity Scheduling
  serviceId     String?
  date          DateTime
  time          String              // "HH:MM"
  status        String              // 'scheduled' | 'rescheduled' | 'cancelled'
  clientName    String?
  clientEmail   String?
  clientPhone   String?
  notes         String?   @db.Text
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  service       Service?  @relation(fields: [serviceId], references: [id])
}

// ❌ SUPPRIMÉS : modèles User, Account (NextAuth), Availability, Payment
```

#### 4. Variables d'environnement
```
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...  # Pour Prisma

# ❌ SUPPRIMÉ — NextAuth (NEXTAUTH_URL, NEXTAUTH_SECRET)

# Acuity Scheduling
NEXT_PUBLIC_ACUITY_OWNER_ID=...   # ID du compte Yannick (public, pour embed iframe)
ACUITY_USER_ID=...                # User ID API Acuity (privé)
ACUITY_API_KEY=...                # Clé API Acuity (privé)

# ❌ SUPPRIMÉ — Stripe géré nativement par Acuity
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=

# Instagram
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_BUSINESS_ACCOUNT_ID=...

# Google
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...
GOOGLE_MAPS_API_KEY=...

# Email (Resend) — uniquement pour formulaire contact, pas les emails RDV
RESEND_API_KEY=...
ADMIN_EMAIL=contact@expert-boucles.com
```

#### 5. Structure de dossiers — fichiers à créer par Agent 1

> ✅ = déjà présent (Agent 2) | ❌ = à créer par Agent 1

```
expert-boucles/
├── ✅ .gitignore
├── ✅ next.config.js
├── ✅ tailwind.config.js
├── ✅ tsconfig.json
├── ✅ package.json
├── ❌ .env.local                  # À créer (voir section variables d'env)
├── prisma/                        # Dossier entier à créer
│   ├── ❌ schema.prisma
│   └── ❌ seed.ts                 # Optionnel — Agent 3 peut le faire
├── app/
│   ├── ✅ layout.tsx
│   ├── ✅ page.tsx
│   ├── ✅ globals.css
│   ├── ✅ (public)/...            # Toutes les pages UI existantes
│   └── ✅ (legal)/...
│   # ❌ Pas de (auth)/ à créer
├── components/
│   └── ✅ tous les composants existants
├── lib/                           # Dossier à créer
│   └── ❌ db.ts                   # Prisma client singleton
│   # ❌ Pas de auth.ts à créer
└── ✅ public/
```

#### 6. Tests de configuration
- ✅ `npm run build` toujours OK après ajout des dépendances
- ✅ `npm run dev` fonctionne sans erreurs
- ✅ Prisma Studio accessible (`npx prisma studio`)
- ✅ Base de données accessible depuis l'app

#### 7. Rapport QA
- ✅ Logs de migration Prisma (succès)
- ✅ Vérification variables d'environnement (toutes présentes)
- ✅ Checklist dépendances installées

### ❌ NON-FAIRE
- ❌ Installer `next-auth`, `bcryptjs` — supprimés définitivement
- ❌ Créer les modèles User ou Account en DB
- ❌ Créer le middleware.ts ou les routes `/api/auth/*`
- ❌ Créer les pages `/connexion`, `/inscription`, `/mon-compte`
- ❌ Recréer ou modifier les pages UI (Agent 2 les a livrées)
- ❌ Configurer les webhooks Acuity (Agent 4 s'en chargera)
- ❌ Créer les API routes métier `/api/services`, `/api/contact`, etc. (Agent 3)
- ❌ Installer `stripe` (Acuity gère le paiement)
- ❌ Modifier `globals.css`, `tailwind.config.js`, `next.config.js` (déjà stables)

### ✅ CHECKLIST FINAL
- [ ] Dépendances `prisma`, `@prisma/client` installées
- [ ] `/prisma/schema.prisma` créé avec 2 modèles (Service, Booking)
- [ ] Migration Prisma appliquée avec succès (`npx prisma migrate dev`)
- [ ] PostgreSQL DB accessible depuis l'app
- [ ] `/lib/db.ts` — Prisma client singleton créé
- [ ] `.env.local` créé avec toutes les variables
- [ ] `npm run build` toujours OK
- [ ] Rapport QA avec vérifications

---

## 💻 AGENT 2 : FRONTEND & UI COMPONENTS
**Spécialité** : Pages publiques, design system, composants React, styles Tailwind

### 🎯 Objectif principal
Construire **toutes les pages publiques** avec le design system luxe (noir/or/blanc) et les composants réutilisables. Pages sans données (placeholders ou hardcodées).

### ⏰ Timeline
**Semaines 2-3** — 8-10 jours

### 📌 Livrables attendus

#### 1. Pages publiques créées
- ✅ Page d'accueil (7 sections : hero, manifeste, prestations, portrait, réalisations, avis, CTA final)
- ✅ Page Prestations & Tarifs (catalogue avec filtres)
- ✅ Page À Propos (5 sections éditoriales)
- ✅ Page Réalisations (galerie Instagram)
- ✅ Page Contact (formulaire + infos + carte)
- ✅ Pages légales (CGV, Mentions, Remboursements)
- ❌ Pas de pages auth (connexion/inscription/mon-compte) — supprimées

#### 2. Design system Tailwind
- ✅ Palette de couleurs CSS variables
- ✅ Typographie (H1-H3, body, labels) responsive
- ✅ Composants réutilisables : Button, Card, Badge
- ✅ Animations Tailwind : scroll reveal, hover, transitions

#### 3. Composants React importants
- ✅ `ServiceCard` : carte prestation avec hover effects
- ✅ `AcuityEmbed` : widget iframe Acuity intégré (remplace Calendar + TimeSlotPicker + BookingForm)
- ✅ `ReviewCarousel` : carrousel avis Google
- ✅ `InstagramFeed` : grille posts Instagram
- ✅ `FullScreenScroll` : Swiper.js fullscreen homepage
- ❌ ~~`Calendar`~~ — supprimé, géré par Acuity
- ❌ ~~`TimeSlotPicker`~~ — supprimé, géré par Acuity
- ❌ ~~`BookingForm`~~ — supprimé, géré par Acuity
- ❌ ~~`LoginForm`, `RegisterForm`~~ — supprimés, pas d'auth

#### 4. Responsive + Accessibilité
- ✅ Mobile-first (375px, 768px, 1024px+)
- ✅ Navigation clavier complète
- ✅ WCAG 2.1 AA (contraste, ARIA labels)
- ✅ Alt text sur toutes les images
- ✅ Formulaires avec labels explicites

#### 5. Animations Tailwind
- ✅ Scroll reveal : opacity + y-offset
- ✅ Image hover : scale 1.03
- ✅ Header scroll : background opaque
- ✅ CTA underline hover
- ✅ Page transitions fade

#### 6. Rapport QA
- ✅ Lighthouse score (Performance, Accessibility, Best Practices)
- ✅ Screenshots desktop + mobile
- ✅ Test responsive sur breakpoints clés
- ✅ Test navigation (Tab, Enter, Escape)

### ❌ NON-FAIRE
- ❌ Créer des pages connexion/inscription/mon-compte
- ❌ Intégrer les données réelles (Agent 3 les connectera)
- ❌ Faire les appels API (Agent 3 les créera)
- ❌ Configurer le compte Acuity (Agent 4)
- ❌ Créer Calendar, TimeSlotPicker, BookingForm (Acuity les remplace)

### ✅ CHECKLIST FINAL
- [ ] 6 pages publiques + pages légales
- [ ] Design system complet appliqué
- [ ] Composant AcuityEmbed intégré sur pages prestation
- [ ] Composants réutilisables testés
- [ ] Responsive OK (3+ breakpoints)
- [ ] Animations fonctionnelles
- [ ] Lighthouse > 85 (sans données)
- [ ] Accessibilité WCAG AA validée
- [ ] Rapport QA avec screenshots

---

## 🔌 AGENT 3 : API ROUTES & DATABASE LOGIC
**Spécialité** : Routes API, logique métier, Prisma queries, seed data, webhook Acuity

### 🎯 Objectif principal
Implémenter les **API routes nécessaires** : services, webhook Acuity, formulaire contact.
Le booking, les disponibilités, le paiement et la gestion clients sont délégués à **Acuity Scheduling**.
**Pas d'authentification** — aucune route protégée.

### ⏰ Timeline
**Semaines 2-4** — 5-7 jours (réduit grâce à Acuity + suppression auth)

### 📌 Livrables attendus

#### 1. API Routes

```
GET    /api/services                    → Liste tous les services (depuis DB)
GET    /api/services/[slug]             → Détail d'un service

POST   /api/webhooks/acuity             → Webhook Acuity → sync DB (scheduled/rescheduled/cancelled)

POST   /api/contact                     → Envoi email contact (Resend)

❌ SUPPRIMÉS : /api/auth/*, /api/bookings/me, /api/availability/*,
               /api/bookings (POST/PATCH), /api/payments/checkout,
               /api/auth/register, /api/auth/forgot-password
```

#### 2. Logique métier (Prisma)

**Services**
```typescript
// lib/api/services.ts
export async function getAllServices() {
  return db.service.findMany({
    where: { active: true },
    orderBy: { createdAt: 'asc' }
  })
}

export async function getServiceBySlug(slug: string) {
  return db.service.findUnique({ where: { slug } })
}
```

**Webhook Acuity → sync DB**
```typescript
// app/api/webhooks/acuity/route.ts
export async function POST(request: Request) {
  const body = await request.json()
  // Acuity envoie : action, appointmentID, datetime, appointmentTypeID, etc.

  const { action, appointmentID, datetime, firstName, lastName, email, phone,
          appointmentTypeID, notes } = body

  switch (action) {
    case 'scheduled':
      const service = await db.service.findFirst({
        where: { acuityServiceId: appointmentTypeID }
      })

      await db.booking.upsert({
        where: { acuityId: appointmentID },
        create: {
          acuityId: appointmentID,
          serviceId: service?.id ?? null,
          date: new Date(datetime),
          time: new Date(datetime).toTimeString().slice(0, 5),
          status: 'scheduled',
          clientName: `${firstName} ${lastName}`,
          clientEmail: email,
          clientPhone: phone,
          notes
        },
        update: { status: 'scheduled' }
      })
      break

    case 'rescheduled':
      await db.booking.update({
        where: { acuityId: appointmentID },
        data: {
          date: new Date(datetime),
          time: new Date(datetime).toTimeString().slice(0, 5),
          status: 'rescheduled'
        }
      })
      break

    case 'cancelled':
      await db.booking.update({
        where: { acuityId: appointmentID },
        data: { status: 'cancelled' }
      })
      break
  }

  return Response.json({ received: true })
}
```

**Acuity API Helper**
```typescript
// lib/api/acuity.ts
const ACUITY_BASE = 'https://acuityscheduling.com/api/v1'
const authHeader = `Basic ${Buffer.from(
  `${process.env.ACUITY_USER_ID}:${process.env.ACUITY_API_KEY}`
).toString('base64')}`

export async function getAcuityServices() {
  const response = await fetch(
    `${ACUITY_BASE}/appointment-types`,
    { headers: { Authorization: authHeader } }
  )
  return response.json()
}
```

#### 3. Seed data — 17 services
```typescript
// prisma/seed.ts
// Note : acuityServiceId sera renseigné par Agent 4 après création des services dans Acuity
const services = [
  {
    slug: 'coupe-mi-long',
    name: 'Forfait coupe cheveux mi long',
    price: 90,
    duration: 60,
    category: 'coupe',
    description: '...',
    includes: ['Diagnostic', 'Coupe sec', 'Shampoing', 'Séchage'],
    acuityServiceId: null  // Agent 4 remplira après config Acuity
  },
  // ... 16 autres
]

async function main() {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: service
    })
  }
}

main().then(() => prisma.$disconnect())
```

#### 4. Email (Resend) — uniquement formulaire contact
```typescript
// lib/api/email.ts
// ⚠️ Les emails RDV (confirmation, rappel, annulation) sont gérés par Acuity nativement.
// Resend est utilisé UNIQUEMENT pour le formulaire de contact.
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(data: {
  name: string, email: string, message: string
}) {
  await resend.emails.send({
    from: 'Expert Boucles <contact@expert-boucles.com>',
    to: process.env.ADMIN_EMAIL!,
    subject: `Nouveau message de ${data.name}`,
    html: `<p><strong>${data.name}</strong> (${data.email})</p><p>${data.message}</p>`
  })
}
```

#### 5. Rapport QA
- ✅ Test routes API services (GET liste + GET slug)
- ✅ Test webhook Acuity (simuler payload scheduled/rescheduled/cancelled)
- ✅ Test email contact (Resend)

### ❌ NON-FAIRE
- ❌ Créer `/api/auth/*`, `/api/bookings/me` (supprimés)
- ❌ Utiliser `getServerSession` ou tout import next-auth
- ❌ Créer routes availability, bookings POST, payments (Acuity les gère)
- ❌ Intégrer Stripe directement (Acuity gère le paiement)
- ❌ Envoyer emails RDV (Acuity les envoie nativement)
- ❌ Créer les pages UI (Agent 2)
- ❌ Configurer le compte Acuity (Agent 4)

### ✅ CHECKLIST FINAL
- [ ] 4 API routes créées et testées (services x2, webhook, contact)
- [ ] Webhook Acuity fonctionnel (DB miroir mis à jour)
- [ ] 17 services en base de données (avec acuityServiceId null)
- [ ] Email contact envoyé (Resend)
- [ ] Rapport QA complet

---

## 🔐 AGENT 4 : INTÉGRATIONS TIERCES & ACUITY SCHEDULING
**Spécialité** : Acuity Scheduling, Instagram API, Google APIs, webhooks, email

### 🎯 Objectif principal
Configurer **Acuity Scheduling** (compte, services, paiement Stripe, webhooks) et intégrer
Instagram, Google APIs et email. Acuity remplace tout le système de paiement Stripe custom
**et gère les clients nativement** (pas d'auth sur le site).

### ⏰ Timeline
**Semaines 3-4** — 6-8 jours

### 📌 Livrables attendus

#### 1. Acuity Scheduling — configuration complète
- ✅ Compte Acuity créé (plan Emerging $16/mois minimum)
- ✅ Profil Yannick configuré (nom, adresse, fuseau horaire Europe/Paris)
- ✅ **17 services créés** dans Acuity (mêmes nom/prix/durée que le seed Prisma)
- ✅ Disponibilités configurées (horaires par défaut, jours ouverts)
- ✅ Stripe connecté nativement dans Acuity (Settings → Integrations → Stripe)
- ✅ Emails automatiques Acuity activés (confirmation, rappel 24h, annulation)
- ✅ `acuityServiceId` renseigné dans la DB pour chaque service (lancer seed update)
- ✅ Webhook Acuity configuré → URL `https://expert-boucles.com/api/webhooks/acuity`
- ✅ Test complet : réservation widget → paiement Stripe (Acuity) → webhook reçu → DB mis à jour

```
Acuity Settings à configurer :
├── Business Settings
│   ├── Nom : Expert Boucles — Yannick
│   ├── Adresse : [adresse Paris 75009]
│   └── Timezone : Europe/Paris
├── Appointment Types (17 services)
│   ├── Forfait coupe mi long — 90€ — 60min
│   ├── ... (16 autres)
│   └── (noter les IDs → mettre à jour acuityServiceId en DB)
├── Availability
│   └── Horaires par défaut (Yannick configure lui-même ensuite)
├── Integrations
│   ├── Stripe → connecter compte Yannick
│   └── Webhooks → ajouter URL /api/webhooks/acuity
└── Notifications
    ├── Email confirmation client : activé
    ├── Email rappel 24h : activé
    └── Email annulation : activé
```

**Mise à jour acuityServiceId en DB après création dans Acuity :**
```typescript
// Script à lancer une fois après config Acuity
// prisma/seed-acuity-ids.ts
const acuityIds = {
  'coupe-mi-long': 123456,   // IDs récupérés depuis Acuity API
  // ... (16 autres)
}

for (const [slug, acuityServiceId] of Object.entries(acuityIds)) {
  await prisma.service.update({
    where: { slug },
    data: { acuityServiceId }
  })
}
```

#### 2. Instagram API
- ✅ Instagram Business Account configuré
- ✅ Access Token obtenu
- ✅ Route API créée `/api/instagram-feed`
- ✅ Cache mis en place (6h)
- ✅ Composant InstagramFeed intégré sur pages

```typescript
// lib/api/instagram.ts
export async function getInstagramFeed() {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
  )
  const data = await response.json()
  return data.data
}
```

#### 3. Google APIs
- ✅ Google Places API configurée (avis Google)
- ✅ Google Maps Embed API configurée
- ✅ Route API créée `/api/google-reviews`
- ✅ Maps embed sur page Contact

```typescript
// lib/api/google.ts
export async function getGoogleReviews() {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${process.env.GOOGLE_PLACE_ID}&fields=reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`
  )
  const data = await response.json()
  return data.result.reviews
}
```

#### 4. Email contact (Resend)
- ✅ Compte Resend créé
- ✅ API key configurée
- ✅ Route email contact uniquement (`/api/contact`)
- ✅ Test d'envoi réussi
- ❌ Ne pas créer templates confirmation/rappel/annulation RDV — Acuity les gère nativement

#### 5. Rapport QA
- ✅ Test Acuity : réservation widget → paiement Stripe (Acuity) → webhook reçu → DB miroir mis à jour
- ✅ Test Acuity : annulation depuis interface Yannick → DB mis à jour
- ✅ Test Acuity : email confirmation reçu par le client
- ✅ Test Instagram : feed chargé sur pages
- ✅ Test Google Reviews : avis affichés
- ✅ Test Google Maps embed
- ✅ Logs des appels API et webhooks

### ❌ NON-FAIRE
- ❌ Créer les pages (Agent 2)
- ❌ Créer les API routes de base (Agent 3)
- ❌ Modifier la logique métier (Agent 3)
- ❌ Intégrer Stripe directement (Acuity le gère)
- ❌ Créer des comptes utilisateurs sur le site (Acuity gère les clients)

### ✅ CHECKLIST FINAL
- [ ] Acuity compte configuré + 17 services créés
- [ ] Stripe connecté dans Acuity (test paiement OK)
- [ ] Webhook Acuity → /api/webhooks/acuity fonctionnel
- [ ] acuityServiceId mis à jour en DB pour les 17 services
- [ ] Instagram feed chargé et mis en cache
- [ ] Google Reviews affichés
- [ ] Emails automatiques Acuity activés et testés
- [ ] Google Maps embed fonctionnel
- [ ] Rapport QA complet

---

## ✅ AGENT 5 : TESTING, OPTIMIZATION & DEPLOYMENT
**Spécialité** : Tests end-to-end, performance, SEO, déploiement Vercel, formation client

### 🎯 Objectif principal
**Tester exhaustivement** l'application complète, **optimiser les performances**, vérifier **SEO & accessibilité**, puis **déployer en production** et former Yannick.

### ⏰ Timeline
**Semaines 5-6** — 8-10 jours

### 📌 Livrables attendus

#### 1. Tests end-to-end
- ✅ Test booking workflow complet via widget Acuity (sélection → paiement Stripe Acuity → confirmation email)
- ✅ Test webhook Acuity → DB miroir mis à jour
- ✅ Test annulation RDV depuis interface Acuity (Yannick) → DB miroir mis à jour
- ✅ Test formulaire contact
- ✅ Tous les liens internes fonctionnent
- ✅ Toutes les pages chargent correctement
- ❌ Pas de tests connexion/inscription/mon-compte (supprimés)

#### 2. Tests performance
- ✅ Lighthouse score > 90 (toutes pages)
- ✅ Core Web Vitals : LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ Page load mobile 4G : < 4s
- ✅ Page load desktop : < 2s
- ✅ Images optimisées (Next.js Image)
- ✅ Bundle size < 500KB

#### 3. Tests SEO
- ✅ Meta tags uniques + descriptives (toutes pages)
- ✅ Schema.org HairSalon valide
- ✅ Sitemap XML généré + soumis
- ✅ Robots.txt configuré
- ✅ Canonical links correctes
- ✅ Aucun lien mort
- ✅ Pas de contenu dupliqué

#### 4. Tests accessibilité
- ✅ Navigation clavier complète
- ✅ Contraste couleurs WCAG AA validé
- ✅ Alt text sur toutes images
- ✅ Form labels explicites
- ✅ ARIA attributes correctes
- ✅ Focus visible partout

#### 5. Déploiement Vercel
- ✅ Compte Vercel créé
- ✅ Repo GitHub connecté
- ✅ Variables d'environnement configurées
- ✅ Database (Supabase/Railway) connectée
- ✅ Preview deployments fonctionnent
- ✅ Production deployment réussi
- ✅ Domaine expert-boucles.com pointé
- ✅ SSL certificate actif

#### 6. Google Search Console + Analytics
- ✅ Domaine vérifié dans Google Search Console
- ✅ Sitemap soumise
- ✅ Google Analytics 4 installé + fonctionnel
- ✅ Aucune erreur dans GSC

#### 7. Corrections prioritaires appliquées
- ✅ "cheuveux" → "cheveux" (partout)
- ✅ Title SEO page Réalisations (unique)
- ✅ Tous les bugs identifiés au cahier des charges
- ✅ Textes tronqués complétés
- ✅ Horaires harmonisées

#### 8. Formation client (Yannick)
- ✅ Accès admin Acuity (interface principale de Yannick)
- ✅ Guide Acuity : gérer ses disponibilités (ajouter congés, modifier horaires)
- ✅ Guide Acuity : gérer les RDV (voir, annuler, déplacer)
- ✅ Guide Acuity : voir les paiements Stripe reçus
- ✅ Guide Next.js pour modifications texte (2-3 pages)
- ✅ Support email/téléphone établi
- ✅ Session live (1h) pour montrer tout (focus sur interface Acuity)

#### 9. Documentation
- ✅ README.md avec setup local
- ✅ Guide maintenance mensuelle
- ✅ Checklist backup database
- ✅ Contacts support (Vercel, Stripe, etc.)
- ✅ Escalade process si panne

#### 10. Rapport final QA
- ✅ Résumé tests (fonctionnel, perf, SEO, accessibilité)
- ✅ Lighthouse reports (toutes pages)
- ✅ Screenshots avant/après
- ✅ Liste des bugs trouvés + corrigés
- ✅ Recommandations post-lancement

### Checklist tests complets

#### Fonctionnel
```
Navigation
- [ ] Tous les liens internes pointent aux bonnes pages
- [ ] Navigation clavier (Tab, Enter, Escape)
- [ ] Menu mobile hamburger OK

Booking workflow (via Acuity embed)
- [ ] Cliquer prestations → page détail OK
- [ ] Widget Acuity chargé et visible dans la page
- [ ] Calendrier Acuity : créneaux disponibles corrects
- [ ] Sélection date/heure → formulaire client OK
- [ ] Paiement Stripe (via Acuity) fonctionne (carte test)
- [ ] Email confirmation Acuity reçu par le client
- [ ] Webhook Acuity reçu → RDV en DB miroir

Gestion RDV (côté Yannick dans Acuity)
- [ ] Yannick peut voir tous les RDV dans Acuity
- [ ] Yannick peut modifier ses disponibilités
- [ ] Annulation depuis Acuity → DB miroir mis à jour
- [ ] Email annulation envoyé par Acuity au client

Intégrations
- [ ] Widget Acuity visible et fonctionnel sur pages prestation
- [ ] Instagram feed affiche posts
- [ ] Google Reviews affiche avis
- [ ] Formulaire contact envoie email
- [ ] Google Maps affiche adresse

Pages légales
- [ ] CGV accessible
- [ ] Mentions légales accessible
- [ ] Politique remboursement accessible
```

#### Performance
```
Lighthouse
- [ ] Performance > 90
- [ ] Accessibility > 90
- [ ] Best Practices > 90
- [ ] SEO > 95

Core Web Vitals
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

Page load
- [ ] Desktop < 2s
- [ ] Mobile 4G < 4s
- [ ] Images optimisées
- [ ] Fonts optimisées
```

#### SEO
```
Meta tags
- [ ] Titles < 60 chars, uniques
- [ ] Descriptions < 160 chars, uniques
- [ ] OG images pour réseaux sociaux

Structure
- [ ] Schema.org HairSalon valide
- [ ] Sitemap XML accessible
- [ ] Robots.txt présent
- [ ] Canonical links correctes

Contenu
- [ ] Aucun lien mort (404)
- [ ] Pas de contenu dupliqué
- [ ] Images ont alt text
- [ ] Headers structure correcte (H1 > H2 > H3)
```

#### Accessibilité
```
Navigation
- [ ] Tab navige tous éléments
- [ ] Focus visible partout
- [ ] Escape ferme modals

Couleurs
- [ ] Contraste 4.5:1 normal text
- [ ] Contraste 3:1 large text
- [ ] Pas de contenu par couleur seule

Contenu
- [ ] Alt text sur images
- [ ] Form labels avec <label>
- [ ] ARIA attributes si besoin
- [ ] No auto-play media
```

### ❌ NON-FAIRE
- ❌ Tester connexion/inscription/mon-compte (supprimés)
- ❌ Modifier l'architecture (Agents 1-4)
- ❌ Ajouter de nouvelles features
- ❌ Changer le design

### ✅ CHECKLIST FINAL
- [ ] Tous les tests passent
- [ ] Lighthouse > 90 partout
- [ ] SEO validé
- [ ] Accessible WCAG AA
- [ ] Déploiement Vercel réussi
- [ ] Domaine pointé + SSL OK
- [ ] Google Search Console OK
- [ ] Formation Yannick complétée
- [ ] Documentation remise
- [ ] Rapport QA final signé

---

## 🚀 COORDINATION AGENTS — PHASES PARALLÈLES

```
SEMAINE 1 — Foundation (parallèle)
┌─────────────────────────┬──────────────────────┐
│ Agent 1 (Infra)         │ Agent 2 (Frontend)   │
│ ✓ Prisma + Postgres     │ ✓ Pages structure    │
│ ✓ Schéma DB (2 modèles) │ ✓ Design system      │
│ ✓ Variables env         │ ✓ Composants         │
└─────────────────────────┴──────────────────────┘
        ⬇️ Milestone: Infra + Pages structure OK

SEMAINE 2-3 — Backend + Frontend (semi-parallèle)
┌──────────────────────┬────────────────────┬──────────────────────┐
│ Agent 3 (API)        │ Agent 2 (UI fin)   │ Agent 4 (Setup)      │
│ ✓ API routes         │ ✓ Pages finales    │ ✓ Acuity setup       │
│ ✓ Webhook Acuity     │ ✓ AcuityEmbed      │ ✓ Instagram API      │
│ ✓ Seed 17 services   │ ✓ Animations       │ ✓ Stripe dans Acuity │
└──────────────────────┴────────────────────┴──────────────────────┘
        ⬇️ Milestone: Backend fonctionnel, Frontend complet

SEMAINE 3-4 — Integration (séquentiel)
┌──────────────────────────────────────┐
│ Agent 4 (Intégrations)               │
│ ✓ Acuity webhooks + acuityServiceId  │
│ ✓ Instagram feed page                │
│ ✓ Google Reviews affichés            │
│ ✓ Emails auto Acuity testés          │
└──────────────────────────────────────┘
        ⬇️ Milestone: Toutes intégrations actives

SEMAINE 5-6 — Testing + Deployment
┌──────────────────────────────────────┐
│ Agent 5 (QA + Deploy)                │
│ ✓ Tests end-to-end                   │
│ ✓ Performance + SEO                  │
│ ✓ Vercel deployment                  │
│ ✓ Formation Yannick                  │
└──────────────────────────────────────┘
        ⬇️ LIVE: Production ✅
```

---

## 📊 MÉTRIQUES DE QUALITÉ

| Métrique | Cible | Responsable |
|----------|-------|-------------|
| API routes créées | 4 | Agent 3 |
| Pages publiques | 8+ | Agent 2 |
| Composants React | 10+ | Agent 2 |
| Test coverage (API) | > 80% | Agent 5 |
| Lighthouse score | > 90 | Agent 5 |
| Core Web Vitals | ✅ | Agent 5 |
| SEO validation | 100% | Agent 5 |
| Accessibilité WCAG | AA | Agent 5 |
| Tests end-to-end | 100% | Agent 5 |
| Uptime 30j | > 99.9% | Vercel |

---

## 📞 SUPPORT & ESCALADE

**Client :**
- Email : contact@expert-boucles.com
- Tel : 07 81 31 30 94

**Services :**
- Vercel : https://vercel.com/support
- Acuity Scheduling : https://help.acuityscheduling.com/
- Stripe (via Acuity) : https://support.stripe.com/
- Supabase/Railway : docs
- Resend : https://resend.com/docs

---

**Document pour orchestrer 5 agents spécialisés — Stack Next.js**
**Date** : Mai 2026
**Status** : 🟢 Prêt pour lancement
**Mise à jour** : Booking délégué à Acuity Scheduling — Authentification utilisateur supprimée (Acuity gère les clients)
