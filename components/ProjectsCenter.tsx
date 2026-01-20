"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import projetsdata from "../datas/projetsdatanew.json"
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa"
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si"
import { IconType } from "react-icons"
import { TiltShineCard } from "./projectCardTilt"

interface Projet {
    projectName: string
    projectDescription: string
    projectDescriptionEN: string
    technosImg: string[]
    technos: string[]
    gitLink: string
    liveLink: string
    projectImg: string
}

const iconMap: { [key: string]: IconType } = {
    FaReact,
    FaNodeJs,
    FaDatabase,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
}

export default function ProjectsCenter() {
    const { language } = useLanguage()
    const projects = projetsdata as Projet[]

    // Sort projects to put Fissure first
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.projectName === "Fissure ( SaaS )") return -1
        if (b.projectName === "Fissure ( SaaS )") return 1
        return 0
    }).slice(0, 3)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col flex-[3] pt-8 gap-6 overflow-visible px-4"
        >
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                    Projects
                </h2>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-2 gap-6 pb-8 auto-rows-fr">
                {sortedProjects.map((project, index) => {
                    const isFeatured = project.projectName === "Fissure ( SaaS )"

                    return (
                        <div
                            key={index}
                            className={isFeatured ? "col-span-2 row-span-2" : ""}
                        >
                            <TiltShineCard
                                gitLink={project.gitLink}
                                liveLink={project.liveLink}
                                technosImg={project.technosImg}
                                technos={project.technos}
                                descriptionEN={project.projectDescriptionEN}
                                titre={project.projectName}
                                description={project.projectDescription}
                                displayedimg={project.projectImg}
                                className={isFeatured ? "min-h-full" : ""}
                                index={index}
                                delay={0.4 + index * 0.1}
                                iconMap={iconMap}
                            >
                                <div className={isFeatured ? "flex flex-col h-full" : ""}>
                                    <h3 className={`font-medium pb-2 text-black dark:text-gray-200 ${isFeatured ? "text-2xl" : "text-lg"
                                        }`}>
                                        {project.projectName}
                                        {isFeatured && (
                                            <span className="ml-3 text-xs font-normal bg-blue-500/20 dark:bg-blue-500/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                                Featured
                                            </span>
                                        )}
                                    </h3>
                                    <img
                                        src={project.projectImg}
                                        alt={project.projectName}
                                        className={`w-full rounded-lg shadow-lg object-cover opacity-80 group-hover:scale-[102%] transition-all duration-500 ${isFeatured ? "h-full min-h-[400px]" : "h-auto"
                                            }`}
                                    />
                                </div>
                            </TiltShineCard>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
