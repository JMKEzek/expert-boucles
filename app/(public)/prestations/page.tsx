import Link from 'next/link';
import { ServiceGrid } from '@/components/services/ServiceGrid';

const services = [
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
  {
    id: '4',
    name: 'Permanente',
    slug: 'permanente',
    price: 120,
    duration: 120,
    description: 'Permanente pour cheveux naturels, résultats durables.',
    category: 'Traitements',
  },
  {
    id: '5',
    name: 'Coloration',
    slug: 'coloration',
    price: 75,
    duration: 60,
    description: 'Coloration professionnelle, teintes naturelles.',
    category: 'Coloration',
  },
  {
    id: '6',
    name: 'Défrisage',
    slug: 'defrisage',
    price: 100,
    duration: 90,
    description: 'Défrisage doux et qualitatif pour cheveux sains.',
    category: 'Traitements',
  },
];

export default function PrestationsPage() {
  return (
    <>
      {/* Hero section */}
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">
            Prestations
          </h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Expert Boucles propose une gamme complète de services dédiés à la beauté et la santé de vos cheveux bouclés.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <ServiceGrid services={services} columns={3} />
        </div>
      </section>

      {/* CTA section */}
      <section className="section-padding bg-gris-light">
        <div className="container-fluid text-center">
          <h2 className="text-h2 text-noir mb-32">
            Prêt à transformer vos cheveux ?
          </h2>
          <p className="text-body text-gris-dark mb-48 max-w-2xl mx-auto">
            Réservez votre consultation gratuite avec Yannick pour discuter du service idéal pour vous.
          </p>
          <Link href="#booking" className="btn-primary">
            Réserver une consultation
          </Link>
        </div>
      </section>
    </>
  );
}
