import About from "@/components/profile/about"
import Experience from "@/components/profile/experience"
import Education from "@/components/profile/education"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          My Profile
        </h1>
        <About />
        <Experience />
        <Education />
      </div>
      <Toaster />
    </main>
  )
}

