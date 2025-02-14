"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/themeContext"
import { SectionHeader } from "@/components/ui/section-header"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

const languages = [
  {
    name: "HTML5",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/html-t8CdNgkVKRrbjMUdbT9AOZypbdoMZQ.png",
  },
  {
    name: "JavaScript",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/javascript-LzEvsOYuHTwIlBJ657qEEHNbJBOVBL.png",
  },
  {
    name: "TypeScript",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/typescript-p6w8UjPpDuN9ocyBKaOHwPpJq8jbfQ.png",
  },
  {
    name: "C#",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CSharp-LQ0fLc7KaJU6gkJZEz2bVwOvgaprny.png",
  },
  {
    name: "SQL",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sql-VGDNMBq5TjxXY4opLofTJBrskA6Bme.png",
  },
  {
    name: "Vue.js",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vue-bqZZcpyEPQboGbDBGnYjqfeopkPLw0.png",
  },
]

const frameworks = [
  {
    name: "Next.js",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset%201-eliFaZtORzvaX6aNwMnRpUbBBi7r3F.png", // Updated Next.js logo
  },
  {
    name: "ASP.NET",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASP.NET-oPFVibkxZRAndfp8q8FvEjqPeILbDd.png",
  },
]

export function AboutSection() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about")
      const aboutTop = aboutSection?.offsetTop || 0
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const halfwayToAbout = aboutTop / 2

      if (scrollPosition < halfwayToAbout) {
        setActiveSection("home")
      } else {
        setActiveSection("about")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="about" className="min-h-screen">
      <div className="sticky top-0 z-40 shadow-md bg-navbg-light dark:bg-navbg-dark">
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
      </div>
      <div className="container mx-auto px-4 py-16 -mt-4">
        <div className="text-center mb-12">
          <SectionHeader>About</SectionHeader>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-center -mt-4">
            <div className="w-[250px] mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-CKhi7dbTiLQsJw2yQNVAc3o3pgoaTj.png"
                alt="Profile"
                width={250}
                height={250}
                className="rounded-2xl"
                priority
              />
            </div>
            <div className="text-left max-w-xl">
              <p className="text-lg mb-6">
                Fully committed to the philosophy of life-long learning, I&apos;m a full stack developer with a deep
                passion for JavaScript, React and all things web development. The unique combination of creativity,
                logic, technology and never running out of new things to discover, drives my excitement and passion for
                web development.
              </p>
              <p className="text-lg">
                When I&apos;m not at my computer, I like to spend my time reading, keeping fit and playing guitar.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Languages</h3>
              <div className="grid grid-cols-3 gap-4">
                {languages.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "relative p-3 rounded-3xl flex flex-col items-center w-full",
                        "before:absolute before:inset-0 before:rounded-3xl before:-z-10",
                        "before:p-[4px] before:bg-gradient-to-br",
                        theme === "dark"
                          ? "before:from-highlight-dark before:to-navbg-dark"
                          : "before:from-highlight-light before:to-teal-600",
                        "after:absolute after:inset-[4px] after:rounded-3xl after:-z-10",
                        "after:bg-background",
                      )}
                    >
                      <Image
                        src={tech.icon || "/placeholder.svg"}
                        alt={tech.name}
                        width={50}
                        height={50}
                        className="w-[50px] h-[50px] object-contain mb-3"
                      />
                      <span className="text-sm font-medium uppercase tracking-wider">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Frameworks</h3>
              <div className="grid grid-cols-3 gap-4">
                {frameworks.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "relative p-3 rounded-3xl flex flex-col items-center w-full",
                        "before:absolute before:inset-0 before:rounded-3xl before:-z-10",
                        "before:p-[4px] before:bg-gradient-to-br",
                        theme === "dark"
                          ? "before:from-highlight-dark before:to-navbg-dark"
                          : "before:from-highlight-light before:to-teal-600",
                        "after:absolute after:inset-[4px] after:rounded-3xl after:-z-10",
                        "after:bg-background",
                      )}
                    >
                      <Image
                        src={tech.icon || "/placeholder.svg"}
                        alt={tech.name}
                        width={tech.name === "ASP.NET" ? 70 : 50}
                        height={tech.name === "ASP.NET" ? 70 : 50}
                        className={cn(
                          "object-contain mb-3",
                          tech.name === "ASP.NET" ? "w-[70px] h-[70px]" : "w-[50px] h-[50px]",
                        )}
                      />
                      <span className="text-sm font-medium uppercase tracking-wider">{tech.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

