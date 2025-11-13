"use client";

import React from "react";
import { Card } from "./card";
import { MapPin, ExternalLink } from "lucide-react";

interface LocationMapPreviewProps {
  address: string;
  lat: number;
  lng: number;
  restaurantName?: string;
  className?: string;
  height?: string;
}

export function LocationMapPreview({
  address,
  lat,
  lng,
  restaurantName,
  className,
  height = "300px",
}: LocationMapPreviewProps) {
  // Only show map if we have valid coordinates
  const hasValidCoordinates = lat !== 0 && lng !== 0;

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(url, "_blank");
  };

  if (!hasValidCoordinates) {
    return (
      <Card className={className}>
        <div 
          className="flex flex-col items-center justify-center text-muted-foreground gap-3 p-6"
          style={{ height }}
        >
          <MapPin className="h-8 w-8 opacity-50" />
          <p className="text-sm text-center">
            Enter an address and click the <MapPin className="h-3 w-3 inline" /> button to show map preview
          </p>
        </div>
      </Card>
    );
  }

  // Generate map URL
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed&markers=color:red%7C${lat},${lng}`;

  return (
    <Card className={className}>
      <div className="relative overflow-hidden rounded-lg" style={{ height }}>
        <iframe
          src={mapUrl}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${restaurantName || address}`}
          allowFullScreen
        />
        
        {/* Overlay with address and action button */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-background/95 to-transparent backdrop-blur-sm p-3 z-10">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {restaurantName && (
                <p className="font-medium text-sm truncate">{restaurantName}</p>
              )}
              <p className="text-xs text-muted-foreground line-clamp-2">{address}</p>
            </div>
            <button
              onClick={openInGoogleMaps}
              className="flex-shrink-0 bg-background hover:bg-muted border rounded-md px-2 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
              title="Open in Google Maps"
            >
              <ExternalLink className="h-3 w-3" />
              <span className="hidden sm:inline">Open</span>
            </button>
          </div>
        </div>

        {/* Coordinates display */}
        <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground">
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </div>
      </div>
    </Card>
  );
}
