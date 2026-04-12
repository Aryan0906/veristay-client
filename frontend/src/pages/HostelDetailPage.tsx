import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import MapView from '../components/MapView';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import { getHostelById, getHostelReviews, submitReview } from '../lib/api';
import type { Hostel, Review } from '../types';
import { useAuth } from '../context/AuthContext';

export default function HostelDetailPage() {
  const { id } = useParams();
  const hostelId = Number(id);
  const { user } = useAuth();

  const [hostel, setHostel] = useState<Hostel | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadData = () => {
    if (!hostelId) {
      return;
    }
    getHostelById(hostelId).then(setHostel).catch(() => setHostel(null));
    getHostelReviews(hostelId)
      .then((data) => {
        setReviews(data.reviews);
        setAverageRating(data.average_rating);
      })
      .catch(() => {
        setReviews([]);
        setAverageRating(0);
      });
  };

  useEffect(() => {
    loadData();
  }, [hostelId]);

  const center = useMemo<[number, number]>(() => {
    if (!hostel) {
      return [23.0225, 72.5714];
    }
    return [hostel.lat, hostel.long];
  }, [hostel]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!hostelId || !comment.trim() || !user?.email) {
      return;
    }
    setSubmitting(true);
    try {
      await submitReview(hostelId, {
        user_id: user.email,
        rating,
        comment,
      });
      setComment('');
      setRating(5);
      loadData();
    } finally {
      setSubmitting(false);
    }
  };

  if (!hostel) {
    return <main className="mx-auto max-w-5xl px-4 py-10">Hostel not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <img
          src={hostel.images[0] || 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80'}
          alt={hostel.name}
          className="h-72 w-full rounded-2xl object-cover"
        />
        <div className="space-y-4 rounded-2xl border border-secondary-300 bg-white p-5">
          <h1 className="font-display text-3xl font-bold text-accent-600">{hostel.name}</h1>
          <p className="flex items-center gap-2 text-text-secondary">
            <MapPin className="h-4 w-4" /> {hostel.address}
          </p>
          <p className="text-lg font-semibold text-primary-700">
            Rs. {hostel.price_min.toLocaleString('en-IN')} - Rs. {hostel.price_max.toLocaleString('en-IN')} / month
          </p>
          <div className="flex flex-wrap gap-2">
            {hostel.amenities.map((amenity) => (
              <span key={amenity} className="rounded-full bg-secondary-200 px-2 py-1 text-xs text-text-secondary">
                {amenity}
              </span>
            ))}
          </div>
          <div className="pt-2">
            <p className="text-sm text-text-secondary">Average rating</p>
            <StarRating value={averageRating} />
          </div>
        </div>
      </div>

      <section className="mt-6">
        <MapView
          center={center}
          markers={[
            {
              id: hostel.id,
              lat: hostel.lat,
              lng: hostel.long,
              label: hostel.name,
            },
          ]}
        />
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-accent-600">Reviews</h2>
          {reviews.length === 0 ? <p className="text-sm text-text-tertiary">No reviews yet.</p> : null}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {user ? (
          <form onSubmit={onSubmit} className="h-fit rounded-2xl border border-secondary-300 bg-white p-5">
            <h3 className="font-display text-xl font-semibold text-text-primary">Add Review</h3>
            <div className="mt-4">
              <p className="mb-2 text-sm text-text-secondary">Rating</p>
              <StarRating value={rating} onChange={setRating} />
            </div>
            <label className="mt-4 block text-sm text-text-secondary">
              Comment
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
                maxLength={500}
                className="mt-1 w-full rounded-lg border border-secondary-300 px-3 py-2"
                placeholder="Share your experience"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="h-fit rounded-2xl border border-secondary-300 bg-white p-8 text-center flex flex-col items-center gap-4">
            <h3 className="font-display text-lg font-semibold text-text-primary">Have you stayed here?</h3>
            <p className="text-sm text-text-secondary">Sign in to share your experience with other students.</p>
            <Link to="/auth" className="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition">
              Sign In
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
