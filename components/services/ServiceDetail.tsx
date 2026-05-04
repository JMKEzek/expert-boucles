import Image from 'next/image';
import { ServiceCardProps } from './ServiceCard';

export interface ServiceDetailProps extends ServiceCardProps {
  includes?: string[];
  detailedDescription?: string;
}

export function ServiceDetail({
  name,
  description,
  detailedDescription,
  price,
  duration,
  image,
  includes,
  category,
}: ServiceDetailProps) {
  return (
    <div className="spacing-gap-loose">
      {/* Hero Image */}
      {image && (
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden image-hero">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
        {/* Main Content */}
        <div className="md:col-span-2 spacing-gap-normal">
          {category && (
            <p className="text-or font-medium uppercase tracking-0.15em">{category}</p>
          )}

          <h1 className="text-h1 text-noir">{name}</h1>

          <p className="text-body text-gris-dark leading-relaxed">{description}</p>

          {detailedDescription && (
            <div className="text-body text-gris-dark">
              <p>{detailedDescription}</p>
            </div>
          )}

          {includes && includes.length > 0 && (
            <div className="spacing-gap-tight">
              <h3 className="text-h3 text-noir">Ce qui est inclus</h3>
              <ul className="spacing-gap-tight">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-16">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-24 w-24 bg-or/10">
                        <svg
                          className="h-16 w-16 text-or"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-body text-gris-dark">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 spacing-gap-normal">
            {/* Price Card */}
            <div className="card-dark spacing-gap-tight">
              <div>
                <p className="text-label">Tarif</p>
                <p className="text-4xl font-light text-or mt-8">
                  {price !== null ? `${price.toFixed(2)} €` : 'Devis sur demande'}
                </p>
              </div>
              <div className="border-t border-gris-dark pt-16">
                <p className="text-label">Durée</p>
                <p className="text-base font-light text-blanc mt-8">{duration} minutes</p>
              </div>
              <button className="btn-secondary w-full">
                Réserver maintenant
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gris-light p-24 spacing-gap-tight">
              <h4 className="font-serif font-light text-noir text-lg tracking-0.1em uppercase">À savoir</h4>
              <ul className="spacing-gap-tight">
                <li className="text-body-small text-gris-dark">Consultation gratuite incluse</li>
                <li className="text-body-small text-gris-dark">Résultats visibles dès la première séance</li>
                <li className="text-body-small text-gris-dark">Produits premium utilisés</li>
                <li className="text-body-small text-gris-dark">Suivi post-prestation inclus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
