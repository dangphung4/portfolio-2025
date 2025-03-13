import ProjectsGrid from "@/components/projects/projects-grid"
import ProjectsFilter from "@/components/projects/projects-filter"
import { Toaster } from "@/components/ui/toaster"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          My Projects
        </h1>
        <ProjectsFilter onFilterChange={() => {}} />
        <ProjectsGrid />
      </div>
      <Toaster />
    </main>
  )
}

