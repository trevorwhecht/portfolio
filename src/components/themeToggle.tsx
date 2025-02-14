"use client"

import { useTheme } from "@/lib/themeContext"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`rounded-full ${
        theme === "dark"
          ? "border-highlight-dark text-highlight-dark hover:bg-highlight-dark/10"
          : "border-highlight-light text-highlight-light hover:bg-highlight-light/10"
      }`}
    >
      {theme === "light" ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}