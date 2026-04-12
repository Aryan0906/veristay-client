import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import HostelCard from '../components/HostelCard';
import MapView from '../components/MapView';
import { getColleges, getHostels } from '../lib/api';
import type { College, Hostel } from '../types';

export default function HostelsPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const collegeId = params.get('college_id') ? Number(params.get('college_id')) : undefined;
  const priceMax = params.get('price_max') ? Number(params.get('price_max')) : 18000;
  const amenities = params.get('amenities') ? params.get('amenities')!.split(',').filter(Boolean) : [];
  const verifiedOnly = params.get('verified_only') === 'true';

  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    getHostels({
      college_id: collegeId,
      price_max: priceMax,
      amenities: amenities.length ? amenities.join(',') : undefined,
      verified_only: verifiedOnly || undefined,
    })
      .then(setHostels)
      .finally(() => setLoading(false));
  }, [collegeId, priceMax, amenities.join(','), verifiedOnly]);

  const center = useMemo<[number, number]>(() => {
    if (hostels[0]) {
      return [hostels[0].lat, hostels[0].long];
    }
    return [23.0225, 72.5714];
  }, [hostels]);

  const updateParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-display text-3xl font-bold text-accent-600">Hostels</h1>
      <p className="mt-2 text-text-secondary">Filter by college proximity, budget, amenities, and verification status.</p>

      <div className="mt-6">
        <FilterBar
          colleges={colleges}
          collegeId={collegeId}
          priceMax={priceMax}
          amenities={amenities}
          verifiedOnly={verifiedOnly}
          onCollegeChange={(value) => updateParam('college_id', value ? String(value) : undefined)}
          onPriceMaxChange={(value) => updateParam('price_max', String(value))}
          onAmenitiesChange={(value) => updateParam('amenities', value.length ? value.join(',') : undefined)}
          onVerifiedOnlyChange={(value) => updateParam('verified_only', value ? 'true' : undefined)}
        />
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-text-tertiary">Loading hostels...</p>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {hostels.map((hostel) => (
              <div key={hostel.id} onMouseEnter={() => setHighlightedId(hostel.id)}>
                <HostelCard hostel={hostel} highlighted={highlightedId === hostel.id} />
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <MapView
              center={center}
              markers={hostels.map((hostel) => ({
                id: hostel.id,
                lat: hostel.lat,
                lng: hostel.long,
                label: hostel.name,
                onClick: () => {
                  setHighlightedId(hostel.id);
                  navigate(`/hostels/${hostel.id}`);
                },
              }))}
            />
          </div>
        </div>
      )}
    </main>
  );
}
