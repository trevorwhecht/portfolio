import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/themeContext"
import type React from "react"

interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
}

export function SectionHeader({ children, className }: SectionHeaderProps) {
  const { theme } = useTheme()

  return (
    <h2 className={cn("relative pb-2 text-5xl font-bold mb-12 inline-block", className)}>
      <span
        className={cn(
          "absolute -z-10 bottom-1 h-4 w-[100%] translate-x-8",
          theme === "dark" ? "bg-highlight-dark" : "bg-highlight-light",
        )}
      />
      {children}
    </h2>
  )
}

