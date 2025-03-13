"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

type Project = {
  appName: string;
  about: string;
  image: string;
  url: string;
  codeUrl?: string;
  tags: string[];
};

export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.appName}
          className="group relative bg-background rounded-xl overflow-hidden border border-primary/5 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          {/* Image with overlay gradient */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.appName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Tags overlay */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-end">
              <div className="flex flex-wrap gap-1 justify-end">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs opacity-90">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs bg-background/50 backdrop-blur-sm">
                    +{project.tags.length - 2}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {project.appName}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-5 line-clamp-2">
              {project.about}
            </p>
            
            <div className="flex gap-3 mt-auto">
              <Button asChild variant="default" size="sm" className="rounded-full w-full">
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  View
                </Link>
              </Button>
              {project.codeUrl && (
                <Button asChild variant="outline" size="sm" className="rounded-full">
                  <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          {/* Hover effect - line at bottom */}
          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500 ease-in-out" />
        </motion.div>
      ))}
    </div>
  );
} 