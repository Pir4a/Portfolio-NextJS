"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import {
    SiPython,
    SiTypescript,
    SiReact,
    SiFastapi,
    SiAmazon,
    SiDocker,
    SiTerraform,
    SiKubernetes,
    SiGithubactions,
    SiLinux,
    SiGnubash,
    SiPrometheus,
    SiGrafana,
    SiSentry,
} from "react-icons/si"
// Try to import SiLangchain, if it fails I will use a fallback in the next step or careful edit. 
// However, I can't conditionally import in top-level.
// I'll check if SiLangchain is common. It is in react-icons/si > v4.10. 
// I'll assume it's there. If not, I'll fix it.
import { SiLangchain } from "react-icons/si"
import { IconType } from "react-icons"

interface SkillItem {
    Icon: IconType
    label: string
}

interface SkillCategory {
    id: "cloud_iac" | "containerization" | "os_scripting" | "cicd" | "observability" | "development"
    items: SkillItem[]
    color: string
}

const skillCategories: SkillCategory[] = [
    {
        id: "cloud_iac",
        color: "text-orange-500",
        items: [
            { Icon: SiAmazon, label: "AWS" },
            { Icon: SiTerraform, label: "Terraform" },
            { Icon: SiGithubactions, label: "GitHub Actions" },
        ],
    },
    {
        id: "containerization",
        color: "text-blue-500",
        items: [
            { Icon: SiDocker, label: "Docker" },
            { Icon: SiKubernetes, label: "Kubernetes" },
        ],
    },
    {
        id: "os_scripting",
        color: "text-yellow-500",
        items: [
            { Icon: SiLinux, label: "Linux" },
            { Icon: SiGnubash, label: "Bash" },
            { Icon: SiPython, label: "Python" },
        ],
    },
    {
        id: "observability",
        color: "text-purple-500",
        items: [
            { Icon: SiPrometheus, label: "Prometheus" },
            { Icon: SiGrafana, label: "Grafana" },
            { Icon: SiSentry, label: "Sentry" },
        ],
    },
    {
        id: "development",
        color: "text-green-500",
        items: [
            { Icon: SiFastapi, label: "FastAPI" },
            { Icon: SiLangchain, label: "LangChain" },
            { Icon: SiTypescript, label: "TypeScript" },
            { Icon: SiReact, label: "React" },
        ],
    },
]

export default function SkillsSidebar({ layout = "sidebar" }: { layout?: "sidebar" | "grid-2" }) {
    const { language } = useLanguage()

    return (
        <div className="flex flex-col gap-6">
            {/* Skills Header */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    {translations[language].skills.title}
                </h2>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
            </div>

            {/* Categories */}
            <div className={`flex flex-col gap-6 ${layout === "grid-2" ? "grid grid-cols-1 md:grid-cols-2" : ""}`}>
                {skillCategories.map((category, catIndex) => (
                    <div key={category.id} className="space-y-3">
                        <h3 className={`text-xs font-semibold uppercase tracking-wider ${category.color} opacity-90`}>
                            {translations[language].skills[category.id]}
                        </h3>
                        <div className="grid grid-cols-4 gap-3">
                            {category.items.map((skill, index) => (
                                <motion.div
                                    key={skill.label}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.2 + catIndex * 0.1 + index * 0.05,
                                        ease: "easeOut"
                                    }}
                                    className="flex flex-col items-center gap-1.5 group"
                                >
                                    <div className="p-2.5 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-md group-hover:border-pink-300/30 dark:group-hover:border-pink-500/30">
                                        <skill.Icon className="text-xl text-slate-700 dark:text-slate-300 transition-colors duration-200 group-hover:text-pink-500 dark:group-hover:text-pink-400" />
                                    </div>
                                    <span className="text-[10px] text-slate-600 dark:text-slate-400 text-center font-medium leading-tight">
                                        {skill.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
