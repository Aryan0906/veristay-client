import type { College } from '../types';

interface Props {
  colleges: College[];
  collegeId?: number;
  priceMax: number;
  amenities: string[];
  verifiedOnly: boolean;
  onCollegeChange: (value?: number) => void;
  onPriceMaxChange: (value: number) => void;
  onAmenitiesChange: (value: string[]) => void;
  onVerifiedOnlyChange: (value: boolean) => void;
}

const amenityOptions = ['WiFi', 'AC', 'Gym', 'Meals'];

export default function FilterBar({
  colleges,
  collegeId,
  priceMax,
  amenities,
  verifiedOnly,
  onCollegeChange,
  onPriceMaxChange,
  onAmenitiesChange,
  onVerifiedOnlyChange,
}: Props) {
  const toggleAmenity = (name: string) => {
    if (amenities.includes(name)) {
      onAmenitiesChange(amenities.filter((item) => item !== name));
      return;
    }
    onAmenitiesChange([...amenities, name]);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-secondary-300 bg-white p-4 shadow-card">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm font-medium text-text-secondary">
          College
          <select
            className="mt-1 w-full rounded-lg border border-secondary-300 px-3 py-2"
            value={collegeId ?? ''}
            onChange={(event) => {
              const value = event.target.value;
              onCollegeChange(value ? Number(value) : undefined);
            }}
          >
            <option value="">All</option>
            {colleges.map((college) => (
              <option key={college.id} value={college.id}>
                {college.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-text-secondary">
          Max Budget (monthly)
          <input
            type="range"
            min={4000}
            max={30000}
            step={500}
            className="mt-3 w-full"
            value={priceMax}
            onChange={(event) => onPriceMaxChange(Number(event.target.value))}
          />
          <p className="mt-1 text-xs text-text-tertiary">Up to Rs. {priceMax.toLocaleString('en-IN')}</p>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {amenityOptions.map((amenity) => {
          const active = amenities.includes(amenity);
          return (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                active ? 'bg-primary-600 text-white' : 'bg-secondary-200 text-text-secondary'
              }`}
            >
              {amenity}
            </button>
          );
        })}
      </div>

      <label className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary">
        <input
          type="checkbox"
          checked={verifiedOnly}
          onChange={(event) => onVerifiedOnlyChange(event.target.checked)}
        />
        Verified hostels only
      </label>
    </section>
  );
}
