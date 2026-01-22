"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../contexts/LanguageContext"
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
    credlyLink?: string
}

const certifications: Certification[] = [
    {
        name: "AWS Solutions Architect Associate",
        nameEN: "AWS Solutions Architect Associate",
        issuer: "Amazon Web Services",
        year: "2026",
        status: "completed",
        Icon: FaAws,
        color: "from-orange-400 to-orange-600",
        credlyLink: "https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1",
    },
    {
        name: "HashiCorp Terraform Associate",
        nameEN: "HashiCorp Terraform Associate",
        issuer: "HashiCorp",
        year: "2026",
        status: "completed",
        Icon: SiTerraform,
        color: "from-purple-400 to-purple-600",
        credlyLink: "", // TODO: Add Credly link
    },
    {
        name: "Certified Kubernetes Administrator",
        nameEN: "Certified Kubernetes Administrator",
        issuer: "The Linux Foundation",
        year: "2026",
        status: "in-progress",
        Icon: SiKubernetes,
        color: "from-blue-400 to-blue-600",
    },
]

export default function CertificationsList() {
    const { language } = useLanguage()

    return (
        <div className="flex flex-col gap-4 w-full">
            {certifications.map((cert, index) => {
                const Component = cert.credlyLink && cert.status === "completed" ? motion.a : motion.div
                const componentProps = cert.credlyLink && cert.status === "completed" 
                    ? { 
                        href: cert.credlyLink, 
                        target: "_blank", 
                        rel: "noopener noreferrer" 
                    } 
                    : {}
                
                return (
                <Component
                    key={cert.name}
                    {...componentProps}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.3 + index * 0.15,
                    }}
                    className={`group relative overflow-hidden rounded-xl border border-pink-300/30 dark:border-pink-500/20 bg-white/50 dark:bg-black/40 backdrop-blur-md p-3 shadow-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.02] ${cert.credlyLink && cert.status === "completed" ? "cursor-pointer" : ""}`}
                >
                    {/* Gradient background glow */}
                    <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${cert.color}`}
                    />



                    <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <cert.Icon
                                className={`text-3xl text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300`}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col h-[40px] w-[230px]">
                            <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 tracking-tight">
                                {language === "fr" ? cert.name : cert.nameEN}
                            </h3>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 dark:text-gray-400 ">
                                    {cert.issuer}
                                </span>
                                <span className="font-medium text-pink-500 dark:text-pink-400">
                                    {cert.year}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Subtle bottom border glow */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${cert.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
                    />
                </Component>
            )})}
        </div>
    )
}
