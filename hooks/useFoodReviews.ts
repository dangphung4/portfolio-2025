"use client";

import { useState, useEffect } from "react";
import { FoodReview } from "@/lib/config";

export function useFoodReviews(password?: string | null) {
  const [reviews, setReviews] = useState<FoodReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new review
  const createReview = async (review: FoodReview) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password || "",
        },
        body: JSON.stringify(review),
      });

      if (response.ok) {
        await fetchReviews();
      } else {
        throw new Error("Failed to create review");
      }
    } catch (error) {
      console.error("Error creating review:", error);
      throw error;
    }
  };

  // Update an existing review
  const updateReview = async (updatedReview: FoodReview) => {
    try {
      const response = await fetch(`/api/reviews/${updatedReview.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password || "",
        },
        body: JSON.stringify(updatedReview),
      });

      if (response.ok) {
        await fetchReviews();
      } else {
        throw new Error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  };

  // Delete a review
  const deleteReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": password || "",
        },
      });

      if (response.ok) {
        await fetchReviews();
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  };

  // Toggle favorite status
  const toggleFavorite = async (id: string) => {
    const review = reviews.find((r) => r.id === id);
    if (review) {
      await updateReview({
        ...review,
        isFavorite: !review.isFavorite,
      });
    }
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
