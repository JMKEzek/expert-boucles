# Plan d'implémentation — Expert Boucles Refonte
## Site vitrine + Booking pour coiffeur spécialisé cheveux bouclés

**Date** : Mai 2026
**Client** : Yannick — Expert Boucles, Paris 75009
**Stack** : Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui + PostgreSQL + Prisma + Acuity Scheduling
**Budget mensuel** : ~$50 (Vercel + Acuity + Resend)
**Timeline estimée** : 8-10 semaines
**Déploiement** : Vercel + GitHub

---

## PHASE 1 — INFRASTRUCTURE & CONFIGURATION (Semaines 1-2)

### 1.1 Domaine & Hosting
- [ ] Domaine `expert-boucles.com` — vérifier propriété + renouvellement auto
- [ ] Compte Vercel créé + lié à GitHub
- [ ] GitHub repo `expert-boucles` créé (private)
- [ ] Database PostgreSQL créée (Supabase ou Railway)
- [ ] Connection string testée

### 1.2 Configuration Acuity Scheduling
- [ ] Compte Acuity créé (plan Emerging $16/mois minimum)
- [ ] 17 services créés dans Acuity (nom, prix, durée, description)
- [ ] Disponibilités configurées (Mar/Mer/Jeu/Ven/Dim 12h-20h, fermé Sam/Lun)
- [ ] Stripe connecté nativement dans Acuity (Settings → Integrations)
- [ ] Emails automatiques Acuity activés (confirmation, rappel 24h, annulation)
- [ ] Test avec carte Stripe test (4242 4242 4242 4242)

#### 1.3 Liste complète des 17 services à créer dans Acuity Scheduling

| Service | Prix | Durée | Catégorie |
|---------|------|-------|-----------|
| Forfait coupe cheveux mi long | 90€ | 60 min | Coupe |
| Forfait coupe cheveux long | 120€ | 90 min | Coupe |
| Forfait coupe cheveux court | 50€ | 60 min | Coupe |
| Forfait coupe cheveux court + soin | 80€ | 60 min | Combo |
| Forfait couleur + soin Head SPA | 160€ | 90 min | Couleur |
| Forfait coloration + balayage + soin Head SPA | 410€ | 4h | Couleur |
| Forfait Balayage | 290€ | 3h | Couleur |
| Entretien couleur – bordures seul | 95€ | 60 min | Entretien |
| Entretien couleur – bordures & coupe | 155€ | 90 min | Entretien |
| Forfait coupe + coloration + soin Head SPA | 200€ | 2h | Combo |
| Forfait coupe + balayage + soin Head SPA | 350€ | 4h | Combo |
| Forfait coupe + coloration + balayage + soin Head SPA | 490€ | 4h | Combo |
| Forfait soin vapeur head spa | 90€ | 60 min | Soin |
| Forfait coupe + patine | 170€ | 80 min | Combo |
| Forfait étudiant(e) | 85€ | 60 min | Coupe |
| Extensions de cheveux | 800€ | 4h | Extension |
| Forfait pose d'extension | Devis | — | Extension |

### 1.4 Configuration Next.js & Stack technique
- [ ] Repo GitHub `expert-boucles` créé (private)
- [ ] Next.js 14 + TypeScript + Tailwind CSS initialisé
- [ ] shadcn/ui components installés
- [ ] Prisma + PostgreSQL configurés
- [ ] NextAuth.js configuré (email/password + Google OAuth optionnel)
- [ ] Fichier `.env.local` complété avec toutes les variables
- [ ] Structure de dossiers créée (`/app`, `/components`, `/lib`, `/prisma`)
- [ ] Migrations Prisma appliquées (schema avec User, Service, Booking, Account)
- [ ] Voir briefing Agent 1 (AGENT_BRIEFS_NEXTJS.md) pour détails techniques

---

## PHASE 2 — PAGES & DESIGN SYSTÈME (Semaines 2-3)

### 2.1 Structure des pages — Pages statiques

