"use client "
import { AnimatePresence, motion, useInView } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import {
  FaCss3,
  FaFigma,
  FaGit,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaSass,
  FaCode,
} from "react-icons/fa"
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri"
import { SiTypescript, SiThreedotjs } from "react-icons/si"
import { translations } from "../translations"
import ChaqueCompetences from "./chaqueCompetences"
import { useRef } from "react"

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
]

const tools = [
  { Icon: FaFigma, key: "figma", label: "Figma" },
  { Icon: FaGit, key: "git", label: "Git" },
  { Icon: FaNpm, key: "npm", label: "npm" },
  { Icon: FaGithub, key: "github", label: "GitHub" },
  { Icon: FaCode, key: "vscode", label: "VSCode" },
]

function Competences({ deviceWidth }: { deviceWidth: number }) {
  const { language } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: "0px 0px -30% 0px",
    once: true,
  })

  return (
    <div className="dark:bg-black pb-14 pt-40 xl:pt-0 z-40 min-h-[120dvh] xl:min-h-[60dvh] xl:max-h-[70dvh] bg-cyan-100 flex flex-col overflow-x-hidden ">
      <div
        ref={ref}
        className="dark:bg-black bg-cyan-100 text-lg leading-relaxed flex flex-col xl:flex-row  xl:gap-10 xl:items-top h-full px-4 xl:px-[0%] gap-10 "
      >
        <AnimatePresence mode="wait">
          {isInView && (
            <>
              <motion.h2
                key={`${language}-${deviceWidth}`}
                initial={{
                  opacity: 0,
                  ...(deviceWidth >= 1280 ? { x: -300 } : {}),
                }}
                animate={{
                  opacity: 1,
                  ...(deviceWidth >= 1280 ? { x: [-300, 150, 100] } : {}),
                }}
                exit={{
                  opacity: 0,
                  ...(deviceWidth >= 1280 ? { x: -300 } : {}),
                }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
                className={`pt-10 xl:pt-25 text-4xl xl:text-6xl  font-light xl:min-w-[30%] tracking-tight text-gray-800 dark:text-gray-200 ${
                  language === "fr" ? "xl:gap-6" : "xl:pl-28"
                } ${deviceWidth < 1280 ? "text-center" : ""}`}
              >
                {translations[language].skills.title}
              </motion.h2>
              <div className="flex flex-col xl:flex-row xl:justify-start xl:items-start xl:pt-20 xl:min-w-[0%] mx-auto  gap-8 xl:gap-14 ">
                <ChaqueCompetences
                  title={translations[language].skills.languages}
                  items={languages}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  // delay de 0.1 pour les langages
                  arbriraryValue={0.1}
                />

                <ChaqueCompetences
                  title={translations[language].skills.frameworks}
                  items={frameworks}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  // delay de 0.1 pour les frameworks
                  arbriraryValue={0.2}
                />

                <ChaqueCompetences
                  title={translations[language].skills.tools}
                  items={tools}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  // delay de 0.5 pour les outils
                  arbriraryValue={0.3}
                />
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
      <span id="projects" className="invisible" />
    </div>
  )
}
export default Competences
