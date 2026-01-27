"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../../contexts/LanguageContext"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { HiOutlineDocumentDownload } from "react-icons/hi"
import Header from "../../../components/organisms/Header"
import CursorGlow from "../../../components/atoms/CursorGlow"
import CertificationsList from "../../../components/organisms/CertificationsList"
import SkillsSidebar from "../../../components/organisms/SkillsSidebar"
import Experience from "../../../components/organisms/Experience"
import SelfTaught from "../../../components/organisms/SelfTaught"

export default function ProfilePage() {
    const { language } = useLanguage()

    const profileText = {
        fr: {
            role: "Ingénieur DevOps / SRE / Cloud",
            bio: "Passionné par l'ingénierie logicielle, je suis convaincu qu'une application robuste nécessite d'aligner la qualité du code avec une infrastructure performante.\n\nMon profil technique se structure aujourd'hui autour de deux axes complémentaires :\n\n• Développement : Expérience concrète en Fullstack chez Swapn (Alternance).\n• Cloud : Compétences en architecture et déploiement validées par la certification AWS Solutions Architect Associate.\n\nC'est cette approche transverse, du code jusqu'à la production, que je souhaite approfondir. C'est pourquoi j'oriente ma poursuite d'études (Master) vers les enjeux DevOps, SRE et Cloud Computing.\n\nAu-delà de mon cursus, je cultive une démarche d'auto-formation constante (Certification AWS passée en autonomie, veille Tech et GenAI...) pour rester à la pointe de l'écosystème.",
        },
        en: {
            role: "DevOps / SRE / Cloud Engineer",
            bio: "Passionate about software engineering, I'm convinced that robust applications require aligning code quality with performant infrastructure.\n\nMy technical profile is built around two complementary pillars:\n\n• Development: Hands-on Fullstack experience at Swapn (Apprenticeship).\n• Cloud: Architecture and deployment skills validated by AWS Solutions Architect Associate certification.\n\nThis cross-functional approach, from code to production, is what I aim to deepen. That's why I'm pursuing further studies (Master's) focused on DevOps, SRE, and Cloud Computing challenges.\n\nBeyond academics, I maintain a constant self-learning approach (AWS certification earned independently, Tech & GenAI watch...) to stay at the forefront of the ecosystem.",
        },
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <>
            <CursorGlow />
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-slate-100 dark:from-slate-950 dark:via-black dark:to-slate-900 px-4 xl:px-[8%] py-24 md:py-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto"
                >
                    {/* Hero Header Section */}
                    <motion.div variants={itemVariants} className="mb-16 md:mb-24">
                        <div className="relative">
                            {/* Decorative element */}
                            <div className="absolute -left-4 top-0 w-1 h-24 bg-gradient-to-b from-cyan-500 to-transparent rounded-full hidden md:block" />

                            <div className="md:pl-8">
                                <motion.span
                                    className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-4 block tracking-wider"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    // {language === 'fr' ? 'À propos' : 'About'}
                                </motion.span>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
                                    Stéphane <span className="bg-gradient-to-r from-cyan-500 to-teal-400 bg-clip-text text-transparent">DEDU</span>
                                </h1>

                                <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400 mb-8">
                                    {profileText[language].role}
                                </p>

                                {/* Social Links - Enhanced */}
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://github.com/Pir4a"
                                        target="_blank"
                                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                                    >
                                        <BsGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium hidden sm:inline">GitHub</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/st%C3%A9phane-dedu-14579a266/"
                                        target="_blank"
                                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                                    >
                                        <BsLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium hidden sm:inline">LinkedIn</span>
                                    </a>
                                    <a
                                        href="/cv.pdf"
                                        target="_blank"
                                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 dark:hover:bg-cyan-500/30 transition-all duration-300"
                                    >
                                        <HiOutlineDocumentDownload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-medium">CV</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio Section - Card style */}
                    <motion.div variants={itemVariants} className="mb-20">
                        <div className="relative p-6 md:p-8 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-bl-full pointer-events-none" />
                            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line max-w-4xl">
                                {profileText[language].bio}
                            </p>
                        </div>
                    </motion.div>

                    {/* Main Content: 2 Columns for timelines */}
                    <div className="flex flex-col xl:flex-row gap-12 xl:gap-20">
                        {/* Left Column: Professional Experience & Skills */}
                        <motion.div variants={itemVariants} className="flex-1 min-w-0">
                            <Experience />

                            <div className="mt-16">
                                <SkillsSidebar layout="grid-2" />
                            </div>
                        </motion.div>

                        {/* Right Column: Self-Taught & Certifications */}
                        <motion.div variants={itemVariants} className="w-full xl:w-[380px] flex-shrink-0 space-y-12">
                            <SelfTaught />

                            <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-pink-400" />
                                    Certifications
                                </h2>
                                <CertificationsList />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