#### 2.1.1 Page d'accueil — 7 sections
```
1. HEADER (fixed, transparent → opaque au scroll)
   - Nav left : Prestations | Réalisations | À Propos
   - Logo center : EXPERT BOUCLES
   - Nav right : Contact | Prendre rendez-vous | Mon compte

2. HERO (100vh, fond noir, photo éditoriale boucles)
   - Title : SUBLIMEZ VOS BOUCLES
   - Subtitle : Coiffeur expert en cheveux bouclés · Paris 75009
   - CTA : Découvrir les prestations (scroll vers bas)

3. MANIFESTE (fond blanc cassé #F5F5F0, texte centré 60% width)
   - Title : Chaque boucle est un univers
   - Body text (texte à fournir par Yannick)
   - CTA : En savoir plus → /a-propos

4. PRESTATIONS (fond noir #0A0A0A, 2 colonnes)
   - 4 prestations phares : Coupe (90€), Balayage (290€), Couleur (160€), Head SPA (90€)
   - CTA : Voir toutes les prestations → /prestations

5. PORTRAIT YANNICK (fond blanc cassé, layout 50/50)
   - Photo left
   - Title : JE SUIS YANNICK
   - Body text (texte à fournir par Yannick)
   - CTA : En savoir plus → /a-propos

6. RÉALISATIONS (fond noir, grille masonry 3 colonnes)
   - Feed Instagram intégré via Instagram API (affiche 6-12 posts)
   - CTA : Voir toutes les réalisations → /realisations

7. AVIS CLIENTS (fond blanc cassé)
   - Composant ReviewCarousel (dynamique, alimenté par Google Reviews API)
   - Header dynamique : rating (ex: "EXCELLENT") + nombre d'avis (ex: "279 AVIS")
   - Carrousel horizontal des avis (photos, noms, dates, textes, ratings — 100% API)

8. CTA FINAL (fond noir)
   - Title : PRÊT(E) À SUBLIMER VOS BOUCLES ?
   - CTA : Prendre rendez-vous (scroll vers widget Acuity)

9. FOOTER (fond noir #0A0A0A, border-top or 1px)
   - Logo + tagline
   - 4 colonnes : Adresse | Horaires | Contact | Instagram
   - Links : Mon compte | CGV | Mentions légales | Remboursements
   - Copyright © 2025 Expert Boucles — Yannick
```

#### 2.1.2 Page Prestations — Catalogue
```
1. HERO COMPACT (50vh, fond noir)
   - Title : PRESTATIONS & TARIFS
   - Subtitle : Pour cheveux bouclés, frisés & texturés
   - Note : Tarifs non genrés — âge minimum 14 ans

2. FILTRES (sticky top, fond blanc cassé)
   - Buttons : TOUT | COUPE | COULEUR | SOIN | COMBO | ENTRETIEN

3. GRILLE (fond alternant noir/blanc par prestation)
   - Layout horizontal : [Photo 40%] | [Contenu 60%]
   - Chaque prestation :
     - Title : FORFAIT COUPE MI-LONG
     - Price : 90€ · Durée 60 minutes
     - Description : Liste des inclus
     - CTA : RÉSERVER → widget Acuity embed
```

#### 2.1.3 Page À Propos
```
1. HERO (100vh, photo portrait Yannick plein écran)
   - Texte superposé bas-gauche : YANNICK | Coiffeur · Expert en cheveux bouclés

2. SECTION MON PARCOURS (fond blanc cassé)
   - Citation : "La coiffure n'est pas un métier. C'est une vocation."
   - Body text (texte complet à corriger depuis site actuel)

3. SECTIONS ALTERNÉES (noir/blanc)
   - MA MÉTHODE (fond blanc) | titre + photo + text
   - MA PASSION (fond noir) | titre + photo + text
   - MA SIGNATURE (fond blanc) | titre + photo + text

4. CTA FINAL
   - Buttons : Me contacter | Prendre rendez-vous
```

