import About from "@/components/profile/about"
import Experience from "@/components/profile/experience"
import Education from "@/components/profile/education"
import ProfileSkills from "@/components/profile/skills"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <About />
        <ProfileSkills />
        <Experience />
        <Education />
      </div>
      <Toaster />
    </main>
  )
}

