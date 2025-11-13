"use client";

import React, { useState, useEffect } from "react";
import { FoodReview } from "@/lib/config";
import { StarRating } from "./star-rating";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Badge } from "./badge";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { X, Plus, MapPin, Search } from "lucide-react";
import { ImageUpload } from "./image-upload";

interface PlaceResult {
  display_name: string;
  name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    city?: string;
    state?: string;
    country?: string;
    postcode?: string;
  };
  type?: string;
}

interface FoodReviewFormProps {
  review?: FoodReview | null;
  onSubmit: (review: FoodReview) => void;
  onCancel: () => void;
  mode: "quick" | "detailed";
}

export function FoodReviewForm({
  review,
  onSubmit,
  onCancel,
  mode: initialMode,
}: FoodReviewFormProps) {
  const [mode, setMode] = useState<"quick" | "detailed">(initialMode);
  const [restaurantName, setRestaurantName] = useState(
    review?.restaurantName || ""
  );
  const [cuisineType, setCuisineType] = useState(review?.cuisineType || "");
  const [rating, setRating] = useState(review?.rating || 0);
  const [address, setAddress] = useState(review?.location.address || "");
  const [lat, setLat] = useState(review?.location.lat || 0);
  const [lng, setLng] = useState(review?.location.lng || 0);
  const [visitDate, setVisitDate] = useState(
    review?.visitDate || new Date().toISOString().split("T")[0]
  );
  const [quickNotes, setQuickNotes] = useState(review?.quickNotes || "");
  const [detailedReview, setDetailedReview] = useState(
    review?.detailedReview || ""
  );
  const [priceRange, setPriceRange] = useState<number | undefined>(
    review?.priceRange
  );
  const [dishesOrdered, setDishesOrdered] = useState<string[]>(
    review?.dishesOrdered || []
  );
  const [currentDish, setCurrentDish] = useState("");
  const [tags, setTags] = useState<string[]>(review?.tags || []);
  const [currentTag, setCurrentTag] = useState("");
  const [images, setImages] = useState<string[]>(review?.images || []);
  const [isFavorite, setIsFavorite] = useState(review?.isFavorite || false);
  const [wouldRecommend, setWouldRecommend] = useState(
    review?.wouldRecommend || false
  );
  const [timesVisited, setTimesVisited] = useState(review?.timesVisited || 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PlaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const geocodeAddress = async () => {
    if (!address) {
      alert("Please enter an address first");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setLat(parseFloat(data[0].lat));
        setLng(parseFloat(data[0].lon));
        alert(`Coordinates found!\nLatitude: ${data[0].lat}\nLongitude: ${data[0].lon}`);
      } else {
        alert("Could not find coordinates for this address. Try opening Google Maps to search manually.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      alert("Failed to geocode address. Please try again or use Google Maps.");
    }
  };

  const openGoogleMaps = () => {
    const query = address || restaurantName || "";
    if (!query) {
      alert("Please enter a restaurant name or address first");
      return;
    }
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
    window.open(mapsUrl, "_blank");
  };

  const searchRestaurants = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query + " restaurant"
        )}&limit=10&addressdetails=1`
      );
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching restaurants:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchRestaurants(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.restaurant-search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectRestaurant = (place: PlaceResult) => {
    setRestaurantName(place.name || place.display_name.split(",")[0]);
    setAddress(place.display_name);
    setLat(parseFloat(place.lat));
    setLng(parseFloat(place.lon));
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!restaurantName || !cuisineType || !rating || !address) {
      alert("Please fill in all required fields");
      return;
    }

    const now = new Date().toISOString();
    const reviewData: FoodReview = {
      id: review?.id || `review-${Date.now()}`,
      restaurantName,
      cuisineType,
      rating,
      location: {
        address,
        lat,
        lng,
      },
      visitDate,
      quickNotes: quickNotes || undefined,
      timesVisited: timesVisited || 1,
      detailedReview: mode === "detailed" ? detailedReview : undefined,
      priceRange: priceRange as 1 | 2 | 3 | 4 | undefined,
      dishesOrdered: dishesOrdered.length > 0 ? dishesOrdered : undefined,
      tags: tags.length > 0 ? tags : undefined,
      images: images.length > 0 ? images : undefined,
      createdAt: review?.createdAt || now,
      updatedAt: now,
      isFavorite,
      wouldRecommend,
    };

    onSubmit(reviewData);
  };

  const addDish = () => {
    if (currentDish.trim()) {
      setDishesOrdered([...dishesOrdered, currentDish.trim()]);
      setCurrentDish("");
    }
  };

  const removeDish = (index: number) => {
    setDishesOrdered(dishesOrdered.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (currentTag.trim()) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {review ? "Edit Review" : "New Food Review"}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={mode === "quick" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("quick")}
              >
                Quick
              </Button>
              <Button
                type="button"
                variant={mode === "detailed" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("detailed")}
              >
                Detailed
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Restaurant Search */}
          <div className="restaurant-search-container p-4 bg-muted/50 rounded-lg border-2 border-dashed relative">
            <label className="text-sm font-medium block mb-2">
              🔍 Quick Search Restaurant
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                placeholder="Search for a restaurant (e.g., 'Olive Garden New York')"
                className="pl-9"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              )}
              
              {showResults && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-background border rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                  {searchResults.map((place, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectRestaurant(place)}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0"
                    >
                      <div className="font-medium text-sm">
                        {place.name || place.display_name.split(",")[0]}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {place.display_name}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {showResults && searchResults.length === 0 && searchQuery.length >= 3 && !isSearching && (
              <div className="mt-2 text-sm text-muted-foreground">
                No restaurants found. Try a different search or fill in manually below.
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-2">
              💡 Start typing to search for restaurants and auto-fill all details
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="text-sm font-medium text-muted-foreground">
              Or enter manually:
            </div>
            
            <div>
              <label className="text-sm font-medium">
                Restaurant Name <span className="text-destructive">*</span>
              </label>
              <Input
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="e.g., Joe's Pizza"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Cuisine Type <span className="text-destructive">*</span>
              </label>
              <Input
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                placeholder="e.g., Italian, Mexican, Japanese"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Rating <span className="text-destructive">*</span>
              </label>
              <StarRating
                rating={rating}
                interactive
                onRatingChange={setRating}
                size={32}
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Address <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2">
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g., 123 Main St, New York, NY"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={geocodeAddress}
                  size="sm"
                  title="Auto-fill coordinates from address"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={openGoogleMaps}
                  size="sm"
                  title="Open Google Maps"
                >
                  🗺️
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click <MapPin className="h-3 w-3 inline" /> to auto-fill coordinates or 🗺️ to open Google Maps
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Latitude
                </label>
                <Input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Longitude
                </label>
                <Input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                  placeholder="0.0"
                  className="text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Visit Date</label>
                <Input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Times Visited</label>
                <Input
                  type="number"
                  min="1"
                  value={timesVisited}
                  onChange={(e) => setTimesVisited(parseInt(e.target.value) || 1)}
                  placeholder="1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Quick Notes</label>
              <Textarea
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                placeholder="Brief thoughts about your visit..."
                rows={2}
              />
            </div>
          </div>

          {mode === "detailed" && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium">Detailed Review</label>
                <Textarea
                  value={detailedReview}
                  onChange={(e) => setDetailedReview(e.target.value)}
                  placeholder="Write your in-depth review here..."
                  rows={5}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Price Range
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={priceRange === value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPriceRange(value)}
                    >
                      {"$".repeat(value)}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPriceRange(undefined)}
                  >
                    Clear
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Dishes Ordered
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentDish}
                    onChange={(e) => setCurrentDish(e.target.value)}
                    placeholder="Add a dish..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addDish();
                      }
                    }}
                  />
                  <Button type="button" onClick={addDish} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dishesOrdered.map((dish, index) => (
                    <Badge key={index} variant="secondary">
                      {dish}
                      <button
                        type="button"
                        onClick={() => removeDish(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Tags</label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag (e.g., Date night, Family-friendly)..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge key={index}>
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Images</label>
                <ImageUpload images={images} onImagesChange={setImages} />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={(e) => setIsFavorite(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Mark as favorite</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={wouldRecommend}
                    onChange={(e) => setWouldRecommend(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Would recommend</span>
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {review ? "Update Review" : "Save Review"}
        </Button>
      </div>
    </form>
  );
}
