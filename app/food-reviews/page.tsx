"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useFoodReviews } from "@/hooks/useFoodReviews";
import { FoodReview } from "@/lib/config";
import { FoodReviewCard } from "@/components/ui/food-review-card";
import { FoodReviewForm } from "@/components/ui/food-review-form";
import { RestaurantLocationsList } from "@/components/ui/food-reviews-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  LogIn,
  LogOut,
  Lock,
} from "lucide-react";

export default function FoodReviewsPage() {
  const { isAdmin, login, logout, password } = useAuth();
  const {
    reviews,
    isLoading,
    createReview,
    updateReview,
    deleteReview,
    toggleFavorite,
    getCuisineTypes,
    getStats,
  } = useFoodReviews(password);

  const [showForm, setShowForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [formMode, setFormMode] = useState<"quick" | "detailed">("quick");
  const [editingReview, setEditingReview] = useState<FoodReview | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCuisine, setFilterCuisine] = useState<string>("");
  const [sortBy, setSortBy] = useState<"rating" | "date" | "name">("date");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const stats = getStats();
  const cuisineTypes = getCuisineTypes();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginPassword);
    if (success) {
      setShowLoginModal(false);
      setLoginPassword("");
      setLoginError("");
    } else {
      setLoginError("Invalid password");
    }
  };

  const handleCreateReview = () => {
    if (!isAdmin) {
      setShowLoginModal(true);
      return;
    }
    setEditingReview(null);
    setFormMode("quick");
    setShowForm(true);
  };

  const handleEditReview = (review: FoodReview) => {
    if (!isAdmin) {
      setShowLoginModal(true);
      return;
    }
    setEditingReview(review);
    setFormMode(review.detailedReview ? "detailed" : "quick");
    setShowForm(true);
  };

  const handleSubmitReview = async (review: FoodReview) => {
    try {
      if (editingReview) {
        await updateReview(review);
      } else {
        await createReview(review);
      }
      setShowForm(false);
      setEditingReview(null);
    } catch (error) {
      alert("Failed to save review. Please try again.");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!isAdmin) {
      setShowLoginModal(true);
      return;
    }
    if (confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteReview(id);
      } catch (error) {
        alert("Failed to delete review. Please try again.");
      }
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
    <>
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-center">Admin Login</CardTitle>
              <CardDescription className="text-center">
                Enter the admin password to manage reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    setLoginError("");
                  }}
                  autoFocus
                />
                {loginError && (
                  <p className="text-sm text-destructive text-center">{loginError}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowLoginModal(false);
                      setLoginPassword("");
                      setLoginError("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4 relative"
        >
          {/* Admin/Logout Button - Top Right */}
          <div className="absolute top-0 right-0 sm:right-4">
            {isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground"
              >
                <LogOut className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLoginModal(true)}
              >
                <LogIn className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent px-4">
            Food Reviews
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            My personal collection of restaurant reviews and food adventures.
            {isAdmin ? " (Admin Mode)" : ""}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="truncate">Total Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold">{stats.totalReviews}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="truncate">Avg Rating</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold">{stats.averageRating}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="truncate">Favorites</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold">{stats.favoriteCount}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="truncate">Cuisines</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl sm:text-3xl font-bold">{stats.cuisineCount}</p>
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
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex flex-wrap gap-2 flex-1">
                {isAdmin && (
                  <Button onClick={handleCreateReview} className="flex-1 sm:flex-initial">
                    <Plus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Add Review</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                )}
                <Button
                  variant={showFavoritesOnly ? "default" : "outline"}
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className="flex-1 sm:flex-initial"
                >
                  <Heart
                    className={`h-4 w-4 sm:mr-2 ${showFavoritesOnly ? "fill-current" : ""}`}
                  />
                  <span className="hidden sm:inline">Favorites</span>
                  <span className="sm:hidden">Favs</span>
                </Button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm">
            <Filter className="h-4 w-4 text-muted-foreground hidden sm:block" />
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">Cuisine:</span>
            <Button
              variant={filterCuisine === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCuisine("")}
              className="text-xs sm:text-sm h-8"
            >
              All
            </Button>
            {cuisineTypes.map((cuisine) => (
              <Button
                key={cuisine}
                variant={filterCuisine === cuisine ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterCuisine(cuisine)}
                className="text-xs sm:text-sm h-8"
              >
                {cuisine}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center text-sm">
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">Sort by:</span>
            <Button
              variant={sortBy === "date" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("date")}
              className="text-xs sm:text-sm h-8"
            >
              Date
            </Button>
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("rating")}
              className="text-xs sm:text-sm h-8"
            >
              Rating
            </Button>
            <Button
              variant={sortBy === "name" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("name")}
              className="text-xs sm:text-sm h-8"
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
              {isAdmin
                ? "Start adding your food reviews to build your collection!"
                : "Check back soon for delicious reviews!"}
            </p>
            {isAdmin && (
              <Button onClick={handleCreateReview}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Review
              </Button>
            )}
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
                  onEdit={isAdmin ? handleEditReview : undefined}
                  onDelete={isAdmin ? handleDeleteReview : undefined}
                  onToggleFavorite={isAdmin ? toggleFavorite : undefined}
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
    </>
  );
}
