"use client"

import { motion, useAnimationControls, type Variants } from "framer-motion"
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
import React from "react"

export default function Home() {
  const { theme } = useTheme()
  const firstLineControls = useAnimationControls()
  const secondLineControls = useAnimationControls()
  const buttonControls = useAnimationControls()
  const [isFirstLineAnimating, setIsFirstLineAnimating] = React.useState(false)
  const [isSecondLineAnimating, setIsSecondLineAnimating] = React.useState(false)

  React.useEffect(() => {
    const animateText = async () => {
      // Start first line animation
      setIsFirstLineAnimating(true)
      await firstLineControls.start("visible")
      setIsFirstLineAnimating(false)

      // Start second line animation
      setIsSecondLineAnimating(true)
      await secondLineControls.start("visible")
      setIsSecondLineAnimating(false)

      // Show buttons
      buttonControls.start("visible")
    }
    animateText()
  }, [firstLineControls, secondLineControls, buttonControls])

  const textVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5, // Reduced from 2 to 1.5 to make it slightly faster
        ease: "easeInOut",
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  return (
    <>
      <TopographicBackground />
      <Navbar />

      <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <motion.div
                className={cn(
                  "overflow-hidden whitespace-nowrap",
                  isFirstLineAnimating && "border-r-4 border-gray-900 dark:border-white",
                )}
                initial="hidden"
                animate={firstLineControls}
                variants={textVariants}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                  Hi, I&apos;m{" "}
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
                </h1>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                className={cn(
                  "overflow-hidden whitespace-nowrap",
                  isSecondLineAnimating && "border-r-4 border-gray-600 dark:border-gray-300",
                )}
                initial="hidden"
                animate={secondLineControls}
                variants={textVariants}
              >
                <h2 className="text-4xl md:text-4xl text-gray-600 dark:text-gray-300">
                  I&apos;m a full stack software developer.
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial="hidden"
            animate={buttonControls}
            variants={buttonVariants}
          >
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "border-2 relative group",
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
              <span className="absolute inset-0 bg-current opacity-0 group-hover:animate-ping rounded-lg"></span>
            </Button>
            <div className="relative group">
              <ThemeToggle />
              <span className="absolute inset-0 bg-current opacity-0 group-hover:animate-ping rounded-full"></span>
            </div>
          </motion.div>
        </div>
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

