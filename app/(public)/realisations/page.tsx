import { InstagramFeed } from '@/components/reviews/InstagramFeed';
import type { InstagramPost } from '@/components/reviews/InstagramFeed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    'Découvrez les transformations, coupes et coiffages réalisés par Expert Boucles à Paris 75009.',
  alternates: {
    canonical: '/realisations',
  },
  openGraph: {
    title: 'Réalisations | Expert Boucles',
    description:
      'Galerie de transformations et inspirations cheveux bouclés par Expert Boucles.',
    url: '/realisations',
    images: [
      {
        url: '/realisations.avif',
        width: 1200,
        height: 630,
        alt: 'Réalisations Expert Boucles',
      },
    ],
  },
};

interface InstagramFeedResponse {
  posts: InstagramPost[];
}

async function fetchInstagramFeed(): Promise<InstagramFeedResponse> {
  try {
    const configuredBaseUrl = process.env.NEXT_PUBLIC_APP_URL;

    if (!configuredBaseUrl && process.env.npm_lifecycle_event === 'build') {
      return { posts: [] };
    }

    const baseUrl = configuredBaseUrl || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/instagram-feed`, {
      next: { revalidate: 21600 },
    });

    if (!response.ok) {
      console.error('Failed to fetch Instagram feed:', response.status);
      return { posts: [] };
    }

    return (await response.json()) as InstagramFeedResponse;
  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return { posts: [] };
  }
}

export default async function RealisationsPage() {
  const { posts } = await fetchInstagramFeed();

  return (
    <>
      <section className="py-96 md:py-120 bg-noir text-blanc">
        <div className="container-fluid text-center">
          <h1 className="text-h1 text-blanc mb-32">Réalisations</h1>
          <p className="text-body max-w-2xl mx-auto text-gris-medium">
            Découvrez les transformations et créations de Yannick pour ses clients
          </p>
        </div>
      </section>

      <section className="section-padding bg-blanc">
        <div className="container-fluid">
          <InstagramFeed posts={posts} columns={4} />
        </div>
      </section>

      <section className="section-padding bg-gris-light">
        <div className="container-fluid">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-h2 text-noir text-center mb-32">
              Chaque style est unique
            </h2>
            <p className="text-body text-gris-dark text-center">
              Les réalisations ci-dessus représentent quelques-unes des nombreuses
              transformations et créations réalisées par Yannick. Chaque client a des
              cheveux uniques, et chaque coupe est adaptée à la morphologie, à la
              texture et aux envies personnelles.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
