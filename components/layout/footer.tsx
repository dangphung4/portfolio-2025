"use client"

import Link from "next/link"
import { config } from "@/lib/config"
import { Github, Linkedin, Mail, ExternalLink, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="border-t border-border/40">
      {/* Scroll to top button */}
      <div className="container mx-auto px-4 flex justify-center -mt-5">
        <Button 
          onClick={scrollToTop}
          className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-5">
            <Link href="/" className="text-2xl font-bold inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                {config.app.site_name}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mt-3 max-w-md leading-relaxed">
              {config.app.description}
            </p>
            <div className="flex space-x-3 mt-6">
              <Link
                href={config.socials.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/50 hover:bg-muted text-foreground hover:text-primary p-2.5 rounded-full transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={config.socials.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/50 hover:bg-muted text-foreground hover:text-primary p-2.5 rounded-full transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={config.socials.Email}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/50 hover:bg-muted text-foreground hover:text-primary p-2.5 rounded-full transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {config.pages
                .filter(page => !page.displayInDrawerOnly)
                .map((page, index) => (
                  <li key={index}>
                    <Link 
                      href={page.url} 
                      target={page.external ? "_blank" : undefined}
                      rel={page.external ? "noopener noreferrer" : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {page.title}
                      {page.external && <ExternalLink className="h-3 w-3" />}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
            <Link 
              href={config.socials.Email} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </Link>
          </div>
        </div>

        <div className="border-t border-border/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {currentYear} {config.app.site_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

