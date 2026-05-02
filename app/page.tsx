import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ReviewCarousel } from '@/components/reviews/ReviewCarousel';
import { InstagramFeed } from '@/components/reviews/InstagramFeed';

const mockReviews = [
  {
    id: '1',
    author: 'Marie D.',
    rating: 5,
    text: 'Yannick est un expert. Ma coupe correspond exactement à ce que je voulais. Très attentif aux détails et à mes cheveux bouclés.',
    date: 'Il y a 1 semaine',
    authorImage: undefined,
  },
  {
    id: '2',
    author: 'Sophie L.',
    rating: 5,
    text: 'Service impeccable et résultats fantastiques. Enfin quelqu\'un qui comprend vraiment les cheveux bouclés.',
    date: 'Il y a 2 semaines',
    authorImage: undefined,
  },
  {
    id: '3',
    author: 'Julie M.',
    rating: 5,
    text: 'Je recommande vivement. Yannick est passionné par son métier et ça se ressent dans chaque geste.',
    date: 'Il y a 1 mois',
    authorImage: undefined,
  },
];

const mockPosts = [
  { id: '1', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Coupe moderne' },
  { id: '2', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Styling naturel' },
  { id: '3', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Boucles définies' },
  { id: '4', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Avant / Après' },
  { id: '5', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Soins' },
  { id: '6', image: 'https://via.placeholder.com/400x400?text=', url: '#', caption: 'Technique' },
];

const mockServices = [
  {
    id: '1',
    name: 'Coupe Boucles',
    slug: 'coupe-boucles',
    price: 60,
    duration: 45,
    description: 'Coupe spécialisée pour cheveux bouclés, adaptée à votre texture.',
    category: 'Coupes',
  },
  {
    id: '2',
    name: 'Soin Profond',
    slug: 'soin-profond',
    price: 45,
    duration: 30,
    description: 'Soin hydratant et nourrissant pour des boucles sublimées.',
    category: 'Soins',
  },
  {
    id: '3',
    name: 'Styling',
    slug: 'styling',
    price: 50,
    duration: 40,
    description: 'Mise en forme et définition parfaite de vos boucles naturelles.',
    category: 'Styling',
  },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* ─── HERO — Full bleed 100vh ─── */}
      <section className="relative h-screen min-h-[600px] bg-noir flex flex-col items-center justify-end overflow-hidden">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent z-10" />

        {/* Background placeholder (remplacer par <Image> en prod) */}
        <div className="absolute inset-0 bg-[#1a1a1a]" />

        {/* Contenu centré en bas */}
        <div className="relative z-20 text-center pb-20 md:pb-28 px-6 reveal">
          <span className="section-label text-[var(--color-gris-medium)] mb-6">
            Spécialiste · Paris 75009
          </span>
          <h1 className="text-blanc font-serif font-light uppercase tracking-[0.15em] text-5xl md:text-7xl lg:text-8xl mb-6">
            Expert<br />Boucles
          </h1>
          <p className="text-[var(--color-gris-medium)] text-xs uppercase tracking-[0.2em] mb-10">
            L'art de sublimer vos cheveux naturels
          </p>
          <Link href="/prestations" className="btn-inverted">
            Découvrir les prestations
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[var(--color-gris-medium)] text-[9px] uppercase tracking-[0.3em]">Défiler</span>
          <div className="w-px h-12 bg-[var(--color-gris-medium)] overflow-hidden">
            <div className="w-full h-full bg-blanc scroll-indicator" />
          </div>
        </div>
      </section>

      {/* ─── SERVICES — Éditorial ─── */}
      <section className="py-32 md:py-48 bg-blanc">
        <div className="container-fluid">
          {/* En-tête section */}
          <div className="text-center mb-20 reveal">
            <span className="section-label">Nos services</span>
            <span className="line-decor" />
            <h2 className="font-serif font-light uppercase tracking-[0.15em]">
              Prestations
            </h2>
          </div>

          {/* Grid éditoriale */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[var(--color-gris-light)]">
            {mockServices.map((service, i) => (
              <Link
                key={service.id}
                href={`/prestations/${service.slug}`}
                className={`group block py-12 px-8 border-b border-[var(--color-gris-light)] ${
                  i < mockServices.length - 1 ? 'md:border-r' : ''
                } hover:bg-noir transition-all duration-500`}
              >
                {/* Numéro */}
                <span className="block text-[var(--color-gris-medium)] text-[10px] tracking-[0.25em] mb-6 group-hover:text-[var(--color-gris-dark)] transition-colors">
                  0{i + 1}
                </span>

                {/* Image placeholder */}
                <div className="relative overflow-hidden mb-8" style={{ paddingBottom: '125%' }}>
                  <div className="absolute inset-0 bg-[#2a2a2a] group-hover:bg-[#333] transition-colors duration-500 flex items-center justify-center">
                    <span className="text-[var(--color-gris-dark)] text-[10px] uppercase tracking-[0.2em] group-hover:text-[var(--color-gris-medium)] transition-colors">
                      {service.category}
                    </span>
                  </div>
                </div>

                {/* Catégorie */}
                <span className="block text-[var(--color-gris-medium)] text-[10px] uppercase tracking-[0.25em] mb-3 group-hover:text-[var(--color-gris-light)] transition-colors">
                  {service.category}
                </span>

                {/* Nom */}
                <h3 className="font-serif font-light uppercase tracking-[0.1em] text-xl mb-3 text-noir group-hover:text-blanc transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-gris-dark)] text-xs leading-relaxed mb-6 group-hover:text-[var(--color-gris-medium)] transition-colors line-clamp-2">
                  {service.description}
                </p>

                {/* Prix + durée */}
                <div className="flex items-center justify-between">
                  <span className="text-noir text-sm font-light group-hover:text-blanc transition-colors">
                    {service.price} €
                  </span>
                  <span className="text-[var(--color-gris-medium)] text-[10px] uppercase tracking-[0.2em] group-hover:text-[var(--color-gris-dark)] transition-colors">
                    {service.duration} min
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/prestations" className="btn-primary">
              Voir toutes les prestations
            </Link>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS — Fond noir, citation géante ─── */}
      <section className="py-32 md:py-48 bg-noir">
        <div className="container-fluid">
          <div className="text-center mb-16 reveal">
            <span className="section-label text-[var(--color-gris-dark)]">Avis clients</span>
            <span className="block w-px h-10 bg-[var(--color-gris-dark)] mx-auto mb-8" />
          </div>
          <ReviewCarousel reviews={mockReviews} averageRating={4.9} totalReviews={128} />
        </div>
      </section>

      {/* ─── INSTAGRAM — Grid épurée ─── */}
      <section className="py-32 md:py-48 bg-blanc">
        <div className="container-fluid">
          <div className="text-center mb-20 reveal">
            <span className="section-label">Instagram</span>
            <span className="line-decor" />
            <h2 className="font-serif font-light uppercase tracking-[0.15em]">
              Réalisations
            </h2>
          </div>

          <InstagramFeed posts={mockPosts} columns={3} />

          <div className="text-center mt-16">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.25em] text-noir hover:opacity-50 transition-opacity border-b border-noir pb-0.5"
            >
              Suivre @expert_boucles
            </a>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="py-32 md:py-48 bg-blanc border-t border-[var(--color-gris-light)]">
        <div className="container-fluid text-center reveal">
          <span className="section-label">Rendez-vous</span>
          <span className="line-decor" />
          <h2 className="font-serif font-light uppercase tracking-[0.12em] text-4xl md:text-6xl mb-8 max-w-2xl mx-auto">
            Transformez vos cheveux
          </h2>
          <p className="text-[var(--color-gris-dark)] text-xs uppercase tracking-[0.2em] mb-12">
            Premier rendez-vous — consultation offerte
          </p>
          <Link href="/prestations" className="btn-primary">
            Réserver une consultation
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
