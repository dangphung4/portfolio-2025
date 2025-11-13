import { FoodReview } from "./config";

export const sampleReviews: FoodReview[] = [
  {
    id: "sample-1",
    restaurantName: "Joe's Pizza",
    cuisineType: "Italian",
    rating: 5,
    location: {
      address: "7 Carmine St, New York, NY 10014",
      lat: 40.7306,
      lng: -74.0026,
    },
    visitDate: "2024-11-01",
    quickNotes: "Best NY-style pizza! The margherita is perfection.",
    detailedReview:
      "This is hands down the best pizza in NYC. The crust is perfectly crispy on the outside and chewy on the inside. The margherita pizza with fresh mozzarella and basil is a must-try. The sauce has the perfect balance of sweetness and acidity. Cash only, but totally worth it!",
    dishesOrdered: ["Margherita Pizza", "Pepperoni Slice", "Garlic Knots"],
    priceRange: 2,
    tags: ["Cash Only", "Quick Bite", "Local Favorite"],
    isFavorite: true,
    wouldRecommend: true,
    createdAt: "2024-11-01T12:00:00.000Z",
    updatedAt: "2024-11-01T12:00:00.000Z",
  },
  {
    id: "sample-2",
    restaurantName: "Ramen Takumi",
    cuisineType: "Japanese",
    rating: 4,
    location: {
      address: "456 Restaurant Row, Fredericksburg, VA 22401",
      lat: 38.3032,
      lng: -77.4605,
    },
    visitDate: "2024-10-28",
    quickNotes: "Solid ramen spot. Tonkotsu broth was rich and flavorful.",
    dishesOrdered: ["Tonkotsu Ramen", "Gyoza"],
    priceRange: 2,
    tags: ["Comfort Food", "Casual"],
    isFavorite: false,
    wouldRecommend: true,
    createdAt: "2024-10-28T18:30:00.000Z",
    updatedAt: "2024-10-28T18:30:00.000Z",
  },
  {
    id: "sample-3",
    restaurantName: "Taco Fiesta",
    cuisineType: "Mexican",
    rating: 5,
    location: {
      address: "789 Main St, Fredericksburg, VA 22401",
      lat: 38.3013,
      lng: -77.4733,
    },
    visitDate: "2024-10-25",
    quickNotes: "Amazing tacos! Al pastor is incredible.",
    detailedReview:
      "This place serves authentic Mexican street tacos that transport you straight to Mexico City. The al pastor is marinated to perfection and the pineapple adds the perfect sweetness. The house-made salsas are fantastic - try the verde! Service is friendly and prices are very reasonable. They also make great margaritas.",
    dishesOrdered: ["Al Pastor Tacos", "Carnitas Tacos", "Elote", "Margarita"],
    priceRange: 2,
    tags: ["Authentic", "Family-Friendly", "Great Value"],
    isFavorite: true,
    wouldRecommend: true,
    createdAt: "2024-10-25T19:00:00.000Z",
    updatedAt: "2024-10-25T19:00:00.000Z",
  },
  {
    id: "sample-4",
    restaurantName: "The Steakhouse",
    cuisineType: "American",
    rating: 4,
    location: {
      address: "321 Downtown Ave, Fredericksburg, VA 22401",
      lat: 38.3031,
      lng: -77.4605,
    },
    visitDate: "2024-10-20",
    quickNotes: "Great steaks but pricey. Perfect for special occasions.",
    dishesOrdered: ["Ribeye Steak", "Lobster Mac & Cheese", "Caesar Salad"],
    priceRange: 4,
    tags: ["Date Night", "Fine Dining", "Expensive"],
    isFavorite: false,
    wouldRecommend: true,
    createdAt: "2024-10-20T20:00:00.000Z",
    updatedAt: "2024-10-20T20:00:00.000Z",
  },
  {
    id: "sample-5",
    restaurantName: "Pho Garden",
    cuisineType: "Vietnamese",
    rating: 5,
    location: {
      address: "555 College Ave, Fredericksburg, VA 22401",
      lat: 38.2991,
      lng: -77.4791,
    },
    visitDate: "2024-10-15",
    quickNotes: "Best pho in town! Broth is amazing and portions are huge.",
    detailedReview:
      "This is my go-to spot for pho. The broth is simmered for hours and you can taste the depth of flavor. The rare beef pho is my favorite - the meat is tender and fresh herbs make it perfect. Spring rolls are also fantastic. Great for a comforting meal, especially when it's cold out.",
    dishesOrdered: ["Rare Beef Pho", "Spring Rolls", "Vietnamese Coffee"],
    priceRange: 2,
    tags: ["Comfort Food", "Great Value", "Healthy Options"],
    isFavorite: true,
    wouldRecommend: true,
    createdAt: "2024-10-15T12:30:00.000Z",
    updatedAt: "2024-10-15T12:30:00.000Z",
  },
  {
    id: "sample-6",
    restaurantName: "Burger Shack",
    cuisineType: "American",
    rating: 3,
    location: {
      address: "888 Highway 3, Fredericksburg, VA 22401",
      lat: 38.2956,
      lng: -77.4869,
    },
    visitDate: "2024-10-10",
    quickNotes: "Decent burgers, nothing special. Good for a quick bite.",
    priceRange: 2,
    tags: ["Fast Casual", "Quick Bite"],
    isFavorite: false,
    wouldRecommend: false,
    createdAt: "2024-10-10T13:00:00.000Z",
    updatedAt: "2024-10-10T13:00:00.000Z",
  },
];

// Helper function to initialize sample data in localStorage
export function initializeSampleReviews() {
  const STORAGE_KEY = "food-reviews";
  const existingData = localStorage.getItem(STORAGE_KEY);

  // Only add sample data if no data exists
  if (!existingData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReviews));
    return true;
  }
  return false;
}
