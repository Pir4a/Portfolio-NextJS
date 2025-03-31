"use client"

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion"
import { translations } from "../translations"
import { useLanguage } from "../contexts/LanguageContext"
import { useState, useEffect } from "react"

export default function Profil({ scrollYValue }: { scrollYValue: number }) {
  const { language } = useLanguage()

  // Split the description into sentences
  const sentences = translations[language].profil.description
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim())

  return (
    <div
      className="dark:bg-black z-40 max-h-[50dvh] bg-cyan-100 flex flex-col mt-[22dvh] h-screen relative"
      id="profile"
    >
      {/* Top border line */}
      <span className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      {/* Content container */}

      <div className="text-lg leading-relaxed flex justify-center  xl:justify-between xl:items-top h-full xl:px-[6%]">
        {scrollYValue > 170 && (
          <>
            <motion.p
              key={language}
              initial={{ opacity: 0, x: -300, y: 40 }}
              animate={{ opacity: 1, x: [-300, 300, 100] }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className={`pt-10 xl:pt-20 text-5xl font-bold`}
            >
              {translations[language].profil.title}
            </motion.p>
            <motion.div
              key={language + "description"}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: [1000, -190, -90], y: 40 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="pt-10 xl:pt-20 w-full xl:w-1/2 text-2xl font-bold"
            >
              {sentences.map((sentence, index) => (
                <p key={index} className="pb-2">
                  {sentence.trim()}
                </p>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
