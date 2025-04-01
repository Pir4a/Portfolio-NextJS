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
        {scrollYValue > 180 && (
          <>
            <motion.p
              key={language}
              initial={{ opacity: 0, x: -300 }}
              animate={{
                opacity: 1,
                x: [-300, 150, 100],
                scale: [1, 1.01, 1],
              }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "circOut", delay: 0.1 }}
              className="pt-10 xl:pt-30 text-6xl font-light tracking-tight text-gray-200"
            >
              {translations[language].profil.title}
            </motion.p>
            <motion.div
              key={language + "description"}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: [1000, -20, -0], scale: [1, 1.01, 1] }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.55, ease: "circOut", delay: 0.1 }}
              className="pt-10 xl:pt-30 w-full xl:w-[60%]"
            >
              <TextCard
                className={""}
                children={
                  <>
                    {sentences.map((sentence, index) => (
                      <p
                        key={index}
                        className="pb-4 text-xl leading-relaxed font-light tracking-wide text-gray-300"
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
