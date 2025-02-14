import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"

const projects = [
  {
    title: "Project 1",
    description: "A brief description of Project 1",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Project 2",
    description: "A brief description of Project 2",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Project 3",
    description: "A brief description of Project 3",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Vue.js", "Express", "PostgreSQL"],
    liveLink: "#",
    githubLink: "#",
  },
]

export function PortfolioSection() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <SectionHeader>Projects</SectionHeader>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

