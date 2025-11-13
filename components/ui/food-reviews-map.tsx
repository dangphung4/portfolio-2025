"use client";

import React, { useRef } from "react";
import { FoodReview } from "@/lib/config";
import { Card } from "./card";

interface FoodReviewsMapProps {
  reviews: FoodReview[];
  selectedReview?: FoodReview | null;
  className?: string;
}

export function FoodReviewsMap({
  reviews,
  selectedReview,
  className,
}: FoodReviewsMapProps) {
  const mapContainerRef = useRef<HTMLIFrameElement>(null);

  // For now, we'll create a simple embedded Google Maps view
  // In a production app, you'd use the Google Maps JavaScript API with an API key
  const generateMapUrl = () => {
    if (reviews.length === 0) return "";

    // If there's a selected review, center on it
    if (selectedReview) {
      const { lat, lng } = selectedReview.location;
      return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    }

    // Otherwise, show all markers (limited to first review for simplicity)
    const firstReview = reviews[0];
    const { lat, lng } = firstReview.location;
    return `https://maps.google.com/maps?q=${lat},${lng}&z=12&output=embed`;
  };

  const mapUrl = generateMapUrl();

  if (reviews.length === 0) {
    return (
      <Card className={className}>
        <div className="h-[400px] flex items-center justify-center text-muted-foreground">
          No locations to display
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        {mapUrl ? (
          <iframe
            ref={mapContainerRef}
            src={mapUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Restaurant Locations Map"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Unable to load map
          </div>
        )}
      </div>
      <div className="p-4 bg-muted/50 text-xs text-muted-foreground">
        Click on restaurant cards to view location on map. Google Maps integration shows approximate locations.
      </div>
    </Card>
  );
}

// Simple list-based map alternative
export function RestaurantLocationsList({
  reviews,
  className,
}: {
  reviews: FoodReview[];
  className?: string;
}) {
  const openInMaps = (review: FoodReview) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      review.location.address
    )}`;
    window.open(url, "_blank");
  };

  return (
    <Card className={className}>
      <div className="divide-y">
        {reviews.map((review) => (
          <button
            key={review.id}
            onClick={() => openInMaps(review)}
            className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-start justify-between gap-4 group"
          >
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
                {review.restaurantName}
              </h4>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {review.location.address}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-medium">{review.rating}</span>
              </div>
              <svg
                className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}
