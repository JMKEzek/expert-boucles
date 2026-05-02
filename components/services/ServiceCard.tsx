import Link from 'next/link';
import Image from 'next/image';

export interface ServiceCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  description: string;
  image?: string;
  category?: string;
}

export function ServiceCard({
  name,
  slug,
  price,
  duration,
  description,
  image,
  category,
}: ServiceCardProps) {
  return (
    <Link href={`/prestations/${slug}`} className="group block">
      {/* Image 4:5 portrait */}
      <div className="relative overflow-hidden mb-6" style={{ paddingBottom: '125%' }}>
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-[#2a2a2a] group-hover:bg-[#333] transition-colors duration-500 flex items-end p-6">
            <span className="text-[var(--color-gris-dark)] text-[10px] uppercase tracking-[0.25em]">
              {name}
            </span>
          </div>
        )}
      </div>

      {/* Infos */}
      <div>
        {category && (
          <span className="block text-[var(--color-gris-medium)] text-[10px] uppercase tracking-[0.25em] mb-2">
            {category}
          </span>
        )}

        <h3 className="font-serif font-light uppercase tracking-[0.1em] text-base md:text-lg text-noir mb-2 group-hover:opacity-60 transition-opacity">
          {name}
        </h3>

        <p className="text-[var(--color-gris-dark)] text-xs leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-4">
          <span className="text-noir text-xs font-light tracking-wide">
            {price} €
          </span>
          <span className="text-[var(--color-gris-light)] text-xs">—</span>
          <span className="text-[var(--color-gris-medium)] text-[10px] uppercase tracking-[0.15em]">
            {duration} min
          </span>
        </div>
      </div>
    </Link>
  );
}
