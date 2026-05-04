/**
 * Services Expert Boucles
 * Données figées dans le code, sans base de données.
 * Source : https://expert-boucles.com/prestations-et-tarifs-cheveux-boucles
 */

export type Service = {
  id: number;
  slug: string;
  name: string;
  price: number | null; // null = devis sur demande
  priceLabel?: string;  // ex: "Devis sur demande"
  duration: number | null; // en minutes, null = non précisé
  category: 'coupes' | 'colorations' | 'soins' | 'extensions';
  description: string;
  includes: string[];
  image: string;
  productSlug: string; // slug utilisé sur expert-boucles.com/produit/{productSlug}
  hasBookingPage: boolean; // certaines prestations n'ont pas de page produit dédiée
};

export const SERVICES: Service[] = [
  // ─── COUPES ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: 'forfait-coupe-cheveux-mi-long',
    name: 'Forfait coupe cheveux mi long',
    price: 90,
    duration: 60,
    category: 'coupes',
    description: 'Forfait coupe pour cheveux mi-longs incluant diagnostic, coupe sur cheveux secs, shampoing, soin conditionner et séchage au diffuseur.',
    includes: [
      'Diagnostic',
      'Coupe de cheveux sec',
      'Shampoing',
      'Conditionner',
      'Séchage au diffuseur',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-femme',
    hasBookingPage: true,
  },
  {
    id: 2,
    slug: 'forfait-coupe-cheveux-long',
    name: 'Forfait coupe cheveux long',
    price: 120,
    duration: 90,
    category: 'coupes',
    description: 'Forfait coupe pour cheveux longs incluant diagnostic personnalisé, coupe sur cheveux secs, shampoing sous vapeur Head SPA, soin vapeur ciblé et séchage doux avec définition naturelle des boucles.',
    includes: [
      'Diagnostic personnalisé',
      'Coupe sur cheveux secs adaptée à la texture et à la longueur',
      'Shampoing sous vapeur Head SPA',
      'Soin vapeur ciblé (Hydratation profonde | Réparation | Soin du cuir chevelu | Soin brillance)',
      'Séchage doux avec définition naturelle des boucles',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'forfait-coupe-femme-soin',
    hasBookingPage: true,
  },
  {
    id: 3,
    slug: 'forfait-coupe-cheveux-court',
    name: 'Forfait coupe cheveux court',
    price: 50,
    duration: 60,
    category: 'coupes',
    description: 'Forfait coupe pour cheveux courts incluant diagnostic, coupe sur cheveux secs, shampoing, soin conditionner et séchage au diffuseur.',
    includes: [
      'Diagnostic',
      'Coupe de cheveux sec',
      'Shampoing',
      'Conditionner',
      'Séchage au diffuseur',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-homme',
    hasBookingPage: true,
  },
  {
    id: 4,
    slug: 'forfait-coupe-cheveux-court-soin',
    name: 'Forfait coupe cheveux court et soin',
    price: 80,
    duration: 60,
    category: 'coupes',
    description: 'Forfait coupe pour cheveux courts avec soin Head SPA vapeur inclus. Diagnostic personnalisé, coupe sur cheveux secs, shampoing sous vapeur et soin ciblé selon vos besoins.',
    includes: [
      'Diagnostic personnalisé',
      'Coupe sur cheveux secs adaptée à la texture et à la longueur',
      'Shampoing sous vapeur Head SPA',
      'Soin vapeur ciblé (Hydratation profonde | Réparation | Soin du cuir chevelu | Soin brillance)',
      'Séchage doux avec définition naturelle des boucles',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'forfait-coupe-homme-soin',
    hasBookingPage: true,
  },
  {
    id: 5,
    slug: 'forfait-etudiant',
    name: 'Forfait étudiant(e)',
    price: 85,
    duration: 60,
    category: 'coupes',
    description: 'Forfait spécial étudiant(e) avec soin offert en échange d\'une autorisation de prise de photos/vidéos pendant la prestation pour illustrer le travail sur les réseaux et le site.',
    includes: [
      'Diagnostic',
      'Coupe sur cheveux secs',
      'Shampoing',
      'Conditionner',
      'Soin offert',
      'Séchage au diffuseur',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'forfait-etudiante',
    hasBookingPage: true,
  },
  // ─── COLORATIONS ─────────────────────────────────────────────────────────────
  {
    id: 6,
    slug: 'forfait-couleur-soin-head-spa',
    name: 'Forfait couleur + soin Head SPA',
    price: 160,
    duration: 90,
    category: 'colorations',
    description: 'Forfait coloration incluant un diagnostic personnalisé, une coloration adaptée (couverture des cheveux blancs ou nouvelle base colorée), un soin vapeur Head SPA réparateur et un séchage adapté aux boucles.',
    includes: [
      'Diagnostic personnalisé',
      'Coloration adaptée (couverture cheveux blancs ou nouvelle base colorée)',
      'Soin vapeur Head SPA réparation',
      'Séchage adapté aux boucles',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'couleur',
    hasBookingPage: true,
  },
  {
    id: 7,
    slug: 'forfait-balayage',
    name: 'Forfait Balayage',
    price: 290,
    duration: 180,
    category: 'colorations',
    description: 'Balayage sur-mesure pour illuminer les boucles avec finesse et harmonie. Précédé d\'un échange approfondi sur l\'état de la fibre, les traitements passés et vos attentes. Objectif : un éclaircissement progressif, harmonieux et sans agression.',
    includes: [
      'Diagnostic expert',
      'Balayage sur-mesure respectueux de la fibre capillaire',
      'Patine personnalisée pour révéler les reflets',
      'Double patine si nécessaire (sans supplément)',
      'Soin profond adapté à l\'état des cheveux',
      'Séchage naturel ou au diffuseur selon la texture',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'balayage',
    hasBookingPage: true,
  },
  {
    id: 8,
    slug: 'forfait-coloration-balayage-soin-head-spa',
    name: 'Forfait coloration + balayage + soin Head SPA',
    price: 410,
    duration: 240,
    category: 'colorations',
    description: 'Forfait complet coloration et balayage avec soin Head SPA. La coloration peut être faite avant ou en même temps que le balayage pour un résultat progressif, lumineux et respectueux de la boucle.',
    includes: [
      'Diagnostic personnalisé',
      'Coloration sur-mesure (entretien racines, raccord couleur ou base colorée)',
      'Balayage naturel (surface ou en profondeur selon l\'effet recherché)',
      'Patine pour affiner la nuance finale',
      'Soin vapeur Head SPA réparateur',
      'Shampoing adapté + séchage avec définition naturelle des boucles',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coloration-balayage',
    hasBookingPage: true,
  },
  {
    id: 9,
    slug: 'entretien-couleur-bordures',
    name: 'Entretien couleur - bordures seul',
    price: 95,
    duration: null,
    category: 'colorations',
    description: 'Entretien de couleur ciblé sur les bordures.',
    includes: [],
    image: '/logo_expertboucle.png',
    productSlug: '',
    hasBookingPage: false,
  },
  {
    id: 10,
    slug: 'entretien-couleur-bordures-coupe',
    name: 'Entretien couleur - bordures & coupe',
    price: 155,
    duration: null,
    category: 'colorations',
    description: 'Entretien de couleur sur les bordures avec coupe incluse.',
    includes: [],
    image: '/logo_expertboucle.png',
    productSlug: '',
    hasBookingPage: false,
  },
  // ─── FORFAITS COMBINÉS ────────────────────────────────────────────────────────
  {
    id: 11,
    slug: 'forfait-coupe-coloration-soin-head-spa',
    name: 'Forfait coupe + coloration + soin Head SPA',
    price: 200,
    duration: 120,
    category: 'colorations',
    description: 'Forfait complet coupe et coloration avec soin Head SPA. Coloration sur-mesure (entretien racines, raccord cheveux blancs ou coloration créative) avec soin vapeur Head SPA pour renforcer la fibre et préserver l\'éclat de la couleur.',
    includes: [
      'Diagnostic personnalisé',
      'Coupe sur cheveux secs respectueuse de la texture naturelle',
      'Coloration sur-mesure (entretien racines, raccord cheveux blancs ou coloration créative)',
      'Soin vapeur Head SPA (Hydratation, réparation, cuir chevelu ou brillance selon le diagnostic)',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-coloration',
    hasBookingPage: true,
  },
  {
    id: 12,
    slug: 'forfait-coupe-balayage-soin-headspa',
    name: 'Forfait coupe + balayage + soin headspa',
    price: 350,
    duration: 240,
    category: 'colorations',
    description: 'Forfait coupe et balayage sur-mesure avec soin vapeur réparateur. Objectif : un éclaircissement progressif, harmonieux et sans agression. Une double patine peut être nécessaire selon le résultat souhaité (supplément possible).',
    includes: [
      'Diagnostic personnalisé',
      'Coupe sur cheveux secs adaptée à la texture',
      'Balayage sur-mesure respectueux de la santé de la boucle',
      'Patine appliquée après pour la nuance et sublimer la couleur',
      'Soin vapeur réparateur',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-balayage',
    hasBookingPage: true,
  },
  {
    id: 13,
    slug: 'forfait-coupe-coloration-balayage-soin-head-spa',
    name: 'Forfait coupe + coloration + balayage + soin Head SPA',
    price: 490,
    duration: 240,
    category: 'colorations',
    description: 'Forfait luxe complet : coupe, coloration, balayage et soin Head SPA. Selon le diagnostic, la coloration peut être appliquée en une ou deux étapes, séparée ou en même temps que le balayage.',
    includes: [
      'Diagnostic complet',
      'Coupe sur cheveux secs adaptée à la texture naturelle',
      'Coloration personnalisée pour unifier ou créer une base',
      'Balayage maîtrisé selon les besoins du cheveu',
      'Patine pour nuancer et révéler la teinte finale',
      'Soin vapeur Head SPA réparateur',
      'Shampoing adapté + séchage avec définition naturelle des boucles',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-coloration-balayage',
    hasBookingPage: true,
  },
  {
    id: 14,
    slug: 'forfait-coupe-patine',
    name: 'Forfait coupe + patine',
    price: 170,
    duration: 80,
    category: 'colorations',
    description: 'Forfait coupe avec patine ton sur ton, sans ammoniaque, pour raviver la couleur, neutraliser les reflets indésirables ou apporter de la brillance. La patine s\'estompe progressivement au fil des shampooings, sans effet racine.',
    includes: [
      'Diagnostic personnalisé sur cheveux secs',
      'Coupe sur-mesure respectueuse de la forme naturelle des boucles',
      'Patine ton sur ton sans ammoniaque',
      'Shampoing réparation',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'coupe-patine',
    hasBookingPage: true,
  },
  // ─── SOINS ────────────────────────────────────────────────────────────────────
  {
    id: 15,
    slug: 'forfait-soin-vapeur-head-spa',
    name: 'Forfait soin vapeur head spa',
    price: 90,
    duration: 60,
    category: 'soins',
    description: 'Soin vapeur Head SPA complet avec diagnostic personnalisé. Le soin est adapté selon vos besoins parmi les options : Hydratation profonde, Soin du cuir chevelu, Réparation intense ou Soin brillance.',
    includes: [
      'Diagnostic personnalisé',
      'Shampoing sous vapeur Head SPA',
      'Soin vapeur ciblé (Hydratation profonde | Soin du cuir chevelu | Réparation intense | Soin brillance)',
      'Conditionner',
      'Séchage au diffuseur',
    ],
    image: '/logo_expertboucle.png',
    productSlug: 'bain-hydratant',
    hasBookingPage: true,
  },
  // ─── EXTENSIONS ───────────────────────────────────────────────────────────────
  {
    id: 16,
    slug: 'forfait-pose-extension',
    name: 'Forfait pose d\'extension',
    price: null,
    priceLabel: 'Devis sur demande',
    duration: null,
    category: 'extensions',
    description: 'Pose d\'extensions cheveux sur mesure. Tarif établi selon vos besoins spécifiques.',
    includes: [],
    image: '/logo_expertboucle.png',
    productSlug: '',
    hasBookingPage: false,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: Service['category']): Service[] {
  return SERVICES.filter((service) => service.category === category);
}

export function getAllCategories(): Service['category'][] {
  return Array.from(new Set(SERVICES.map((service) => service.category)));
}
