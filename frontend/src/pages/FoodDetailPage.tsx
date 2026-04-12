import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';
import type { FoodVendor, Review } from '../types';
import { getFoodById } from '../lib/api';
import MapView from '../components/MapView';
import ReviewCard from '../components/ReviewCard';

function fakeReviews(vendor: FoodVendor): Review[] {
  return [
    {
      id: 1,
      user_id: 'student_a',
      rating: Math.max(1, Math.min(5, vendor.hygiene_rating)),
      comment: `Good option for ${vendor.type.replace('_', ' ')} near campus with practical pricing.`,
      created_at: new Date().toISOString(),
    },
  ];
}

export default function FoodDetailPage() {
  const { id } = useParams();
  const vendorId = Number(id);
  const [vendor, setVendor] = useState<FoodVendor | null>(null);

  useEffect(() => {
    if (!vendorId) {
      return;
    }
    getFoodById(vendorId).then(setVendor).catch(() => setVendor(null));
  }, [vendorId]);

  const reviews = useMemo(() => (vendor ? fakeReviews(vendor) : []), [vendor]);

  if (!vendor) {
    return <main className="mx-auto max-w-5xl px-4 py-10">Food vendor not found.</main>;
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2">
        <img
          src={vendor.images[0] || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80'}
          alt={vendor.name}
          className="h-72 w-full rounded-2xl object-cover"
        />
        <article className="space-y-4 rounded-2xl border border-secondary-300 bg-white p-5">
          <h1 className="font-display text-3xl font-bold text-accent-600">{vendor.name}</h1>
          <p className="inline-block rounded-full bg-secondary-200 px-2 py-1 text-xs font-semibold uppercase text-accent-600">
            {vendor.type.replace('_', ' ')}
          </p>
          <p className="text-sm text-text-secondary">{vendor.address}</p>
          <p className="flex items-center text-xl font-bold text-primary-700">
            <IndianRupee className="h-5 w-5" />
            {vendor.price_min.toLocaleString('en-IN')} - {vendor.price_max.toLocaleString('en-IN')}
          </p>
          <p className="text-sm text-text-secondary">Hygiene rating: {vendor.hygiene_rating.toFixed(1)} / 5</p>
          <div>
            <p className="text-sm font-semibold text-text-primary">Menu</p>
            <ul className="mt-2 list-inside list-disc text-sm text-text-secondary">
              {vendor.menu_items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <section className="mt-6">
        <MapView
          center={[vendor.lat, vendor.long]}
          markers={[
            {
              id: vendor.id,
              lat: vendor.lat,
              lng: vendor.long,
              label: vendor.name,
            },
          ]}
        />
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="font-display text-2xl font-semibold text-accent-600">Reviews</h2>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>
    </main>
  );
}
