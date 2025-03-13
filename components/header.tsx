"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react"
import { config } from "@/lib/config"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b py-3" : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">DP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {config.pages
            .filter((page) => !page.displayInDrawerOnly)
            .map((page, index) => (
              <Link
                key={index}
                href={page.url}
                target={page.external ? "_blank" : undefined}
                rel={page.external ? "noopener noreferrer" : undefined}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {page.title}
              </Link>
            ))}

          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {config.pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.url}
                  target={page.external ? "_blank" : undefined}
                  rel={page.external ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {page.title}
                </Link>
              ))}

              <div className="flex space-x-4 pt-4 border-t">
                <Link href={config.socials.GitHub} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href={config.socials.LinkedIn} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
                <Link href={config.socials.Email} target="_blank" rel="noopener noreferrer">
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

