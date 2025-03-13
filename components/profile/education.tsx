"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="mb-16">
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        <span className="text-primary">Education</span>
      </motion.h2>

      <div className="space-y-8">
        {config.about.educationDetails.map((education, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-center mb-2 sm:mb-0">
                    {education.logoUrl && (
                      <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden border">
                        <Image
                          src={education.logoUrl}
                          alt={education.institute}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold">{education.title}</h4>
                      <Link
                        href={education.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {education.institute}
                      </Link>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">{education.years}</span>
                </div>

                <p className="text-sm text-muted-foreground">{education.address}</p>
              </CardContent>
              {/* need to add education.gpa as well */}
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

