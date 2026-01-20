"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../../contexts/LanguageContext"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import Header from "../../../components/Header"
import CursorGlow from "../../../components/CursorGlow"

export default function ProfilePage() {
    const { language } = useLanguage()

    const profileText = {
        fr: {
            role: "Ingénieur DevOps / SRE / Cloud",
            bio: "Passionné par l'ingénierie logicielle, je suis convaincu qu'une application robuste nécessite d'aligner la qualité du code avec une infrastructure performante.\n\nMon profil technique se structure aujourd'hui autour de deux axes complémentaires :\n\n• Développement : Expérience concrète en Fullstack chez Swapn (Alternance).\n• Cloud : Compétences en architecture et déploiement validées par la certification AWS Solutions Architect Associate.\n\nC'est cette approche transverse, du code jusqu'à la production, que je souhaite approfondir. C'est pourquoi j'oriente ma poursuite d'études (Master) vers les enjeux DevOps, SRE et Cloud Computing.\n\nAu-delà de mon cursus, je cultive une démarche d'auto-formation constante (Certification AWS passée en autonomie, veille Tech et GenAI...) pour rester à la pointe de l'écosystème.",
            techStack: {
                title: "Stack technique",
                dev: "Dev : Python (FastAPI, LangChain), TypeScript (React)",
                ops: "Ops : AWS, Docker",
                learning: "En cours d'acquisition : Terraform, Kubernetes.",
            },
        },
        en: {
            role: "DevOps / SRE / Cloud Engineer",
            bio: "Passionate about software engineering, I'm convinced that robust applications require aligning code quality with performant infrastructure.\n\nMy technical profile is built around two complementary pillars:\n\n• Development: Hands-on Fullstack experience at Swapn (Apprenticeship).\n• Cloud: Architecture and deployment skills validated by AWS Solutions Architect Associate certification.\n\nThis cross-functional approach, from code to production, is what I aim to deepen. That's why I'm pursuing further studies (Master's) focused on DevOps, SRE, and Cloud Computing challenges.\n\nBeyond academics, I maintain a constant self-learning approach (AWS certification earned independently, Tech & GenAI watch...) to stay at the forefront of the ecosystem.",
            techStack: {
                title: "Tech Stack",
                dev: "Dev: Python (FastAPI, LangChain), TypeScript (React)",
                ops: "Ops: AWS, Docker",
                learning: "Currently learning: Terraform, Kubernetes.",
            },
        },
    }

    return (
        <>
            <CursorGlow />
            <Header />
            <div className="min-h-screen bg-cyan-100 dark:bg-black px-4 xl:px-[8%] py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Stéphane DEDU
                        </h1>
                        <p className="text-2xl font-medium text-slate-700 dark:text-slate-300 mb-6">
                            {profileText[language].role}
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-6 mb-8">
                            <a href="https://github.com/Pir4a" target="_blank" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
                                <BsGithub className="w-7 h-7" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/st%C3%A9phane-dedu-14579a266/"
                                target="_blank"
                                className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                            >
                                <BsLinkedin className="w-7 h-7" />
                            </a>
                        </div>

                        <div className="h-px bg-slate-200 dark:bg-slate-700" />
                    </div>

                    {/* Bio */}
                    <div className="mb-12">
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line mb-8">
                            {profileText[language].bio}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="bg-slate-50/50 dark:bg-slate-900/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                            {profileText[language].techStack.title}
                        </h2>
                        <div className="flex flex-col gap-3 text-slate-600 dark:text-slate-400">
                            <p className="text-base">{profileText[language].techStack.dev}</p>
                            <p className="text-base">{profileText[language].techStack.ops}</p>
                            <p className="text-base">{profileText[language].techStack.learning}</p>
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="mt-12">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                            Certifications
                        </h2>
                        <div className="flex gap-8 items-center">
                            <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
                                <motion.img
                                    src="/badges/aws_saa_badge-2106246363.png"
                                    alt="AWS Solutions Architect Associate"
                                    className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </a>
                            <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
                                <motion.img
                                    src="/badges/1645553469-hcta0-badge-1345755619.png"
                                    alt="HashiCorp Terraform Associate"
                                    className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </a>
                            <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
                                <motion.img
                                    src="/badges/cka_from_cncfsite__281_29-1073793947.png"
                                    alt="Certified Kubernetes Administrator"
                                    className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
