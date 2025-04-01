"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ProjectCardProps {
  children: React.ReactNode
  className?: string
}

function ProjectCard({ children, className = "" }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }
  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition)
    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  let tiltValueX = mousePosition.x / 30
  let tiltValueY = mousePosition.y / 30

  return (
    <motion.div
      transition={{ duration: 0.4, repeat: 1, repeatType: "reverse" }}
      whileHover={{ rotateX: tiltValueX, rotateY: tiltValueY }}
      className={`relative   max-h-[35dvh] z-30 p-5 rounded-lg bg-[#0A0A0A] border border-pink-300/60 dark:border-[#1A1A1A] dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)] ${className} transition-transform duration-300`}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 z-30 rounded-lg bg-gradient-to-b from-[#1A1A1A]/20 to-transparent"></div>
      {/* Pink border glow */}
      <div className="absolute inset-0 z-30 rounded-lg border via-pink-300/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]"></div>

      {/* Light reflection effect */}
      <div className="absolute z-30 inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

      {/* Content */}
      <div className="relative z-10 text-gray-800 dark:text-gray-400">
        {children}
      </div>
    </motion.div>
  )
}

export default ProjectCard
