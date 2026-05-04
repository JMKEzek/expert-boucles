import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReviewCarousel } from '@/components/reviews/ReviewCarousel';
import { FullScreenScroll } from '@/components/home/FullScreenScroll';
import { HeroSlide } from '@/components/home/HeroSlide';

interface ReviewsResponse {
  reviews: { id: string; author: string; rating: number; text: string; date: string; authorImage?: string }[];
  averageRating: number;
  totalReviews: number;
}

async function fetchReviews(): Promise<ReviewsResponse> {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return { reviews: [], averageRating: 0, totalReviews: 0 };
    }

    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.append('language', 'fr');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString(), {
      next: { revalidate: 86400 }, // Cache Next.js 24h
    });

    if (!response.ok) return { reviews: [], averageRating: 0, totalReviews: 0 };

    const data = await response.json();
    if (data.status !== 'OK') return { reviews: [], averageRating: 0, totalReviews: 0 };

    const result = data.result || {};
    const reviews = (result.reviews || [])
      .filter((r: { rating: number; text?: string }) => r.rating >= 4.5 && (r.text?.trim().length ?? 0) > 0)
      .map((r: { author_name: string; rating: number; text: string; relative_time_description: string; profile_photo_url?: string; time: number }, i: number) => ({
        id: `${r.time}-${i}`,
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        date: r.relative_time_description,
        authorImage: r.profile_photo_url,
      }));

    return {
      reviews,
      averageRating: result.rating || 0,
      totalReviews: result.user_ratings_total || 0,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { reviews: [], averageRating: 0, totalReviews: 0 };
  }
}

export default async function Home() {
  const reviewsData = await fetchReviews();

  return (
    <>
      <Header />

      <FullScreenScroll>
        {/* ─── SLIDE 1: HERO — With parallax effect ─── */}
        <HeroSlide
          backgroundImage="/Hero.png"
          subtitle="Spécialiste · Paris 75009"
          title={['Expert', 'Boucles']}
          description="L'art de sublimer vos cheveux naturels"
          ctaText="Prendre un rendez-vous"
          ctaHref="/reservation"
        />

        {/* ─── SLIDE 2: HERO YANNICK ─── */}
        <HeroSlide
          backgroundImage="/Hero1.png"
          subtitle="Coiffeur · Spécialiste boucles"
          title={['Yannick']}
          description="Une passion, une expertise, une vision"
          ctaText="Découvrir l'univers de Yannick"
          ctaHref="/a-propos"
        />

        {/* ─── SLIDE 3: TWO IMAGES — YSL Style fullscreen ─── */}
        <section className="swiper-slide w-full h-screen bg-blanc overflow-hidden">
          <div className="w-full h-full flex items-center justify-center px-8 md:px-16">
            <div className="grid grid-cols-2 gap-8 md:gap-16 w-full max-w-5xl h-[75vh]">
              {/* Prestations Image */}
              <Link href="/prestations" className="group relative flex flex-col overflow-hidden">
                <div className="relative flex-1 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: 'url("/Portrait1.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-noir/20 transition-opacity duration-350 group-hover:bg-noir/40" />
                </div>
                <span className="block text-center text-noir text-xs uppercase tracking-0.15em font-light py-4 group-hover:text-gris-dark transition-colors duration-350">
                  Prestations
                </span>
              </Link>

              {/* Réalisations Image */}
              <Link href="/realisations" className="group relative flex flex-col overflow-hidden">
                <div className="relative flex-1 overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: 'url("/Portrait2.png")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-noir/20 transition-opacity duration-350 group-hover:bg-noir/40" />
                </div>
                <span className="block text-center text-noir text-xs uppercase tracking-0.15em font-light py-4 group-hover:text-gris-dark transition-colors duration-350">
                  Réalisations
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── SLIDE 4: HERO — Products/Tools ─── */}
        <HeroSlide
          backgroundImage="/Hero2.png"
          subtitle=""
          title={['Produits', 'Professionnels']}
          description=""
          ctaText=""
          ctaHref=""
        />
      </FullScreenScroll>

      {/* ─── REVIEWS — Fond noir, citation géante ─── */}
      {/* (après les 2 slides fullscreen, le scroll revient normal) */}
      <section className="section-padding bg-noir">
        <div className="container-fluid">
          <div className="text-center mb-48 reveal">
            <span className="section-label text-gris-dark">Avis clients</span>
            <span className="block w-16 h-px bg-gris-dark mx-auto mb-32" />
          </div>
          <ReviewCarousel
            reviews={reviewsData.reviews}
            averageRating={reviewsData.averageRating}
            totalReviews={reviewsData.totalReviews}
          />
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="section-padding bg-blanc border-t border-gris-light">
        <div className="container-fluid text-center reveal">
          <span className="section-label">Rendez-vous</span>
          <span className="line-decor" />
          <h2 className="font-serif font-light uppercase tracking-0.12em text-4xl md:text-6xl mb-32 max-w-2xl mx-auto">
            Transformez vos cheveux
          </h2>
          <p className="text-gris-dark text-xs uppercase tracking-0.2em mb-48">
            Premier rendez-vous — consultation offerte
          </p>
          <Link href="/reservation" className="btn-primary">
            Réserver une consultation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
