import { promises as fs } from 'fs';
import path from 'path';

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

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'google-reviews.json');
const CACHE_DURATION = 86400000; // 24h

async function readCache(): Promise<ReviewsResponse | null> {
  try {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    const cached: CacheData = JSON.parse(content);
    if (Date.now() - cached.timestamp < CACHE_DURATION) return cached.data;
    return null;
  } catch {
    return null;
  }
}

async function writeCache(data: ReviewsResponse): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(CACHE_FILE, JSON.stringify({ data, timestamp: Date.now() }, null, 2));
  } catch {
    // silencieux
  }
}

export async function fetchGoogleReviews(): Promise<ReviewsResponse> {
  const empty: ReviewsResponse = { reviews: [], averageRating: 0, totalReviews: 0 };

  // 1. Cache fichier persistant
  const cached = await readCache();
  if (cached) return cached;

  // 2. Appel API Google
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return empty;

  try {
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
    url.searchParams.append('place_id', placeId);
    url.searchParams.append('fields', 'rating,user_ratings_total,reviews');
    url.searchParams.append('language', 'fr');
    url.searchParams.append('key', apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) return empty;

    const data = await res.json();
    if (data.status !== 'OK') return empty;

    const result = data.result || {};
    const reviews: ReviewData[] = (result.reviews || [])
      .filter((r: { rating: number; text?: string }) => r.rating >= 4.5 && (r.text?.trim().length ?? 0) > 0)
      .map((r: { author_name: string; rating: number; text: string; relative_time_description: string; profile_photo_url?: string; time: number }, i: number) => ({
        id: `${r.time}-${i}`,
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        date: r.relative_time_description,
        authorImage: r.profile_photo_url,
      }));

    const response: ReviewsResponse = {
      reviews,
      averageRating: result.rating || 0,
      totalReviews: result.user_ratings_total || 0,
    };

    await writeCache(response);
    return response;
  } catch {
    return empty;
  }
}
