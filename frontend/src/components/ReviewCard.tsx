import type { Review } from '../types';
import StarRating from './StarRating';

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <article className="rounded-xl border border-secondary-300 bg-white p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-semibold text-text-primary">{review.user_id}</p>
        <StarRating value={review.rating} size="sm" />
      </div>
      <p className="text-sm text-text-secondary">{review.comment}</p>
      <p className="mt-2 text-xs text-text-tertiary">{new Date(review.created_at).toLocaleDateString()}</p>
    </article>
  );
}
