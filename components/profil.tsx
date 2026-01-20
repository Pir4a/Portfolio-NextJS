"use client"

import { translations } from "../translations"
import { useLanguage } from "../contexts/LanguageContext"
import TextCard from "./textCard"

export default function Profil() {
  const { language } = useLanguage()

  // Split the description into sentences
  const sentences = translations[language].profil.description
    .split(/[.!?]+/)
    .filter((sentence) => sentence.trim())

  return (
    <div
      className="max-w-7xl mx-auto px-6 py-20 border-l border-gray-200 dark:border-gray-800 ml-4 lg:ml-20 pl-8 lg:pl-12"
      id="profile"
    >
      <div className="flex flex-col lg:flex-row lg:items-start gap-12">
        <div className="lg:w-1/3">
          <h2 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-4">
            {translations[language].profil.title}
          </h2>
          <div className="h-1 w-20 bg-blue-600 dark:bg-blue-500" />
        </div>

        <div className="lg:w-2/3">
          <TextCard className="bg-gray-50 dark:bg-[#111] p-6 border border-gray-200 dark:border-gray-800">
            <div className="space-y-4 font-mono text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {sentences.map((sentence, index) => (
                <p key={index}>{sentence.trim()}.</p>
              ))}
            </div>
          </TextCard>
        </div>
      </div>
    </div>
  )
}
