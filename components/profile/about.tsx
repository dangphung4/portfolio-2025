"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Laptop, Rocket } from "lucide-react"
import Image from "next/image"

export default function About() {
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
        About <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="space-y-4">
                {config.me.about.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">{config.me.yearsOfExperience}+</span>
                  <span className="text-sm text-muted-foreground">Years Experience</span>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Laptop className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">{config.projects.length}+</span>
                  <span className="text-sm text-muted-foreground">Projects</span>
                </div>

                <div className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg">
                  <div className="bg-primary/10 p-3 rounded-full mb-3">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg font-semibold">{config.about.skills.length}+</span>
                  <span className="text-sm text-muted-foreground">Technologies</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full border-primary/20 hover:border-primary/50 transition-colors overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image src="/placeholder.svg?height=600&width=450" alt={config.me.name} fill className="object-cover" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

