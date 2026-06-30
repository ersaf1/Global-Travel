"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/format";
import { cn } from "@/utils/cn";
import type { Destination } from "@/types";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
  className?: string;
}

export function DestinationCard({ destination, index = 0, className }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={cn(
        "group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]",
        "transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={destination.coverImage ?? "/images/placeholder-destination.jpg"}
          alt={destination.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
        {destination.trending && (
          <div className="absolute top-3 left-3">
            <Badge variant="orange">Trending</Badge>
          </div>
        )}
        {destination.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="blue">Featured</Badge>
          </div>
        )}
        {destination.category && (
          <div className="absolute top-3 right-3">
            <Badge variant="gray">{destination.category.name}</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-[family-name:var(--font-poppins)] font-semibold text-[#111827] text-base leading-tight">
            {destination.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-3">
          <MapPin size={12} aria-hidden="true" className="text-[#60A5FA]" />
          <span>{destination.city?.name}, {destination.country?.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5" aria-label={`Rating: ${destination.rating}`}>
              <Star size={13} className="text-[#FBBF24] fill-[#FBBF24]" aria-hidden="true" />
              <span className="text-sm font-medium text-[#111827]">{destination.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-[#9CA3AF]">({destination.reviewCount})</span>
          </div>
          {destination.priceFrom && (
            <div className="text-right">
              <span className="text-xs text-[#9CA3AF]">From </span>
              <span className="text-sm font-semibold text-[#111827]">
                {formatPrice(destination.priceFrom, destination.currency)}
              </span>
            </div>
          )}
        </div>

        <Link
          href={`/destinations/${destination.slug}`}
          className="mt-3 flex items-center justify-between w-full px-4 py-2 rounded-xl bg-[#F9FAFB] hover:bg-[#F3F4F6] text-sm font-medium text-[#111827] transition-colors group/btn"
          aria-label={`View details for ${destination.name}`}
        >
          View Details
          <ArrowRight size={14} className="text-[#6B7280] group-hover/btn:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
