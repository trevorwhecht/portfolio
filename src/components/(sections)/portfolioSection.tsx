"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import Image from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import "./portfolioSection.css"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  liveLink: string
  githubLink: string
}

const projects: Project[] = [
  {
    title: "One With Arts",
    description: "Screen Printing and embellishment software to take orders, track status and mirror vendor inventory.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%203.04.29%E2%80%AFPM-ZzuDnwKQyYRT3TZJ24TvBwfeFfmuvE.png",
    technologies: ["React", "Node.js", "MongoDB"],
    liveLink: "https://www.onewitharts.com/",
    githubLink: "https://github.com/trevorwhecht/onewitharts",
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

const Card: React.FC<Project & { index: number }> = ({
  title,
  description,
  image,
  technologies,
  liveLink,
  githubLink,
  index,
}) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <div className="card-content">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span key={tech} className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href={liveLink} target="_blank" rel="noopener noreferrer">
                Live Site
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                GitHub Repo
              </a>
            </Button>
          </div>
        </div>
        <div className="card-img">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card")

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".portfolio-intro",
        pinSpacing: false,
      })

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1
        const cardInner = card.querySelector(".card-inner")

        if (!isLastCard) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: ".portfolio-outro",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          })

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 14}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: ".portfolio-outro",
              end: "top 65%",
              scrub: true,
            },
          })
        }
      })

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: container },
  )

  return (
    <div className="portfolio-app" ref={container}>
      <SectionHeader>Projects</SectionHeader>
      <section className="cards">
        {projects.map((project, index) => (
          <Card key={index} {...project} index={index} />
        ))}
      </section>
    </div>
  )
}

