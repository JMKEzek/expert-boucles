import Link from 'next/link';
import { ServiceDetail } from '@/components/services/ServiceDetail';

const serviceDetails: Record<
  string,
  {
    id: string;
    name: string;
    slug: string;
    price: number;
    duration: number;
    description: string;
    detailedDescription: string;
    category: string;
    includes: string[];
  }
> = {
  'coupe-boucles': {
    id: '1',
    name: 'Coupe Boucles',
    slug: 'coupe-boucles',
    price: 60,
    duration: 45,
    description: 'Coupe spécialisée pour cheveux bouclés, adaptée à votre texture.',
    detailedDescription:
      'Une coupe conçue spécifiquement pour valoriser vos cheveux bouclés naturels. Yannick effectue un diagnostic précis de votre type de boucles pour créer une coupe qui épousera parfaitement votre texture.',
    category: 'Coupes',
    includes: [
      'Diagnostic de texture',
      'Coupe structurée',
      'Consignes de coiffage',
      'Produits recommandés',
    ],
  },
  'soin-profond': {
    id: '2',
    name: 'Soin Profond',
    slug: 'soin-profond',
    price: 45,
    duration: 30,
    description: 'Soin hydratant et nourrissant pour des boucles sublimées.',
    detailedDescription:
      'Un soin intensif qui nourrit profondément vos cheveux bouclés. Idéal pour restaurer l\'hydratation, réparer les dommages et apporter brillance et definition à vos boucles.',
    category: 'Soins',
    includes: [
      'Diagnostic du cuir chevelu',
      'Soin intensif adapté',
      'Massage relaxant',
      'Conseils d\'hydratation',
    ],
  },
  'styling': {
    id: '3',
    name: 'Styling',
    slug: 'styling',
    price: 50,
    duration: 40,
    description: 'Mise en forme et définition parfaite de vos boucles naturelles.',
    detailedDescription:
      'Un service de coiffage professionnel pour mettre en valeur vos boucles naturelles. Yannick utilise des techniques spécialisées pour créer une définition optimale et une tenue longue durée.',
    category: 'Styling',
    includes: [
      'Shampooing spécialisé',
      'Soin de définition',
      'Mise en forme professionnelle',
      'Conseils quotidiens',
    ],
  },
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = serviceDetails[params.slug];

  if (!service) {
    return (
      <div className="py-96 text-center bg-blanc">
        <h1 className="text-h1 text-noir mb-32">Service non trouvé</h1>
        <Link href="/prestations" className="btn-primary">
          Retour aux prestations
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gris-light py-16">
        <div className="container-fluid">
          <nav className="flex items-center gap-12 text-10px uppercase tracking-0.2em">
            <Link href="/" className="text-gris-dark hover-opacity">
              Accueil
            </Link>
            <span className="text-gris-medium">/</span>
            <Link href="/prestations" className="text-gris-dark hover-opacity">
              Prestations
            </Link>
            <span className="text-gris-medium">/</span>
            <span className="text-noir">{service.name}</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <ServiceDetail {...service} />
        </div>
      </section>

      {/* Related services */}
      <section className="section-padding bg-gris-light">
        <div className="container-fluid">
          <h2 className="text-h2 text-noir text-center mb-48">
            Autres services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
            {Object.values(serviceDetails)
              .filter((s) => s.slug !== params.slug)
              .slice(0, 3)
              .map((relatedService) => (
                <Link
                  key={relatedService.id}
                  href={`/prestations/${relatedService.slug}`}
                  className="group card-base hover-lift transition-all duration-350"
                >
                  <span className="text-label text-gris-medium">{relatedService.category}</span>
                  <h3 className="text-h4 text-noir mt-16 mb-16 group-hover:opacity-60 transition-opacity duration-350">
                    {relatedService.name}
                  </h3>
                  <p className="text-body-small text-gris-dark mb-24 line-clamp-2">
                    {relatedService.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-noir font-light">{relatedService.price} €</span>
                    <span className="text-10px uppercase tracking-0.15em text-gris-medium">
                      {relatedService.duration} min
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
