"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % config.testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + config.testimonials.length) % config.testimonials.length)
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            <span className="text-primary">Testimonials</span>
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
            What people say about working with me
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative h-[400px] md:h-[300px]">
            <AnimatePresence mode="wait">
              {config.testimonials.map(
                (testimonial, index) =>
                  index === activeIndex && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-6 md:p-8 flex flex-col h-full">
                          <div className="mb-6 text-primary">
                            <Quote className="h-8 w-8 opacity-50" />
                          </div>

                          <p className="text-muted-foreground text-base md:text-lg italic flex-grow mb-6">
                            "{testimonial.message}"
                          </p>

                          <div className="flex items-center">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border mr-4">
                              <Image
                                src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <Link
                                href={testimonial.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold hover:text-primary transition-colors"
                              >
                                {testimonial.name}
                              </Link>
                              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2 items-center">
              {config.testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    activeIndex === idx ? "bg-primary w-4" : "bg-muted-foreground/30",
                  )}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full bg-background/80 backdrop-blur-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

