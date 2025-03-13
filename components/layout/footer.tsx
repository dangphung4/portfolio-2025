import Link from "next/link"
import { config } from "@/lib/config"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">DP</span>
            </Link>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">{config.app.description}</p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href={config.socials.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 p-2 rounded-full transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={config.socials.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 p-2 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={config.socials.Email}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted hover:bg-muted/80 p-2 rounded-full transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            <p className="text-muted-foreground text-sm">
              © {currentYear} {config.app.site_name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

