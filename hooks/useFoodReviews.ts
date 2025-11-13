"use client";

import { useState, useEffect } from "react";
import { FoodReview } from "@/lib/config";

const STORAGE_KEY = "food-reviews";

export function useFoodReviews() {
  const [reviews, setReviews] = useState<FoodReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reviews from local storage on mount
  useEffect(() => {
    const loadReviews = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setReviews(parsed);
        }
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Save reviews to local storage whenever they change
  const saveReviews = (updatedReviews: FoodReview[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Error saving reviews:", error);
    }
  };

  // Create a new review
  const createReview = (review: FoodReview) => {
    const newReviews = [...reviews, review];
    saveReviews(newReviews);
  };

  // Update an existing review
  const updateReview = (updatedReview: FoodReview) => {
    const newReviews = reviews.map((review) =>
      review.id === updatedReview.id ? updatedReview : review
    );
    saveReviews(newReviews);
  };

  // Delete a review
  const deleteReview = (id: string) => {
    const newReviews = reviews.filter((review) => review.id !== id);
    saveReviews(newReviews);
  };

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    const newReviews = reviews.map((review) =>
      review.id === id
        ? {
            ...review,
            isFavorite: !review.isFavorite,
            updatedAt: new Date().toISOString(),
          }
        : review
    );
    saveReviews(newReviews);
  };

  // Get reviews by filter
  const getFilteredReviews = (filter: {
    cuisineType?: string;
    minRating?: number;
    isFavorite?: boolean;
    searchQuery?: string;
  }) => {
    return reviews.filter((review) => {
      if (filter.cuisineType && review.cuisineType !== filter.cuisineType) {
        return false;
      }
      if (filter.minRating && review.rating < filter.minRating) {
        return false;
      }
      if (filter.isFavorite !== undefined && review.isFavorite !== filter.isFavorite) {
        return false;
      }
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        return (
          review.restaurantName.toLowerCase().includes(query) ||
          review.cuisineType.toLowerCase().includes(query) ||
          review.location.address.toLowerCase().includes(query) ||
          review.quickNotes?.toLowerCase().includes(query) ||
          review.detailedReview?.toLowerCase().includes(query)
        );
      }
      return true;
    });
  };

  // Get sorted reviews
  const getSortedReviews = (
    sortBy: "rating" | "date" | "name" = "date",
    order: "asc" | "desc" = "desc"
  ) => {
    const sorted = [...reviews].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "rating":
          comparison = a.rating - b.rating;
          break;
        case "date":
          comparison =
            new Date(a.visitDate).getTime() - new Date(b.visitDate).getTime();
          break;
        case "name":
          comparison = a.restaurantName.localeCompare(b.restaurantName);
          break;
      }
      return order === "asc" ? comparison : -comparison;
    });
    return sorted;
  };

  // Get top rated reviews
  const getTopRated = (limit: number = 5) => {
    return [...reviews]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  };

  // Get favorites
  const getFavorites = () => {
    return reviews.filter((review) => review.isFavorite);
  };

  // Get unique cuisine types
  const getCuisineTypes = () => {
    const types = new Set(reviews.map((review) => review.cuisineType));
    return Array.from(types).sort();
  };

  // Get statistics
  const getStats = () => {
    const totalReviews = reviews.length;
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;
    const favoriteCount = reviews.filter((review) => review.isFavorite).length;
    const cuisineCount = getCuisineTypes().length;

    return {
      totalReviews,
      averageRating: parseFloat(averageRating.toFixed(2)),
      favoriteCount,
      cuisineCount,
    };
  };

  return {
    reviews,
    isLoading,
    createReview,
    updateReview,
    deleteReview,
    toggleFavorite,
    getFilteredReviews,
    getSortedReviews,
    getTopRated,
    getFavorites,
    getCuisineTypes,
    getStats,
  };
}
