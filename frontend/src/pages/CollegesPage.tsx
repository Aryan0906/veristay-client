import { useEffect, useState } from 'react';
import { getColleges } from '../lib/api';
import type { College } from '../types';
import CollegeCard from '../components/CollegeCard';

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getColleges()
      .then(setColleges)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl font-bold text-accent-600">Ahmedabad Colleges</h1>
      <p className="mt-2 text-text-secondary">Pick a college to jump to nearby hostels and food listings.</p>

      {loading ? (
        <p className="mt-8 text-sm text-text-tertiary">Loading colleges...</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      )}
    </main>
  );
}
