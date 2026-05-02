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
    <div className="space-y-8">
      {/* Hero Image */}
      {image && (
        <div className="relative h-96 md:h-[500px] w-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {category && (
            <p className="text-gold font-medium uppercase tracking-wide">{category}</p>
          )}

          <h1 className="text-5xl md:text-6xl font-serif font-bold text-noir">{name}</h1>

          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>

          {detailedDescription && (
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{detailedDescription}</p>
            </div>
          )}

          {includes && includes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-noir">Ce qui est inclus</h3>
              <ul className="space-y-3">
                {includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gold/20">
                        <svg
                          className="h-4 w-4 text-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Price Card */}
            <div className="bg-noir text-blanc rounded-lg p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-400">Tarif</p>
                <p className="text-4xl font-bold text-gold">{price.toFixed(2)}€</p>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-400">Durée</p>
                <p className="text-xl font-semibold">{duration} minutes</p>
              </div>
              <button className="w-full bg-gold text-noir py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all">
                Réserver maintenant
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h4 className="font-serif font-bold text-noir">À savoir</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Consultation gratuite incluse</li>
                <li>• Résultats visibles dès la première séance</li>
                <li>• Produits premium utilisés</li>
                <li>• Suivi post-prestation inclus</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
