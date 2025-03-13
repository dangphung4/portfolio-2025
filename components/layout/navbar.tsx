"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = config.pages.filter((page) => !page.displayInDrawerOnly && !page.external)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold relative z-20">
          <motion.span
            className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            DP
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((page, index) => {
            const isActive = pathname === page.url

            return (
              <Link key={index} href={page.url} className="relative px-4 py-2 rounded-full group">
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-primary/10 rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 transition-colors",
                    isActive ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {page.title}
                </span>
              </Link>
            )
          })}

          <Link href={config.me.resumeLink} target="_blank" rel="noopener noreferrer" className="ml-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Resume
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu Button - Only visible on medium and up screens */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative z-20">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-10 md:hidden flex flex-col justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col items-center space-y-6 text-center">
                {navLinks.map((page, index) => {
                  const isActive = pathname === page.url

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                    >
                      <Link
                        href={page.url}
                        className={cn(
                          "text-2xl font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {page.title}
                      </Link>
                    </motion.div>
                  )
                })}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                  <Link
                    href={config.me.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="outline" className="rounded-full">
                      Resume
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-6 pt-6"
                >
                  <Link href={config.socials.GitHub} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-colors">
                      <Github className="h-6 w-6 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                  <Link href={config.socials.LinkedIn} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-colors">
                      <Linkedin className="h-6 w-6 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                  <Link href={config.socials.Email} target="_blank" rel="noopener noreferrer" className="group">
                    <div className="bg-muted hover:bg-primary/20 p-3 rounded-full transition-colors">
                      <Mail className="h-6 w-6 group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

