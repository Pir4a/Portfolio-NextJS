import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  stagger,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "../contexts/LanguageContext"

interface TiltShineCardProps {
  titre: string
  description: string
  descriptionEN: string
  displayedimg: string
  className?: string
  children: React.ReactNode
  delay?: number
  layoutId?: string
  index: number
}

export function TiltShineCard({
  description,
  descriptionEN,
  titre,
  displayedimg,
  delay,
  className,
  children,
  layoutId,
  index,
}: TiltShineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

  // Mouse position motion values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Add spring physics for smooth movement
  const springConfig = { damping: 15, stiffness: 15 }
  const rotateX = useSpring(useMotionValue(0), springConfig)
  const rotateY = useSpring(useMotionValue(0), springConfig)

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
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 4.5
    const centerY = rect.height / 4.5

    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    diagonalMovement.set(rotateXValue + rotateYValue)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
    diagonalMovement.set(0)
  }

  const { theme } = useTheme()

  const sentences = (sentence: string) =>
    sentence.split(/[.!?]+/).filter((sentence: string) => sentence.trim())

  return (
    <>
      <motion.div
        key={`card-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeIn",
          delay: delay,
        }}
        className="group h-full lg:min-h-[30dvh] xl:h-auto mx-auto xl:perspective-[1000px] transition-all duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          layoutId={`card-${index}`}
          ref={cardRef}
          className={`relative xl:max-w-auto cursor-pointer hover:-z-50 overflow-hidden rounded-lg border p-5 
            xl:max-h-[35dvh] dark:bg-[#0A0A0A]/10 border-pink-200/50 dark:border-[#1A1A1A]/10 
            dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)] 
            z-30 bg-gray-300/3 ${className || ""}`}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            rotateX,
            rotateY,
            backgroundImage: sheenGradient,
            pointerEvents: isModalOpen ? "none" : "auto",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsModalOpen(true)}
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-4xl"
            >
              <motion.div
                className="relative overflow-hidden rounded-lg border p-8 pt-4 bg-white dark:bg-black/80 shadow-xl"
                style={{
                  backgroundImage: sheenGradient,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 cursor-pointer right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <motion.div className="relative z-10 w-full min-h-[50dvh]">
                  <h1 className="flex justify-center xl:text-2xl xl:pb-4 font-light tracking-tight text-black dark:text-gray-200">
                    {titre}
                  </h1>
                  <div className="pt-2 grid grid-cols-2 gap-4 text-xl">
                    <img
                      src={displayedimg}
                      alt={titre}
                      className="rounded-lg shadow-lg object-cover opacity-90"
                    />
                    <div className="text-gray-500 font-light dark:text-gray-200 space-y-4">
                      {sentences(
                        language === "en" ? descriptionEN : description
                      ).map((sentence, i) => (
                        <motion.p
                          key={i}
                          className=" leading-6"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: [0, 1], y: [10, 0] }}
                          transition={{
                            type: "spring",
                            duration: 0.5,
                            bounce: 0,
                          }}
                        >
                          {sentence.trim()}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
