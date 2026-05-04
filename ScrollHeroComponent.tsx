/**
 * ScrollHero.tsx
 *
 * Composant React pour reproduire l'effet de scroll analysé dans la vidéo
 * - Image hero qui se réduit progressivement
 * - Contenu qui remonte pour combler l'espace
 * - Optimisé avec requestAnimationFrame
 *
 * Utilisation :
 * <ScrollHero
 *   heroImage="/images/hero.jpg"
 *   heroAlt="Femme stylisée"
 * >
 *   <ContentSection />
 * </ScrollHero>
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface ScrollHeroProps {
  heroImage: string;
  heroAlt: string;
  children: ReactNode;
  scrollFactor?: number; // Vitesse de réduction (défaut: 1.5)
  parallaxFactor?: number; // Vitesse du contenu (défaut: 0.5)
  triggerPercent?: number; // % de la hauteur pour déclencher (défaut: 0.5)
  disabled?: boolean; // Désactiver l'effet (utile pour mobile)
}

export function ScrollHero({
  heroImage,
  heroAlt,
  children,
  scrollFactor = 1.5,
  parallaxFactor = 0.5,
  triggerPercent = 0.5,
  disabled = false,
}: ScrollHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Vérifier les préférences utilisateur
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: prefer-reduced)'
    ).matches;

    if (disabled || prefersReducedMotion) return;

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateAnimation);
      }
    };

    const updateAnimation = () => {
      if (!containerRef.current || !heroRef.current || !contentRef.current) {
        return;
      }

      const scrollY = scrollYRef.current;
      const heroHeight = containerRef.current.offsetHeight;

      // Calculer le pourcentage de scroll
      // triggerPercent = à quel % de la hauteur du hero on commence l'effet
      const scrollPercent = Math.min(
        scrollY / (heroHeight * triggerPercent),
        1
      );

      // Réduction de la hauteur : 1.0 → 0.0
      const heightScale = Math.max(0, 1 - scrollPercent * scrollFactor);

      // Appliquer la hauteur et l'opacité
      heroRef.current.style.height = `${heightScale * 100}%`;
      heroRef.current.style.opacity = `${heightScale}`;

      // Translatey du contenu : remonte au fur et à mesure
      const maxOffset = heroHeight * triggerPercent;
      const offsetY = Math.min(scrollPercent * maxOffset * parallaxFactor, maxOffset);
      contentRef.current.style.transform = `translateY(-${offsetY}px)`;

      rafRef.current = null;
    };

    // Utiliser passive: true pour optimiser les perfs
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [disabled, scrollFactor, parallaxFactor, triggerPercent]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden bg-black"
      >
        <img
          ref={heroRef}
          src={heroImage}
          alt={heroAlt}
          className="w-full h-full object-cover object-center will-change-[height,opacity]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* Content Section */}
      <div
        ref={contentRef}
        className="relative z-10 w-full bg-white will-change-transform"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ScrollHero;
