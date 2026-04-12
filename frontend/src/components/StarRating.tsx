import { Star } from 'lucide-react';

interface Props {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ value, onChange, size = 'md' }: Props) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5';

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= Math.round(value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange?.(star)}
            className={onChange ? 'cursor-pointer' : 'cursor-default'}
            disabled={!onChange}
            aria-label={`Rate ${star}`}
          >
            <Star className={`${iconSize} ${active ? 'fill-amber-400 text-amber-400' : 'text-secondary-400'}`} />
          </button>
        );
      })}
    </div>
  );
}
