# 📋 Configuration Expert Boucles — Guide complet

**Document de référence pour passer du développement à la production avec les vrais comptes du client.**

---

## 🔧 Variables d'environnement à configurer

### Fichier : `.env.local` (racine du projet)

Crée ce fichier avec les valeurs du client. **N'oublie pas de l'ajouter à `.gitignore`** (déjà fait).

```bash
# ============================================
# 🔴 GOOGLE PLACES API — Avis clients
# ============================================
# Clé API Google pour récupérer les avis
# Obtenir sur : https://console.cloud.google.com/
GOOGLE_PLACES_API_KEY=AIza...VOTRE_CLE

# Place ID du salon Expert Boucles sur Google Maps
# Trouver sur : https://maps.google.com (chercher "Expert Boucles Paris")
# Format : ChIJ...
GOOGLE_PLACE_ID=ChIJ...VOTRE_PLACE_ID

# ============================================
# 🟢 NEXT.JS — Configuration d'URL
# ============================================
# À laisser vide en développement (par défaut http://localhost:3000)
# En production, définir l'URL complète du site
NEXT_PUBLIC_APP_URL=https://expert-boucles.com

# ============================================
# 🔵 INSTAGRAM API (futur)
# ============================================
# Token d'accès Instagram Business
# Obtenir sur : https://developers.facebook.com/
INSTAGRAM_ACCESS_TOKEN=EAAx...VOTRE_TOKEN

# ID du compte Instagram Business
INSTAGRAM_BUSINESS_ACCOUNT_ID=17...VOTRE_ID

# ============================================
# 🟡 EMAIL — Resend (futur)
# ============================================
# Clé API Resend pour envoyer des emails
# Obtenir sur : https://resend.com/
RESEND_API_KEY=re_...VOTRE_CLE

# Email de contact du salon (pour recevoir les messages)
ADMIN_EMAIL=contact@expert-boucles.com
```

---

## 📊 Checklist de configuration client

### Phase 1 : Google Places API ✅

**Responsable : Yannick (client)**

- [ ] Créer un compte Google Cloud Console : https://console.cloud.google.com/
- [ ] Créer un projet nommé "expert-boucles"
- [ ] Activer l'API "Places API" dans la bibliothèque
- [ ] Créer une clé API dans "Identifiants"
  - Type : Clé API (application standard)
- [ ] Restreindre la clé aux domaines HTTP :
  - `localhost:3000` (développement)
  - `expert-boucles.com` (production)
  - `www.expert-boucles.com` (production)
- [ ] Copier la clé → `GOOGLE_PLACES_API_KEY` dans `.env.local`
- [ ] Trouver le Place ID du salon :
  - Aller sur https://maps.google.com
  - Chercher "Expert Boucles Paris"
  - Copier l'identifiant depuis l'URL ou le lien de partage
  - Format : `ChIJ...` (commence par "ChIJ")
- [ ] Copier le Place ID → `GOOGLE_PLACE_ID` dans `.env.local`
- [ ] Tester sur http://localhost:3000/ — les avis doivent s'afficher ✅

### Phase 2 : Domaine & Hosting ✅

**Responsable : Yannick ou développeur**

- [ ] Acheter/configurer le domaine `expert-boucles.com`
- [ ] Déployer sur Vercel :
  - Connecter le repo GitHub
  - Ajouter les variables d'environnement dans les settings Vercel
  - Auto-déploiement activé sur `main` branch
- [ ] Vérifier que `NEXT_PUBLIC_APP_URL=https://expert-boucles.com` en production
- [ ] Tester le site en production — vérifier que les avis s'affichent

### Phase 3 : Instagram API (optionnel, futur) ⏳

**Responsable : Yannick**

- [ ] Créer un compte Meta Business Manager
- [ ] Configurer un compte Instagram Business
- [ ] Demander un Access Token via Meta Developers
- [ ] Obtenir le Business Account ID
- [ ] Ajouter à `.env.local` :
  - `INSTAGRAM_ACCESS_TOKEN=...`
  - `INSTAGRAM_BUSINESS_ACCOUNT_ID=...`

### Phase 4 : Email (Resend) — optionnel ⏳

**Responsable : Yannick**

