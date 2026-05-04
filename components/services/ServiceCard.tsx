import Link from 'next/link';
import Image from 'next/image';

export interface ServiceCardProps {
  id: number | string;
  name: string;
  slug: string;
  price: number | null;
  priceLabel?: string;
  duration: number | null;
  description: string;
  image?: string;
  category?: string;
}

export function ServiceCard({
  name,
  slug,
  price,
  priceLabel,
  duration,
  description,
  image,
  category,
}: ServiceCardProps) {
  return (
    <Link href={`/prestations/${slug}`} className="group block hover-lift">
      {/* Image 4:5 portrait (product ratio) */}
      <div className="relative overflow-hidden mb-24 image-product bg-gris-medium">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-400"
          />
        ) : (
          <div className="absolute inset-0 bg-gris-dark group-hover:bg-noir transition-colors duration-350 flex items-end p-24">
            <span className="text-gris-light text-10px uppercase tracking-0.25em">
              {name}
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div>
        {category && (
          <span className="block text-gris-medium text-10px uppercase tracking-0.25em mb-12">
            {category}
          </span>
        )}

        <h3 className="font-serif font-light uppercase tracking-0.1em text-base md:text-lg text-noir mb-12 group-hover:opacity-60 transition-opacity duration-350">
          {name}
        </h3>

        <p className="text-gris-dark text-xs leading-relaxed mb-16 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-16">
          <span className="text-noir text-xs font-light tracking-wide">
            {price !== null ? `${price} €` : (priceLabel || 'Devis sur demande')}
          </span>
          {duration !== null && (
            <>
              <span className="text-gris-light text-xs">—</span>
              <span className="text-gris-medium text-10px uppercase tracking-0.15em">
                {duration} min
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
