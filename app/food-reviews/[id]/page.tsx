"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FoodReview } from "@/lib/config";
import { StarRatingDisplay } from "@/components/ui/star-rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign,
  ThumbsUp,
  Share2,
  Repeat,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useFoodReviews } from "@/hooks/useFoodReviews";

// Add JSON-LD structured data
function generateReviewStructuredData(review: FoodReview) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Restaurant",
      "name": review.restaurantName,
      "servesCuisine": review.cuisineType,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": review.location.address
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": review.location.lat,
        "longitude": review.location.lng
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": "Dang Phung"
    },
    "datePublished": review.createdAt,
    "reviewBody": review.detailedReview || review.quickNotes || `Review of ${review.restaurantName}`
  };
}

export default function FoodReviewDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { isAdmin, password } = useAuth();
  const { reviews, deleteReview, toggleFavorite } = useFoodReviews(password);
  const [review, setReview] = useState<FoodReview | null>(null);

  useEffect(() => {
    const foundReview = reviews.find((r) => r.id === params.id);
    if (foundReview) {
      setReview(foundReview);
    }
  }, [reviews, params.id]);

  if (!review) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Review not found</h1>
          <Button onClick={() => router.push("/food-reviews")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviews
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

  const handleEdit = () => {
    router.push(`/food-reviews?edit=${review.id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(review.id);
      router.push("/food-reviews");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: review.restaurantName,
          text: `Check out my review of ${review.restaurantName}!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewStructuredData(review))
        }}
      />
      
      <div className="min-h-screen bg-background pt-20">
        {/* Content */}
        <div className="container mx-auto px-4 py-6 pb-24 md:pb-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Back Button & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/food-reviews")}
              className="gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Reviews
            </Button>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={handleShare}
                className="flex-1 sm:flex-initial gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span className="sm:hidden">Share</span>
              </Button>
              {isAdmin && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={handleEdit}
                    className="flex-1 sm:flex-initial gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sm:hidden">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDelete}
                    className="flex-1 sm:flex-initial gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sm:hidden">Delete</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Hero Image Gallery */}
          {review.images && review.images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] md:col-span-2 rounded-xl overflow-hidden bg-muted ring-1 ring-border">
                <Image
                  src={review.images[0]}
                  alt={review.restaurantName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {review.images.slice(1, 3).map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted ring-1 ring-border"
                >
                  <Image
                    src={image}
                    alt={`${review.restaurantName} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Main Info Card */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    {review.restaurantName}
                  </h1>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(review.id)}
                    >
                      <Heart
                        className={`h-6 w-6 ${
                          review.isFavorite
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <StarRatingDisplay rating={review.rating} size={24} />
                  <Badge variant="secondary" className="text-sm">
                    {review.cuisineType}
                  </Badge>
                  {review.priceRange && (
                    <Badge variant="outline" className="text-sm gap-1">
                      <DollarSign className="h-3 w-3" />
                      {getPriceDisplay(review.priceRange)}
                    </Badge>
                  )}
                  {review.wouldRecommend && (
                    <Badge className="text-sm gap-1 bg-green-500/10 text-green-700 dark:text-green-400">
                      <ThumbsUp className="h-3 w-3" />
                      Recommended
                    </Badge>
                  )}
                </div>
              </div>

              {/* Location */}
              <button
                onClick={handleMapClick}
                className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors w-full text-left p-3 rounded-lg hover:bg-muted/50 group"
              >
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:text-primary" />
                <div className="flex-1">
                  <p className="font-medium">{review.location.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click to open in Google Maps
                  </p>
                </div>
                <ExternalLink className="h-4 w-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

               {/* Visit Date & Times Visited */}
               <div className="flex flex-wrap gap-4">
                 <div className="flex items-center gap-3 text-muted-foreground">
                   <Calendar className="h-5 w-5 flex-shrink-0" />
                   <span>Visited on {formatDate(review.visitDate)}</span>
                 </div>
                 {review.timesVisited && review.timesVisited > 1 && (
                   <div className="flex items-center gap-2 text-muted-foreground">
                     <Repeat className="h-5 w-5 flex-shrink-0" />
                     <span className="font-medium">
                       {review.timesVisited} times
                     </span>
                   </div>
                 )}
               </div>

              {/* Divider */}
              <div className="border-t" />

              {/* Quick Notes */}
              {review.quickNotes && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Quick Thoughts</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.quickNotes}
                  </p>
                </div>
              )}

              {/* Detailed Review */}
              {review.detailedReview && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Full Review</h2>
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {review.detailedReview}
                  </p>
                </div>
              )}

              {/* Dishes Ordered */}
              {review.dishesOrdered && review.dishesOrdered.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Dishes I Tried</h2>
                  <div className="flex flex-wrap gap-2">
                    {review.dishesOrdered.map((dish, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1.5">
                        {dish}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {review.tags && review.tags.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag, index) => (
                      <Badge key={index} className="text-sm py-1.5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* All Images */}
              {review.images && review.images.length > 3 && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">More Photos</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {review.images.slice(3).map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted ring-1 ring-border"
                      >
                        <Image
                          src={image}
                          alt={`${review.restaurantName} - Image ${index + 4}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Metadata */}
              <div className="text-xs text-muted-foreground pt-4 border-t">
                <p>
                  Created: {formatDate(review.createdAt)} • Last updated:{" "}
                  {formatDate(review.updatedAt)}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
    </>
  );
}

