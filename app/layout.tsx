import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/navbar";
import MobileNav from "@/components/layout/mobile-nav";
import Footer from "@/components/layout/footer";
import type { Metadata } from "next";
import { config } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.app.site_name,
  description: config.app.description,
  keywords: config.app.keywords,
  authors: [{ name: config.app.author }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.website,
    title: config.app.site_name,
    description: config.app.long_description,
    siteName: config.app.site_name,
    images: [
      {
        url: `${config.website}/dangphung.jpg`,
        width: 1200,
        height: 630,
        alt: config.app.author,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.site_name,
    description: config.app.description,
    creator: config.app.twitter_handle,
    images: [`${config.website}/dangphung.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <meta property="og:image" content={`${config.website}/dangphung.jpg`} />
        <meta name="twitter:image" content={`${config.website}/dangphung.jpg`} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <MobileNav />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
