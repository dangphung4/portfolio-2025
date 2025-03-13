"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download, ChevronDown, Code, Server, Database, Cloud } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"
import { cn } from "@/lib/utils"

// Custom CSS classes
const customStyles = {
  animateGradient: "animate-gradient",
  animateSpinSlow: "animate-spin-slow",
}

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [greeting, setGreeting] = useState("Hi, I'm")
  const [activeSkill, setActiveSkill] = useState<number | null>(null)
  const [yearsOfExperience, setYearsOfExperience] = useState(0)
  
  // Mouse tracking for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Transform mouse position for parallax effect
  const imageX = useTransform(mouseX, [-500, 500], [-15, 15])
  const imageY = useTransform(mouseY, [-500, 500], [-15, 15])
  const backgroundX = useTransform(mouseX, [-500, 500], [10, -10])
  const backgroundY = useTransform(mouseY, [-500, 500], [10, -10])
  
  // 3D tilt effect values
  const tiltX = useTransform(mouseY, [-300, 300], [5, -5])
  const tiltY = useTransform(mouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }

    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning, I'm")
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon, I'm")
    } else {
      setGreeting("Good evening, I'm")
    }
    
    // Calculate years of experience
    const startDate = new Date(config.me.started)
    const currentDate = new Date()
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime())
    const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25)
    setYearsOfExperience(Math.floor(diffYears))
    
    // Mouse move handler for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      
      // Calculate distance from center
      const posX = clientX - centerX
      const posY = clientY - centerY
      
      setMousePosition({ x: clientX, y: clientY })
      mouseX.set(posX)
      mouseY.set(posY)
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [controls, isInView, mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  // Skills to display as floating badges
  const skills = [
    { 
      name: "React.js", 
      color: "text-primary",
      icon: <Code className="h-3.5 w-3.5 mr-1" />,
      description: "Building interactive UIs with React and Next.js"
    },
    { 
      name: "TypeScript", 
      color: "text-blue-500",
      icon: <Code className="h-3.5 w-3.5 mr-1" />,
      description: "Type-safe code for scalable applications"
    },
    { 
      name: "Node.js", 
      color: "text-green-500",
      icon: <Server className="h-3.5 w-3.5 mr-1" />,
      description: "Server-side JavaScript for fast backends"
    },
    { 
      name: "Next.js", 
      color: "text-gray-700 dark:text-gray-300",
      icon: <Code className="h-3.5 w-3.5 mr-1" />,
      description: "Full-stack React framework for production"
    },
    { 
      name: "C#", 
      color: "text-purple-500",
      icon: <Code className="h-3.5 w-3.5 mr-1" />,
      description: "Building robust backend services with .NET"
    },
    { 
      name: "AWS", 
      color: "text-orange-500",
      icon: <Cloud className="h-3.5 w-3.5 mr-1" />,
      description: "Cloud infrastructure and serverless solutions"
    },
    { 
      name: "MongoDB", 
      color: "text-green-600",
      icon: <Database className="h-3.5 w-3.5 mr-1" />,
      description: "NoSQL database for modern applications"
    },
  ]

  // Animation for floating badges
  const getFloatingAnimation = (index: number) => {
    return {
      opacity: 1,
      y: 0,
      transition: { 
        delay: 0.8 + (index * 0.2),
        duration: 0.5
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden flex items-center">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ x: backgroundX, y: backgroundY }}
      >
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        {/* Animated particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/10 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.max(2, Math.random() * 6)}px`,
              height: `${Math.max(2, Math.random() * 6)}px`,
            }}
            animate={{
              y: [0, Math.random() * 30 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, Math.random() * 0.5 + 1, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 max-w-2xl"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <span className="text-primary font-medium">Junior Software Engineer</span>
              <div className="h-1 w-12 bg-primary rounded-full"></div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {greeting}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                {config.me.name}
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-8 h-16 flex items-center">
              <TypeAnimation
                sequence={[
                  "I build web applications",
                  1000,
                  "I learn new technologies",
                  1000,
                  "I'm a Junior in University",
                  1000,
                  `I'm a ${config.me.job}`,
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
                className="font-medium"
              />
              <span className="ml-1 w-0.5 h-6 bg-primary animate-pulse"></span>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="relative p-4 bg-muted/50 backdrop-blur-sm rounded-lg border border-border/50 mb-8 max-w-lg"
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
              <p className="text-muted-foreground">
                {config.app.description}
              </p>
              <div className="mt-3 flex items-center text-sm text-primary">
                <span className="font-medium">{yearsOfExperience}+ years of experience</span>
                <span className="mx-2">•</span>
                <span className="font-medium">{config.me.stack}</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/20 hover:border-primary/50 shadow-sm transition-all">
                <Link href={config.me.resumeLink} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-8">
              <Link href={config.socials.GitHub} target="_blank" rel="noopener noreferrer" className="group" aria-label="GitHub Profile">
                <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-all shadow-sm hover:shadow-md">
                  <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link href={config.socials.LinkedIn} target="_blank" rel="noopener noreferrer" className="group" aria-label="LinkedIn Profile">
                <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-all shadow-sm hover:shadow-md">
                  <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link href={config.socials.Email} target="_blank" rel="noopener noreferrer" className="group" aria-label="Email Contact">
                <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-all shadow-sm hover:shadow-md">
                  <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex-1 flex justify-center perspective"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            style={{ 
              x: imageX, 
              y: imageY,
              transform: "perspective(1000px)",
              rotateX: tiltX,
              rotateY: tiltY
            }}
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full border border-primary/20"></div>
            </div>

            {/* Profile image with 3D effect */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl z-10 transform-gpu group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 z-10"></div>
              <Image
                src="/dangphung.jpg"
                alt={config.me.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20"></div>
            </div>

            {/* Floating skill badges */}
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className={cn(
                  "absolute bg-background/80 backdrop-blur-sm border shadow-lg rounded-full px-3 py-1.5 text-sm font-medium z-20 cursor-pointer transition-all",
                  activeSkill === index ? "scale-110 shadow-xl" : ""
                )}
                style={{
                  top: `${15 + (index * 30) % 85}%`,
                  left: index % 2 === 0 ? '-10%' : '80%',
                  translateY: `-${index * 10}px`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={getFloatingAnimation(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                onHoverStart={() => setActiveSkill(index)}
                onHoverEnd={() => setActiveSkill(null)}
                onClick={() => setActiveSkill(activeSkill === index ? null : index)}
                role="button"
                tabIndex={0}
                aria-label={`Skill: ${skill.name}`}
              >
                <div className="flex items-center">
                  {skill.icon}
                  <span className={skill.color}>{skill.name}</span>
                </div>
                
                {/* Expanded skill description */}
                <AnimatePresence>
                  {activeSkill === index && (
                    <motion.div 
                      className="absolute top-full left-0 mt-2 bg-background/95 backdrop-blur-md border shadow-lg rounded-lg p-2 w-48 text-xs"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

