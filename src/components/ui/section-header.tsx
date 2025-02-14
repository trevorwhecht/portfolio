import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/themeContext"
import type React from "react"

interface SectionHeaderProps {
  children: React.ReactNode
  className?: string
  size?: "large" | "small"
}

export function SectionHeader({ children, className, size = "large" }: SectionHeaderProps) {
  const { theme } = useTheme()

  return (
    <h2
      className={cn(
        "relative inline-block",
        size === "large" ? "pb-2 text-5xl font-bold mb-12" : "pb-1 text-xl font-semibold mb-8",
        className,
      )}
    >
      <span
        className={cn(
          "absolute -z-10 w-[100%]",
          size === "large" ? "bottom-1 h-4 translate-x-8" : "bottom-1.5 h-2 translate-x-3",
          theme === "dark" ? "bg-highlight-dark" : "bg-highlight-light",
        )}
      />
      {children}
    </h2>
  )
}

