"use client"

import ThemeToggle from "./theme-toggle"
import Logo from "./logo"
import Link from "next/link"
import { MenuIcon, X } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = [
    { href: "/", label: translations[language].menu.profile },
    { href: "/", label: translations[language].menu.skills },
    { href: "/", label: translations[language].menu.projects },
    { href: "/", label: translations[language].menu.contact },
  ]

  return (
    <>
      <header className="flex items-center justify-between py-3 px-1 lg:py-4 lg:px-8 bg-glass dark:bg-glass text-black dark:text-white sticky top-0 z-50">
        <Logo text="DEDU Stéphane" />

        <ul className="hidden lg:flex items-center lg:gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 px-2">
          <div className="hidden lg:flex items-center gap-2">
            <span
              className={`text-sm font-medium transition-colors ${
                language === "fr"
                  ? "text-black dark:text-white"
                  : "text-black/50 dark:text-white/50"
              }`}
            >
              FR
            </span>
            <button
              onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              className="relative w-12 h-6 rounded-full border border-black dark:border-white overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <motion.div
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black dark:bg-white"
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
                  ? "text-black dark:text-white"
                  : "text-black/50 dark:text-white/50"
              }`}
            >
              EN
            </span>
          </div>
          <ThemeToggle />
          <button
            className="lg:hidden flex items-center justify-center py-2 px-2 border border-black dark:border-white rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mounted && (
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-glass dark:bg-glass backdrop-blur-sm z-40"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-end p-4">
                  <button
                    className="flex items-center justify-center py-2 px-2 border border-black dark:border-white rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </button>
                </div>
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 flex flex-col items-center justify-center gap-8"
                >
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="text-xl font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`text-sm font-medium transition-colors ${
                        language === "fr"
                          ? "text-black dark:text-white"
                          : "text-black/50 dark:text-white/50"
                      }`}
                    >
                      FR
                    </span>
                    <button
                      onClick={() =>
                        setLanguage(language === "fr" ? "en" : "fr")
                      }
                      className="relative w-12 h-6 rounded-full border border-black dark:border-white overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <motion.div
                        className="absolute top-1 left-1 w-4 h-4 rounded-full bg-black dark:bg-white"
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
                          ? "text-black dark:text-white"
                          : "text-black/50 dark:text-white/50"
                      }`}
                    >
                      EN
                    </span>
                  </motion.li>
                </motion.ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
