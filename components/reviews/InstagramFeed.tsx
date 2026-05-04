'use client';

import Image from 'next/image';

export interface InstagramPost {
  id: string;
  image: string;
  url?: string;
  caption?: string;
}

export interface InstagramFeedProps {
  posts: InstagramPost[];
  columns?: number;
}

export function InstagramFeed({ posts, columns = 3 }: InstagramFeedProps) {
  if (posts.length === 0) {
    return (
      <div className="py-48 text-center">
        <p className="text-gris-medium text-xs uppercase tracking-0.2em">
          Chargement...
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '1px',
        backgroundColor: 'var(--color-gris-light)',
      }}
    >
      {posts.map((post) => (
        <a
          key={post.id}
          href={post.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden aspect-square bg-gris-medium cursor-pointer hover-scale"
        >
          <Image
            src={post.image}
            alt={post.caption || 'Réalisation'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-400"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-noir/0 group-hover:bg-noir/60 transition-all duration-350 flex items-center justify-center">
            <svg
              className="w-32 h-32 text-blanc opacity-0 group-hover:opacity-100 transition-opacity duration-350"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            </svg>
          </div>
        </a>
      ))}
    </div>
  );
}
