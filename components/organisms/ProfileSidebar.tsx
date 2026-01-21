"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"

export default function ProfileSidebar() {
    const { language } = useLanguage()

    const profileText = {
        fr: {
            role: "Ingénieur DevOps / SRE / Cloud",
            bio: "Passionné par l'ingénierie logicielle et l'infrastructure cloud. Expérience Fullstack chez Swapn, certifié AWS Solutions Architect Associate. Spécialisé en DevOps, CI/CD, et automatisation.",
        },
        en: {
            role: "DevOps / SRE / Cloud Engineer",
            bio: "Passionate about software engineering and cloud infrastructure. Fullstack experience at Swapn, AWS Solutions Architect Associate certified. Specialized in DevOps, CI/CD, and automation.",
        },
    }

    return (
        <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden xl:flex fixed left-0 top-0 h-screen w-64 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-800 p-8 flex-col justify-center gap-6 z-40"
        >
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        Stéphane DEDU
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {profileText[language].role}
                    </p>
                </div>

                <div className="h-px bg-slate-200 dark:bg-slate-700" />

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {profileText[language].bio}
                </p>
            </div>
        </motion.aside>
    )
}
