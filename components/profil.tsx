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

  return (
    <div
      className="dark:bg-black z-40 max-h-[50dvh] bg-cyan-50 flex flex-col mt-[22dvh] h-screen relative"
      id="profile"
    >
      {/* profile a gauche et texte a droite vienne et rebondissent un peu */}
      {/* Top border line */}
      <span className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
      {/* Content container */}

      <div className="text-lg leading-relaxed flex justify-center  xl:justify-between xl:items-top h-full xl:px-[6%]">
        {scrollYValue > 170 && (
          <>
            <motion.p
              key={language}
              initial={{ opacity: 0, x: -300, y: 40 }}
              animate={{ opacity: 1, x: [-300, 300, 200] }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className={`pt-10 xl:pt-20 text-5xl font-bold`}
            >
              {translations[language].profil.title}
            </motion.p>
            <motion.p
              key={language + null}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: [1000, -180, -100], y: 40 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className=" pt-10 xl:pt-20 w-full xl:w-1/2 text-2xl font-bold "
            >
              {translations[language].profil.description}
            </motion.p>
          </>
        )}
      </div>
      <button
        onClick={() => console.log(scrollYValue)}
        className="w-20 h-20 bg-red-500 cursor-pointer"
      />
    </div>
  )
}
