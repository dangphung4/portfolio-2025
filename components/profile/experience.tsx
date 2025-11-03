"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Experience() {
  const ref = useRef(null)

  const getCompanyName = (company: string) => {
    return company.replace(/\s*\(.*?\)\s*$/, "").trim()
  }

  const isPromotion = (index: number) => {
    const experiences = config.about.workExperiences
    if (index >= experiences.length - 1) return false
    const currentCompany = getCompanyName(experiences[index].company)
    const nextCompany = getCompanyName(experiences[index + 1].company)
    return currentCompany === nextCompany
  }

  return (
    <div className="relative" ref={ref}>
      {/* Timeline line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 hidden md:block" />

      <div className="space-y-10">
        {config.about.workExperiences.map((experience, index) => {
          const promotion = isPromotion(index)
          const nextIsPromotion = index < config.about.workExperiences.length - 1 && isPromotion(index + 1)
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <div className={`absolute left-6 top-8 -ml-3.5 h-7 w-7 rounded-full border-4 border-background shadow-md hidden md:block z-10 ${
                promotion 
                  ? "bg-gradient-to-br from-amber-400 via-primary to-primary shadow-amber-400/30 ring-2 ring-amber-400/30" 
                  : "bg-primary shadow-primary/20"
              }`} />

              {!nextIsPromotion && index < config.about.workExperiences.length - 1 && (
                <div className="absolute left-6 top-8 bottom-0 -ml-px w-0.5 bg-gradient-to-b from-transparent via-primary/50 to-primary/10 hidden md:block z-0" style={{ top: 'calc(2rem + 14px)' }} />
              )}
              
              {nextIsPromotion && index < config.about.workExperiences.length - 1 && (
                <div className="absolute left-6 bottom-0 -ml-px w-0.5 bg-gradient-to-b from-amber-400/40 via-primary/40 to-primary/20 hidden md:block z-0" style={{ top: 'calc(2rem + 14px)' }} />
              )}

              <div className="md:pl-16">
                <Card className={`border shadow-md hover:shadow-lg dark:shadow-primary/5 rounded-xl transition-all duration-300 overflow-hidden ${
                  promotion 
                    ? "border-primary/60 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent ring-2 ring-primary/30" 
                    : "border-border/40"
                }`}>
                  <CardContent className="p-0">
                    {promotion && (
                      <div className="bg-gradient-to-r from-primary/20 via-primary/15 to-primary/10 px-6 py-3 border-b border-primary/30">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold text-primary">Promoted from {getCompanyName(config.about.workExperiences[index + 1].title)}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5">
                        <div className="flex items-center mb-3 sm:mb-0">
                          {experience.logoUrl && (
                            <div className={`relative w-12 h-12 mr-4 rounded-full overflow-hidden border shadow-sm ${
                              promotion ? "border-primary ring-4 ring-primary/20" : "border-border/40"
                            }`}>
                              <Image
                                src={experience.logoUrl}
                                alt={experience.company}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className={`text-lg font-semibold ${promotion ? "text-primary" : ""}`}>{experience.title}</h4>
                            </div>
                            <Link
                              href={experience.link || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1 font-medium"
                            >
                              {experience.company}
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-1.5">
                          <span className={`text-sm font-medium px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 ${
                            promotion 
                              ? "bg-primary/20 text-primary ring-2 ring-primary/30" 
                              : "bg-primary/10 text-primary"
                          }`}>
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
                    <div className={`h-1.5 ${
                      promotion 
                        ? "bg-gradient-to-r from-primary via-primary to-primary/70" 
                        : "bg-gradient-to-r from-primary/80 to-primary/30"
                    }`}></div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