#### 2.1.4 Page Réalisations
```
1. HERO COMPACT (50vh, fond noir)
   - Title : RÉALISATIONS

2. INSTAGRAM FEED (fond blanc cassé)
   - Composant InstagramFeed (API Instagram)
   - Masonry grid responsive (all posts @expert_boucles)
```

#### 2.1.5 Page Contact
```
1. LAYOUT 2 COLONNES (fond noir)

COLONNE GAUCHE :
   - Section TÉLÉPHONE : 07 81 31 30 94
   - Section EMAIL : contact@expert-boucles.com
   - Section ADRESSE : 50 Rue Chaussée d'Antin, 75009 Paris | Sur RDV uniquement
   - Section HORAIRES : Mar/Mer/Jeu/Ven/Dim 12h–20h (fermé Sam/Lun)

COLONNE DROITE :
   - Formulaire de contact (Nom | Email | Téléphone | Message) — envoi via Resend
   - Bouton ENVOYER
   - Carte Google Maps embed (style sombre)
```

#### 2.1.6 Pages légales (texte copié depuis site actuel)
- `/cgv` — Conditions Générales de Vente
- `/mentions-legales` — Informations légales
- `/remboursement-annulation` — Politique de remboursement et annulation

#### 2.1.7 Page Réserver
```
Liste des 17 services tirée de la DB (Prisma)
+ Description courte de chaque prestation
+ Widget Acuity embed pour réservation
```

### 2.2 Database — Services (Prisma)

