"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="mb-16">
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        <div className="bg-primary/10 p-2 rounded-full">
          <Briefcase className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Work <span className="text-primary">Experience</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 hidden md:block" />

        <div className="space-y-10">
          {config.about.workExperiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 -ml-3.5 h-7 w-7 rounded-full border-4 border-background bg-primary shadow-md shadow-primary/20 hidden md:block z-10" />

              <div className="md:pl-16">
                <Card className="border border-border/40 shadow-md hover:shadow-lg dark:shadow-primary/5 rounded-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
                        <div className="flex items-center mb-3 sm:mb-0">
                          {experience.logoUrl && (
                            <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border border-border/40 shadow-sm">
                              <Image
                                src={experience.logoUrl}
                                alt={experience.company}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <h4 className="text-lg font-semibold">{experience.title}</h4>
                            <Link
                              href={experience.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                            >
                              {experience.company}
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1.5">
                          <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {experience.years}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {experience.contributions.map((contribution, i) => (
                          <li key={i} className="pl-5 relative before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/70">
                            {contribution}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Colored accent bar at the bottom */}
                    <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/30"></div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

