/**
 * ScrollHeroExample.tsx
 *
 * Exemple d'utilisation du composant ScrollHero
 * À placer dans app/(public)/page.tsx ou une autre route
 */

'use client';

import ScrollHero from '@/components/ScrollHero';
import { useState, useEffect } from 'react';

// Composant de carte pour le contenu
function ServiceCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <img
        src={image}
        alt={title}
        className="w-32 h-40 object-cover rounded-lg"
      />
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>
    </div>
  );
}

// Contenu principal
function ContentSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ScrollHero
      heroImage="/images/hero-woman.jpg"
      heroAlt="Femme stylisée tenue bleue"
      scrollFactor={1.5} // Vitesse de réduction
      parallaxFactor={0.5} // Vitesse du contenu
      triggerPercent={0.5} // Déclenche à 50% de la hauteur du hero
      disabled={isMobile} // Désactiver sur mobile
    >
      {/* Contenu qui remonte */}
      <section className="px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Titre de la section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez nos offres exclusives pour cheveux bouclés
            </p>
          </div>

          {/* Grille de services (2 colonnes sur desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <ServiceCard
              title="Bodypower"
              description="Traitement complet pour cheveux ondulés et légèrement bouclés. Rend vos cheveux plus brillants et dynamiques."
              image="/images/service-bodypower.jpg"
            />
            <ServiceCard
              title="Centerverse"
              description="Soin intensif pour cheveux très bouclés et crépus. Hydratation profonde et définition maximale."
              image="/images/service-centerverse.jpg"
            />
          </div>

          {/* Section additionnelle pour tester le scroll */}
          <div className="mt-32 pt-32 border-t">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Pourquoi nous choisir ?
            </h3>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">✓</span>
                <span>Expertise spécialisée dans les cheveux bouclés</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">✓</span>
                <span>Produits premium et naturels</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">✓</span>
                <span>Consultation personnalisée gratuite</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500 font-bold">✓</span>
                <span>Localisation : Paris 75009</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </ScrollHero>
  );
}

export default ContentSection;
