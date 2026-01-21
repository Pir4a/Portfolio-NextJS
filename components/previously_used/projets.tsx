"use client"
import { useLanguage } from "../../contexts/LanguageContext"
import Image from "next/image"
import { translations } from "../../translations"
import projetsdata from "../../datas/projetsdatanew.json"
import { TiltShineCard } from "../organisms/projectCardTilt"
import { FaReact, FaSass, FaNodeJs, FaDatabase } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useRef } from "react"
import { IconType } from "react-icons"

interface Projet {
  projectName: string
  projectDescription: string
  projectDescriptionEN: string
  technosImg: string[]
  technos: string[]
  gitLink: string
  liveLink: string
  projectImg: string
}

// Icon mapping object
const iconMap: { [key: string]: IconType } = {
  FaReact,
  FaSass,
  FaNodeJs,
  FaDatabase,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
}

function Projets({ deviceWidth }: { deviceWidth: number }) {
  const { language } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(
    ref,
    deviceWidth >= 1024
      ? { margin: "0px 0px -18% 0px", once: true }
      : { margin: "0px 0px 0% 0px", once: true }
  )

  return (
    <>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent " />
      <div
        ref={ref}
        className="flex flex-col items-center min-h-[180dvh] xl:min-h-[150dvh] 2xl:min-h-[105dvh]"
      >
        <AnimatePresence mode="wait">
          {isInView && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  delay: 0.1,
                }}
                className="text-6xl font-light tracking-tight text-gray-800 dark:text-gray-200 pt-10 mx-auto lg:pb-6 xl:pb-0"
              >
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{
                    duration: 0.6,
                    ease: "circOut",
                    delay: 0.2,
                  }}
                  className="whitespace-nowrap inline-block overflow-hidden relative pb-4"
                >
                  {translations[language].projects.title}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "circOut",
                      delay: 0.4,
                    }}
                    className={`absolute left-0 right-0 h-[2px] overflow-visible -bottom-0 bg-gradient-to-r from-transparent via-pink-300/40 to-transparent`}
                  />
                </motion.span>
              </motion.div>

              <motion.div
                layout
                className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 relative space-y-8 xl:space-y-0 xl:px-40 2xl:px-0 xl:mx-0 2xl:grid-cols-3 xl:min-h-[128dvh] 2xl:min-h-[60dvh] gap-10 w-[90%] xl:w-full items-center pt-10"
              >
                {projetsdata.map((projet: Projet, index: number) => (
                  <TiltShineCard
                    gitLink={projet.gitLink}
                    liveLink={projet.liveLink}
                    technosImg={projet.technosImg}
                    technos={projet.technos}
                    descriptionEN={projet.projectDescriptionEN}
                    titre={projet.projectName}
                    description={projet.projectDescription}
                    displayedimg={projet.projectImg}
                    className=""
                    index={index}
                    key={index}
                    delay={0.36 + index * 0.18}
                    iconMap={iconMap}
                  >
                    <h3 className="text-2xl flex justify-center pb-2 xl:py-2 xl:pt-0 font-light tracking-tight text-black dark:text-gray-200">
                      {projet.projectName}
                    </h3>
                    <Image
                      src={projet.projectImg}
                      alt={projet.projectName}
                      width={800}
                      height={600}
                      className="w-full h-auto xl:min-h-full rounded-lg shadow-lg object-cover opacity-80 group-hover:scale-[102%] transition-all duration-500"
                    />
                  </TiltShineCard>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default Projets
{
  /*<p className="text-sm xl:w-[80%] mx-auto mt-4 text-center">
                {language === "fr"
                  ? projet.projectDescription
                  : projet.projectDescriptionEN}
              </p>*/
}
