"use client";

import React from "react";
import Image from "next/image";
import { FoodReview } from "@/lib/config";
import { StarRatingDisplay } from "./star-rating";
import { Badge } from "./badge";
import { Card, CardContent, CardFooter, CardHeader } from "./card";
import { Button } from "./button";
import {
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodReviewCardProps {
  review: FoodReview;
  onEdit?: (review: FoodReview) => void;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export function FoodReviewCard({
  review,
  onEdit,
  onDelete,
  onToggleFavorite,
}: FoodReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPriceDisplay = (priceRange?: number) => {
    if (!priceRange) return null;
    return "$".repeat(priceRange);
  };

  const handleMapClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      review.location.address
    )}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">
                {review.restaurantName}
              </h3>
              {review.isFavorite && (
                <Heart className="h-4 w-4 fill-red-500 text-red-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <StarRatingDisplay rating={review.rating} size={16} />
              <Badge variant="secondary" className="text-xs">
                {review.cuisineType}
              </Badge>
              {review.priceRange && (
                <span className="text-sm font-medium text-muted-foreground">
                  {getPriceDisplay(review.priceRange)}
                </span>
              )}
            </div>
          </div>
          {onToggleFavorite && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(review.id)}
              className="flex-shrink-0"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  review.isFavorite && "fill-red-500 text-red-500"
                )}
              />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Location */}
        <button
          onClick={handleMapClick}
          className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-left group/location"
        >
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover/location:text-primary" />
          <span className="line-clamp-2">{review.location.address}</span>
          <ExternalLink className="h-3 w-3 mt-0.5 opacity-0 group-hover/location:opacity-100 transition-opacity" />
        </button>

        {/* Visit Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>Visited {formatDate(review.visitDate)}</span>
        </div>

        {/* Quick Notes */}
        {review.quickNotes && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {review.quickNotes}
          </p>
        )}

        {/* Detailed Review */}
        {review.detailedReview && (
          <p className="text-sm line-clamp-3">{review.detailedReview}</p>
        )}

        {/* Dishes Ordered */}
        {review.dishesOrdered && review.dishesOrdered.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Dishes tried:
            </p>
            <div className="flex flex-wrap gap-1">
              {review.dishesOrdered.slice(0, 3).map((dish, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {dish}
                </Badge>
              ))}
              {review.dishesOrdered.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{review.dishesOrdered.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {review.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Images Preview */}
        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {review.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden bg-muted"
              >
                <Image
                  src={image}
                  alt={`${review.restaurantName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 gap-2">
        {onEdit && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(review)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(review.id)}
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
