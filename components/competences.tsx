"use client "
import { motion } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import {
  FaCss3,
  FaCss3Alt,
  FaFigma,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaSass,
} from "react-icons/fa"
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri"
import { SiTypescript, SiThreedotjs } from "react-icons/si"
import { translations } from "../translations"
import ChaqueCompetences from "./chaqueCompetences"

const languages = [
  { Icon: FaJs, key: "js", label: "JavaScript" },
  { Icon: FaHtml5, key: "html", label: "HTML5" },
  { Icon: FaCss3, key: "css", label: "CSS3" },
  { Icon: FaSass, key: "sass", label: "SASS" },
  { Icon: SiTypescript, key: "typescript", label: "TypeScript" },
]

const frameworks = [
  { Icon: FaReact, key: "react", label: "React" },
  { Icon: FaNodeJs, key: "node", label: "Node.js" },
  { Icon: RiNextjsFill, key: "next", label: "Next.js" },
  { Icon: RiTailwindCssLine, key: "tailwind", label: "Tailwind CSS" },
  { Icon: SiThreedotjs, key: "threejs", label: "Three.js" },
  { Icon: FaGithub, key: "github", label: "GitHub" },
]

const tools = [
  { Icon: FaFigma, key: "figma", label: "Figma" },
  { Icon: FaGit, key: "git", label: "Git" },
  { Icon: FaNpm, key: "npm", label: "npm" },
]

function Competences({
  scrollYValue,
  deviceWidth,
}: {
  scrollYValue: number
  deviceWidth: number
}) {
  const { language } = useLanguage()
  return (
    <div className="dark:bg-black pt-30 xl:pt-0 z-40 min-h-[50dvh] xl:max-h-[70dvh] bg-cyan-100 flex flex-col overflow-x-hidden">
      <div className="dark:bg-black bg-cyan-100 text-lg leading-relaxed flex flex-col xl:flex-row xl:justify-between xl:gap-10 xl:items-top h-full px-4 xl:px-[0%] gap-10 xl:pr-[13%]">
        {scrollYValue > 800 && (
          <>
            <motion.p
              key={`${language}-${deviceWidth}`}
              initial={{
                opacity: 0,
                ...(deviceWidth >= 1280 ? { x: -300 } : {}),
              }}
              animate={{
                opacity: 1,
                ...(deviceWidth >= 1280 ? { x: [-300, 150, 100] } : {}),
              }}
              exit={{ opacity: 0, ...(deviceWidth >= 1280 ? { x: -300 } : {}) }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
              className={`pt-10 xl:pt-25 text-4xl xl:text-6xl  font-light tracking-tight text-gray-800 dark:text-gray-200 ${
                language === "fr" ? "" : "xl:pl-28"
              } ${deviceWidth < 1280 ? "text-center" : ""}`}
            >
              {translations[language].skills.title}
            </motion.p>
            <div className="flex flex-col xl:flex-row xl:justify-start xl:items-start xl:pt-20  gap-8 xl:gap-20">
              <ChaqueCompetences
                title={translations[language].skills.languages}
                items={languages}
                language={language}
                deviceWidth={deviceWidth}
                delay={0.2}
              />

              <ChaqueCompetences
                title={translations[language].skills.frameworks}
                items={frameworks}
                language={language}
                deviceWidth={deviceWidth}
                delay={0.2}
              />

              <ChaqueCompetences
                title={translations[language].skills.tools}
                items={tools}
                language={language}
                deviceWidth={deviceWidth}
                delay={0.2}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Competences
