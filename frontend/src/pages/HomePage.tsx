import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getColleges } from '../lib/api';
import type { College } from '../types';

export default function HomePage() {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    getColleges().then(setColleges).catch(() => setColleges([]));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return colleges;
    }
    const text = search.toLowerCase();
    return colleges.filter((college) => college.name.toLowerCase().includes(text) || college.area.toLowerCase().includes(text));
  }, [colleges, search]);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    if (selectedId) {
      navigate(`/hostels?college_id=${selectedId}`);
      return;
    }
    if (filtered[0]) {
      navigate(`/hostels?college_id=${filtered[0].id}`);
      return;
    }
    navigate('/hostels');
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-accent-600 via-primary-600 to-primary-400 px-4 py-24 text-white">
        <div className="absolute -left-12 top-6 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-accent-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-50">VeriStay</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl">
            Find your stay, your mess, your Ahmedabad
          </h1>
          <p className="mt-4 max-w-2xl text-base text-primary-50 md:text-lg">
            Search colleges first and discover verified hostels, affordable meals, and real student reviews around campus.
          </p>

          <form onSubmit={submitSearch} className="mt-8 rounded-2xl bg-white p-3 text-text-primary shadow-soft md:max-w-2xl">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-primary-500" />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSelectedId(null);
                }}
                placeholder="Search college name or area"
                className="w-full border-none bg-transparent text-sm outline-none"
              />
              <button type="submit" className="rounded-xl bg-accent-600 px-4 py-2 text-sm font-semibold text-white">
                Search
              </button>
            </div>
            <div className="mt-3 max-h-44 overflow-auto rounded-xl border border-secondary-300">
              {filtered.map((college) => (
                <button
                  key={college.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(college.id);
                    setSearch(`${college.name} - ${college.area}`);
                  }}
                  className="block w-full border-b border-secondary-200 px-3 py-2 text-left text-sm last:border-none hover:bg-secondary-100"
                >
                  <span className="font-semibold">{college.name}</span>
                  <span className="ml-2 text-text-tertiary">{college.area}</span>
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:grid-cols-3">
        <article className="rounded-2xl border border-primary-100 bg-white p-5 shadow-card">
          <h2 className="font-display text-xl font-semibold text-accent-600">Verified Hostels</h2>
          <p className="mt-2 text-sm text-text-secondary">Browse trusted stays with photos, amenities, and location maps around your campus.</p>
        </article>
        <article className="rounded-2xl border border-primary-100 bg-white p-5 shadow-card">
          <h2 className="font-display text-xl font-semibold text-accent-600">Food Under Rs. 180</h2>
          <p className="mt-2 text-sm text-text-secondary">Filter student-friendly mess and canteen options with practical hygiene insights.</p>
        </article>
        <article className="rounded-2xl border border-primary-100 bg-white p-5 shadow-card">
          <h2 className="font-display text-xl font-semibold text-accent-600">Student Reviews</h2>
          <p className="mt-2 text-sm text-text-secondary">Make smarter housing choices with transparent ratings and first-hand feedback.</p>
        </article>
      </section>
    </main>
  );
}