17 services alimentent le site (seed initial, Agent 3 s'en charge)

Champs par service :
- **id** (CUID)
- **slug** (unique) : "coupe-mi-long"
- **name** : "Forfait coupe cheveux mi long"
- **price** (Float) : 90
- **duration** (Int) : 60 (minutes)
- **category** (String) : Coupe | Couleur | Soin | Combo | Extension | Entretien
- **description** (Text) : Description longue
- **includes** (String[]) : Array de textes (Diagnostic, Coupe sec, Shampoing, etc.)
- **image** (String) : URL vers photo principale
- **acuityServiceId** (Int) : ID du service dans Acuity (mis à jour par Agent 4)
- **active** (Boolean) : true/false
- **createdAt, updatedAt** : timestamps

Route dynamique `/prestations/[slug]` :
```
1. BREADCRUMB : Accueil > Prestations > {name}
2. LAYOUT 2 COLONNES
   - LEFT (40%) : Galerie photos (image)
   - RIGHT (60%) :
     - Title : {name}
     - Price : {price}€
     - Duration : Durée : {duration} min
     - Description : {description}
     - Includes section : CE FORFAIT COMPREND :
       - {includes} (liste à puces)
     - Widget Acuity embed (pour réservation)
3. RELATED SERVICES : Autres prestations de la catégorie
4. REVIEWS : Composant ReviewCarousel (dynamique, API Google Reviews)
```

### 2.3 Intégrations tierces

#### 2.3.1 Instagram API
- [ ] Instagram Business Account configuré
- [ ] Access Token obtenu (Agent 4)
- [ ] Route API `/api/instagram-feed` créée (Agent 3)
- [ ] Composant InstagramFeed intégré (Agent 2)
- [ ] Cache 6h mis en place

#### 2.3.2 Google Reviews API — 100% dynamique
- [ ] Google Places API configurée + clé d'API obtenue (Agent 4)
- [ ] Route API `/api/google-reviews` créée (Agent 3)
  - Récupère avis depuis Google Places API (place_id Expert Boucles)
  - Retourne : liste d'avis (auteur, texte, rating, date, photo profil)
  - Retourne aussi : rating global moyen, nombre total d'avis
  - Cache 24h (Redis ou in-memory)
- [ ] Composant ReviewCarousel intégré (Agent 2)
  - **DYNAMIQUE** : appelle `/api/google-reviews`
  - Affiche rating global + nombre avis (ex: "4.9 · 279 avis")
  - Carrousel : nom auteur, rating stars, texte avis, photo profil, date
  - Navigation flèches, responsive
  - ⚠️ Aucune donnée en dur, tout de l'API
- [ ] Affichage sur pages : Accueil, Prestations, Contact

#### 2.3.3 Acuity Scheduling — Widget embed
- [ ] Widget Acuity intégré sur chaque fiche prestation
- [ ] Widget Acuity sur page `/reserver`
- [ ] Configuration responsive, dark theme
- [ ] Paiement Stripe géré nativement par Acuity

#### 2.3.4 Google Maps
- [ ] Google Maps Embed API configurée (Agent 4)
- [ ] Maps embed sur page Contact (colonne droite)
- [ ] Configuration : dark theme, marker "Expert Boucles", adresse

### 2.4 Design System Tailwind CSS

#### 2.4.1 Couleurs (CSS Variables)
```css
--color-black: #0A0A0A;
--color-dark-1: #111111;
--color-dark-2: #1C1C1C;
--color-white: #F5F5F0;
--color-light-1: #FAF9F7;
--color-light-2: #F0EDE8;
--color-gold: #C9A96E;
--color-success: #5A8A6A;
--color-error: #8A3A3A;
--color-muted: #6B6B6B;
--color-muted-dark: #999999;
--color-border: rgba(255,255,255,0.12);
--color-border-light: rgba(0,0,0,0.10);
```

#### 2.4.2 Typographie
- Cormorant Garamond : titres (H1, H2, H3) — uppercase + letter-spacing 0.15em
- Inter : corps de texte — font-weight 300, line-height 1.8
- Titres : clamp(48px, 5vw, 80px) — scaling responsive
- Corps : 15px — scaling responsive

#### 2.4.3 Composants React + shadcn/ui
- **Button** : outline gold 1px, padding 14px 32px, hover fill gold
- **Card** : dark bg #111111, border 1px rgba(255,255,255,0.08), hover gold
- **ServiceCard** : composant custom, affiche prestation avec hover
- **ReviewCarousel** : carrousel dynamique avis (récupère via `/api/google-reviews`)
  - Header : rating + count avis (100% API)
  - Carrousel : auteur, stars, texte, photo, date (100% API)
  - Navigation flèches
  - ⚠️ **AUCUNE DONNÉE EN DUR** — tout vient de Google Places API
- **AcuityEmbed** : iframe widget Acuity intégré dans prestations

#### 2.4.4 Animations Tailwind
- **Scroll Reveal** : opacity 0→1 + y-offset 30→0, duration 0.8s
- **Image Hover** : scale 1.03, duration 0.6s
- **Header on Scroll** : background transparent→rgba(10,10,10,0.95)
- **CTA Underline Hover** : width 0→100%, duration 0.3s
- **Page Load** : fade in 0.4s

#### 2.4.5 Responsive Breakpoints (Tailwind)
- Mobile (< 425px) : 1 colonne, nav hamburger
- Tablet (425px - 768px) : 1-2 colonnes, nav hamburger
- Desktop (> 768px) : 2-3 colonnes, nav horizontal

---

## PHASE 3 — API ROUTES & DATABASE (Semaines 2-4)

### 3.1 API Routes créées (Agent 3)
- [ ] `GET /api/services` → liste tous les services (filtrable par catégorie)
- [ ] `GET /api/services/[slug]` → détail d'un service
- [ ] `GET /api/google-reviews` → avis Google (récupère via Google Places API)
  - Retourne : rating moyen, nombre total, liste d'avis (auteur, texte, rating, date, photo)
  - Cache 24h
  - ⚠️ **DYNAMIQUE** : lit de Google Places API en temps réel
- [ ] `POST /api/auth/register` → inscription client
- [ ] `POST /api/auth/forgot-password` → récupération mot de passe
- [ ] `GET /api/bookings/me` → mes réservations (auth required, lecture DB miroir)
- [ ] `POST /api/contact` → envoi email contact (Resend)
- [ ] `POST /api/webhooks/acuity` → webhook Acuity → sync DB (scheduled/rescheduled/cancelled)

### 3.2 Database seed (Agent 3)
- [ ] 17 services créés en DB (avec acuityServiceId = null initialement)
- [ ] Descriptions, inclus, images pour chaque service
- [ ] Categories correctes assignées

### 3.3 Authentification NextAuth.js (Agent 3)
- [ ] Credentials provider configuré (email + password)
- [ ] Google OAuth provider configuré (optionnel)
- [ ] Callbacks (jwt, session) implémentés
- [ ] Route handlers `/api/auth/[...nextauth]` créée
- [ ] Middleware pour routes protégées

### 3.4 Webhook Acuity → Database (Agent 3)
- [ ] Webhook reçoit payloads Acuity (scheduled, rescheduled, cancelled)
- [ ] Sync table Booking (insert/update avec acuityId unique)
- [ ] Verification signature webhook (sécurité)

### 3.5 Email contact uniquement (Agent 3)
- [ ] Route `/api/contact` utilise Resend
- [ ] ⚠️ Les emails RDV (confirmation, rappel, annulation) sont gérés par Acuity nativement

### 3.6 Prisma & Migrations (Agent 3)
- [ ] Tous les modèles créés (User, Service, Booking, Account)
- [ ] Relations correctes (User→Booking, Service→Booking)
- [ ] ✅ Modèles Availability et Payment SUPPRIMÉS (Acuity les gère)

---

## PHASE 4 — CONTENU & COPYWRITING (Semaine 2-3)

### 4.1 Textes à fournir par Yannick (corrigés/complétés)

**Page À Propos :**
- [ ] Section MON PARCOURS (texte complet, corriger "e cherche" → "je cherche", "nourril'international" → "nourri l'international")
- [ ] Section MA MÉTHODE (texte existant — à valider)
- [ ] Section MA PASSION (texte existant — à valider)
- [ ] Section MA SIGNATURE (texte existant — à valider)

**Page Accueil :**
- [ ] Manifeste section : "Chaque boucle est un univers" paragraph (texte existant ou nouveau)
- [ ] Bio courte Yannick : 2-3 phrases pour section portrait

**Page Prestations :**
- [ ] Description longue pour chaque service (ou reprendre depuis site WP)
- [ ] Inclus de chaque forfait (déjà documenté dans site actuel)

### 4.2 Photos & assets
- [ ] Photo hero accueil : cheveux bouclés, noir & or, éditoriale
- [ ] Photos prestations x17 : 1 par service (ou réutiliser depuis WP)
- [ ] Photo portrait Yannick : professionnel, plein écran possible
- [ ] Photos sections À Propos : 3-4 photos lifestyle/expertise
- [ ] Photos contact/salon : photo du coworking (mettre à jour le lien)

### 4.3 SEO — Meta tags par page

| Page | Title | Meta Description |
|------|-------|------------------|
| Accueil | Expert en cheveux bouclés à Paris \| Yannick - Coiffeur spécialisé | Yannick, coiffeur expert en cheveux bouclés à Paris 9e. Coupes sur-mesure, balayage curly, soins Head Spa. Réservation en ligne. 279 avis ⭐⭐⭐⭐⭐ |
| À Propos | À propos - Yannick \| Expert en cheveux bouclés | Découvrez le parcours de Yannick, expert en cheveux bouclés formé aux plus grandes maisons parisiennes. Méthode sur-mesure, expertise, passion. |
| Prestations | Prestations & Tarifs - Expert Boucles \| Paris | Découvrez tous nos forfaits : coupes, balayages, soins, extensions. Tarifs non genrés, réservation en ligne, paiement sécurisé. |
| Réalisations | Portfolio - Expert Boucles \| Photos de réalisations | Galerie de réalisations : coupes, couleurs et soins pour cheveux bouclés. Avant/après, inspirations, portfolio professionnel. |
| Contact | Contact - Expert Boucles \| Paris 75009 | Contactez Yannick pour une consultation ou une réservation. Adresse : 50 rue Chaussée d'Antin, Paris 75009. Tél : 07 81 31 30 94 |
| Réserver | Réservez votre RDV - Expert Boucles \| Paiement sécurisé | Réservez votre rendez-vous en ligne : coupes, couleurs, soins pour cheveux bouclés. Paiement Stripe sécurisé, confirmation immédiate. |

---

## PHASE 4 — INTÉGRATIONS TIERCES (Semaines 3-4)

### 4.1 Acuity Scheduling — Configuration complète (Agent 4)
- [ ] Compte Acuity créé (plan Emerging $16/mois)
- [ ] 17 services créés dans Acuity (avec acuityServiceId notés)
- [ ] Disponibilités configurées (Mar/Mer/Jeu/Ven/Dim 12h-20h)
- [ ] Stripe connecté nativement (Settings → Integrations → Stripe Live)
- [ ] Emails automatiques Acuity activés (confirmation, rappel 24h, annulation)
- [ ] Webhook Acuity configuré → URL `https://expert-boucles.com/api/webhooks/acuity`
- [ ] acuityServiceId renseigné en DB pour chaque service
- [ ] Test complet : réservation → paiement Stripe Acuity → webhook → DB miroir

### 4.2 Instagram API (Agent 4)
- [ ] Instagram Business Account configuré
- [ ] Access Token obtenu
- [ ] Route API `/api/instagram-feed` créée (Agent 3)
- [ ] Cache 6h mis en place (Redis ou in-memory)

### 4.3 Google APIs (Agent 4)
- [ ] Google Places API configurée + clé API obtenue
  - Vérifier que place_id Expert Boucles est correct
  - Vérifier les permissions de l'API key (Places API, Direction API)
- [ ] Google Maps Embed API configurée
- [ ] place_id Expert Boucles identifié et documenté

### 4.4 Email (Agent 4)
- [ ] Compte Resend créé
- [ ] API key configurée
- [ ] Test envoi email contact fonctionnel

---

## PHASE 5 — TESTS & DÉPLOIEMENT (Semaines 5-6)

### 5.1 Tests fonctionnels (Agent 5)
- [ ] Navigation desktop : tous les liens internes OK
- [ ] Navigation mobile : hamburger menu fonctionne, responsive OK
- [ ] Connexion/Inscription/Logout : authentification NextAuth fonctionne
- [ ] Booking workflow via Acuity embed :
  - [ ] Cliquer sur prestation → page détail chargée
  - [ ] Widget Acuity visible + clickable
  - [ ] Sélectionner date/heure dans calendrier Acuity
  - [ ] Remplir formulaire client
  - [ ] Paiement Stripe (via Acuity) avec carte test
  - [ ] Email confirmation Acuity reçu
  - [ ] Webhook Acuity reçu → RDV en DB miroir
  - [ ] RDV visible dans "Mon compte" (lecture DB miroir)
- [ ] Annulation via Acuity (admin) → DB miroir mis à jour
- [ ] Formulaire contact : envoie email via Resend
- [ ] Avis Google affichés (composant ReviewCarousel, 100% API dynamique)
  - [ ] Rating global correct (ex: 4.9)
  - [ ] Nombre avis correct
  - [ ] Carrousel affiche les avis (textes, auteurs, ratings, dates)
  - [ ] Navigation flèches fonctionne
  - [ ] Aucune donnée en dur
- [ ] Instagram feed affiche posts (API chargée)
- [ ] Animations Tailwind : scroll reveal, hover, transitions OK
- [ ] Links internes : toutes les CTAs pointent aux bonnes pages

### 5.2 Tests SEO
- [ ] Validation meta tags via Google Search Console preview
- [ ] Validation Schema.org HairSalon via Google Rich Results Test
- [ ] Sitemap XML généré et accessible
- [ ] Robots.txt OK
- [ ] No duplicate meta descriptions
- [ ] All images have alt text

### 5.3 Tests performance
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices)
- [ ] Core Web Vitals : LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] Page load desktop 4G : < 3s
- [ ] Page load mobile 4G : < 4s
- [ ] Images optimisées (Webflow auto-compresse)

