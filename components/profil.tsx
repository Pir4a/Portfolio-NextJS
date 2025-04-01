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
import TextCard from "./textCard"

export default function Profil({
  scrollYValue,
  deviceWidth,
}: {
  scrollYValue: number
  deviceWidth: number
}) {
  const { language } = useLanguage()

  // Split the description into sentences
  const sentences = translations[language].profil.description
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim())

  return (
    <div
      className="dark:bg-black z-40 pt-20 xl:pt-0 min-h-[50dvh] max-h-[50dvh] bg-cyan-100 flex flex-col xl:mt-[22dvh] h-screen relative"
      id="profile"
    >
      {/* Top border line */}
      {scrollYValue > 150 && (
        <motion.span
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {/* Content container */}

      <div className="text-lg leading-relaxed flex flex-col xl:flex-row items-center justify-center w-[full] xl:w-full xl:justify-between xl:items-top h-full xl:px-[6%]">
        {scrollYValue > 180 && (
          <>
            <motion.p
              key={`${language}-${deviceWidth}`}
              initial={{
                opacity: 0,
                ...(deviceWidth >= 1280 ? { x: -300 } : {}),
              }}
              animate={{
                opacity: 1,
                ...(deviceWidth >= 1280
                  ? { x: [-300, 150, 100], scale: [1, 1.01, 1] }
                  : {}),
              }}
              exit={{ opacity: 0, ...(deviceWidth >= 1280 ? { x: -300 } : {}) }}
              transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
              className={`pt-10 xl:pt-0 text-6xl font-light tracking-tight text-gray-800 xl:min-w-[30%] dark:text-gray-200 ${
                deviceWidth < 1280 ? "text-center" : "text-left"
              }`}
            >
              {translations[language].profil.title}
            </motion.p>
            <motion.div
              key={`${language}-${deviceWidth}-description`}
              initial={{
                opacity: 0,
                ...(deviceWidth >= 1280 ? { x: 300 } : {}),
              }}
              animate={{
                opacity: 1,
                ...(deviceWidth >= 1280
                  ? { x: [1000, -20, 0], scale: [1, 1.01, 1] }
                  : {}),
              }}
              exit={{ opacity: 0, ...(deviceWidth >= 1280 ? { x: 300 } : {}) }}
              transition={{ duration: 0.55, ease: "circOut", delay: 0.1 }}
              className="pt-10 xl:pt-30 w-full xl:w-[60%]"
            >
              <TextCard
                className={
                  "xl:max-w-full mx-auto xl:mx-0 max-w-[90%] bg-cyan-50 text-black dark:text-gray-700 dark:bg-[#0A0A0A] backdrop-blur-xl"
                }
                children={
                  <>
                    {sentences.map((sentence, index) => (
                      <p
                        id="skills"
                        key={`${index}-${deviceWidth}`}
                        className="pb-4 text-xl leading-relaxed font-light tracking-wide text-black dark:text-gray-300"
                      >
                        {sentence.trim()}
                      </p>
                    ))}
                  </>
                }
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
