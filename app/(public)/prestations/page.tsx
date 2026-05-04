import type { Metadata } from 'next';
import { SERVICES, type Service } from '@/lib/constants/services';
import Link from 'next/link';

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
  },
};

const CATEGORY_LABELS: Record<Service['category'], string> = {
  coupes: 'Coupes',
  colorations: 'Couleurs & Balayages',
  soins: 'Soins',
  extensions: 'Extensions',
};

const CATEGORY_ORDER: Service['category'][] = ['coupes', 'colorations', 'soins', 'extensions'];

function formatDuration(minutes: number | null): string {
  if (!minutes) return '';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
}

function ServiceItem({ service }: { service: Service }) {
  const priceDisplay = service.price !== null
    ? `${service.price} €`
    : service.priceLabel ?? 'Sur devis';

  return (
    <div className="py-40 border-b border-noir/10 group">
      <div className="flex items-baseline justify-between gap-24 mb-12">
        <h3 className="font-serif text-[18px] font-light tracking-wide text-noir leading-tight">
          {service.name}
        </h3>
        <div className="text-right shrink-0">
          <span className="font-serif text-[18px] font-light text-noir">
            {priceDisplay}
          </span>
          {service.duration && (
            <p className="text-[11px] uppercase tracking-widest text-gris-medium mt-2">
              {formatDuration(service.duration)}
            </p>
          )}
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-gris-dark max-w-prose">
        {service.description}
      </p>

      {service.includes.length > 0 && (
        <ul className="mt-16 space-y-4">
          {service.includes.map((item, i) => (
            <li key={i} className="text-[12px] text-gris-dark tracking-wide flex items-start gap-8">
              <span className="text-or mt-1 shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CategorySection({ category, services }: { category: Service['category']; services: Service[] }) {
  if (services.length === 0) return null;

  const midpoint = Math.ceil(services.length / 2);
  const leftColumn = services.slice(0, midpoint);
  const rightColumn = services.slice(midpoint);

  return (
    <section className="mb-96">
      <div className="mb-48">
        <p className="text-[11px] uppercase tracking-[0.25em] text-or mb-12">
          {CATEGORY_LABELS[category]}
        </p>
        <div className="h-px bg-noir w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-64 lg:gap-x-96">
        <div>
          {leftColumn.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
        <div>
          {rightColumn.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PrestationsPage() {
  const categorized = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    services: SERVICES.filter((s) => s.category === cat),
  }));

  return (
    <main className="bg-blanc min-h-screen">
      {/* Header */}
      <section className="pt-120 md:pt-160 pb-80 text-center">
        <h1 className="text-h1 text-noir mb-24">Prestations</h1>
        <p className="text-body text-noir max-w-xl mx-auto px-24 leading-relaxed">
          Chaque prestation est pensée pour révéler la beauté naturelle de vos cheveux bouclés.
        </p>
      </section>

      {/* Menu */}
      <div className="max-w-5xl mx-auto px-24 pb-120">
        {categorized.map(({ category, services }) => (
          <CategorySection key={category} category={category} services={services} />
        ))}

        {/* CTA */}
        <div className="pt-48 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gris-medium mb-32">
            Réservation en ligne
          </p>
          <Link href="/reservation" className="btn-primary">
            Prendre rendez-vous
          </Link>
        </div>
      </div>
    </main>
  );
}