### 5.4 Tests accessibilité
- [ ] Navigation clavier complète (Tab, Enter)
- [ ] Contraste couleurs WCAG 2.1 AA
- [ ] Alt text sur toutes images
- [ ] Form labels explicites
- [ ] Screen reader test (VoiceOver / NVDA)

### 5.5 Déploiement Vercel (Agent 5)
- [ ] Compte Vercel créé + repo GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Database (Supabase/Railway) connectée
- [ ] Preview deployments testés
- [ ] Production deployment réussi
- [ ] Domaine expert-boucles.com pointé vers Vercel
- [ ] SSL certificate actif (automatique)
- [ ] Environment variables en production : toutes configurées

### 5.6 Google & SEO (Agent 5)
- [ ] Domaine vérifié dans Google Search Console
- [ ] Sitemap XML soumise
- [ ] Google Analytics 4 installé + fonctionnel
- [ ] Schema.org HairSalon valide (validation dans Rich Results Test)
- [ ] Aucune erreur dans Google Search Console
- [ ] Google Business Profile : créé/mis à jour si absent

### 5.7 Formation client Yannick (Agent 5)
- [ ] Accès admin Acuity (interface principale)
- [ ] Guide Acuity : gérer disponibilités, RDV, voir paiements
- [ ] Session live 1h : montrer tout + répondre questions
- [ ] Guide Next.js simplifié pour modifs texte (PDF)
- [ ] Support email/téléphone établi
- [ ] Escalade process en cas de panne

