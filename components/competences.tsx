"use client "
import { motion } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import {
  FaCss3,
  FaCss3Alt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
  FaSass,
} from "react-icons/fa"
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri"
import { SiTypescript, SiThreedotjs } from "react-icons/si"
import { translations } from "../translations"
import TextCard from "./textCard"

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

function Competences({ scrollYValue }: { scrollYValue: number }) {
  const { language } = useLanguage()
  return (
    <div className="dark:bg-black z-40 min-h-[40dvh] max-h-[70dvh] bg-cyan-50 flex flex-col">
      <div className="dark:bg-black bg-cyan-50 text-lg leading-relaxed flex flex-col xl:flex-row  justify-center xl:justify-between xl:items-top h-full xl:px-[0%]">
        {scrollYValue > 700 && (
          <>
            <motion.p
              key={language}
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: [-300, 150, 100] }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
              className="pt-10 xl:pt-20 text-6xl font-light tracking-tight text-gray-200"
            >
              {translations[language].skills.title}
            </motion.p>
            <div className="flex justify-center  xl:pt-20 xl:pr-[14.5%]">
              <div className="flex flex-col gap-2 justify-center items-center max-w-[80%]">
                <motion.h3
                  key={language + "2"}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: [-300, 150, -200] }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
                  className="text-3xl font-light tracking-tight text-gray-300 pb-4"
                >
                  {translations[language].skills.languages}
                </motion.h3>
                <motion.div
                  key={language + "languages"}
                  initial={{ opacity: 0, x: -270 }}
                  animate={{ opacity: 1, x: [-300, 150, -200] }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.25, ease: "easeOut", delay: 0.12 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {languages.map(({ Icon, key, label }, index) => (
                    <motion.div
                      key={language + key}
                      initial={{ opacity: 0, x: -270, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        x: [-300, 150, 0],
                        scale: [0.8, 1, 1.05, 1],
                      }}
                      exit={{ opacity: 0, x: -300, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.14 + index * 0.08,
                        scale: {
                          duration: 0.2,
                          times: [0, 0.7, 0.85, 1],
                        },
                      }}
                      className="flex flex-col items-center gap-2"
                    >
                      <Icon className="text-5xl text-gray-200" />
                      <span className="text-md text-gray-300 font-light tracking-wide">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div>
                <motion.h3
                  key={language + "1"}
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: [-300, 150, 100] }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
                  className="text-3xl font-light tracking-tight text-gray-300 mb-4"
                >
                  {translations[language].skills.frameworks}
                </motion.h3>
                <motion.div
                  key={language + "frameworks"}
                  initial={{ opacity: 0, x: -270 }}
                  animate={{ opacity: 1, x: [-300, 150, 0] }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.25, ease: "easeOut", delay: 0.12 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {frameworks.map(({ Icon, key, label }, index) => (
                    <motion.div
                      key={language + key}
                      initial={{ opacity: 0, x: -270, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        x: [-300, 150, 100],
                        scale: [0.8, 1, 1.05, 1],
                      }}
                      exit={{ opacity: 0, x: -300, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.14 + index * 0.08,
                        scale: {
                          duration: 0.2,
                          times: [0, 0.7, 0.85, 1],
                        },
                      }}
                      className="flex flex-col items-center gap-2"
                    >
                      <Icon className="text-5xl text-gray-200" />
                      <span className="text-md text-gray-300 font-light tracking-wide">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default Competences
