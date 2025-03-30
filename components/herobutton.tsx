"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"

interface HeroButtonProps {
  text: string
  className?: string
}

export default function HeroButton({ text, className }: HeroButtonProps) {
  const { language } = useLanguage()
  const handleDownload = () => {
    if (text !== "CV") return
    if (language === "fr") {
      const link = document.createElement("a")
      link.href = "/CV_STEPHANEDEDU_FULLSTACK.pdf"
      link.download = "CV_STEPHANEDEDU_FULLSTACK.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      const link = document.createElement("a")
      link.href = "/cv_dedu_stephane_fullstack_english.pdf"
      link.download = "cv_dedu_stephane_fullstack_english.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className={`${className} rounded-lg font-medium shadow-lg hover:shadow-xl cursor-pointer`}
    >
      {text}
    </motion.button>
  )
}