---

## PHASE 6 — POST-LANCEMENT (Après déploiement)

### 6.1 Monitoring (semaines 1-2 après lancement)
- [ ] Uptime monitoring Vercel : alertes si site down
- [ ] Booking test : vraie réservation avec paiement (entièrement)
- [ ] Webhook Acuity : vérifier RDV synced en DB
- [ ] Emails Acuity : confirmation, rappel, annulation reçus
- [ ] Google Business : répondre aux avis, mettre à jour horaires si besoin

### 6.2 Optimisations post-lancement
- [ ] Core Web Vitals réelles après 28j via Google Search Console
- [ ] Optimiser images si LCP > 2.5s
- [ ] Analyser bundle size (Next.js admin)
- [ ] Vérifier performance mobile 4G

### 6.3 Corrections prioritaires à appliquer avant live
- [ ] ✅ Corriger typos ("cheuveux" → "cheveux")
- [ ] ✅ Meta tags uniques (pas de doublons SEO)
- [ ] ✅ Alt text sur toutes images
- [ ] ✅ Horaires harmonisés (Mar/Mer/Jeu/Ven/Dim 12h-20h)
- [ ] ✅ Textes complétés (page À Propos, descriptions services)

### 6.4 Documentation de maintenance
- [ ] README.md avec setup local et deploy
- [ ] Guide Acuity pour Yannick (PDF)
- [ ] Guide Next.js modifs texte (PDF)
- [ ] Checklist maintenance mensuelle
- [ ] Contacts support : Vercel, Acuity, Resend

