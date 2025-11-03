import type { Metadata } from "next"
import About from "@/components/profile/about"
import ProfileSkills from "@/components/profile/skills"
import ProfileTabs from "@/components/profile/ProfileTabs"
import GitHubContributions from "@/components/github-contributions"
import { Toaster } from "@/components/ui/toaster"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "Profile",
  description: `Learn more about ${config.me.name}, a ${config.me.job} with ${config.me.yearsOfExperience}+ years of experience in software development. View work experience, education, skills, and GitHub contributions.`,
  openGraph: {
    title: `Profile - ${config.app.site_name}`,
    description: `Professional profile of ${config.me.name} - ${config.me.job}`,
    url: `${config.website}/profile`,
  },
  twitter: {
    title: `Profile - ${config.app.site_name}`,
    description: `Professional profile of ${config.me.name} - ${config.me.job}`,
  },
}

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

