import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food Reviews",
  description:
    "My personal collection of restaurant reviews and food adventures. Quick ratings and in-depth reviews of places I've visited.",
  openGraph: {
    title: "Food Reviews | Dang Phung",
    description:
      "Explore my food journey through restaurant reviews, ratings, and recommendations.",
    type: "website",
  },
};

export default function FoodReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
