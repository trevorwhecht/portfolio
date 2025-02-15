"use client"

import React, { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
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
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CSharp-FNiV5L1mG8vNlb9u36BEYGwOdTVCWa.png",
  },
  {
    name: "SQL",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sql-r2CupZBHvnELiRMPkGXcy8LFqtXtWb.png", // Updated SQL icon
  },
  {
    name: "Vue.js",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vue-bqZZcpyEPQboGbDBGnYjqfeopkPLw0.png",
  },
  {
    name: "Java",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/java-RAXTxIbbHnXwgdhwnWdkIwIEeYIIzM.png",
  },
  {
    name: "Swift",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swift-w6gxSv5j3Gym1pHZLJ9sSCBdSjGLWW.png",
  },
]

const frameworks = [
  {
    name: "Next.js",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Asset%201-eliFaZtORzvaX6aNwMnRpUbBBi7r3F.png",
  },
  {
    name: "ASP.NET",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ASP.NET-Hvn2G5Ig9UAWdSED2lAmwhxWuthDWN.png",
  },
]

const languageDelays = [0.3, 0.1, 0.4, 0.2, 0.5, 0.3, 0.6, 0.1]
const frameworkDelays = [0.2, 0.4]

const maxDelay = Math.max(...languageDelays, ...frameworkDelays)
const headerDelay = maxDelay + 0.5 // Add 0.5s after the last card animation

const ROTATION_RANGE = 20

interface TechCardProps {
  tech: {
    name: string
    icon: string
  }
  delay: number
}

const TechCard: React.FC<TechCardProps> = ({ tech, delay }) => {
  const { theme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x, {
    stiffness: 300,
    damping: 30,
  })
  const ySpring = useSpring(y, {
    stiffness: 300,
    damping: 30,
  })

  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const rX = ((mouseY - height / 2) / height) * ROTATION_RANGE * -1
    const rY = ((mouseX - width / 2) / width) * ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 0.5,
            delay,
          },
        },
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
        }}
        className={cn(
          "relative p-3 rounded-3xl flex flex-col items-center w-full min-h-[150px] justify-between cursor-pointer",
          "before:absolute before:inset-0 before:rounded-3xl before:-z-10",
          "before:p-[4px] before:bg-gradient-to-br",
          theme === "dark"
            ? "before:from-highlight-dark before:to-navbg-dark"
            : "before:from-highlight-light before:to-teal-600",
          "after:absolute after:inset-[4px] after:rounded-3xl after:-z-10",
          "after:bg-background",
        )}
      >
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-between p-3"
            style={{
              transform: "translateZ(50px)",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src={tech.icon || "/placeholder.svg"}
              alt={tech.name}
              width={80}
              height={80}
              className="w-[80px] h-[80px] object-contain mb-2"
              style={{
                transform: "translateZ(25px)",
              }}
            />
            <span
              className="text-sm font-medium uppercase tracking-wider"
              style={{
                transform: "translateZ(25px)",
              }}
            >
              {tech.name}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function AboutSection() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = React.useState("home")

  React.useEffect(() => {
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
        <div className="text-center">
          <SectionHeader>About</SectionHeader>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            className="flex flex-col items-center -mt-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-[250px] mb-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/headshot-CKhi7dbTiLQsJw2yQNVAc3o3pgoaTj.png"
                alt="Profile"
                width={200}
                height={200}
                className="rounded-2xl"
                priority
              />
            </motion.div>
            <motion.div
              className="text-left max-w-xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="text-lg mb-6">
              My journey with software development began over 10 years ago. Early on, I fell in love with developing web and mobile applications. I found it so cool to be able to personalize each component to make the user experience seamless and enjoyable. Especially when I am tasked with showing them large and complex datasets. 
              </p>
              <p className="text-lg">
                Over the years I have learned a particular naming convention to keep my code extremely readable for coworkers and myself. I definitely prefer to do things right the first time, so I am extremely diligent when reading or creating requirements for customer&apos;s needs. 
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: headerDelay, duration: 0.5 }}
                className="text-center"
              >
                <SectionHeader size="small">FRAMEWORKS</SectionHeader>
              </motion.div>
              <motion.div
                className="grid grid-cols-4 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="col-start-2 col-span-2 grid grid-cols-2 gap-4">
                  {frameworks.map((tech, index) => (
                    <TechCard key={tech.name} tech={tech} delay={frameworkDelays[index]} />
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: headerDelay, duration: 0.5 }}
                className="text-center"
              >
                <SectionHeader size="small">LANGUAGES</SectionHeader>
              </motion.div>
              <motion.div
                className="grid grid-cols-4 gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {languages.map((tech, index) => (
                  <TechCard key={tech.name} tech={tech} delay={languageDelays[index]} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

