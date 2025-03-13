"use client"

import Link from "next/link"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Badge } from "@/components/ui/badge"

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Group skills by category
  const categories = [
    { name: "Languages", skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "HTML5", "CSS3"] },
    {
      name: "Frameworks",
      skills: ["React.js", "Next.js", "Express.js", "React Native", "FastAPI", "Blazor", "ASP.NET Core", "Node.js"],
    },
    { name: "Databases", skills: ["MongoDB", "PostgreSQL", "SQLite"] },
    { name: "Tools", skills: ["Git", "Docker", "Kubernetes", "AWS", "Azure"] },
  ]

  return (
    <section id="skills" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            My <span className="text-primary">Skills</span>
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
            Technologies and tools I work with
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skillName, index) => {
                    const skill = config.about.skills.find((s) => s.title === skillName)
                    if (!skill) return null

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + categoryIndex * 0.1 + index * 0.05,
                          type: "spring",
                          stiffness: 100,
                        }}
                      >
                        <Badge
                          variant="outline"
                          className="py-2 px-4 text-sm font-medium bg-background hover:bg-muted transition-colors cursor-default"
                        >
                          {skill.title}
                        </Badge>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-8 text-muted-foreground"
          >
            <p>
              And many more! Check out my{" "}
              <Link href="/profile" className="text-primary hover:underline">
                profile
              </Link>{" "}
              for a complete list.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

