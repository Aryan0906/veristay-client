import { Link } from 'react-router-dom';
import { MapPin, Star, IndianRupee, BadgeCheck } from 'lucide-react';
import type { FoodVendor, FoodService } from '../types';

interface FoodCardProps {
  food: FoodVendor | FoodService;
  distanceKm?: number | null;
}

export default function FoodCard({ food, distanceKm }: FoodCardProps) {
  const isNewShape = 'price_min' in food;
  const image = isNewShape
    ? food.images[0]
    : food.image;
  const menuCount = isNewShape ? food.menu_items.length : food.features.length;
  const hygiene = isNewShape ? food.hygiene_rating : food.rating;
  const priceMin = isNewShape ? food.price_min : food.price_per_meal;
  const priceMax = isNewShape ? food.price_max : food.monthly_price ?? food.price_per_meal;

  return (
    <Link to={`/food/${food.id}`} className="block rounded-2xl border border-secondary-300 bg-white shadow-card transition hover:shadow-card-hover">
      <img
        src={image || 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80'}
        alt={food.name}
        className="h-52 w-full rounded-t-2xl object-cover"
      />
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-text-primary">{food.name}</h3>
          {food.is_verified ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          ) : null}
        </div>
        <p className="inline-block rounded-full bg-secondary-200 px-2 py-1 text-xs font-semibold uppercase text-accent-600">
          {food.type.replace('_', ' ')}
        </p>
        <p className="flex items-center gap-1 text-sm text-text-secondary">
          <MapPin className="h-4 w-4" /> {food.address}
        </p>
        <p className="flex items-center gap-1 text-sm text-text-secondary">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Hygiene {hygiene.toFixed(1)}/5
        </p>
        <p className="flex items-center text-lg font-bold text-accent-600">
          <IndianRupee className="h-4 w-4" />
          {priceMin.toLocaleString('en-IN')} - {priceMax.toLocaleString('en-IN')}
        </p>
        <p className="text-xs text-text-tertiary">{menuCount} menu/features listed</p>
        {distanceKm != null ? (
          <p className="text-xs font-medium text-text-tertiary">{distanceKm.toFixed(1)} km from selected college</p>
        ) : null}
      </div>
    </Link>
  );
}
