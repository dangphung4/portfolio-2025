"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navLinks = config.pages.filter((page) => !page.displayInDrawerOnly && !page.external)

  // Render a placeholder or nothing until mounted
  const ThemeIcon = mounted ? (theme === "dark" ? Sun : Moon) : null

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

          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
              {ThemeIcon && <ThemeIcon className="h-5 w-5" />}
            </Button>
          )}
        </nav>

        <div className="md:hidden">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
              {ThemeIcon && <ThemeIcon className="h-5 w-5" />}
            </Button>
          )}
          
        </div>
      </div>
    </header>
  )
}

