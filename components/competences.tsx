"use client"
import { AnimatePresence, motion, useInView } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import {
  FaDocker,
  FaReact,
  FaLinux,
  FaAws,
} from "react-icons/fa"
import {
  SiTypescript,
  SiTerraform,
  SiKubernetes,
  SiGithubactions,
  SiPrometheus,
  SiGrafana,
  SiPython,
  SiFastapi,
  SiGnubash,
} from "react-icons/si"
import { translations } from "../translations"
import ChaqueCompetences from "./chaqueCompetences"
import { useRef } from "react"

const cloudAndIaC = [
  { Icon: FaAws, key: "aws", label: "AWS" },
  { Icon: SiTerraform, key: "terraform", label: "Terraform" },
  { Icon: FaDocker, key: "docker", label: "Docker" },
  { Icon: SiKubernetes, key: "kubernetes", label: "Kubernetes" },
]

const cicd = [
  { Icon: SiGithubactions, key: "githubactions", label: "GitHub Actions" },
  { Icon: FaLinux, key: "linux", label: "Linux" },
  { Icon: SiGnubash, key: "bash", label: "Bash" },
]

const observability = [
  { Icon: SiPrometheus, key: "prometheus", label: "Prometheus" },
  { Icon: SiGrafana, key: "grafana", label: "Grafana" },
]

const development = [
  { Icon: SiPython, key: "python", label: "Python" },
  { Icon: SiTypescript, key: "typescript", label: "TypeScript" },
  { Icon: SiFastapi, key: "fastapi", label: "FastAPI" },
  { Icon: FaReact, key: "react", label: "React" },
]

function Competences({ deviceWidth }: { deviceWidth: number }) {
  const { language } = useLanguage()

  const ref = useRef(null)
  const isInView = useInView(ref, {
    margin: "0px 0px -30% 0px",
    once: true,
  })

  return (
    <div className="dark:bg-black pb-14 pt-40 xl:pt-0 z-40 min-h-[140dvh] xl:min-h-[70dvh] xl:max-h-[80dvh] bg-cyan-100 flex flex-col overflow-x-hidden">
      <div
        ref={ref}
        className="dark:bg-black bg-cyan-100 text-lg leading-relaxed flex flex-col xl:flex-row xl:gap-6 xl:items-top h-full px-4 xl:px-[0%] gap-10"
      >
        <AnimatePresence mode="wait">
          {isInView && (
            <>
              <div
                className={`pt-10 ${language === "fr" ? "xl:pl-0 xl:pt-25" : "xl:pl-20 xl:pt-20"
                  }`}
              >
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
                  className={`xl:min-w-[30%] relative text-4xl xl:text-6xl font-light tracking-tight text-gray-800 dark:text-gray-200 ${deviceWidth < 1280 ? "text-center" : ""}`}
                >
                  {translations[language].skills.title}
                  <motion.span
                    ref={ref}
                    className={`${language === "fr" ? "w-[120%]" : "w-[140%]"} h-[2px] -bottom-4 absolute left-[50%] -translate-x-[50%] bg-gradient-to-r from-transparent via-pink-300/40 to-transparent`}
                  />
                </motion.h2>
              </div>
              <div
                className={`flex flex-col xl:flex-row xl:flex-wrap xl:justify-start xl:items-start xl:min-w-[0%] mx-auto ${language === "fr"
                    ? "xl:pl-20 xl:pt-20"
                    : "xl:pl-32 xl:pt-16"
                  } gap-8 xl:gap-10`}
              >
                <ChaqueCompetences
                  title={translations[language].skills.cloudiac}
                  items={cloudAndIaC}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  arbriraryValue={0.1}
                />

                <ChaqueCompetences
                  title={translations[language].skills.cicd}
                  items={cicd}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  arbriraryValue={0.2}
                />

                <ChaqueCompetences
                  title={translations[language].skills.observability}
                  items={observability}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  arbriraryValue={0.3}
                />

                <ChaqueCompetences
                  title={translations[language].skills.development}
                  items={development}
                  language={language}
                  deviceWidth={deviceWidth}
                  delay={0.1}
                  arbriraryValue={0.4}
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
