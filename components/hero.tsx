"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react"
import Link from "next/link"
import { config } from "@/lib/config"
import Image from "next/image"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

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

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-20" />
      </div>

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
              <span className="text-primary font-medium">Junior Computer Science Major</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Hi, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient">
                {config.me.name}
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-8 h-16">
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
              />
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground mb-8 max-w-lg">
              {config.app.description}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="#contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <Link href={config.me.resumeLink} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-8">
              <Link href={config.socials.GitHub} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors">
                  <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link href={config.socials.LinkedIn} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors">
                  <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
              <Link href={config.socials.Email} target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-muted hover:bg-muted/80 p-3 rounded-full transition-colors">
                  <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative flex-1 flex justify-center"
            initial="hidden"
            animate={controls}
            variants={imageVariants}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt={config.me.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -right-4 bg-background border shadow-lg rounded-full px-3 py-1.5 text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-primary">React.js</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-8 bg-background border shadow-lg rounded-full px-3 py-1.5 text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <span className="text-blue-500">TypeScript</span>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background border shadow-lg rounded-full px-3 py-1.5 text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <span className="text-green-500">Node.js</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

