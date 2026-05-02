'use client';

import { useState, useEffect } from 'react';
import { ReviewCarouselProps } from './ReviewCarousel.types';

export function ReviewCarousel({
  reviews,
  averageRating = 4.9,
  totalReviews = 0,
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, reviews.length]);

  if (reviews.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-[var(--color-gris-dark)] text-xs uppercase tracking-[0.2em]">
          Chargement des avis...
        </p>
      </div>
    );
  }

  const currentReview = reviews[currentIndex];

  const handlePrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      {/* Citation géante */}
      <blockquote className="font-serif font-light italic text-blanc text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-12 tracking-wide">
        &ldquo;{currentReview.text}&rdquo;
      </blockquote>

      {/* Séparateur */}
      <span className="block w-8 h-px bg-[var(--color-gris-dark)] mx-auto mb-8" />

      {/* Auteur */}
      <div className="mb-12">
        <p className="text-[10px] uppercase tracking-[0.3em] text-blanc mb-1">
          {currentReview.author}
        </p>
        <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-gris-dark)]">
          {currentReview.date} · Google Reviews
        </p>
      </div>

      {/* Stats discrètes */}
      {totalReviews > 0 && (
        <p className="text-[9px] uppercase tracking-[0.25em] text-[var(--color-gris-dark)] mb-12">
          {averageRating.toFixed(1)} · {totalReviews} avis vérifiés
        </p>
      )}

      {/* Navigation — points minimalistes */}
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={handlePrevious}
          className="text-[var(--color-gris-dark)] hover:text-blanc transition-colors p-2"
          aria-label="Avis précédent"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-px transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blanc w-8'
                  : 'bg-[var(--color-gris-dark)] w-4 hover:bg-[var(--color-gris-medium)]'
              }`}
              aria-label={`Avis ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-[var(--color-gris-dark)] hover:text-blanc transition-colors p-2"
          aria-label="Avis suivant"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
