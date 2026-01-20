"use client"

import { AnimatePresence, motion, useInView } from "motion/react"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { useRef } from "react"
import { FaAws } from "react-icons/fa"
import { SiTerraform, SiKubernetes } from "react-icons/si"

interface Certification {
    name: string
    nameEN: string
    issuer: string
    year: string
    status: "completed" | "in-progress"
    Icon: React.ComponentType<{ className?: string }>
    color: string
}

const certifications: Certification[] = [
    {
        name: "AWS Solutions Architect Associate",
        nameEN: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        year: "2025",
        status: "completed",
        Icon: FaAws,
        color: "from-orange-400 to-orange-600",
    },
    {
        name: "HashiCorp Terraform Associate",
        nameEN: "HashiCorp Terraform Associate",
        issuer: "HashiCorp",
        year: "2025",
        status: "completed",
        Icon: SiTerraform,
        color: "from-purple-400 to-purple-600",
    },
    {
        name: "Certified Kubernetes Administrator",
        nameEN: "Certified Kubernetes Administrator",
        issuer: "The Linux Foundation",
        year: "2025",
        status: "in-progress",
        Icon: SiKubernetes,
        color: "from-blue-400 to-blue-600",
    },
]

function Certifications({ deviceWidth }: { deviceWidth: number }) {
    const { language } = useLanguage()

    const ref = useRef(null)
    const isInView = useInView(ref, {
        margin: "0px 0px -20% 0px",
        once: true,
    })

    return (
        <div className="dark:bg-black pb-14 pt-20 xl:pt-10 z-40 min-h-[60dvh] xl:min-h-[40dvh] bg-cyan-100 flex flex-col overflow-x-hidden">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent mb-10" />
            <div
                ref={ref}
                className="dark:bg-black bg-cyan-100 text-lg leading-relaxed flex flex-col items-center h-full px-4 xl:px-[6%] gap-10"
            >
                <AnimatePresence mode="wait">
                    {isInView && (
                        <>
                            <motion.h2
                                key={`certifications-${language}-${deviceWidth}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                                className="relative text-4xl xl:text-6xl font-light tracking-tight text-gray-800 dark:text-gray-200 text-center"
                            >
                                {translations[language].menu.certifications}
                                <motion.span
                                    className="w-[130%] h-[2px] -bottom-4 absolute left-[50%] -translate-x-[50%] bg-gradient-to-r from-transparent via-pink-300/40 to-transparent"
                                />
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 w-full max-w-5xl"
                            >
                                {certifications.map((cert, index) => (
                                    <motion.div
                                        key={cert.name}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeOut",
                                            delay: 0.3 + index * 0.15,
                                        }}
                                        className="group relative overflow-hidden rounded-xl border border-pink-300/30 dark:border-pink-500/20 bg-white/70 dark:bg-black/40 backdrop-blur-xl p-6 shadow-lg hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        {/* Gradient background glow */}
                                        <div
                                            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${cert.color}`}
                                        />

                                        {/* Status badge */}
                                        {cert.status === "in-progress" && (
                                            <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-600/40">
                                                {language === "fr" ? "En cours" : "In Progress"}
                                            </div>
                                        )}

                                        {/* Icon */}
                                        <div className="flex justify-center mb-4">
                                            <cert.Icon
                                                className={`text-5xl xl:text-6xl text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300`}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="text-center space-y-2">
                                            <h3 className="text-lg xl:text-xl font-medium text-gray-800 dark:text-gray-200 tracking-tight">
                                                {language === "fr" ? cert.name : cert.nameEN}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                                                {cert.issuer}
                                            </p>
                                            <p className="text-sm font-medium text-pink-500 dark:text-pink-400">
                                                {cert.year}
                                            </p>
                                        </div>

                                        {/* Subtle bottom border glow */}
                                        <div
                                            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Certifications
