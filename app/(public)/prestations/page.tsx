import Link from 'next/link';
import type { Metadata } from 'next';
import { ServiceGrid } from '@/components/services/ServiceGrid';
import { SERVICES } from '@/lib/constants/services';
import { AcuityEmbed } from '@/components/booking/AcuityEmbed';

export const metadata: Metadata = {
  title: 'Prestations',
  description:
    'Découvrez les prestations Expert Boucles : coupes, soins, colorations et coiffages pour cheveux bouclés à Paris 75009.',
  alternates: {
    canonical: '/prestations',
  },
  openGraph: {
    title: 'Prestations | Expert Boucles',
    description:
      'Services sur mesure pour sublimer les cheveux bouclés, frisés et texturés.',
    url: '/prestations',
    images: [
      {
        url: '/prestations.avif',
        width: 1200,
        height: 630,
        alt: 'Prestations Expert Boucles',
      },
    ],
  },
};

export default function PrestationsPage() {
  return (
    <>
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">Prestations</h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Expert Boucles propose une gamme complète de services dédiés à la beauté
            et la santé de vos cheveux bouclés.
          </p>
        </div>
      </section>

      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <ServiceGrid services={SERVICES} columns={3} />
        </div>
      </section>

      <section className="section-padding bg-gris-light">
        <div className="container-fluid text-center">
          <h2 className="text-h2 text-noir mb-32">
            Prêt à transformer vos cheveux ?
          </h2>
          <p className="text-body text-gris-dark mb-48 max-w-2xl mx-auto">
            Réservez votre consultation gratuite avec Yannick pour discuter du service
            idéal pour vous.
          </p>
          <Link href="#booking" className="btn-primary">
            Réserver une consultation
          </Link>
        </div>
      </section>

      <section id="booking" className="section-padding bg-blanc">
        <div className="container-fluid">
          <div className="text-center mb-64">
            <h2 className="text-h2 text-noir mb-16">Réserver un rendez-vous</h2>
            <p className="text-body text-gris-dark max-w-2xl mx-auto">
              Choisissez votre prestation et votre créneau directement en ligne.
            </p>
          </div>
          <AcuityEmbed ownerID={process.env.NEXT_PUBLIC_ACUITY_OWNER_ID || ''} />
        </div>
      </section>
    </>
  );
}
