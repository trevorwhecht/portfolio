"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

const projects = [
  {
    title: "One With Arts",
    description: "Screen Printing and embellishment software to take orders, track status and mirror vendor inventory.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%203.04.29%E2%80%AFPM-ZzuDnwKQyYRT3TZJ24TvBwfeFfmuvE.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveLink: "https://www.onewitharts.com/",
    githubLink: "https://github.com/trevorwhecht/onewitharts",
  },
  {
    title: "Project 2",
    description: "A brief description of Project 2",
    image: "/placeholder.svg?height=800&width=1200",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3",
    image: "/placeholder.svg?height=800&width=1200",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    liveLink: "#",
    githubLink: "#",
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <div ref={cardRef} className="relative h-[100vh] mb-[-50vh]">
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        <motion.div style={{ y }} className="h-full">
          <div className="relative h-full w-full">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex flex-col justify-end p-12">
              <h2 className="text-6xl font-bold text-white mb-4">{project.title}</h2>
              <p className="text-xl text-white mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-white text-black rounded-full px-3 py-1 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" asChild>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-white border-white hover:bg-white hover:text-black">
                    Live Site
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-white border-white hover:bg-white hover:text-black">
                    GitHub Repo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 mb-16">
        <SectionHeader>Projects</SectionHeader>
      </div>
      <div className="w-full">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}