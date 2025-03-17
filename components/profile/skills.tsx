"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, Code, Layout, Server, Database, Terminal } from "lucide-react"

// Skill category definitions with icons
const categories = [
  { 
    name: "Languages", 
    icon: <Code className="h-4 w-4" />,
    color: "bg-rose-500/90 dark:bg-amber-600/90",
    lightColor: "bg-rose-50 dark:bg-amber-950/30",
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "HTML5", "CSS3"] 
  },
  { 
    name: "Frontend", 
    icon: <Layout className="h-4 w-4" />,
    color: "bg-purple-500/90 dark:bg-blue-600/90",
    lightColor: "bg-purple-50 dark:bg-blue-950/30",
    skills: ["React.js", "Next.js", "Blazor", "React Native", "TailwindCSS", "Bootstrap", "MaterialUI", "Chakra UI"] 
  },
  { 
    name: "Backend", 
    icon: <Server className="h-4 w-4" />,
    color: "bg-pink-500/90 dark:bg-emerald-600/90",
    lightColor: "bg-pink-50 dark:bg-emerald-950/30",
    skills: ["Node.js", "Express.js", "FastAPI", "ASP.NET Core", "GraphQL", "Flask", "Django"] 
  },
  { 
    name: "Databases", 
    icon: <Database className="h-4 w-4" />,
    color: "bg-fuchsia-500/90 dark:bg-purple-600/90",
    lightColor: "bg-fuchsia-50 dark:bg-purple-950/30",
    skills: ["MongoDB", "PostgreSQL", "SQLite"] 
  },
  { 
    name: "DevOps & Tools", 
    icon: <Terminal className="h-4 w-4" />,
    color: "bg-primary/90 dark:bg-orange-600/90",
    lightColor: "bg-primary/10 dark:bg-orange-950/30",
    skills: ["Git", "Docker", "Kubernetes", "AWS", "Azure", "Ubuntu", "Red Hat Linux", "Rocky Linux", "MacOS", "Windows"] 
  },
]