---

## STACK TECHNIQUE — RÉFÉRENCES

### Next.js & Frontend
- **Next.js Docs** : https://nextjs.org/docs
- **Tailwind CSS** : https://tailwindcss.com/docs
- **shadcn/ui** : https://ui.shadcn.com/
- **TypeScript** : https://www.typescriptlang.org/

### Backend & Database
- **Prisma Docs** : https://www.prisma.io/docs/
- **NextAuth.js** : https://next-auth.js.org/
- **Supabase** : https://supabase.com/docs
- **Railway** : https://railway.app/docs

### Acuity Scheduling (Booking + Paiement)
- **Admin** : https://www.acuityscheduling.com/
- **API Docs** : https://developer.acuityscheduling.com/
- **Support** : https://help.acuityscheduling.com/

### Intégrations
- **Stripe** : https://dashboard.stripe.com/ (géré via Acuity)
- **Instagram Graph API** : https://developers.instagram.com/docs/
- **Google Places API** : https://developers.google.com/maps/documentation/places
- **Resend** : https://resend.com/docs
- **Vercel** : https://vercel.com/docs

---

## CHECKLIST FINALE AVANT LANCEMENT

- [ ] Domaine expert-boucles.com pointé vers Vercel
- [ ] SSL certificate actif (automatique Vercel)
- [ ] 17 services créés dans Acuity Scheduling
- [ ] Acuity connecté à Stripe Live
- [ ] Vercel deployment réussi (production)
- [ ] Database PostgreSQL accessible (Supabase/Railway)
- [ ] Migrations Prisma appliquées
- [ ] 17 services seedés en DB
- [ ] acuityServiceId renseigné pour chaque service
- [ ] NextAuth.js authentification testée
- [ ] Webhook Acuity → `/api/webhooks/acuity` fonctionnel
- [ ] Widget Acuity intégré sur pages prestations
- [ ] Formulaire contact fonctionne (email via Resend)
- [ ] Tous les links internes fonctionnent
- [ ] Lighthouse score > 90
- [ ] Booking workflow end-to-end testé
- [ ] Annulation Acuity → DB miroir sync testée
- [ ] Google Search Console : sitemap soumise
- [ ] Google Business Profile : créé et actualisé
- [ ] Meta tags uniques et complètes (25+ pages)
- [ ] Images optimisées et avec alt text
- [ ] Mobile responsive OK
- [ ] Yannick a ses accès (Acuity admin)
- [ ] Formation client Yannick complétée
- [ ] Documentation de maintenance remise

