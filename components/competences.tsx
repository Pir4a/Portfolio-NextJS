"use client "
import { motion } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"

function Competences({ scrollYValue }: { scrollYValue: number }) {
  const { language } = useLanguage()
  return (
    <div className="dark:bg-black z-40 min-h-[40dvh] max-h-[50dvh] bg-cyan-50 flex flex-col   ">
      <div className="dark:bg-black bg-cyan-50 text-lg leading-relaxed flex justify-center  xl:justify-between xl:items-top h-full xl:px-[6%]">
        {scrollYValue > 700 && (
          <motion.p
            key={language}
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: [-300, 150, 100] }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
            className={`pt-10 xl:pt-20 text-5xl font-bold bg`}
          >
            Competences
          </motion.p>
        )}
      </div>
    </div>
  )
}
export default Competences
