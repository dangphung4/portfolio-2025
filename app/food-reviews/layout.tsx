import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Food Reviews",
  description: "My personal collection of restaurant reviews and food adventures. Discover great restaurants and dishes from around the world.",
  keywords: "food reviews, restaurant reviews, dining experiences, food blog, restaurant recommendations, cuisine reviews",
  openGraph: {
    title: "Food Reviews | " + config.app.site_name,
    description: "My personal collection of restaurant reviews and food adventures.",
    type: "website",
    url: `${config.website}/food-reviews`,
    images: [
      {
        url: `${config.website}/social/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Food Reviews",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Reviews | " + config.app.site_name,
    description: "My personal collection of restaurant reviews and food adventures.",
    images: [`${config.website}/social/og-image.jpg`],
  },
};

export default function FoodReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
