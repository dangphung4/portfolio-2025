"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { config } from "@/lib/config"
import { 
  Code, 
  Database, 
  Layers, 
  Terminal, 
} from "lucide-react"
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

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  // Map category names to icons
  const categoryIcons = {
    "Languages": <Code className="h-5 w-5" />,
    "Frameworks": <Layers className="h-5 w-5" />,
    "Databases": <Database className="h-5 w-5" />,
    "Tools": <Terminal className="h-5 w-5" />,
  }

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
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + categoryIndex * 0.1 }}
                className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-primary/10 rounded-full text-primary">
                    {categoryIcons[category.name as keyof typeof categoryIcons]}
                  </div>
                  <h3 className="text-xl font-semibold text-primary">{category.name}</h3>
                </div>
                
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-12 text-muted-foreground"
          >
            <p className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-primary/10 inline-block">
              And many more! Check out my{" "}
              <Link href="/profile" className="text-primary hover:underline font-medium">
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

