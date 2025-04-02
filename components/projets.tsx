"use client"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import projetsdata from "../datas/projetsdatanew.json"
import { TiltShineCard } from "./projectCardTilt"
import Backdrop from "./backdrop"
import { delay, motion } from "framer-motion"
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

function Projets({
  scrollYValue,
  deviceWidth,
}: {
  scrollYValue: number
  deviceWidth: number
}) {
  const { language } = useLanguage()

  return (
    <>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent " />
      <div className="flex flex-col items-center xl:min-h-[120dvh]">
        {scrollYValue > 1100 && (
          <>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-6xl font-light tracking-tight text-gray-800 dark:text-gray-200 pt-10 mx-auto"
            >
              {translations[language].projects.title}
            </motion.h1>

            <motion.div className=" flex flex-col xl:grid space-y-8 xl:space-y-0  xl:mx-0 xl:grid-cols-3 min-h-[60dvh] gap-10 w-[90%] xl:w-full items-center pt-10 ">
              {projetsdata.map((projet: Projet, index: number) => (
                <TiltShineCard className="" key={index} delay={index * 0.2}>
                  <h3 className="text-2xl flex justify-center pb-2 xl:py-2 xl:pt-0  font-light tracking-tight text-black dark:text-gray-200">
                    {projet.projectName}
                  </h3>
                  <img
                    src={projet.projectImg}
                    alt={projet.projectName}
                    className="w-full h-auto rounded-lg shadow-lg object-cover opacity-80 group-hover:scale-[102%] transition-all duration-500"
                  />
                </TiltShineCard>
              ))}
            </motion.div>

            {false && (
              <Backdrop onClick={() => console.log("clicked")}>v</Backdrop>
            )}
          </>
        )}
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
