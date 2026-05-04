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
      <div className="py-48 text-center">
        <p className="text-gris-dark text-xs uppercase tracking-0.2em">
          Avis temporairement indisponibles
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
      <blockquote className="font-serif font-light italic text-blanc text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-32 tracking-wide fade-in">
        &ldquo;{currentReview.text}&rdquo;
      </blockquote>

      {/* Séparateur */}
      <span className="block w-16 h-px bg-gris-dark mx-auto mb-32" />

      {/* Auteur */}
      <div className="mb-32">
        <p className="text-10px uppercase tracking-0.3em text-blanc mb-8">
          {currentReview.author}
        </p>
        <p className="text-9px uppercase tracking-0.2em text-gris-dark">
          {currentReview.date} · Google Reviews
        </p>
      </div>

      {/* Stats discrètes */}
      {totalReviews > 0 && (
        <p className="text-9px uppercase tracking-0.25em text-gris-dark mb-48">
          {averageRating.toFixed(1)} · {totalReviews} avis vérifiés
        </p>
      )}

      {/* Navigation — points minimalistes */}
      <div className="flex items-center justify-center gap-32">
        <button
          onClick={handlePrevious}
          className="text-gris-dark hover:text-blanc transition-colors duration-350 p-8"
          aria-label="Avis précédent"
        >
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-16">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-px transition-all duration-350 ${
                index === currentIndex
                  ? 'bg-blanc w-16'
                  : 'bg-gris-dark w-8 hover:bg-gris-medium'
              }`}
              aria-label={`Avis ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="text-gris-dark hover:text-blanc transition-colors duration-350 p-8"
          aria-label="Avis suivant"
        >
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
