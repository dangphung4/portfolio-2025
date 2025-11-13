"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useFoodReviews } from "@/hooks/useFoodReviews";
import { FoodReview } from "@/lib/config";
import { FoodReviewCard } from "@/components/ui/food-review-card";
import { FoodReviewForm } from "@/components/ui/food-review-form";
import { RestaurantLocationsList } from "@/components/ui/food-reviews-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initializeSampleReviews } from "@/lib/sample-reviews";
import {
  Plus,
  Search,
  Filter,
  Star,
  Heart,
  TrendingUp,
  MapPin,
  Map,
  List,
  Download,
} from "lucide-react";

export default function FoodReviewsPage() {
  const {
    reviews,
    isLoading,
    createReview,
    updateReview,
    deleteReview,
    toggleFavorite,
    getTopRated,
    getFavorites,
    getCuisineTypes,
    getStats,
  } = useFoodReviews();

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"quick" | "detailed">("quick");
  const [editingReview, setEditingReview] = useState<FoodReview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCuisine, setFilterCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rating" | "date" | "name">("date");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const stats = getStats();
  const cuisineTypes = getCuisineTypes();

  const handleLoadSampleData = () => {
    const loaded = initializeSampleReviews();
    if (loaded) {
      alert("Sample reviews loaded! Refresh the page to see them.");
      window.location.reload();
    } else {
      alert("You already have reviews. Clear your data first to load samples.");
    }
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (review) =>
          review.restaurantName.toLowerCase().includes(query) ||
          review.cuisineType.toLowerCase().includes(query) ||
          review.location.address.toLowerCase().includes(query) ||
          review.quickNotes?.toLowerCase().includes(query) ||
          review.detailedReview?.toLowerCase().includes(query)
      );
    }

    // Apply cuisine filter
    if (filterCuisine) {
      filtered = filtered.filter(
        (review) => review.cuisineType === filterCuisine
      );
    }

    // Apply favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter((review) => review.isFavorite);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "date":
          return (
            new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
          );
        case "name":
          return a.restaurantName.localeCompare(b.restaurantName);
        default:
          return 0;
      }
    });

    return sorted;
  }, [reviews, searchQuery, filterCuisine, sortBy, showFavoritesOnly]);

  const handleCreateReview = () => {
    setEditingReview(null);
    setFormMode("quick");
    setShowForm(true);
  };

  const handleEditReview = (review: FoodReview) => {
    setEditingReview(review);
    setFormMode(review.detailedReview ? "detailed" : "quick");
    setShowForm(true);
  };

  const handleSubmitReview = (review: FoodReview) => {
    if (editingReview) {
      updateReview(review);
    } else {
      createReview(review);
    }
    setShowForm(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      deleteReview(id);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin-slow rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <FoodReviewForm
          review={editingReview}
          onSubmit={handleSubmitReview}
          onCancel={handleCancelForm}
          mode={formMode}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Food Reviews
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          My personal collection of restaurant reviews and food adventures.
          Quick ratings and in-depth reviews of places I've visited.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Total Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalReviews}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Star className="h-4 w-4" />
              Avg Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.averageRating}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.favoriteCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Cuisines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.cuisineCount}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreateReview}>
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Heart
                className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`}
              />
              Favorites
            </Button>
            {reviews.length === 0 && (
              <Button variant="outline" onClick={handleLoadSampleData}>
                <Download className="h-4 w-4 mr-2" />
                Load Sample Data
              </Button>
            )}
          </div>

          <div className="flex gap-2 items-center w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cuisine:</span>
          <Button
            variant={filterCuisine === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCuisine("")}
          >
            All
          </Button>
          {cuisineTypes.map((cuisine) => (
            <Button
              key={cuisine}
              variant={filterCuisine === cuisine ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCuisine(cuisine)}
            >
              {cuisine}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "date" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("date")}
          >
            Date
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("rating")}
          >
            Rating
          </Button>
          <Button
            variant={sortBy === "name" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("name")}
          >
            Name
          </Button>
        </div>
      </motion.div>

      {/* View Mode Toggle */}
      {filteredAndSortedReviews.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-2"
        >
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <List className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
          >
            <Map className="h-4 w-4 mr-2" />
            Map
          </Button>
        </motion.div>
      )}

      {/* Reviews Grid or Map */}
      {filteredAndSortedReviews.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center py-12"
        >
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
          <p className="text-muted-foreground mb-4">
            Start adding your food reviews to build your collection!
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={handleCreateReview}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Review
            </Button>
            <Button variant="outline" onClick={handleLoadSampleData}>
              <Download className="h-4 w-4 mr-2" />
              Load Sample Data
            </Button>
          </div>
        </motion.div>
      ) : viewMode === "grid" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <FoodReviewCard
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview}
                onToggleFavorite={toggleFavorite}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RestaurantLocationsList reviews={filteredAndSortedReviews} />
        </motion.div>
      )}
    </div>
  );
}
