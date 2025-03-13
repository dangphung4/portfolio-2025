"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, Linkedin, MapPin } from "lucide-react"
import { config } from "@/lib/config"
import Link from "next/link"

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="border-primary/20 h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <p className="text-muted-foreground mb-8">
            Feel free to reach out to me through any of these platforms. I'm always open to discussing new projects,
            creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="space-y-6 mt-auto">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <Link href={config.socials.Email} className="font-medium hover:text-primary transition-colors">
                  dangphung4@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">GitHub</p>
                <Link
                  href={config.socials.GitHub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  github.com/dangphung4
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <Linkedin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <Link
                  href={config.socials.LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors"
                >
                  linkedin.com/in/dang-phung
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">Fredericksburg, VA, USA</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

