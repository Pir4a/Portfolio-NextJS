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
import { IconType } from "react-icons"
import { toast } from "sonner"

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
  iconMap: { [key: string]: IconType }
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
  index,
  iconMap,
  gitLink,
  liveLink,
}: TiltShineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

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

  const isFissure = titre === "Fissure ( SaaS )"

  return (
    <>
      <motion.div
        key={`card-${index}`}
        initial={{ opacity: 0, scale: isFissure ? 0.95 : 1 }}
        animate={{ opacity: isModalOpen ? 0 : 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isFissure ? 0.5 : 0.3,
          ease: "easeOut",
          delay: delay,
        }}
        className={`group h-full xl:w-full lg:min-h-[30dvh] xl:h-full mx-auto xl:perspective-[1000px] transition-all duration-300 ${isFissure ? "perspective-[1500px]" : ""
          }`}
      >
        <motion.div
          whileHover={{
            scale: isFissure ? 1.02 : 1.05,
            boxShadow: isFissure
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(59, 130, 246, 0.15)"
              : undefined
          }}
          transition={{
            type: "spring",
            stiffness: isFissure ? 200 : 300,
            damping: isFissure ? 25 : 20
          }}
          layoutId={`card-${index}`}
          ref={cardRef}
          className={`relative xl:max-w-auto xl:min-h-full cursor-pointer hover:-z-50 ${isFissure ? "overflow-visible" : "overflow-hidden"
            } rounded-lg border p-5 
            xl:max-h-[35dvh] dark:bg-[#0A0A0A]/10 border-pink-200/50 dark:border-[#1A1A1A]/10 
            dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)] 
            z-30 bg-white/10 ${className || ""} ${isFissure ? "border-blue-300/50 dark:border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : ""
            }`}
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
          <div className={`absolute inset-0 z-30 rounded-lg bg-gradient-to-b ${isFissure
            ? "from-blue-500/10 to-transparent"
            : "from-[#1A1A1A]/20 to-transparent"
            }`} />

          {/* Pink border glow */}
          <div className="absolute inset-0 z-30 rounded-lg border via-pink-300/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]" />

          {/* Light reflection effect */}
          <div className="absolute z-30 inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

          {/* Illuminated edge - custom mouseover effect */}
          <div
            className="absolute inset-0 -z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${theme === "dark"
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
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-7xl ${titre === "Fissure ( SaaS )" ? "w-[80dvw]" : "w-[90vw] max-w-4xl"
                }`}
            >
              <motion.div
                className={`relative overflow-hidden rounded-lg border p-8 pt-4 bg-gray-400/80 dark:bg-black/80 shadow-xl ${isFissure ? "overflow-y-auto max-h-[85vh]" : ""}`}
                style={{
                  backgroundImage: sheenGradient,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 cursor-pointer right-4 z-50 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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

                  {/* Fissure Special Layout */}
                  {isFissure ? (
                    <div className="flex flex-col gap-8">
                      {/* Full Width Image with Overlay */}
                      <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10">
                          <h3 className="text-lg font-bold text-white tracking-wide">
                            Diagramme Infra :
                          </h3>
                        </div>
                        <img
                          src={displayedimg}
                          alt={titre}
                          className="w-3/4 h-auto ml-[20%] object-cover rounded-lg"
                        />
                      </div>

                      <div className="space-y-10 px-2 lg:px-4">
                        {/* AWS Cloud Infra Section */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                            AWS Cloud Infra
                          </h3>
                          <div className="bg-white/5 dark:bg-zinc-900/50 p-6 rounded-xl border border-orange-200/20 dark:border-orange-900/30 space-y-4 text-black dark:text-gray-300">
                            <p><strong className="text-orange-700 dark:text-orange-300">Why this specific choice?</strong><br />
                              We chose AWS ECS (Elastic Container Service) coupled with Fargate for a serverless container experience. This eliminates the need to manage EC2 instances directly, allowing us to focus purely on the application logic. The architecture is deployed across 2 Availability Zones for high availability.</p>

                            <p><strong className="text-orange-700 dark:text-orange-300">What if 10x more users?</strong><br />
                              The current setup uses RDS (b.t3.micro) which is cost-effective mainly for development. For a 10x scale, we would vertically scale the RDS instance (to t3.medium or large) and implement Read Replicas to offload read traffic. ECS Fargate can auto-scale the number of tasks based on CPU/Memory utilization to handle traffic spikes instantly.</p>

                            <p><strong className="text-orange-700 dark:text-orange-300">Security?</strong><br />
                              Security is enforced via restricted Security Groups (firewalls) allowing traffic only from the ALB to the App and from the App to the DB. IAM Roles ensure the principle of least privilege—application containers have only the permissions they strictly need (e.g., pulling images from ECR, writing logs to CloudWatch).</p>
                          </div>
                        </div>

                        {/* IaC Section */}
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                            Infrastructure as Code (IaC)
                          </h3>
                          <div className="bg-white/5 dark:bg-zinc-900/50 p-6 rounded-xl border border-purple-200/20 dark:border-purple-900/30 space-y-4 text-black dark:text-gray-300">
                            <p>
                              We use <strong className="text-purple-700 dark:text-purple-300">Terraform</strong> to define the entire infrastructure. This approach allows us to version control our infrastructure (GitOps), ensuring reproducibility and eliminating "configuration drift". We can spin up a new environment (staging/prod) in minutes just by applying the Terraform plan. It also provides a clear audit trail of all infrastructure changes.
                            </p>
                          </div>
                        </div>

                        {/* Split View: Video + Architecture */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Left: Video Placeholder */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">App Demo</h3>
                            <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-900 rounded-xl border border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-600 gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.328l5.603 3.113Z" />
                              </svg>
                              <span className="font-medium text-sm">Full app walkthrough video coming soon</span>
                            </div>
                          </div>

                          {/* Right: Architecture Choices */}
                          <div className="space-y-4">
                            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">Architecture Choices</h3>
                            <div className="space-y-4 text-black dark:text-gray-300 text-sm leading-relaxed">
                              <div>
                                <strong className="text-blue-700 dark:text-blue-300 block mb-1">Back-End (Clean Architecture)</strong>
                                <p>The backend is built with ExpressJS and TypeScript following <span className="italic">Clean Architecture</span> principles. This separates the Domain (business rules) from the Infrastructure (database, web server). It makes the code highly testable and independent of frameworks. If we change the DB from SQLite to PostgreSQL, the business logic remains untouched.</p>
                              </div>
                              <div>
                                <strong className="text-sky-700 dark:text-sky-300 block mb-1">Front-End (React Native)</strong>
                                <p>We chose React Native with Expo for a "Write Once, Run Anywhere" strategy. The UI is component-driven, ensuring consistency. We use local state for immediate feedback and sync with the backend asynchronously for a smooth user experience.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Standard Layout for other cards
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
                            onClick={() => {
                              if (liveLink === "") {
                                toast.error(
                                  `${titre} ${language === "en" ? "is not available yet in live version" : "n'est pas encore disponible en version live"}`
                                )
                              }
                            }}
                            href={liveLink === "" ? undefined : liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pink-400/70 cursor-pointer  xl:max-h-[45px] hover:bg-pink-400/80  text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
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
                        <>
                          {/* Regular project description */}
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
                        </>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
