"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Education() {
  const ref = useRef(null)

  return (
    <div className="space-y-8" ref={ref}>
      {config.about.educationDetails.map((education, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 * index }}
        >
          <Card className="border-primary/20 hover:border-primary/50 transition-colors overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                  <div className="flex items-center mb-2 sm:mb-0">
                    {education.logoUrl && (
                      <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden border border-border/40 shadow-sm flex-shrink-0">
                        <Image
                          src={education.logoUrl}
                          alt={education.institute}
                          fill
                          className="object-cover"
                          sizes="48px"
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
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0">
                    {/* "In Progress" badge */}
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-medium">In Progress (Spring 2026)</span>
                    </div>
                    {education.gpa && (
                      <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">GPA: {education.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* colored accent bar at the bottom */}
              <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

