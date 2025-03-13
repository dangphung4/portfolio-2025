"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { config } from "@/lib/config"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProjectsGrid({ filter = "all" }) {
  const [visibleProjects, setVisibleProjects] = useState(9)

  const filteredProjects =
    filter === "all"
      ? config.projects
      : config.projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())),
        )

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  return (
    <div className="mt-8">
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <motion.div
              key={project.appName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              layout
            >
              <Card className="h-full flex flex-col overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=192&width=384"}
                    alt={project.appName}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold mb-2">{project.appName}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.about}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button asChild variant="default" size="sm" className="flex-1 rounded-full">
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Link>
                  </Button>
                  {project.codeUrl && (
                    <Button asChild variant="outline" size="sm" className="flex-1 rounded-full">
                      <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {visibleProjects < filteredProjects.length && (
        <div className="text-center mt-12">
          <Button onClick={loadMore} variant="outline" size="lg" className="rounded-full">
            Load More Projects
          </Button>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found with the selected filter.</p>
        </div>
      )}
    </div>
  )
}

