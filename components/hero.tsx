"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { useEffect, useState } from "react"

export default function Hero() {
  const { language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col gap-6 items-start justify-center h-[60dvh] px-[6%] max-w-[50%]">
      <AnimatePresence mode="wait">
        <motion.h1
          key={language}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-5xl font-bold"
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
          className="text-2xl"
        >
          <span className="font-bold">{translations[language].hero.role}</span>
          <br /> {translations[language].hero.description}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
