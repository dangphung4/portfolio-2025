"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  Lock,
  ArrowLeft,
  Trash2,
} from "lucide-react";

function FoodReviewsContent() {
  const searchParams = useSearchParams();
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
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const stats = getStats();
  const cuisineTypes = getCuisineTypes();

  // Handle edit query parameter
  useEffect(() => {
    const editId = searchParams?.get('edit');
    if (editId && isAdmin) {
      const reviewToEdit = reviews.find(r => r.id === editId);
      if (reviewToEdit) {
        handleEditReview(reviewToEdit);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, reviews, isAdmin]);

  const handleTitleTouchStart = () => {
    const timer = setTimeout(() => {
      if (isAdmin) {
        logout();
      } else {
        setShowLoginModal(true);
      }
    }, 1000);
    setLongPressTimer(timer);
  };

  const handleTitleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  // Secret keyboard shortcut: Ctrl+Shift+L (desktop)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        if (isAdmin) {
          logout();
        } else {
          setShowLoginModal(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin, logout]);

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
    } catch {
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
      } catch {
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
      <div className="container max-w-4xl mx-auto px-4 py-8 pt-24 pb-24 md:pb-8">
        {/* Form Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={handleCancelForm}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Reviews
          </Button>
          {editingReview && (
            <Button
              variant="outline"
              onClick={() => handleDeleteReview(editingReview.id)}
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete Review</span>
            </Button>
          )}
        </div>

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

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-24 md:pb-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 sm:space-y-4"
        >
          <h1 
            onTouchStart={handleTitleTouchStart}
            onTouchEnd={handleTitleTouchEnd}
            onMouseDown={handleTitleTouchStart}
            onMouseUp={handleTitleTouchEnd}
            onMouseLeave={handleTitleTouchEnd}
            className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent px-4 cursor-default select-none active:opacity-70 transition-opacity"
          >
            Food Reviews
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            My personal collection of restaurant reviews and food adventures.
            {isAdmin && <span className="ml-2 text-xs text-primary">(Admin Mode)</span>}
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
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Total Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-2xl sm:text-3xl font-bold">{stats.totalReviews}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Star className="h-4 w-4 flex-shrink-0" />
                <span>Avg Rating</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-2xl sm:text-3xl font-bold">{stats.averageRating}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <Heart className="h-4 w-4 flex-shrink-0" />
                <span>Favorites</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <p className="text-2xl sm:text-3xl font-bold">{stats.favoriteCount}</p>
            </CardContent>
          </Card>

          <Card className="border-border/40">
            <CardHeader className="pb-2 sm:pb-3 px-4 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                <TrendingUp className="h-4 w-4 flex-shrink-0" />
                <span>Cuisines</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-3">
              {isAdmin && (
                <Button onClick={handleCreateReview} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Review
                </Button>
              )}
              <Button
                variant={showFavoritesOnly ? "default" : "outline"}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className="w-full sm:w-auto"
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${showFavoritesOnly ? "fill-current" : ""}`}
                />
                Favorites
              </Button>

              <div className="relative w-full sm:flex-1 sm:max-w-md">
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

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">Cuisine:</span>
            </div>
            <div className="flex flex-wrap gap-2">
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
          </div>

          <div className="space-y-2">
            <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
            <div className="flex flex-wrap gap-2">
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

export default function FoodReviewsPage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <FoodReviewsContent />
    </React.Suspense>
  );
}
