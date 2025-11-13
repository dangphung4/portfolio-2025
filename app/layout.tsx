import type { Metadata } from "next";
import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/navbar";
import MobileNav from "@/components/layout/mobile-nav";
import Footer from "@/components/layout/footer";
import { config } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(config.website),
  title: {
    default: `${config.app.site_name} - ${config.me.job}`,
    template: `%s | ${config.app.site_name}`,
  },
  description: config.app.long_description,
  keywords: config.app.keywords,
  authors: [{ name: config.app.author }],
  creator: config.app.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.website,
    siteName: config.app.site_name,
    title: config.app.site_name,
    description: config.app.long_description,
    images: [
      {
        url: `${config.website}/social/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: config.app.site_name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.app.site_name,
    description: config.app.long_description,
    creator: config.app.twitter_handle,
    images: [`${config.website}/social/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            {children}
            <MobileNav />
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
