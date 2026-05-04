'use client';

import { useEffect, useRef } from 'react';
import { Swiper as SwiperCore } from 'swiper';
import { Keyboard, Mousewheel, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';

interface FullScreenScrollProps {
  children: React.ReactNode;
}

export function FullScreenScroll({ children }: FullScreenScrollProps) {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    SwiperCore.use([Keyboard, Mousewheel, EffectCreative]);

    swiperRef.current = new SwiperCore('.swiper-fullscreen', {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      effect: 'creative',
      creativeEffect: {
        limitProgress: 1,
        perspective: true,
        shadowPerProgress: false,
        progressMultiplier: 1,
        prev: {
          translate: [0, 0, -1],
          opacity: 1,
          scale: 1,
        },
        next: {
          translate: [0, '100%', 0],
          opacity: 1,
          scale: 1,
        },
      },
      mousewheel: {
        enabled: true,
        sensitivity: 1,
        thresholdDelta: 10,
        releaseOnEdges: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
      },
      resistance: true,
      resistanceRatio: 0.85,
      threshold: 5,
      touchRatio: 1,
      longSwipesRatio: 0.25,
      longSwipesMs: 300,
      followFinger: true,
      allowTouchMove: true,
      watchSlidesProgress: true,
      preventClicksPropagation: false,
      preventInteractionOnTransition: false,
    });

    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy();
        swiperRef.current = null;
      }
    };
  }, []);

  return (
    <div className="swiper-fullscreen">
      <div className="swiper-wrapper">
        {children}
      </div>
    </div>
  );
}
