"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, GraduationCap, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    <section id="experience" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            My <span className="text-primary">Experience</span>
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
            My professional journey and education
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work Experience */}
          <div>
            <div className="flex items-center mb-8">
              <Briefcase className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Work Experience</h3>
            </div>

            <div className="space-y-6">
              {config.about.workExperiences.map((experience, index) => {
                const promotion = isPromotion(index)
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={promotion ? "relative pt-6" : ""}
                  >
                    {promotion && (
                      <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-primary/30 to-primary/20 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-primary/50 shadow-lg">
                          <span className="text-xs font-bold text-primary inline-flex items-center gap-1.5 uppercase tracking-wide">
                            <TrendingUp className="h-4 w-4" />
                            Promoted from {getCompanyName(config.about.workExperiences[index + 1].title)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <Card className={`transition-colors overflow-hidden ${
                      promotion 
                        ? "border-2 border-primary/60 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent hover:border-primary/80 ring-2 ring-primary/20 shadow-xl shadow-primary/10" 
                        : "border-primary/20 hover:border-primary/50"
                    }`}>
                      <CardContent className="p-0">
                        <div className={`p-6 ${promotion ? "pt-7" : ""}`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                            <div className="flex items-center mb-2 sm:mb-0">
                              {experience.logoUrl && (
                                <div className={`relative w-10 h-10 mr-3 rounded-full overflow-hidden border ${
                                  promotion ? "border-primary ring-4 ring-primary/30" : ""
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
                                  className={`text-sm hover:underline ${promotion ? "text-primary font-semibold" : "text-primary"}`}
                                >
                                  {experience.company}
                                </Link>
                              </div>
                            </div>
                            <span className={`text-sm px-3 py-1.5 rounded-full ${
                              promotion 
                                ? "bg-primary/20 text-primary font-bold ring-2 ring-primary/40" 
                                : "text-muted-foreground bg-muted"
                            }`}>
                              {experience.years}
                            </span>
                          </div>

                          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {experience.contributions.map((contribution, i) => (
                              <li key={i}>{contribution}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className={`${promotion ? "h-1.5" : "h-0"} ${
                          promotion 
                            ? "bg-gradient-to-r from-primary via-primary to-primary/70" 
                            : ""
                        }`}></div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-6">
              {config.about.educationDetails.map((education, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
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
                        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {education.years}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{education.address}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

