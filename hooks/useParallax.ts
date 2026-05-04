import { useEffect, useRef } from 'react';

interface UseParallaxOptions {
  speed?: number; // 0 = no parallax, 1 = normal scroll, 0.5 = half speed (goes up faster)
  offset?: number; // starting scroll position
}

export function useParallax(options: UseParallaxOptions = {}) {
  const { speed = 0.5, offset = 0 } = options;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elementTop = element.offsetTop;

      // Distance du scroll par rapport au top de l'élément
      const distance = scrollY - elementTop + offset;

      // Appliquer le parallax seulement si on scrolle dans la section
      if (distance >= -window.innerHeight && distance <= window.innerHeight) {
        const translate = distance * speed;
        element.style.transform = `translateY(${translate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, offset]);

  return ref;
}
