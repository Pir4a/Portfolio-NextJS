"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { useEffect, useState } from "react"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import HeroButton from "./herobutton"
export default function Hero() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex text-center flex-col gap-10 xl:gap-6 xl:text-start items-center xl:items-start justify-center min-h-[100dvh] xl:min-h-[70dvh] px-4 xl:px-[6%] xl:min-w-[50%] xl:max-w-[50%]">
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
            className="font-bold z-30 bg-gradient-to-r from-pink-800 via-cyan-950 to-pink-800 dark:from-pink-600 dark:via-cyan-700 dark:to-pink-600 bg-clip-text text-transparent bg-[length:300%_auto]"
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{
              duration: 5,
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
                  text="CV"
                  className="bg-gray-900 px-6 py-3 dark:bg-white text-white dark:text-black transition-all duration-200"
                />
                <HeroButton
                  text="Contact"
                  className="border-2 px-6 py-3 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
                />
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
