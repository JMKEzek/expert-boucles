import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getServiceBySlug, SERVICES } from '@/lib/constants/services';
import { AcuityEmbed } from '@/components/booking/AcuityEmbed';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: 'Prestation introuvable',
    };
  }

  return {
    title: service.name,
    description: service.description,
    alternates: {
      canonical: `/prestations/${service.slug}`,
    },
    openGraph: {
      title: `${service.name} | Expert Boucles`,
      description: service.description,
      url: `/prestations/${service.slug}`,
      images: [
        {
          url: '/prestations.avif',
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-blanc">
      <div className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid">
          <div className="max-w-4xl">
            <h1 className="text-h1 text-or mb-32">{service.name}</h1>
            <p className="text-body max-w-2xl text-gris-medium">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-64 items-start">
          <div className="lg:col-span-2">
            <div className="mb-48 p-32 bg-gris-light">
              <div className="grid grid-cols-2 gap-32">
                <div>
                  <p className="text-label text-gris-dark mb-8">Tarif</p>
                  <p className="text-h3 text-or">
                    {service.price !== null ? `${service.price}€` : (service.priceLabel || 'Devis sur demande')}
                  </p>
                </div>
                <div>
                  <p className="text-label text-gris-dark mb-8">Durée</p>
                  <p className="text-h3 text-noir">
                    {service.duration !== null ? `${service.duration} min` : 'À définir'}
                  </p>
                </div>
              </div>
            </div>

            {service.includes.length > 0 && (
              <div className="mb-48">
                <h2 className="text-h2 text-noir mb-32">Inclus dans cette prestation</h2>
                <ul className="space-y-16">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-16 text-body text-gris-dark">
                      <span className="text-or mt-2" aria-hidden="true">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-48">
              <h2 className="text-h2 text-noir mb-32">Détail du service</h2>
              <p className="text-body text-gris-dark max-w-3xl">
                {service.description}
              </p>
            </div>

            <span className="inline-block px-16 py-8 border border-or text-or text-label">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </span>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-96 space-y-48">
              <div className="p-32 bg-noir text-blanc">
                <h2 className="text-h4 text-or mb-16">Réserver cette prestation</h2>
                <p className="text-body-small text-gris-medium mb-32">
                  Choisissez votre créneau avec Acuity Scheduling.
                </p>
                <AcuityEmbed ownerID={process.env.NEXT_PUBLIC_ACUITY_OWNER_ID || ''} />
              </div>

              <div>
                <h2 className="text-h4 text-noir mb-24">Autres prestations</h2>
                <ul className="space-y-16">
                  {SERVICES.filter((s) => s.id !== service.id)
                    .slice(0, 5)
                    .map((s) => (
                      <li key={s.id}>
                        <Link
                          href={`/prestations/${s.slug}`}
                          className="text-body-small text-or hover:text-noir transition-colors"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="border-t border-gris-light">
        <div className="container-fluid py-32">
          <Link href="/prestations" className="text-body-small text-or hover:text-noir transition-colors">
            ← Retour aux prestations
          </Link>
        </div>
      </div>
    </div>
  );
}
