import { useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "../contexts/LanguageContext"

interface TiltShineCardProps {
  technosImg: string[]
  technos: string[]
  titre: string
  description: string
  descriptionEN: string
  displayedimg: string
  className?: string
  children: React.ReactNode
  delay?: number
  layoutId?: string
  index: number
  iconMap: { [key: string]: any }
  gitLink: string
  liveLink: string
}

export function TiltShineCard({
  technosImg,
  technos,
  description,
  descriptionEN,
  titre,
  displayedimg,
  delay,
  className,
  children,
  layoutId,
  index,
  iconMap,
  gitLink,
  liveLink,
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
        className="group h-full xl:w-full lg:min-h-[30dvh] xl:h-full mx-auto xl:perspective-[1000px] transition-all duration-300"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          layoutId={`card-${index}`}
          ref={cardRef}
          className={`relative xl:max-w-auto xl:min-h-full  cursor-pointer hover:-z-50 overflow-hidden rounded-lg border p-5 
            xl:max-h-[35dvh] dark:bg-[#0A0A0A]/10 border-pink-200/50 dark:border-[#1A1A1A]/10 
            dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)] 
            z-30 bg-gray-200/20 ${className || ""}`}
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
                className="relative overflow-hidden rounded-lg border p-8 pt-4 bg-gray-400/80 dark:bg-black/80 shadow-xl"
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

                <motion.div className="relative z-10 w-full min-h-[50dvh] xl:min-w-[300px]">
                  <h1 className="flex justify-center xl:text-2xl xl:pb-4 font-light tracking-tight text-black dark:text-gray-200">
                    {titre}
                  </h1>
                  <div className="pt-2 flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Image and Tech Stack */}
                    <div className="lg:w-1/2 flex flex-col gap-4">
                      <div className="relative ">
                        <img
                          src={displayedimg}
                          alt={titre}
                          className="rounded-lg shadow-lg object-cover w-full opacity-90 "
                        />
                      </div>
                      {/* Tech Stack */}
                      <motion.div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:justify-evenly gap-4 p-4 bg-gray-50 dark:bg-black/80 rounded-lg">
                        {technosImg.map((technoImg, i) => {
                          const Icon = iconMap[technoImg]
                          return Icon ? (
                            <div
                              key={i}
                              className="flex justify-center items-center"
                            >
                              <span className="flex justify-center items-center gap-2">
                                <Icon className="w-6 h-6" />
                                <p className="text-md">{technos[i]}</p>
                              </span>
                            </div>
                          ) : null
                        })}
                      </motion.div>
                      {/* Project Links */}
                      <motion.div className="flex gap-6 justify-center items-center xl:min-h-[60px] xl:min-w-[180px]">
                        <motion.a
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          href={gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black/70 border border-solid border-pink-100/90 hover:bg-black xl:max-h-[45px] text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </motion.a>
                        <motion.a
                          whileHover={{
                            scale: 1.05,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          href={liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-pink-400/70  xl:max-h-[45px] hover:bg-pink-400/80  text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Live Demo
                        </motion.a>
                      </motion.div>
                    </div>

                    {/* Right Column - Description */}
                    <div className="lg:w-1/2 text-black/90 tracking-tight dark:font-light dark:text-gray-200 space-y-4">
                      {sentences(
                        language === "en" ? descriptionEN : description
                      ).map((sentence, i) => (
                        <motion.p
                          key={i}
                          className="leading-relaxed text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1] }}
                          transition={{
                            duration: 0.5,
                            bounce: 0,
                            delay: i * 0.2,
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
