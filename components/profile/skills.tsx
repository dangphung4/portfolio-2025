"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"

// Custom skill badge component
const SkillBadge = ({ 
  skill, 
  isActive, 
  onHoverStart, 
  onHoverEnd 
}: { 
  skill: { title: string; icon: string }; 
  isActive: boolean; 
  onHoverStart: () => void; 
  onHoverEnd: () => void;
}) => {
  // Map skill names to colors
  const skillColors: Record<string, string> = {
    "JavaScript": "text-yellow-500 border-yellow-500/30 bg-yellow-500/5",
    "TypeScript": "text-blue-500 border-blue-500/30 bg-blue-500/5",
    "Python": "text-green-500 border-green-500/30 bg-green-500/5",
    "C#": "text-purple-500 border-purple-500/30 bg-purple-500/5",
    "Java": "text-orange-500 border-orange-500/30 bg-orange-500/5",
    "HTML5": "text-orange-600 border-orange-600/30 bg-orange-600/5",
    "CSS3": "text-blue-600 border-blue-600/30 bg-blue-600/5",
    "React.js": "text-cyan-500 border-cyan-500/30 bg-cyan-500/5",
    "Next.js": "text-gray-700 dark:text-gray-300 border-gray-500/30 bg-gray-500/5",
    "Express.js": "text-gray-600 border-gray-600/30 bg-gray-600/5",
    "React Native": "text-blue-400 border-blue-400/30 bg-blue-400/5",
    "FastAPI": "text-teal-500 border-teal-500/30 bg-teal-500/5",
    "Blazor": "text-purple-600 border-purple-600/30 bg-purple-600/5",
    "ASP.NET Core": "text-purple-500 border-purple-500/30 bg-purple-500/5",
    "Node.js": "text-green-600 border-green-600/30 bg-green-600/5",
    "MongoDB": "text-green-500 border-green-500/30 bg-green-500/5",
    "PostgreSQL": "text-blue-600 border-blue-600/30 bg-blue-600/5",
    "SQLite": "text-blue-400 border-blue-400/30 bg-blue-400/5",
    "AWS": "text-orange-500 border-orange-500/30 bg-orange-500/5",
    "Azure": "text-blue-500 border-blue-500/30 bg-blue-500/5",
    "Docker": "text-blue-500 border-blue-500/30 bg-blue-500/5",
    "Kubernetes": "text-blue-600 border-blue-600/30 bg-blue-600/5",
    "Git": "text-orange-600 border-orange-600/30 bg-orange-600/5",
    "TailwindCSS": "text-blue-500 border-blue-500/30 bg-blue-500/5",
    "Bootstrap": "text-purple-500 border-purple-500/30 bg-purple-500/5",
    "MaterialUI": "text-blue-500 border-blue-500/30 bg-blue-500/5",
    "GraphQL": "text-purple-500 border-purple-500/30 bg-purple-500/5",
  }

  const colorClass = skillColors[skill.title] || "border-primary/20 bg-primary/5"

  return (
    <motion.div 
      className={cn(
        "relative py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-300 cursor-pointer",
        "hover:shadow-md hover:-translate-y-1 hover:border-opacity-80",
        colorClass,
        isActive ? "shadow-md ring-1 ring-primary/50 scale-105" : ""
      )}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2.5">
        <i className={`devicon-${skill.icon} text-xl`}></i>
        <span>{skill.title}</span>
      </div>
    </motion.div>
  )
}

// Skill descriptions
const skillDescriptions: Record<string, string> = {
  "JavaScript": "Dynamic language for web development",
  "TypeScript": "Typed superset of JavaScript",
  "Python": "Versatile language for various applications",
  "C#": "Object-oriented language for .NET",
  "Java": "Platform-independent OOP language",
  "HTML5": "Markup language for web pages",
  "CSS3": "Style sheet language for web design",
  "React.js": "UI library for building interfaces",
  "Next.js": "React framework for production",
  "Express.js": "Web framework for Node.js",
  "React Native": "Framework for building native apps",
  "FastAPI": "Modern, fast web framework for Python",
  "Blazor": "Web framework using C# and .NET",
  "ASP.NET Core": "Cross-platform .NET framework",
  "Node.js": "JavaScript runtime for server-side",
  "MongoDB": "NoSQL document database",
  "PostgreSQL": "Advanced open-source SQL database",
  "SQLite": "Self-contained, serverless SQL database",
  "Git": "Version control system",
  "Docker": "Container platform",
  "Kubernetes": "Container orchestration",
  "AWS": "Cloud computing services",
  "Azure": "Microsoft's cloud platform",
  "TailwindCSS": "Utility-first CSS framework",
  "Bootstrap": "Popular HTML, CSS, and JS library",
  "MaterialUI": "React components for faster, beautiful, and accessible web apps",
  "GraphQL": "Query language for APIs",
}

export default function ProfileSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  // Skill categories for grouping
  const categories = [
    { name: "Languages", skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "HTML5", "CSS3"] },
    { name: "Frontend", skills: ["React.js", "Next.js", "Blazor", "React Native", "TailwindCSS", "Bootstrap", "MaterialUI"] },
    { name: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "ASP.NET Core", "GraphQL"] },
    { name: "Databases", skills: ["MongoDB", "PostgreSQL", "SQLite"] },
    { name: "DevOps", skills: ["Git", "Docker", "Kubernetes", "AWS", "Azure"] },
  ]

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            Technical <span className="text-primary">Skills</span>
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-primary mb-6 rounded-full"
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
            A comprehensive list of technologies I&apos;ve worked with
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              custom={categoryIndex}
              variants={categoryVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-10"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary border-b border-primary/20 pb-2">
                {category.name}
              </h3>
              
              <motion.div 
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {category.skills.map((skillName, index) => {
                  const skill = config.about.skills.find((s) => s.title === skillName)
                  if (!skill) return null

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative"
                    >
                      <SkillBadge 
                        skill={skill} 
                        isActive={activeSkill === skillName}
                        onHoverStart={() => setActiveSkill(skillName)}
                        onHoverEnd={() => setActiveSkill(null)}
                      />
                      
                      {/* Skill tooltip */}
                      <AnimatePresence>
                        {activeSkill === skillName && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-background/95 backdrop-blur-md border shadow-lg rounded-lg p-3 w-48 text-xs"
                          >
                            <p className="font-medium mb-1">{skill.title}</p>
                            <p className="text-muted-foreground">
                              {skillDescriptions[skillName] || `Expertise in ${skillName}`}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 