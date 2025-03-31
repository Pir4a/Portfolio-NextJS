"use client"

import Hero from "./hero"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { translations } from "../translations"
import { useLanguage } from "../contexts/LanguageContext"

export default function Profil() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { language } = useLanguage()

  const lineProgress = useTransform(scrollYProgress, [0, 1], ["0%", "300%"])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 1], [50, 0, -50])

  return (
    <div
      ref={containerRef}
      className="dark:bg-black z-40 max-h-[30dvh] bg-cyan-50 flex flex-col mt-[20dvh] h-screen "
      id="profile"
    >
      {/* Top border line */}
      <motion.div
        className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"
        style={{ opacity }}
      />

      {/* Content container */}
      <motion.div
        className="max-w-2xl pt-2 mx-auto px-4 "
        style={{ opacity, y }}
      >
        <div className="text-lg leading-relaxed">
          <motion.p
            key={language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="mb-4"
          >
            {translations[language].profil.title}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom border line */}
      <motion.div
        className=" w-full h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"
        style={{ opacity }}
      />
    </div>
  )
}
