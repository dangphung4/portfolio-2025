import About from "@/components/profile/about"
import ProfileSkills from "@/components/profile/skills"
import ProfileTabs from "@/components/profile/ProfileTabs"
import GitHubContributions from "@/components/github-contributions"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <About />
        <ProfileSkills />
        
        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8">
            GitHub <span className="text-primary">Activity</span>
          </h2>
          <GitHubContributions />
        </div>
        
        <ProfileTabs />
      </div>
      <Toaster />
    </main>
  )
}

