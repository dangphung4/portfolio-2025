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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.dangtphung.com/",
    title: "Dang Phung",
    description: "Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me.",
    images: [
      {
        url: "https://dangtphung.com/dangphung.jpg",
        width: 1200,
        height: 630,
        alt: "Dang Phung",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dang Phung",
    description: "Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me.",
    images: ["https://dangtphung.com/dangphung.jpg"],
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
        <meta property="og:url" content="https://www.dangtphung.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dang Phung" />
        <meta property="og:description" content="Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me." />
        <meta property="og:image" content="https://dangtphung.com/dangphung.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="dangtphung.com" />
        <meta property="twitter:url" content="https://www.dangtphung.com/" />
        <meta name="twitter:title" content="Dang Phung" />
        <meta name="twitter:description" content="Hey I'm Dang, a computer science undergraduate pursuing my bachelors at the University of Mary Washington. I am also a software developer with 1 year of professional experience. I am passionate about building web applications and solving real-world problems. Check out my portfolio website to know more about me." />
        <meta name="twitter:image" content="https://dangtphung.com/dangphung.jpg" />
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
