"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProjects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [imagesLoading, setImagesLoading] = useState(true)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 24 },
      },
    },
    slides: { perView: 1, spacing: 16 },
  })

  // Only show first 6 projects in the carousel
  const featuredProjects = config.projects.slice(0, 6)

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="projects" className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            Featured <span className="text-primary">Projects</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Some of my recent work
          </motion.p>
        </div>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {featuredProjects.map((project, index) => (
              <div key={index} className="keen-slider__slide">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
                    <div className="relative h-48 w-full overflow-hidden">
                      {imagesLoading ? (
                        <Skeleton className="w-full h-full rounded-none" />
                      ) : (
                        <Image
                          src={project.image || "/placeholder.svg?height=192&width=384"}
                          alt={project.appName}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                    </div>
                    <CardContent className="flex-grow p-6">
                      <h3 className="text-xl font-bold mb-2">{project.appName}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{project.about}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex gap-3">
                      <Button asChild variant="default" size="sm" className="flex-1 rounded-full">
                        <Link href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Project
                        </Link>
                      </Button>
                      {project.codeUrl && (
                        <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                          <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        <div className="flex justify-center mt-8">
          {loaded && instanceRef.current && (
            <div className="flex gap-2">
              {Array.from(
                { length: instanceRef.current.track.details.slides.length },
                (_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentSlide === idx ? "bg-primary w-4" : "bg-muted-foreground/30",
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

