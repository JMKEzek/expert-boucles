import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
  time: number;
}

interface GooglePlaceDetails {
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
}

export interface ReviewData {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  authorImage?: string;
}

export interface ReviewsResponse {
  reviews: ReviewData[];
  averageRating: number;
  totalReviews: number;
}

interface CacheData {
  data: ReviewsResponse;
  timestamp: number;
}

// Cache fichier — persiste entre les redémarrages
const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'google-reviews.json');
const CACHE_DURATION = 86400000; // 24h en millisecondes

async function readCache(): Promise<ReviewsResponse | null> {
  try {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    const cached: CacheData = JSON.parse(content);
    const age = Date.now() - cached.timestamp;

    if (age < CACHE_DURATION) {
      console.log(`[Cache] Avis trouvés en cache (${Math.round(age / 1000 / 60)}m)`);
      return cached.data;
    }

    console.log('[Cache] Cache expiré, appel API nécessaire');
    return null;
  } catch (error) {
    // Pas de cache ou erreur de lecture
    return null;
  }
}

async function writeCache(data: ReviewsResponse): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log('[Cache] Avis sauvegardés en cache');
  } catch (error) {
    console.error('[Cache] Erreur lors de la sauvegarde:', error);
  }
}

export async function GET() {
  try {
    // 1️⃣ Vérifier le cache d'abord
    const cachedReviews = await readCache();
    if (cachedReviews) {
      return NextResponse.json(cachedReviews, {
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
          'X-Cache-Source': 'file-cache',
        },
      });
    }

    // 2️⃣ Cache expiré ou absent → appeler l'API Google
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      console.error('[API] Configuration manquante');
      return NextResponse.json(
        {
          error: 'Configuration manquante',
          message: 'GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID non défini dans .env.local',
        },
        { status: 500 }
      );
    }

    console.log('[API] Appel Google Places API...');
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.append('key', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[API] Google Places API error:', errorData);

      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Place ID invalide' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Erreur lors de la récupération des avis' },
        { status: 500 }
      );
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('[API] Google Places API status:', data.status, data.error_message);
      return NextResponse.json(
        { error: `API error: ${data.status}` },
        { status: 500 }
      );
    }

    const placeDetails: GooglePlaceDetails = data.result || {};
    const averageRating = placeDetails.rating || 0;
    const totalReviews = placeDetails.user_ratings_total || 0;

    // Filtrer les avis >= 4.5 étoiles
    const filteredReviews: ReviewData[] = (placeDetails.reviews || [])
      .filter((review: GoogleReview) => review.rating >= 4.5)
      .map((review: GoogleReview, index: number) => ({
        id: `${review.time}-${index}`,
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        date: review.relative_time_description,
        authorImage: review.profile_photo_url,
      }));

    const responseData: ReviewsResponse = {
      reviews: filteredReviews,
      averageRating,
      totalReviews,
    };

    // 3️⃣ Sauvegarder en cache pour 24h
    await writeCache(responseData);

    return NextResponse.json(responseData, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        'X-Cache-Source': 'google-api',
      },
    });
  } catch (error) {
    console.error('[API] Google Reviews API error:', error);

    // 4️⃣ En cas d'erreur, essayer le cache même expiré
    const fallbackCache = await readCache();
    if (fallbackCache) {
      console.log('[Fallback] Utilisation du cache expiré en cas d\'erreur');
      return NextResponse.json(fallbackCache, {
        headers: {
          'X-Cache-Source': 'fallback-cache',
        },
      });
    }

    return NextResponse.json(
      { error: 'Erreur serveur', reviews: [], averageRating: 0, totalReviews: 0 },
      { status: 500 }
    );
  }
}
