import { NextResponse } from 'next/server';
import { fetchGoogleReviews } from '@/lib/google-reviews';

export type { ReviewData as ReviewData, ReviewsResponse } from '@/lib/google-reviews';

export async function GET() {
  const data = await fetchGoogleReviews();

  if (data.averageRating === 0 && data.reviews.length === 0) {
    return NextResponse.json(
      { error: 'Configuration manquante ou API indisponible', ...data },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
