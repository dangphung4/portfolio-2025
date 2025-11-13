"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRatingChange,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (value: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={!interactive}
            className={cn(
              "transition-all duration-150",
              interactive &&
                "cursor-pointer hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-sm",
              !interactive && "cursor-default"
            )}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors duration-150",
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

// Display-only version with half-star support
export function StarRatingDisplay({
  rating,
  maxRating = 5,
  size = 16,
  showNumber = false,
  className,
}: {
  rating: number;
  maxRating?: number;
  size?: number;
  showNumber?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const fillPercentage = Math.min(
            100,
            Math.max(0, (rating - index) * 100)
          );

          return (
            <div key={index} className="relative">
              <Star
                size={size}
                className="fill-muted text-muted-foreground"
              />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercentage}%` }}
              >
                <Star size={size} className="fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        })}
      </div>
      {showNumber && (
        <span className="text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
