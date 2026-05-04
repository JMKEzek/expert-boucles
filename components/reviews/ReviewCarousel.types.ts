export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  authorImage?: string;
}

export interface ReviewCarouselProps {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
}
