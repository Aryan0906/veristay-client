import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { College } from '../types';

interface Props {
  college: College;
}

export default function CollegeCard({ college }: Props) {
  return (
    <Link
      to={`/hostels?college_id=${college.id}`}
      className="block rounded-2xl border border-secondary-300 bg-white p-5 shadow-card transition hover:border-primary-400 hover:shadow-card-hover"
    >
      <h3 className="font-display text-xl font-semibold text-text-primary">{college.name}</h3>
      <p className="mt-2 flex items-center gap-2 text-sm text-text-secondary">
        <MapPin className="h-4 w-4" />
        {college.area}
      </p>
      <p className="mt-4 text-sm font-semibold text-primary-700">Explore nearby hostels</p>
    </Link>
  );
}
