"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/themeContext"
import { createNoise3D } from "simplex-noise"

export function TopographicBackground() {
  // Refs to store canvas, context, mouse position, and animation frame
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | undefined>(undefined)

  // Get the current theme (light or dark)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context
    // Create a 3D noise generator function
    const noise3D = createNoise3D()

    // Function to resize canvas to match window size
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      const dpr = window.devicePixelRatio || 1

      // Set canvas size accounting for device pixel ratio
      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`

      // Scale the context to ensure correct resolution
      context.scale(dpr, dpr)
    }

    // Function to draw a single contour line segment
    const drawContour = (x: number, y: number, value: number, lineWidth: number) => {
      if (!contextRef.current) return

      const ctx = contextRef.current
      const isDark = theme === "dark"

      // Set line color based on theme and noise value
      ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${0.1 + value * 0.3})` : `rgba(0, 0, 0, ${0.1 + value * 0.3})`

      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + 1, y) // Draw a 1px horizontal line
      ctx.stroke()
    }

    // Main animation frame drawing function
    const drawFrame = (time: number) => {
      if (!contextRef.current) return

      const ctx = contextRef.current
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      // Clear canvas and set background color
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = theme === "dark" ? "#000000" : "#ffffff"
      ctx.fillRect(0, 0, width, height)

      // Parameters for noise generation and animation
      const scale = 0.003 // Scale of the noise (smaller = larger features)
      const timeScale = time * 0.00002 // Speed of the animation

      // Loop through each point on the canvas (skipping every other pixel for performance)
      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          // Generate noise value for this point
          const noise = noise3D(x * scale, y * scale, timeScale)

          // Calculate distance from this point to the mouse
          const distanceToMouse = Math.sqrt(Math.pow(x - mouseRef.current.x, 2) + Math.pow(y - mouseRef.current.y, 2))

          // Calculate mouse influence (1 at mouse position, 0 at distance of 250px or more)
          const mouseInfluence = Math.max(0, 1 - distanceToMouse / 250)

          // Adjust the noise value based on mouse influence
          const value = (noise + 1) / 2 + mouseInfluence * 0.2

          // Draw contour line if the value is close to a multiple of 0.1
          if (Math.abs(value - Math.round(value * 10) / 10) < 0.01) {
            drawContour(x, y, value, 1 + mouseInfluence * 2)
          }
        }
      }

      // Request next animation frame
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    // Update mouse position on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    // Add event listeners
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    // Initial setup
    resizeCanvas()
    drawFrame(0)

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [theme]) // Re-run effect if theme changes

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}

