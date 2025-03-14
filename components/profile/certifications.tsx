"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Award, ExternalLink, Calendar, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Certifications() {
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
          <Award className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="text-primary">Certifications</span> & Achievements
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {config.about.certificationsAndAchievements.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="border-primary/20 hover:border-primary/50 transition-colors overflow-hidden h-full">
              <CardContent className="p-0 h-full flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {cert.logoUrl ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-border/40 shadow-sm flex-shrink-0 bg-white">
                          <Image
                            src={cert.logoUrl}
                            alt={cert.title}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        </div>
                      ) : (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border/40 shadow-sm flex-shrink-0 bg-primary/10 flex items-center justify-center">
                          {cert.title.includes("Hackathon") ? (
                            <Trophy className="h-5 w-5 text-primary" />
                          ) : (
                            <Award className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      )}
                      <div>
                        <h4 className="text-lg font-semibold">{cert.title}</h4>
                        <Link
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {cert.organization}
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {cert.date}
                    </span>
                  </div>
                  
                  {cert.inProgress && (
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full mb-3 w-fit">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-medium">In Progress</span>
                    </div>
                  )}
                  
                  {cert.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {cert.description}
                    </p>
                  )}
                  
                  {cert.credentialId && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}
                </div>
                
                {/* colored accent bar at the bottom */}
                <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/30 mt-auto"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
} 