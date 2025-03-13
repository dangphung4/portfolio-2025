"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Laptop, Briefcase, User, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Map social icons
  const socialIcons: Record<string, ReactNode> = {
    GitHub: <Github className="h-5 w-5" />,
    LinkedIn: <Linkedin className="h-5 w-5" />,
    Email: <Mail className="h-5 w-5" />
  }

  return (
    <section className="mb-16">
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        ref={ref}
      >
        About <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Image with Card */}
        <motion.div
          className="lg:col-span-4 order-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full border-none shadow-lg overflow-hidden bg-[#0c0c0c] rounded-xl">
            <CardContent className="p-0">
              <div className="relative aspect-square w-full">
                <Image 
                  src="/dangphungfull.jpg" 
                  alt={config.me.name} 
                  fill 
                  className="object-cover" 
                  priority
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-1">{config.me.name}</h3>
                <p className="text-muted-foreground mb-4">{config.me.job}</p>
                <div className="flex justify-center gap-6 mt-4">
                  {Object.entries(config.socials).map(([platform, url]) => (
                    <Link
                      key={platform} 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={platform}
                    >
                      {socialIcons[platform] || platform}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* About Content */}
        <motion.div
          className="lg:col-span-8 order-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full border-none shadow-lg bg-[#0c0c0c] rounded-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-2.5 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Who I Am</h3>
              </div>
              
              <div className="space-y-4 mb-10">
                {config.me.about.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center text-center p-5 bg-[#111111] rounded-xl hover:bg-[#151515] transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">{config.me.yearsOfExperience}+</span>
                  <span className="text-sm text-muted-foreground">Years Experience</span>
                </div>

                <div className="flex flex-col items-center text-center p-5 bg-[#111111] rounded-xl hover:bg-[#151515] transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">{config.projects.length}+</span>
                  <span className="text-sm text-muted-foreground">Projects</span>
                </div>

                <div className="flex flex-col items-center text-center p-5 bg-[#111111] rounded-xl hover:bg-[#151515] transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">{config.about.skills.length}+</span>
                  <span className="text-sm text-muted-foreground">Technologies</span>
                </div>
              </div>
              
              {config.me.resumeLink && (
                <div className="mt-8 flex justify-end">
                  <Link 
                    href={config.me.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    View Resume <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