- [ ] Créer un compte Resend : https://resend.com/
- [ ] Obtenir une clé API
- [ ] Configurer le domaine expert-boucles.com pour l'email
- [ ] Ajouter à `.env.local` :
  - `RESEND_API_KEY=...`
  - `ADMIN_EMAIL=contact@expert-boucles.com`

---

## 🔄 Processus de livraison au client

### Avant la livraison

```bash
# 1. Vérifier que tout fonctionne en local
npm run dev
# → Tester http://localhost:3000/

# 2. Build de production
npm run build
# → Vérifier aucune erreur

# 3. Vérifier la configuration
cat .env.local.example
# → S'assurer que tous les champs sont couverts
```

### À la livraison

1. **Transmettre ce fichier au client** (`CONFIG.md`)
2. **Créer `.env.local` sur le serveur de production** avec :
   - `GOOGLE_PLACES_API_KEY` (clé Google du client)
   - `GOOGLE_PLACE_ID` (Place ID du salon)
   - `NEXT_PUBLIC_APP_URL=https://expert-boucles.com`
3. **Redéployer** sur Vercel (les env vars seront chargées automatiquement)
4. **Tester** : http://expert-boucles.com → Les avis doivent s'afficher avec la vraie note/nombre d'avis

---

## 🚨 Points importants

### Sécurité

⚠️ **JAMAIS commiter `.env.local`** — il contient les clés secrètes
✅ `.gitignore` est déjà configuré pour l'ignorer

### Cache Google Reviews

- **Durée** : 24h
- **Stockage** : Fichier `.cache/google-reviews.json` (local) + cache HTTP CDN (Vercel)
- **Rafraîchissement** : Automatique après 24h
- **Coût** : ~$0.007/mois (quasi gratuit)

### Vérifier la mise en cache

Dans les logs ou DevTools (Network tab) :
- `X-Cache-Source: google-api` = données fraîches (1er appel)
- `X-Cache-Source: file-cache` = données en cache (appels suivants)
- `X-Cache-Source: fallback-cache` = cache expiré (erreur API)

---

## 📞 Support & Troubleshooting

### Problème : "Avis temporairement indisponibles"

**Cause 1** : `.env.local` manquant ou mal configuré
```bash
# Vérifier que le fichier existe
cat expert-boucles/.env.local | grep GOOGLE_PLACES_API_KEY
```

**Cause 2** : Place ID invalide
```bash
# Vérifier sur Google Maps que le salon est bien enregistré
# https://maps.google.com → chercher "Expert Boucles Paris"
```

**Cause 3** : Clé API restante d'un ancien projet
```bash
# Vérifier sur Google Cloud Console que la clé est active
# https://console.cloud.google.com/apis/credentials
```

### Problème : "Place ID invalide"

- Vérifier le format : doit commencer par `ChIJ...`
- Trouver le vrai Place ID sur Google Maps (lien de partage)
- Copier exactement (respecter majuscules/minuscules)

### Problème : Cache pas mis à jour

- Cache dure 24h
- Attendre ou supprimer `.cache/google-reviews.json` pour forcer un appel API
- En production Vercel, le cache est plus agressif (CDN) — peut prendre quelques heures

---

## 🎯 Résumé minimum pour la livraison

**Yannick doit fournir** :

1. **Clé Google Places API** → `GOOGLE_PLACES_API_KEY`
2. **Place ID du salon** → `GOOGLE_PLACE_ID`
3. **Domaine** → `NEXT_PUBLIC_APP_URL=https://expert-boucles.com`

**Le développeur doit** :

1. Ajouter ces 3 variables à `.env.local` en local
2. Déployer sur Vercel avec les mêmes variables
3. Tester que tout fonctionne

**C'est tout !** ✅

---

## 📝 Exemple `.env.local` rempli

```bash
# Google Places API
GOOGLE_PLACES_API_KEY=AIzaSyDxxx...votre_vraie_clé...xyz
GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4

# Next.js
NEXT_PUBLIC_APP_URL=https://expert-boucles.com

# (Email et Instagram → à faire plus tard)
```

---

**Dernière mise à jour** : Mai 2026
**Responsable** : Développeur
**Client** : Yannick — Expert Boucles, Paris 75009
