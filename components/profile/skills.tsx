"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"

// Map skill names to colors
const skillColors: Record<string, string> = {
  "JavaScript": "text-yellow-500 border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10",
  "TypeScript": "text-blue-500 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
  "Python": "text-green-500 border-green-500/30 bg-green-500/5 hover:bg-green-500/10",
  "C#": "text-purple-500 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
  "Java": "text-orange-500 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10",
  "HTML5": "text-orange-600 border-orange-600/30 bg-orange-600/5 hover:bg-orange-600/10",
  "CSS3": "text-blue-600 border-blue-600/30 bg-blue-600/5 hover:bg-blue-600/10",
  "React.js": "text-cyan-500 border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10",
  "Next.js": "text-gray-700 dark:text-gray-300 border-gray-500/30 bg-gray-500/5 hover:bg-gray-500/10",
  "Express.js": "text-gray-600 border-gray-600/30 bg-gray-600/5 hover:bg-gray-600/10",
  "React Native": "text-blue-400 border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10",
  "FastAPI": "text-teal-500 border-teal-500/30 bg-teal-500/5 hover:bg-teal-500/10",
  "Flask": "text-green-600 border-green-600/30 bg-green-600/5 hover:bg-green-600/10",
  "Django": "text-green-700 border-green-700/30 bg-green-700/5 hover:bg-green-700/10",
  "Blazor": "text-purple-600 border-purple-600/30 bg-purple-600/5 hover:bg-purple-600/10",
  "ASP.NET Core": "text-purple-500 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
  "Node.js": "text-green-600 border-green-600/30 bg-green-600/5 hover:bg-green-600/10",
  "MongoDB": "text-green-500 border-green-500/30 bg-green-500/5 hover:bg-green-500/10",
  "PostgreSQL": "text-blue-600 border-blue-600/30 bg-blue-600/5 hover:bg-blue-600/10",
  "SQLite": "text-blue-400 border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10",
  "AWS": "text-orange-500 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10",
  "Azure": "text-blue-500 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
  "Docker": "text-blue-500 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
  "Kubernetes": "text-blue-600 border-blue-600/30 bg-blue-600/5 hover:bg-blue-600/10",
  "Git": "text-orange-600 border-orange-600/30 bg-orange-600/5 hover:bg-orange-600/10",
  "TailwindCSS": "text-cyan-500 border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10",
  "Bootstrap": "text-purple-500 border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10",
  "MaterialUI": "text-blue-500 border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10",
  "Chakra UI": "text-teal-500 border-teal-500/30 bg-teal-500/5 hover:bg-teal-500/10",
  "GraphQL": "text-pink-500 border-pink-500/30 bg-pink-500/5 hover:bg-pink-500/10",
  "Ubuntu": "text-orange-500 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10",
  "Red Hat Linux": "text-red-600 border-red-600/30 bg-red-600/5 hover:bg-red-600/10",
  "Rocky Linux": "text-green-600 border-green-600/30 bg-green-600/5 hover:bg-green-600/10",
  "MacOS": "text-gray-500 border-gray-500/30 bg-gray-500/5 hover:bg-gray-500/10",
  "Windows": "text-blue-400 border-blue-400/30 bg-blue-400/5 hover:bg-blue-400/10",
}

// Categories for grouping skills
const categories = [
  { name: "Languages", skills: ["JavaScript", "TypeScript", "Python", "C#", "Java", "HTML5", "CSS3"] },
  { name: "Frontend", skills: ["React.js", "Next.js", "Blazor", "React Native", "TailwindCSS", "Bootstrap", "MaterialUI", "Chakra UI"] },
  { name: "Backend", skills: ["Node.js", "Express.js", "FastAPI", "ASP.NET Core", "GraphQL", "Flask", "Django"] },
  { name: "Databases", skills: ["MongoDB", "PostgreSQL", "SQLite"] },
  { name: "DevOps & Tools", skills: ["Git", "Docker", "Kubernetes", "AWS", "Azure", "Ubuntu", "Red Hat Linux", "Rocky Linux", "MacOS", "Windows"] },
]

export default function ProfileSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
      },
    }),
  }

  const SkillBadge = ({ skill }: { skill: { title: string; icon: string } }) => {
    const colorClass = skillColors[skill.title] || "border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary"
    
    return (
      <motion.div
        variants={itemVariants}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm",
          "text-sm font-medium whitespace-nowrap transition-all",
          "hover:-translate-y-0.5 hover:shadow-md",
          colorClass
        )}
      >
        <i className={`devicon-${skill.icon} text-lg`}></i>
        <span>{skill.title}</span>
      </motion.div>
    )
  }

  return (
    <section className="py-12 sm:py-16" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <motion.div
            className="h-1 w-20 bg-primary mb-4 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="text-muted-foreground">
            Technologies and tools I've worked with
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              custom={categoryIndex}
              variants={categoryVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold text-primary/90">
                  {category.name}
                </h3>
                <div className="h-px bg-primary/20 flex-grow"></div>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-2.5"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {category.skills.map((skillName) => {
                  const skill = config.about.skills.find((s) => s.title === skillName)
                  if (!skill) return null

                  return (
                    <SkillBadge key={skill.title} skill={skill} />
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