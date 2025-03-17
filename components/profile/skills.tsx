"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { Code, Layout, Server, Database, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { 
    name: "Languages", 
    icon: <Code className="h-5 w-5 text-primary" />,
    skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "HTML5", "CSS3"] 
  },
  { 
    name: "Frontend", 
    icon: <Layout className="h-5 w-5 text-primary" />,
    skills: ["React.js", "Next.js", "Blazor", "React Native", "TailwindCSS", "Bootstrap", "MaterialUI", "Chakra UI"] 
  },
  { 
    name: "Backend", 
    icon: <Server className="h-5 w-5 text-primary" />,
    skills: ["Node.js", "Express.js", "FastAPI", "ASP.NET Core", "GraphQL", "Flask", "Django"] 
  },
  { 
    name: "Databases", 
    icon: <Database className="h-5 w-5 text-primary" />,
    skills: ["MongoDB", "PostgreSQL", "SQLite"] 
  },
  { 
    name: "DevOps & Tools", 
    icon: <Terminal className="h-5 w-5 text-primary" />,
    skills: ["Git", "Docker", "Kubernetes", "AWS", "Azure", "Ubuntu", "Red Hat Linux", "Rocky Linux", "MacOS", "Windows"] 
  },
]

const skillColors: Record<string, { bg: string, text: string, border: string }> = {
  "JavaScript": { bg: "bg-yellow-100/80 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800/40" },
  "TypeScript": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "Python": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "C#": { bg: "bg-purple-100/80 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800/40" },
  "Java": { bg: "bg-orange-100/80 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800/40" },
  "HTML5": { bg: "bg-orange-100/80 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800/40" },
  "CSS3": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "React.js": { bg: "bg-cyan-100/80 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800/40" },
  "Next.js": { bg: "bg-gray-100/80 dark:bg-gray-800/30", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700/40" },
  "Express.js": { bg: "bg-gray-100/80 dark:bg-gray-800/30", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700/40" },
  "React Native": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "FastAPI": { bg: "bg-teal-100/80 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", border: "border-teal-200 dark:border-teal-800/40" },
  "Flask": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "Django": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "Blazor": { bg: "bg-purple-100/80 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800/40" },
  "ASP.NET Core": { bg: "bg-purple-100/80 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800/40" },
  "Node.js": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "MongoDB": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "PostgreSQL": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "SQLite": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "AWS": { bg: "bg-orange-100/80 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800/40" },
  "Azure": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "Docker": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "Kubernetes": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "Git": { bg: "bg-orange-100/80 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800/40" },
  "TailwindCSS": { bg: "bg-cyan-100/80 dark:bg-cyan-900/30", text: "text-cyan-700 dark:text-cyan-400", border: "border-cyan-200 dark:border-cyan-800/40" },
  "Bootstrap": { bg: "bg-purple-100/80 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800/40" },
  "MaterialUI": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
  "Chakra UI": { bg: "bg-teal-100/80 dark:bg-teal-900/30", text: "text-teal-700 dark:text-teal-400", border: "border-teal-200 dark:border-teal-800/40" },
  "GraphQL": { bg: "bg-pink-100/80 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800/40" },
  "Ubuntu": { bg: "bg-orange-100/80 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800/40" },
  "Red Hat Linux": { bg: "bg-red-100/80 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400", border: "border-red-200 dark:border-red-800/40" },
  "Rocky Linux": { bg: "bg-green-100/80 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800/40" },
  "MacOS": { bg: "bg-gray-100/80 dark:bg-gray-800/30", text: "text-gray-700 dark:text-gray-300", border: "border-gray-200 dark:border-gray-700/40" },
  "Windows": { bg: "bg-blue-100/80 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800/40" },
}

export default function ProfileSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="mb-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary/10 p-2 rounded-full">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Technical <span className="text-primary">Skills</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-border/40 rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Category Header */}
              <div className="p-4 border-b border-border/40 flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {category.icon}
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
              
              {/* Skills */}
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skillName) => {
                    const skill = config.about.skills.find(s => s.title === skillName)
                    if (!skill) return null
                    
                    const colorStyle = skillColors[skill.title] || {
                      bg: "bg-gray-100/80 dark:bg-gray-800/30", 
                      text: "text-gray-700 dark:text-gray-300", 
                      border: "border-gray-200 dark:border-gray-700/40"
                    }
                    
                    return (
                      <div
                        key={skill.title}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm border",
                          "shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200",
                          colorStyle.bg, colorStyle.text, colorStyle.border
                        )}
                      >
                        <i className={`devicon-${skill.icon} text-base`}></i>
                        <span>{skill.title}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 