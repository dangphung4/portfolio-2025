import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
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

