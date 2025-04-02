import { useRef, useState } from "react"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { useTheme } from "next-themes"
interface TiltShineCardProps {
  className?: string
  children: React.ReactNode
  delay?: number
  layoutId?: string
}

import Backdrop from "./backdrop"

export function TiltShineCard({
  delay,
  className,
  children,
  layoutId,
}: TiltShineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse position motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smooth movement
  const springConfig = { damping: 15, stiffness: 15 }
  const rotateX = useSpring(useMotionValue(0), springConfig)
  const rotateY = useSpring(useMotionValue(0), springConfig)

  // Content movement in the opposite direction for enhanced 3D effect

  // Calculate diagonal movement for shine effect
  const diagonalMovement = useMotionValue(0)

  // Use this to update diagonal movement when rotation changes
  rotateX.onChange((latest) => {
    diagonalMovement.set(latest + rotateY.get())
  })

  rotateY.onChange((latest) => {
    diagonalMovement.set(rotateX.get() + latest)
  })

  // Shine gradient position
  const sheenPosition = useTransform(diagonalMovement, [-15, 15], [-100, 200])
  const sheenOpacity = useTransform(diagonalMovement, [-15, 15], [0, 0.3])
  const sheenGradient = useMotionTemplate`linear-gradient(
    55deg,
    transparent,
    rgba(255, 255, 255, ${sheenOpacity}) ${sheenPosition}%,
    transparent
  )`

  // Handle mouse move
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Get mouse position relative to card
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Calculate rotation values
    const centerX = rect.width / 4.5
    const centerY = rect.height / 4.5

    const rotateXValue = ((y - centerY) / centerY) * -8 // Inverted for natural feel
    const rotateYValue = ((x - centerX) / centerX) * 8

    // Update motion values
    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)

    // Update diagonal movement directly
    diagonalMovement.set(rotateXValue + rotateYValue)
  }

  function handleMouseLeave() {
    // Reset all values when mouse leaves
    rotateX.set(0)
    rotateY.set(0)
    diagonalMovement.set(0)
  }

  const { theme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: delay }}
      whileHover={{ scale: 1.05 }}
      className="group h-full w-full mx-auto xl:perspective-[1000px]"
    >
      <motion.div
        onClick={() => console.log(rotateX.get(), rotateY.get())}
        layoutId={layoutId}
        ref={cardRef}
        className={`relative  xl:max-w-auto hover:scale-130 cursor-pointer hover:-z-50 overflow-hidden rounded-lg border p-5 xl:max-h-[35dvh] z-30 bg-gray-300/30
          dark:bg-[#0A0A0A]/10 border-pink-200/50 dark:border-[#1A1A1A]/10
          dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)]
          transition-all duration-300 ${className || ""}`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          rotateX,
          rotateY,
          backgroundImage: sheenGradient,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 z-30 rounded-lg bg-gradient-to-b from-[#1A1A1A]/20 to-transparent" />

        {/* Pink border glow */}
        <div className="absolute inset-0 z-30 rounded-lg border via-pink-300/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]" />

        {/* Light reflection effect */}
        <div className="absolute z-30 inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

        {/* Illuminated edge - custom mouseover effect */}
        <div
          className="absolute inset-0 -z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${
              theme === "dark"
                ? "rgba(236, 72, 153, 0.1)"
                : "rgba(236, 72, 153, 0.15)"
            } 0%, transparent 60%)`,
          }}
          onMouseMove={(e) => {
            if (!cardRef.current) return
            const rect = cardRef.current.getBoundingClientRect()
            const x = ((e.clientX - rect.left) / rect.width) * 100
            const y = ((e.clientY - rect.top) / rect.height) * 100
            e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
            e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
          }}
        />

        {/* 3D content that moves slightly in opposite direction */}
        <motion.div className="relative z-10 text-gray-800 dark:text-gray-400">
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
