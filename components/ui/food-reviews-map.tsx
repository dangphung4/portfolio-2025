"use client";

import React, { useRef, useState } from "react";
import { FoodReview } from "@/lib/config";
import { Card } from "./card";
import { Badge } from "./badge";
import { MapPin, Star, ExternalLink } from "lucide-react";

interface FoodReviewsMapProps {
  reviews: FoodReview[];
  selectedReview?: FoodReview | null;
  onReviewSelect?: (review: FoodReview) => void;
  className?: string;
}

export function FoodReviewsMap({
  reviews,
  selectedReview,
  onReviewSelect,
  className,
}: FoodReviewsMapProps) {
  const mapContainerRef = useRef<HTMLIFrameElement>(null);
  const [hoveredReview, setHoveredReview] = useState<FoodReview | null>(null);

  // Generate map URL with multiple markers using Google Maps Embed API
  const generateMapUrl = () => {
    if (reviews.length === 0) return "";

    // If there's a selected review, center on it with a marker
    if (selectedReview) {
      const { lat, lng } = selectedReview.location;
      const label = encodeURIComponent(selectedReview.restaurantName);
      return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&markers=color:red%7Clabel:${label.charAt(0)}%7C${lat},${lng}`;
    }

    // For multiple locations, we'll center on the first one and add markers
    if (reviews.length === 1) {
      const review = reviews[0];
      const { lat, lng } = review.location;
      const label = encodeURIComponent(review.restaurantName);
      return `https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed&markers=color:red%7Clabel:${label.charAt(0)}%7C${lat},${lng}`;
    }

    // For multiple reviews, calculate center point and add multiple markers
    const avgLat = reviews.reduce((sum, r) => sum + r.location.lat, 0) / reviews.length;
    const avgLng = reviews.reduce((sum, r) => sum + r.location.lng, 0) / reviews.length;
    
    // Build markers parameter - limit to first 10 to avoid URL length issues
    const markers = reviews.slice(0, 10).map((review, idx) => {
      const { lat, lng } = review.location;
      const label = String.fromCharCode(65 + (idx % 26)); // A, B, C, etc.
      return `color:red%7Clabel:${label}%7C${lat},${lng}`;
    }).join('&markers=');

    return `https://maps.google.com/maps?q=${avgLat},${avgLng}&z=11&output=embed&markers=${markers}`;
  };

  const mapUrl = generateMapUrl();

  // Open in full Google Maps
  const openInGoogleMaps = () => {
    if (selectedReview) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        selectedReview.location.address
      )}`;
      window.open(url, "_blank");
    } else if (reviews.length > 0) {
      // Open with all locations
      const query = reviews.map(r => r.restaurantName).join(', ');
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
      window.open(url, "_blank");
    }
  };

  if (reviews.length === 0) {
    return (
      <Card className={className}>
        <div className="h-[500px] flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No locations to display</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
        {mapUrl ? (
          <>
            <iframe
              ref={mapContainerRef}
              src={mapUrl}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant Locations Map"
              allowFullScreen
            />
            {/* Open in Google Maps button */}
            <button
              onClick={openInGoogleMaps}
              className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm hover:bg-background border rounded-lg px-3 py-2 text-sm font-medium flex items-center gap-2 shadow-lg transition-colors z-10"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Google Maps
            </button>

            {/* Legend for multiple markers */}
            {reviews.length > 1 && !selectedReview && (
              <div className="absolute bottom-4 left-4 right-4 max-h-32 overflow-y-auto bg-background/95 backdrop-blur-sm rounded-lg border shadow-lg p-3 z-10">
                <div className="flex items-center gap-2 mb-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>Showing {Math.min(reviews.length, 10)} locations</span>
                  {reviews.length > 10 && <span>(limited to 10)</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                  {reviews.slice(0, 10).map((review, idx) => (
                    <button
                      key={review.id}
                      onClick={() => onReviewSelect?.(review)}
                      onMouseEnter={() => setHoveredReview(review)}
                      onMouseLeave={() => setHoveredReview(null)}
                      className={`flex items-center gap-2 p-1.5 rounded hover:bg-muted/50 text-left transition-colors ${
                        hoveredReview?.id === review.id ? 'bg-muted/50' : ''
                      }`}
                    >
                      <Badge variant="secondary" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {String.fromCharCode(65 + (idx % 26))}
                      </Badge>
                      <span className="truncate flex-1">{review.restaurantName}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{review.rating}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Unable to load map
          </div>
        )}
      </div>
      <div className="p-4 bg-muted/50 text-xs text-muted-foreground flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>
            {selectedReview 
              ? `Showing ${selectedReview.restaurantName}`
              : `Displaying ${Math.min(reviews.length, 10)} restaurant${reviews.length > 1 ? 's' : ''}`}
          </span>
        </div>
        <span>Click markers for details</span>
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
