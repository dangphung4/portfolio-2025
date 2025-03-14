"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile for responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  // For mobile, we'll show a simpler card-based layout
  if (isMobile) {
    return (
      <div className="space-y-6 px-4">
        {projects.map((project) => (
          <MobileProjectCard key={project.id} project={project} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative py-8">
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-xl h-[550px] shadow-xl">
        <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <ProjectCard project={projects[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white shadow-lg"
          disabled={isAnimating}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white shadow-lg"
          disabled={isAnimating}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Project info panel */}
      <div className="mt-6 flex justify-between items-center">
        {/* Pagination dots */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              )}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Project counter */}
        <div className="text-sm text-muted-foreground font-medium">
          {currentIndex + 1} / {projects.length}
        </div>
      </div>

      {/* Preview of next/previous projects */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          (currentIndex - 1 + projects.length) % projects.length,
          currentIndex,
          (currentIndex + 1) % projects.length
        ].map((index, i) => (
          <div
            key={index}
            className={cn(
              "relative h-24 rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
              i === 1 ? "ring-2 ring-primary" : "opacity-70 hover:opacity-100"
            )}
            onClick={() => handleDotClick(index)}
          >
            <Image
              src={projects[index].image || "/placeholder.svg"}
              alt={projects[index].appName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-full">
                {projects[index].appName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full h-full group">
      <Image
        src={project.image || "/placeholder.svg"}
        alt={project.appName}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        priority
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
        <div className="max-w-3xl">
          <h3 className="font-bold mb-4 text-3xl md:text-4xl lg:text-5xl text-white">
            {project.appName}
          </h3>
          
          <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl">
            {project.about}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="text-xs md:text-sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-4">
            <Button asChild size="lg" className="rounded-full">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Project
              </Link>
            </Button>
            {project.codeUrl && (
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.appName}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4 bg-card">
        <h3 className="font-bold text-xl mb-2">{project.appName}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.about}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="default" size="sm" className="rounded-full flex-1">
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              View
            </Link>
          </Button>
          {project.codeUrl && (
            <Button asChild variant="outline" size="sm" className="rounded-full flex-1">
              <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-3.5 w-3.5 mr-1.5" />
                Code
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
