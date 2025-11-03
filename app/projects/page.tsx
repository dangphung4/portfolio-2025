import type { Metadata } from "next"
import { config } from "@/lib/config"
import { Toaster } from "@/components/ui/toaster"
import { FeaturedProjects } from "@/components/ui/featured-projects"
import { ProjectCards } from "@/components/ui/project-cards"

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore ${config.projects.length} projects by ${config.me.name}, showcasing expertise in web development, full-stack applications, and modern technologies including React, Next.js, TypeScript, and more.`,
  openGraph: {
    title: `Projects - ${config.app.site_name}`,
    description: `Portfolio of ${config.projects.length} web development projects`,
    url: `${config.website}/projects`,
  },
  twitter: {
    title: `Projects - ${config.app.site_name}`,
    description: `Portfolio of ${config.projects.length} web development projects`,
  },
}

export default function ProjectsPage() {
  // Add id property to projects for the FeaturedProjects component
  const featuredProjects = config.projects.slice(0, 4).map((project, index) => ({
    ...project,
    id: index + 1
  }))
  
  // Get remaining projects for the grid
  const remainingProjects = config.projects.slice(4)

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground">
            A collection of my work, showcasing my skills and experience in web development and design.
          </p>
        </div>
        
        {/* Featured Projects Section */}
        <section className="mb-24">
          <FeaturedProjects projects={featuredProjects} />
        </section>
        
        {/* Other Projects Section */}
        {remainingProjects.length > 0 && (
          <section>
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-border"></div>
              <h2 className="text-xl font-semibold px-6">More Projects</h2>
              <div className="h-px flex-1 bg-border"></div>
            </div>
            <ProjectCards projects={remainingProjects} />
          </section>
        )}
      </div>
      <Toaster />
    </main>
  )
}

