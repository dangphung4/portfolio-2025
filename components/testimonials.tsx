"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6 text-primary">
                    <Quote className="h-8 w-8 opacity-50" />
                  </div>

                  <p className="text-muted-foreground text-sm italic flex-grow mb-6">"{testimonial.message}"</p>

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
          ))}
        </div>
      </div>
    </section>
  )
}

