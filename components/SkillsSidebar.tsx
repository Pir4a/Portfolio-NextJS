"use client"

import { motion } from "framer-motion"
import {
    SiPython,
    SiTypescript,
    SiReact,
    SiFastapi,
    SiAmazon,
    SiDocker,
    SiTerraform,
    SiKubernetes,
    SiGit,
    SiLinux
} from "react-icons/si"
import { IconType } from "react-icons"

interface SkillItem {
    Icon: IconType
    label: string
    category: "dev" | "ops" | "learning"
}

const skills: SkillItem[] = [
    // Dev
    { Icon: SiPython, label: "Python", category: "dev" },
    { Icon: SiFastapi, label: "FastAPI", category: "dev" },
    { Icon: SiTypescript, label: "TypeScript", category: "dev" },
    { Icon: SiReact, label: "React", category: "dev" },

    // Ops
    { Icon: SiAmazon, label: "AWS", category: "ops" },
    { Icon: SiDocker, label: "Docker", category: "ops" },
    { Icon: SiGit, label: "Git", category: "ops" },
    { Icon: SiLinux, label: "Linux", category: "ops" },

    // Learning
    { Icon: SiTerraform, label: "Terraform", category: "learning" },
    { Icon: SiKubernetes, label: "Kubernetes", category: "learning" },
]

export default function SkillsSidebar() {
    return (
        <>
            {/* Skills Header */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Tech Stack
                </h2>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.3,
                            delay: 0.3 + index * 0.05,
                            ease: "easeOut"
                        }}
                        className="flex flex-col items-center gap-1.5 group"
                    >
                        <div className={`p-2.5 rounded-lg transition-all duration-200 ${skill.category === "dev"
                                ? "bg-blue-50/50 dark:bg-blue-950/30 group-hover:bg-blue-100/70 dark:group-hover:bg-blue-900/40"
                                : skill.category === "ops"
                                    ? "bg-emerald-50/50 dark:bg-emerald-950/30 group-hover:bg-emerald-100/70 dark:group-hover:bg-emerald-900/40"
                                    : "bg-amber-50/50 dark:bg-amber-950/30 group-hover:bg-amber-100/70 dark:group-hover:bg-amber-900/40"
                            }`}>
                            <skill.Icon className={`text-2xl transition-transform duration-200 group-hover:scale-110 ${skill.category === "dev"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : skill.category === "ops"
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-amber-600 dark:text-amber-400"
                                }`} />
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 text-center font-medium">
                            {skill.label}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2 pt-2 text-xs">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-blue-500/30 dark:bg-blue-500/40" />
                    <span className="text-slate-600 dark:text-slate-400">Development</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-emerald-500/30 dark:bg-emerald-500/40" />
                    <span className="text-slate-600 dark:text-slate-400">Operations</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-500/30 dark:bg-amber-500/40" />
                    <span className="text-slate-600 dark:text-slate-400">Currently Learning</span>
                </div>
            </div>
        </>
    )
}
