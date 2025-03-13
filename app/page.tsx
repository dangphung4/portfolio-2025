"use client"

import Hero from "@/components/home/hero"
import FeaturedProjects from "@/components/home/featured-projects"
import Skills from "@/components/home/skills"
import Testimonials from "@/components/home/testimonials"
import Contact from "@/components/home/contact"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Testimonials />
      <Contact />
      <Toaster />
    </main>
  )
}

