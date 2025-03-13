"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Code, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export default function MobileNav() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Profile", icon: User, href: "/profile" },
    { name: "Projects", icon: Code, href: "/projects" },
    { name: "Contact", icon: Mail, href: "/contact" },
  ]

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-background/80 backdrop-blur-md border-t"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center w-full h-full">
              <div className="relative flex flex-col items-center">
                {isActive && (
                  <motion.div
                    className="absolute -top-6 w-1.5 h-1.5 rounded-full bg-primary"
                    layoutId="mobile-nav-indicator"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <div
                  className={cn(
                    "p-1.5 rounded-full transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "text-xs transition-colors",
                    isActive ? "text-primary font-medium" : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}

