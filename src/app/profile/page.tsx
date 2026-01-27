"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../../../contexts/LanguageContext"
import { BsGithub, BsLinkedin } from "react-icons/bs"
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

    return (
        <>
            <CursorGlow />
            <Header />
            <div className="min-h-screen bg-cyan-100 dark:bg-black px-4 xl:px-[8%] py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Header Section */}
                    <div className="mb-16">
                        <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            Stéphane DEDU
                        </h1>
                        <p className="text-2xl font-medium text-slate-700 dark:text-slate-300 mb-6">
                            {profileText[language].role}
                        </p>

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
                        <div className="h-px bg-slate-200 dark:bg-slate-700 w-full" />
                    </div>

                    {/* Bio */}
                    <div className="mb-16 max-w-4xl">
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                            {profileText[language].bio}
                        </p>
                    </div>

                    {/* Main Content: 2 Columns for timelines */}
                    <div className="flex flex-col xl:flex-row gap-16">
                        {/* Left Column: Professional Experience & Skills */}
                        <div className="flex-1 min-w-0">
                            <Experience />

                            <div className="mt-16">
                                <SkillsSidebar layout="grid-2" />
                            </div>
                        </div>

                        {/* Right Column: Self-Taught & Certifications */}
                        <div className="w-full xl:w-[380px] flex-shrink-0 space-y-12">
                            <SelfTaught />

                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                    Certifications
                                </h2>
                                <CertificationsList />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}
