"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import HeroButton from "./herobutton"
export default function Hero() {
  const { language } = useLanguage()

  // Dynamic CV link based on language
  const cvLink = language === "fr"
    ? "/CV_STEPHANEDEDU_FULLSTACK.pdf"
    : "/cv_dedu_stephane_fullstack_english.pdf"

  return (
    <div className="mx-auto xl:mx-0 flex text-center flex-col gap-10 xl:gap-6 xl:text-start items-center xl:items-start justify-center min-h-[100dvh] xl:min-h-[70dvh] px-4 xl:px-[6%] xl:min-w-[50%] xl:max-w-[50%]">
      <AnimatePresence mode="wait">
        <motion.h1
          key={language}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-5xl font-bold z-30"
        >
          {translations[language].hero.greeting}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.p
          key={language}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="text-2xl z-30"
        >
          <motion.span
            className="font-bold z-30 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 dark:from-pink-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.5, 1],
            }}
          >
            {translations[language].hero.role}
          </motion.span>
          <br /> {translations[language].hero.description}
          <span className="flex justify-center xl:justify-start items-center pt-4 p-2 gap-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                className="flex items-center pt-4 p-2 gap-4"
              >
                <a href="https://github.com/Pir4a" target="_blank" className="">
                  <BsGithub className="w-8 h-8 cursor-pointer hover:scale-120 transition-all duration-200" />
                </a>
                <a
                  href="https://www.linkedin.com/in/st%C3%A9phane-dedu-14579a266/"
                  target="_blank"
                  className=""
                >
                  <BsLinkedin className="w-8 h-8 cursor-pointer hover:scale-120 transition-all duration-200" />
                </a>
              </motion.span>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                className="flex  gap-4 pt-4"
              >
                <HeroButton
                  href={cvLink}
                  text="CV"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
                />
                <HeroButton
                  text="Contact"
                  href="#contact"
                  className="border-2 px-6 py-3 border-pink-500 dark:border-pink-400 text-pink-600 dark:text-pink-400 rounded-lg font-medium hover:bg-pink-500 dark:hover:bg-pink-400 hover:text-white dark:hover:text-black transition-all duration-300 hover:scale-105"
                />
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
