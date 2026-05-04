'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

interface HeroSlideProps {
  backgroundImage: string;
  title: string | string[];
  subtitle: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSlide({
  backgroundImage,
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
}: HeroSlideProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [rafId, setRafId] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

      const scrollY = window.scrollY;
      const heroHeight = sectionRef.current.offsetHeight;

      // Calcul du pourcentage de scroll (0 à 1)
      // L'image disparaît complètement après ~300px de scroll
      const scrollPercent = Math.min(scrollY / (heroHeight * 0.5), 1);

      // L'image rétrécit 1.5x plus vite que le scroll (accélération)
      const heightScale = Math.max(0, 1 - scrollPercent * 1.5);

      // Appliquer scaleY à l'image (meilleure perf GPU)
      bgRef.current.style.transform = `scaleY(${heightScale})`;
      bgRef.current.style.opacity = `${heightScale}`;

      // Le contenu remonte progressivement
      const offsetY = Math.min(scrollPercent * heroHeight * 0.5, heroHeight * 0.5);
      contentRef.current.style.transform = `translateY(-${offsetY}px)`;
    };

    // Utiliser RAF pour optimiser la performance
    const scrollListener = () => {
      if (rafId) cancelAnimationFrame(rafId);
      const id = requestAnimationFrame(handleScroll);
      setRafId(id);
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [rafId]);

  return (
    <section
      ref={sectionRef}
      className="swiper-slide relative h-screen w-full bg-noir flex flex-col items-center justify-end overflow-hidden"
    >
      {/* Background image — rétrécit au scroll */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/40 to-noir/20 z-10" />

      {/* Fallback background */}
      <div className="absolute inset-0 bg-noir opacity-20" />

      {/* Contenu — remonte progressivement */}
      <div
        ref={contentRef}
        className="relative z-20 text-center pb-48 md:pb-64 px-6 reveal will-change-transform"
      >
        <span className="section-label text-gris-medium mb-32">
          {subtitle}
        </span>
        <h1 className="text-blanc font-serif font-light uppercase tracking-0.15em text-5xl md:text-7xl lg:text-8xl mb-32">
          {Array.isArray(title)
            ? title.map((line, i) => (
                <div key={i}>{line}</div>
              ))
            : title.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
        </h1>
        <p className="text-gris-dark text-xs uppercase tracking-0.2em mb-48">
          {description}
        </p>
        <Link href={ctaHref} className="btn-inverted">
          {ctaText}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-16">
        <span className="text-gris-dark text-9px uppercase tracking-0.3em">Défiler</span>
        <div className="w-px h-32 bg-gris-dark overflow-hidden">
          <div className="w-full h-full bg-blanc scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
