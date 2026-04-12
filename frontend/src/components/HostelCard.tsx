import { Link } from 'react-router-dom';
import { MapPin, IndianRupee, BadgeCheck, Star } from 'lucide-react';
import type { Hostel } from '../types';

interface Props {
    hostel: Hostel;
    highlighted?: boolean;
}

export default function HostelCard({ hostel, highlighted }: Props) {
    const avgRating = hostel.reviews.length
        ? hostel.reviews.reduce((sum, review) => sum + review.rating, 0) / hostel.reviews.length
        : 0;

    return (
        <Link
            to={`/hostels/${hostel.id}`}
            className={`block rounded-2xl border bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover ${
                highlighted ? 'border-primary-500 ring-2 ring-primary-200' : 'border-secondary-300'
            }`}
        >
            <img
                src={hostel.images[0] || 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80'}
                alt={hostel.name}
                className="h-52 w-full rounded-t-2xl object-cover"
            />
            <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-text-primary">{hostel.name}</h3>
                    {hostel.is_verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
                            <BadgeCheck className="h-3.5 w-3.5" /> Verified
                        </span>
                    ) : null}
                </div>
                <p className="flex items-start gap-1 text-sm text-text-secondary">
                    <MapPin className="mt-0.5 h-4 w-4 flex-none" />
                    <span>{hostel.address}</span>
                </p>
                <p className="flex items-center gap-1 text-sm text-text-secondary">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {avgRating ? avgRating.toFixed(1) : 'No ratings yet'}
                </p>
                <div className="flex flex-wrap gap-2">
                    {hostel.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="rounded-full bg-secondary-200 px-2 py-1 text-xs text-text-secondary">
                            {amenity}
                        </span>
                    ))}
                </div>
                <p className="flex items-center text-lg font-bold text-accent-600">
                    <IndianRupee className="h-4 w-4" />
                    {hostel.price_min.toLocaleString('en-IN')} - {hostel.price_max.toLocaleString('en-IN')}
                    <span className="ml-1 text-xs font-medium text-text-tertiary">/month</span>
                </p>
            </div>
        </Link>
    );
}
