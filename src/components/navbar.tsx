"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/themeContext"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById("projects")
      const projectsTop = projectsSection?.offsetTop || 0
      const scrollPosition = window.scrollY + window.innerHeight / 2

      // Show navbar only when reaching projects section
      setIsVisible(scrollPosition >= projectsTop)

      const sections = document.querySelectorAll("section[id]")

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = section.clientHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow-md bg-navbg-light dark:bg-navbg-dark ${isVisible ? "block" : "hidden"}`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-end">
        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activeSection === item.href.slice(1)
                    ? theme === "dark"
                      ? "text-highlight-dark font-bold"
                      : "text-highlight-light font-bold"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white",
                )}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

