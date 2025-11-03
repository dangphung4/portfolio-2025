import type { Metadata } from "next"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import { Toaster } from "@/components/ui/toaster"
import { config } from "@/lib/config"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${config.me.name}. Available for freelance projects, collaboration opportunities, and software development inquiries. Connect via email, LinkedIn, or GitHub.`,
  openGraph: {
    title: `Contact - ${config.app.site_name}`,
    description: `Get in touch with ${config.me.name} for software development opportunities`,
    url: `${config.website}/contact`,
  },
  twitter: {
    title: `Contact - ${config.app.site_name}`,
    description: `Get in touch with ${config.me.name} for software development opportunities`,
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Get In Touch
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <Toaster />
    </main>
  )
}

