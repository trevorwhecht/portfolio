"use client"

import { ArrowUp, Github, Linkedin, Mail, Facebook, PinIcon as Pinterest } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:trevorwhecht@gmail.com", icon: Mail, label: "Email" },
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://pinterest.com", icon: Pinterest, label: "Pinterest" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
            <span className="sr-only">Scroll to top</span>
          </Button>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Trevor Hecht. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

