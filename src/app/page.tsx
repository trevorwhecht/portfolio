"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { TopographicBackground } from "../components/topographicBackground"
import { ThemeToggle } from "@/components/themeToggle"
import { useTheme } from "@/lib/themeContext"
import { Navbar } from "@/components/navbar"
import { AboutSection } from "../components/(sections)/aboutSection"
import { PortfolioSection } from "../components/(sections)/portfolioSection"
import { ContactSection } from "../components/(sections)/contactSection"
import cn from "classnames"

export default function Home() {
  const { theme } = useTheme()

  return (
    <>
      <TopographicBackground />
      <Navbar />

      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white"
          >
            Hello, I&apos;m{" "}
            <span
              className={cn(
                "text-transparent bg-clip-text",
                theme === "dark"
                  ? "bg-gradient-to-r from-highlight-dark to-highlight-dark"
                  : "bg-gradient-to-r from-highlight-light to-highlight-light",
              )}
            >
              Trevor Hecht
            </span>
            .
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300"
          >
            I&apos;m a full stack web developer.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "border-2",
                theme === "dark"
                  ? "border-highlight-dark text-highlight-dark hover:bg-highlight-dark/10"
                  : "border-highlight-light text-highlight-light hover:bg-highlight-light/10",
              )}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <a href="#about" className="flex items-center gap-2">
                View my work
                <ChevronDown className="w-4 h-4" />
              </a>
            </Button>
            <ThemeToggle />
          </motion.div>
        </motion.div>
      </section>

      <AboutSection />

      <section id="projects" className="min-h-screen">
        <PortfolioSection />
      </section>

      <section id="contact" className="pb-[150px]">
        <ContactSection />
      </section>
    </>
  )
}