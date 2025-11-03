"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Calendar, GitCommit } from "lucide-react"
import Link from "next/link"

interface GitHubStats {
  totalContributions: number
  loading: boolean
}

export default function GitHubContributions() {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    loading: true,
  })

  const username = "dangphung4"
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalContributions: 1200,
        loading: false,
      })
    }, 1000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-border/40 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Github className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">GitHub Activity</h3>
                <p className="text-sm text-muted-foreground">
                  {stats.loading ? (
                    <span className="inline-block w-32 h-4 bg-muted animate-pulse rounded" />
                  ) : (
                    `${stats.totalContributions}+ contributions in ${currentYear}`
                  )}
                </p>
              </div>
            </div>
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View Profile
              <span className="text-xs">↗</span>
            </Link>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-muted/30 p-4">
            {stats.loading ? (
              <div className="w-full h-32 bg-muted animate-pulse rounded" />
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-full overflow-x-auto">
                  <img
                    src={`https://ghchart.rshah.org/${username}`}
                    alt="GitHub Contribution Chart"
                    className="w-full min-w-[600px] h-auto"
                    loading="lazy"
                  />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/40">
                  <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                    <GitCommit className="h-4 w-4 text-primary mb-2" />
                    <span className="text-2xl font-bold text-primary">32</span>
                    <span className="text-xs text-muted-foreground">Repositories</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-500 mb-2" />
                    <span className="text-2xl font-bold text-green-500">
                      {stats.totalContributions}+
                    </span>
                    <span className="text-xs text-muted-foreground">Contributions</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-xl mb-2">⭐</span>
                    <span className="text-2xl font-bold text-amber-500">156</span>
                    <span className="text-xs text-muted-foreground">Stars</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                    <span className="text-xl mb-2">👥</span>
                    <span className="text-2xl font-bold text-blue-500">13</span>
                    <span className="text-xs text-muted-foreground">Followers</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 overflow-hidden rounded-lg">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=3b82f6&icon_color=3b82f6&text_color=6b7280&bg_color=00000000`}
                alt="GitHub Stats"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-lg">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=3b82f6&text_color=6b7280&bg_color=00000000`}
                alt="Most Used Languages"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

