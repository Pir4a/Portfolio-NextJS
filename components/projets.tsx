"use client"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import projetsdata from "../datas/projetsdatanew.json"
import { TiltShineCard } from "./projectCardTilt"
import { FaReact, FaSass, FaNodeJs, FaDatabase } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiThreedotjs,
} from "react-icons/si"
import { AnimatePresence, delay, motion, useInView } from "framer-motion"
import { useRef } from "react"

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
const iconMap: { [key: string]: any } = {
  FaReact,
  FaSass,
  FaNodeJs,
  FaDatabase,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiThreedotjs,
}

function Projets({ deviceWidth }: { deviceWidth: number }) {
  const { language } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(
    ref,
    deviceWidth >= 1024
      ? { margin: "0px 0px -18% 0px" }
      : { margin: "0px 0px 0% 0px" }
  )

  return (
    <>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent " />
      <div
        ref={ref}
        className="flex flex-col items-center min-h-[180dvh] xl:min-h-[120dvh] 2xl:min-h-[105dvh]"
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
                    duration: 1,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                  className="overflow-hidden whitespace-nowrap inline-block pb-2"
                >
                  {translations[language].projects.title}
                </motion.span>
              </motion.div>

              <motion.div
                layout
                className=" flex flex-col lg:grid lg:grid-cols-2 lg:gap-8 relative  space-y-8 xl:space-y-0 xl:px-40 2xl:px-0  xl:mx-0 2xl:grid-cols-3 2xl:min-h-[60dvh] gap-10 w-[90%] xl:w-full items-center pt-10 "
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
                    delay={index * 0.2}
                    iconMap={iconMap}
                  >
                    <h3 className="text-2xl flex justify-center pb-2 xl:py-2 xl:pt-0  font-light tracking-tight text-black dark:text-gray-200">
                      {projet.projectName}
                    </h3>
                    <img
                      src={projet.projectImg}
                      alt={projet.projectName}
                      className="w-full h-auto xl:min-h-full   rounded-lg shadow-lg object-cover opacity-80 group-hover:scale-[102%] transition-all duration-500"
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
