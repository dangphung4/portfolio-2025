"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ExternalLink, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="mb-16">
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <GraduationCap className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-primary">Education</span>
        </h2>
      </motion.div>

      <div className="space-y-8">
        {config.about.educationDetails.map((education, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-primary/20 hover:border-primary/50 transition-colors overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center mb-2 sm:mb-0">
                      {education.logoUrl && (
                        <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden border">
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
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {education.institute}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">{education.years}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <p className="text-sm text-muted-foreground">{education.address}</p>
                    {education.gpa && (
                      <div className="mt-2 sm:mt-0 flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">GPA: {education.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Optional: Add a colored accent bar at the bottom */}
                <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

