"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ProjectsFilter() {
  const [activeFilter, setActiveFilter] = useState("all")

  // Select most common tags for filters
  const popularTags = ["React.js", "TypeScript", "Next.js", "Node.js", "MongoDB"]

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <FilterButton isActive={activeFilter === "all"} onClick={() => handleFilterClick("all")}>
          All
        </FilterButton>

        {popularTags.map((tag) => (
          <FilterButton
            key={tag}
            isActive={activeFilter.toLowerCase() === tag.toLowerCase()}
            onClick={() => handleFilterClick(tag)}
          >
            {tag}
          </FilterButton>
        ))}
      </div>
    </div>
  )
}

function FilterButton({ children, isActive, onClick }: { children: React.ReactNode, isActive: boolean, onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("rounded-full relative", isActive ? "text-primary" : "text-muted-foreground")}
    >
      {isActive && (
        <motion.span
          layoutId="filter-indicator"
          className="absolute inset-0 bg-primary/10 rounded-full"
          transition={{ type: "spring", duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </Button>
  )
}

