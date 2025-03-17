"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, GraduationCap, Award } from "lucide-react"
import Education from "./education"
import Experience from "./experience"
import Certifications from "./certifications"

export default function ProfileTabs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="mb-16" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Professional <span className="text-primary">Journey</span>
        </h2>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="certifications" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Certifications</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="experience" forceMount={true} className="data-[state=inactive]:hidden data-[state=active]:block">
              <Experience />
            </TabsContent>
            
            <TabsContent value="education" forceMount={true} className="data-[state=inactive]:hidden data-[state=active]:block">
              <Education />
            </TabsContent>
            
            <TabsContent value="certifications" forceMount={true} className="data-[state=inactive]:hidden data-[state=active]:block">
              <Certifications />
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </section>
  )
} 