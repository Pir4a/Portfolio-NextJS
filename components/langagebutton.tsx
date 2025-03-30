import { useLanguage } from "../contexts/LanguageContext"
import { motion } from "motion/react"

export default function LangageButton() {
  const { language, setLanguage } = useLanguage()

  return (
    <>
      {" "}
      <span
        className={`text-sm font-medium transition-colors ${
          language === "fr"
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        FR
      </span>
      <button
        onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
        className="relative w-12 h-6 rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-gray-900 dark:bg-white"
          initial={false}
          animate={{
            x: language === "fr" ? 0 : 24,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          language === "en"
            ? "text-gray-900 dark:text-white"
            : "text-gray-500 dark:text-gray-400"
        }`}
      >
        EN
      </span>
    </>
  )
}
