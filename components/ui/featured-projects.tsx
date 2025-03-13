"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Project = {
  id: number;
  appName: string;
  about: string;
  image: string;
  url: string;
  codeUrl?: string;
  tags: string[];
};

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { current } = containerRef;
      const scrollAmount = direction === "left" 
        ? -current.clientWidth * 0.8 
        : current.clientWidth * 0.8;
      
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm shadow-md"
          onClick={() => scroll("left")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full h-10 w-10 bg-background/80 backdrop-blur-sm shadow-md"
          onClick={() => scroll("right")}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Project gallery */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-8 pt-2 px-1 snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {projects.map((project, index) => (
          <div 
            key={project.id}
            className={cn(
              "snap-start shrink-0 pr-6",
              index === 0 ? "w-full md:w-2/3" : "w-4/5 md:w-1/2"
            )}
          >
            <ProjectCard project={project} isFirst={index === 0} />
          </div>
        ))}
      </div>
      
      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="h-2 w-2 rounded-full bg-primary/20 hover:bg-primary/50 cursor-pointer transition-colors"
            onClick={() => {
              if (containerRef.current) {
                const index = projects.findIndex(p => p.id === project.id);
                const scrollWidth = containerRef.current.scrollWidth;
                const itemWidth = scrollWidth / projects.length;
                containerRef.current.scrollTo({
                  left: itemWidth * index,
                  behavior: "smooth"
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, isFirst }: { project: Project, isFirst: boolean }) {
  return (
    <motion.div
      className="group relative rounded-xl overflow-hidden shadow-lg h-[500px] w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.appName}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <div>
          <h3 className={cn(
            "font-bold mb-3 text-white",
            isFirst ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
          )}>
            {project.appName}
          </h3>
          
          <p className="text-white/80 text-sm md:text-base mb-6 line-clamp-3">
            {project.about}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 4).map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs text-white">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button asChild variant="default" size="sm" className="rounded-full">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Project
              </Link>
            </Button>
            {project.codeUrl && (
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Add a CSS class to hide scrollbar
const style = document.createElement('style');
style.textContent = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style); 