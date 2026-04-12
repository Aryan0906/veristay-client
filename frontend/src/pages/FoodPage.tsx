import { useEffect, useMemo, useState } from 'react';
import FoodCard from '../components/FoodCard';
import { getColleges, getFood } from '../lib/api';
import type { College, FoodVendor, FoodVendorType } from '../types';

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const radiusKm = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * radiusKm * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function FoodPage() {
  const [vendors, setVendors] = useState<FoodVendor[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState<number | undefined>();
  const [type, setType] = useState<'all' | FoodVendorType>('all');
  const [under180, setUnder180] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    getFood({
      college_id: selectedCollegeId,
      max_price: under180 ? 180 : undefined,
      type: type === 'all' ? undefined : type,
    })
      .then(setVendors)
      .finally(() => setLoading(false));
  }, [selectedCollegeId, type, under180]);

  const selectedCollege = colleges.find((college) => college.id === selectedCollegeId);

  const cards = useMemo(() => {
    return vendors.map((vendor) => {
      let distance: number | null = null;
      if (selectedCollege) {
        distance = haversineKm(vendor.lat, vendor.long, selectedCollege.lat, selectedCollege.long);
      }
      return { vendor, distance };
    });
  }, [vendors, selectedCollege]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-accent-600">Food & Mess Explore</h1>
      <p className="mt-2 text-text-secondary">Discover student food options around your college.</p>

      <section className="mt-6 rounded-2xl border border-secondary-300 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm text-text-secondary">
            College
            <select
              value={selectedCollegeId ?? ''}
              onChange={(event) => setSelectedCollegeId(event.target.value ? Number(event.target.value) : undefined)}
              className="mt-1 w-full rounded-lg border border-secondary-300 px-3 py-2"
            >
              <option value="">All</option>
              {colleges.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.name}
                </option>
              ))}
            </select>
          </label>

          <div className="text-sm text-text-secondary">
            Type
            <div className="mt-1 flex flex-wrap gap-2">
              {(['all', 'mess', 'canteen', 'street_food'] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={`rounded-full px-3 py-1 ${type === item ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-text-secondary'}`}
                >
                  {item === 'street_food' ? 'Street Food' : item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary md:mt-7">
            <input type="checkbox" checked={under180} onChange={(event) => setUnder180(event.target.checked)} />
            Under Rs. 180
          </label>
        </div>
      </section>

      {loading ? (
        <p className="mt-8 text-sm text-text-tertiary">Loading food vendors...</p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ vendor, distance }) => (
            <FoodCard key={vendor.id} food={vendor} distanceKm={distance} />
          ))}
        </div>
      )}
    </main>
  );
}
