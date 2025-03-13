"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Experience() {
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
        Work <span className="text-primary">Experience</span>
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-primary/20 hidden md:block" />

        <div className="space-y-8">
          {config.about.workExperiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-8 -ml-3.5 h-7 w-7 rounded-full border-4 border-background bg-primary hidden md:block" />

              <div className="md:pl-16">
                <Card className="border-primary/20 hover:border-primary/50 transition-colors overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center mb-2 sm:mb-0">
                          {experience.logoUrl && (
                            <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden border">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
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
                              className="text-sm text-primary hover:underline"
                            >
                              {experience.company}
                            </Link>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {experience.years}
                        </span>
                      </div>

                      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                        {experience.contributions.map((contribution, i) => (
                          <li key={i}>{contribution}</li>
                        ))}
                      </ul>
                    </div>
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

