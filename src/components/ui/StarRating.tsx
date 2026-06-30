import { Star } from "lucide-react";
import { cn } from "@/utils/cn";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({
  rating,
  max = 5,
  size = 14,
  showValue = false,
  count,
  className,
}: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} aria-label={`Rating: ${rating} out of ${max}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="text-[#E5E7EB] fill-[#E5E7EB]"
                aria-hidden="true"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={size}
                    className="text-[#FBBF24] fill-[#FBBF24]"
                    aria-hidden="true"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-[#111827]">{rating.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-xs text-[#9CA3AF]">({count.toLocaleString()})</span>
      )}
    </div>
  );
}