// Color map for individual skills
const skillColors: Record<string, { bg: string, text: string, border: string, hoverBg: string }> = {
  "JavaScript": { bg: "bg-yellow-100 dark:bg-yellow-900/20", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-700", hoverBg: "hover:bg-yellow-200 dark:hover:bg-yellow-800/30" },
  "TypeScript": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "Python": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "C#": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-700", hoverBg: "hover:bg-purple-200 dark:hover:bg-purple-800/30" },
  "Java": { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-700", hoverBg: "hover:bg-orange-200 dark:hover:bg-orange-800/30" },
  "HTML5": { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-700", hoverBg: "hover:bg-orange-200 dark:hover:bg-orange-800/30" },
  "CSS3": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "React.js": { bg: "bg-cyan-100 dark:bg-cyan-900/20", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-700", hoverBg: "hover:bg-cyan-200 dark:hover:bg-cyan-800/30" },
  "Next.js": { bg: "bg-gray-100 dark:bg-gray-800/40", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700", hoverBg: "hover:bg-gray-200 dark:hover:bg-gray-700/50" },
  "Express.js": { bg: "bg-gray-100 dark:bg-gray-800/40", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700", hoverBg: "hover:bg-gray-200 dark:hover:bg-gray-700/50" },
  "React Native": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "FastAPI": { bg: "bg-teal-100 dark:bg-teal-900/20", text: "text-teal-600 dark:text-teal-400", border: "border-teal-200 dark:border-teal-700", hoverBg: "hover:bg-teal-200 dark:hover:bg-teal-800/30" },
  "Flask": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "Django": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "Blazor": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-700", hoverBg: "hover:bg-purple-200 dark:hover:bg-purple-800/30" },
  "ASP.NET Core": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-700", hoverBg: "hover:bg-purple-200 dark:hover:bg-purple-800/30" },
  "Node.js": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "MongoDB": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "PostgreSQL": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "SQLite": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "AWS": { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-700", hoverBg: "hover:bg-orange-200 dark:hover:bg-orange-800/30" },
  "Azure": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "Docker": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "Kubernetes": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "Git": { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-700", hoverBg: "hover:bg-orange-200 dark:hover:bg-orange-800/30" },
  "TailwindCSS": { bg: "bg-cyan-100 dark:bg-cyan-900/20", text: "text-cyan-600 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-700", hoverBg: "hover:bg-cyan-200 dark:hover:bg-cyan-800/30" },
  "Bootstrap": { bg: "bg-purple-100 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-700", hoverBg: "hover:bg-purple-200 dark:hover:bg-purple-800/30" },
  "MaterialUI": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
  "Chakra UI": { bg: "bg-teal-100 dark:bg-teal-900/20", text: "text-teal-600 dark:text-teal-400", border: "border-teal-200 dark:border-teal-700", hoverBg: "hover:bg-teal-200 dark:hover:bg-teal-800/30" },
  "GraphQL": { bg: "bg-pink-100 dark:bg-pink-900/20", text: "text-pink-600 dark:text-pink-400", border: "border-pink-200 dark:border-pink-700", hoverBg: "hover:bg-pink-200 dark:hover:bg-pink-800/30" },
  "Ubuntu": { bg: "bg-orange-100 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-700", hoverBg: "hover:bg-orange-200 dark:hover:bg-orange-800/30" },
  "Red Hat Linux": { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-600 dark:text-red-400", border: "border-red-200 dark:border-red-700", hoverBg: "hover:bg-red-200 dark:hover:bg-red-800/30" },
  "Rocky Linux": { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-600 dark:text-green-400", border: "border-green-200 dark:border-green-700", hoverBg: "hover:bg-green-200 dark:hover:bg-green-800/30" },
  "MacOS": { bg: "bg-gray-100 dark:bg-gray-800/40", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700", hoverBg: "hover:bg-gray-200 dark:hover:bg-gray-700/50" },
  "Windows": { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-700", hoverBg: "hover:bg-blue-200 dark:hover:bg-blue-800/30" },
}

export default function ProfileSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories.map(c => c.name))

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    )
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 250, damping: 20 }
    }
  }

  return (
    <section className="mb-16">
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-2 rounded-full">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </div>

        <div className="grid gap-4 w-full">
          {categories.map((category, index) => {
            const isExpanded = expandedCategories.includes(category.name)
            
            return (
            <motion.div
              key={category.name}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={cn(
                  "overflow-hidden rounded-lg border shadow-sm w-full",
                  "border-border/40 transition-all duration-300"
                )}
              >
                {/* Category Header */}
                <button 
                  onClick={() => toggleCategory(category.name)} 
                  className={cn(
                    "w-full flex items-center justify-between p-3",
                    "text-white font-medium text-left text-sm",
                    "cursor-pointer transition-all",
                    category.color
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-white/30 p-1.5 rounded-md">
                      {category.icon}
                    </div>
                    <span>{category.name}</span>
                  </div>
                  <div className="bg-white/30 p-1 rounded-md">
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </button>
                
                {/* Skills Container */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className={cn("p-4", category.lightColor)}>
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex flex-wrap gap-2"
                        >
                          {category.skills.map((skillName) => {
                            const skill = config.about.skills.find(s => s.title === skillName)
                            if (!skill) return null
                            
                            const colorStyle = skillColors[skill.title] || {
                              bg: "bg-gray-100 dark:bg-gray-800/40", 
                              text: "text-gray-700 dark:text-gray-300", 
                              border: "border-gray-200 dark:border-gray-700",
                              hoverBg: "hover:bg-gray-200 dark:hover:bg-gray-700/50"
                            }
                            
                            return (
                          <motion.div
                                key={skill.title}
                                variants={itemVariants}
                                className={cn(
                                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md",
                                  "text-sm font-medium border transition-all",
                                  "shadow-sm hover:shadow transform hover:-translate-y-0.5",
                                  colorStyle.bg, colorStyle.text, colorStyle.border, colorStyle.hoverBg
                                )}
                              >
                                <i className={`devicon-${skill.icon} text-base`}></i>
                                <span>{skill.title}</span>
                              </motion.div>
                            )
                          })}
                        </motion.div>
                      </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
        </div>
      </motion.div>
    </section>
  )
} 