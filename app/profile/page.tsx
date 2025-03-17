import About from "@/components/profile/about"
import ProfileSkills from "@/components/profile/skills"
import ProfileTabs from "@/components/profile/ProfileTabs"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <About />
        <ProfileSkills />
        <ProfileTabs />
      </div>
      <Toaster />
    </main>
  )
}

