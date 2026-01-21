"use client"

import { motion } from "framer-motion"
import projetsdata from "../../datas/projetsdatanew.json"
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
    // const { language } = useLanguage() // unused
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
                            className={isFeatured ? "col-span-2 row-span-2 relative group cursor-pointer" : "relative group"}
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
                                <div className={isFeatured ? "flex flex-col h-full relative" : ""}>
                                    <h3 className={`font-medium pb-2 text-black dark:text-gray-200 flex items-center gap-3 ${isFeatured ? "text-2xl" : "text-lg"
                                        }`}>
                                        {project.projectName}
                                        {isFeatured && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-300 border border-blue-200/50 dark:border-blue-400/20 backdrop-blur-md">
                                                Featured
                                            </span>
                                        )}
                                    </h3>

                                    <div className="relative overflow-hidden rounded-lg group/image">
                                        <img
                                            src={project.projectImg}
                                            alt={project.projectName}
                                            className={`w-full shadow-lg object-cover opacity-90 transition-all duration-700 ${isFeatured ? "h-[370px] group-hover:scale-[1.02]" : "h-auto group-hover:scale-[1.02]"
                                                }`}
                                        />

                                        {/* Click to Explore Overlay */}
                                        {isFeatured && (
                                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                                                <span className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-medium tracking-wide shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    Click to Explore
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {isFeatured && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            {/* AWS Infra */}
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">AWS Infra :</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["ECS", "RDS", "ECR"].map((tag) => (
                                                        <span key={tag} className="text-xs px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    <span className="text-xs px-2 py-1 rounded bg-orange-50 dark:bg-orange-900/10 text-orange-600 dark:text-orange-400 italic">
                                                        + more
                                                    </span>
                                                </div>
                                            </div>

                                            {/* IaC */}
                                            <div className="flex flex-col gap-2">
                                                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">IaC :</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Terraform"].map((tag) => (
                                                        <span key={tag} className="text-xs px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Back-end */}
                                            <div className="flex flex-col gap-2 md:col-span-2">
                                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Back-end :</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Typescript", "ExpressJS", "Clean Architecture"].map((tag) => (
                                                        <span key={tag} className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </TiltShineCard>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}
