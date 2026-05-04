import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { fetchGoogleReviews } from '@/lib/google-reviews';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Découvrez Yannick, coiffeur spécialisé cheveux bouclés à Paris 75009, et son approche sur mesure.',
  alternates: {
    canonical: '/a-propos',
  },
  openGraph: {
    title: 'À propos | Expert Boucles',
    description:
      'Une expertise dédiée aux cheveux bouclés, frisés et texturés au coeur de Paris.',
    url: '/a-propos',
  },
};

export default async function AProposPage() {
  const { averageRating: rating, totalReviews: total } = await fetchGoogleReviews();

  return (
    <main className="bg-blanc min-h-screen">
      <section className="pt-120 md:pt-160 pb-64 text-center">
        <h1 className="text-h1 text-noir mb-24">Yannick</h1>
        <p className="text-body text-noir max-w-2xl mx-auto px-24 leading-relaxed">
          Coiffeur spécialisé en cheveux bouclés, frisés et texturés.
          <br />
          Paris 75009 — Sur rendez-vous uniquement.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-24 pb-120">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-48 lg:gap-x-96 gap-y-64">

          <div>
            <h2 className="text-label text-noir mb-16">Mon parcours</h2>
            <p className="text-body text-noir leading-relaxed">
              Formé dans les grandes maisons, dont Jean Louis David, j&apos;y ai appris
              l&apos;exigence, la rigueur et l&apos;élégance du geste. Cette école classique
              a forgé ma technique et mon sens du détail.
            </p>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">Ma vision</h2>
            <p className="text-body text-noir leading-relaxed">
              Les cheveux bouclés ne se domptent pas, ils se comprennent. Mon rôle est de
              les révéler, pas de les contraindre. Une approche sur mesure, à chaque séance.
            </p>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">Ma méthode</h2>
            <p className="text-body text-noir leading-relaxed">
              Chaque consultation commence par un diagnostic complet : texture, historique
              capillaire, habitudes quotidiennes. Ce n&apos;est qu&apos;après cette écoute
              que le travail commence.
            </p>
          </div>

          <div>
            <h2 className="text-label text-noir mb-16">En chiffres</h2>
            <div className="grid grid-cols-2 gap-16">
              <div>
                <p className="text-h3 font-light text-noir">10+</p>
                <p className="text-label text-noir">Années d&apos;expérience</p>
              </div>
              <div>
                <p className="text-h3 font-light text-noir">2000+</p>
                <p className="text-label text-noir">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-h3 font-light text-noir">
                  {rating > 0 ? rating.toFixed(1) : '—'}
                </p>
                <p className="text-label text-noir">
                  {total > 0 ? `Google · ${total} avis` : 'Note Google'}
                </p>
              </div>
              <div>
                <p className="text-h3 font-light text-noir">Paris IX</p>
                <p className="text-label text-noir">Chaussée d&apos;Antin</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 md:max-w-md">
            <h2 className="text-label text-noir mb-16">Prendre rendez-vous</h2>
            <p className="text-body text-noir leading-relaxed mb-24">
              Réservez votre séance et découvrez une approche personnalisée, pensée pour
              révéler vos boucles durablement.
            </p>
            <Link href="/reservation" className="btn-primary block w-full text-center">
              Prendre un rendez-vous
            </Link>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <Image
              src="/Hero3.png"
              alt="Yannick — Expert Boucles"
              width={900}
              height={1200}
              className="w-full max-w-2xl object-cover"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