---

## SUPPORT & ESCALADE

**En cas de panne :**
1. Vérifier Vercel status : https://www.vercel.com/status
2. Vérifier Acuity status : https://help.acuityscheduling.com/
3. Vérifier database (Supabase/Railway)
4. Contacter Vercel support : https://vercel.com/support
5. Contacter Acuity support : https://help.acuityscheduling.com/

**Maintenance mensuelle (Yannick) :**
- [ ] Vérifier Google reviews (répondre si nécessaire)
- [ ] Mettre à jour disponibilités Acuity (congés, jours fermés)
- [ ] Archiver anciennes réalisations Instagram (maintenir feed frais)
- [ ] Vérifier paiements Stripe reçus (dans Acuity)

**Intervention technique requise (développeur) :**
- Modification du design (couleurs, fonts, layout Tailwind)
- Ajout de nouvelles pages/sections
- Intégration de nouveaux services (17 services suffisent)
- Bug fixes ou performance optimization
- Setup de redirects 301 (ancien site → nouveau)

---

## CONTACT & DOCUMENTS

**Yannick :**
- Email : contact@expert-boucles.com
- Téléphone : 07 81 31 30 94
- Adresse : 50 rue Chaussée d'Antin, 75009 Paris

**À envoyer à Yannick :**
- [ ] Identifiants Webflow Editor
- [ ] Identifiants Simplybook admin
- [ ] Guide Webflow (PDF)
- [ ] Guide Simplybook (PDF)
- [ ] Support contacts
- [ ] Accès Google Business Profile

---

## BRIEFINGS AGENTS DÉTAILLÉS

Pour chaque étape, consulter les briefs spécialisés :
- **Agent 1 (Infrastructure)** : AGENT_BRIEFS_NEXTJS.md — Semaines 1-2
- **Agent 2 (Frontend/UI)** : AGENT_BRIEFS_NEXTJS.md — Semaines 2-3
- **Agent 3 (API/Database)** : AGENT_BRIEFS_NEXTJS.md — Semaines 2-4
- **Agent 4 (Intégrations)** : AGENT_BRIEFS_NEXTJS.md — Semaines 3-4
- **Agent 5 (Tests/Deploy)** : AGENT_BRIEFS_NEXTJS.md — Semaines 5-6

---

**Document préparé pour lancer le développement du site Expert Boucles.**
**Date de mise à jour : Mai 2026**
**Architecture** : Next.js 14 + PostgreSQL + Acuity Scheduling
**Status** : ✅ Prêt pour lancement (5 Agents, 8-10 semaines)
