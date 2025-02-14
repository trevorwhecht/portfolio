"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/lib/themeContext"
import { createNoise3D } from "simplex-noise"

export function StaticTopographicBackground({ opacity = 0.1 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    contextRef.current = context
    const noise3D = createNoise3D()

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window
      const dpr = window.devicePixelRatio || 1

      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`

      context.scale(dpr, dpr)
    }

    const drawContour = (x: number, y: number, value: number) => {
      if (!contextRef.current) return

      const ctx = contextRef.current
      const isDark = theme === "dark"

      ctx.strokeStyle = isDark
        ? `rgba(255, 255, 255, ${opacity * (0.1 + value * 0.3)})`
        : `rgba(0, 0, 0, ${opacity * (0.1 + value * 0.3)})`

      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + 1, y)
      ctx.stroke()
    }

    const drawFrame = (time: number) => {
      if (!contextRef.current) return

      const ctx = contextRef.current
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = theme === "dark" ? "#000000" : "#ffffff"
      ctx.fillRect(0, 0, width, height)

      const scale = 0.003
      const timeScale = time * 0.00005

      for (let y = 0; y < height; y += 2) {
        for (let x = 0; x < width; x += 2) {
          const noise = noise3D(x * scale, y * scale, timeScale)
          const value = (noise + 1) / 2

          if (Math.abs(value - Math.round(value * 10) / 10) < 0.01) {
            drawContour(x, y, value)
          }
        }
      }

      rafRef.current = requestAnimationFrame(drawFrame)
    }

    window.addEventListener("resize", resizeCanvas)

    resizeCanvas()
    drawFrame(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [theme, opacity])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

