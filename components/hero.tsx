"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import HeroButton from "./herobutton"
import SkillsSidebar from "./SkillsSidebar"
import ProjectsCenter from "./ProjectsCenter"
export default function Hero() {
  const { language } = useLanguage()

  const profileText = {
    fr: {
      role: "DevOps / SRE / Cloud Engineer",
      bio: "Passionné par l'ingénierie logicielle, je suis convaincu qu'une application robuste nécessite d'aligner la qualité du code avec une infrastructure performante.\n\nMon profil technique se structure aujourd'hui autour de deux axes complémentaires :\n\n• Développement : Expérience concrète en Fullstack chez Swapn (Alternance).\n• Cloud : Compétences en architecture et déploiement validées par la certification AWS Solutions Architect Associate.\n\nC'est cette approche transverse, du code jusqu'à la production, que je souhaite approfondir. C'est pourquoi j'oriente ma poursuite d'études (Master) vers les enjeux DevOps, SRE et Cloud Computing.\n\nAu-delà de mon cursus, je cultive une démarche d'auto-formation constante (Certification AWS passée en autonomie, veille Tech et GenAI...) pour rester à la pointe de l'écosystème.",
    },
    en: {
      role: "DevOps / SRE / Cloud Engineer",
      bio: "Passionate about software engineering, I'm convinced that robust applications require aligning code quality with performant infrastructure.\n\nMy technical profile is built around two complementary pillars:\n\n• Development: Hands-on Fullstack experience at Swapn (Apprenticeship).\n• Cloud: Architecture and deployment skills validated by AWS Solutions Architect Associate certification.\n\nThis cross-functional approach, from code to production, is what I aim to deepen. That's why I'm pursuing further studies (Master's) focused on DevOps, SRE, and Cloud Computing challenges.\n\nBeyond academics, I maintain a constant self-learning approach (AWS certification earned independently, Tech & GenAI watch...) to stay at the forefront of the ecosystem.",
    },
  }

  return (
    <div className="flex min-h-[100dvh] px-4 xl:px-[4%] pb-12 gap-6">
      {/* Left side - Profile with Tech Stack */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col justify-start pt-8 gap-6 w-80 flex-shrink-0"
      >
        {/* Profile Info */}
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              Stéphane DEDU
            </h1>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {profileText[language].role}
            </p>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />

          {/* Social Links & CTA - Single Row */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a href="https://github.com/Pir4a" target="_blank" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors p-1">
              <BsGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/st%C3%A9phane-dedu-14579a266/"
              target="_blank"
              className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors p-1"
            >
              <BsLinkedin className="w-5 h-5" />
            </a>
            <HeroButton
              href=""
              text="CV"
              className="bg-slate-900 px-3.5 py-1.5 dark:bg-slate-100 text-white dark:text-black text-xs font-medium rounded-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200"
            />
            <HeroButton
              text="Contact"
              href="#contact"
              className="border border-slate-900 dark:border-slate-100 text-slate-900 dark:text-slate-100 px-3.5 py-1.5 text-xs rounded-md font-medium hover:bg-slate-900 dark:hover:bg-slate-100 hover:text-white dark:hover:text-black transition-all duration-200"
            />
          </div>
        </div>

        {/* Tech Stack Section */}
        <SkillsSidebar />
      </motion.div>

      {/* Middle - Projects */}
      <ProjectsCenter />

      {/* Right side - Certifications */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col justify-start pt-8 gap-6 w-64 flex-shrink-0"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1.5">
            Certifications
          </h2>
          <div className="h-px bg-slate-200 dark:bg-slate-700 my-1" />
        </div>

        {/* Certifications - Vertical Stack */}
        <div className="flex flex-col gap-6 items-center">
          <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
            <motion.img
              src="/badges/aws_saa_badge-2106246363.png"
              alt="AWS Solutions Architect Associate"
              className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </a>
          <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
            <motion.img
              src="/badges/1645553469-hcta0-badge-1345755619.png"
              alt="HashiCorp Terraform Associate"
              className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </a>
          <a href="https://www.credly.com/badges/393932de-9587-40b5-96c7-9cdc582aebe1" target="_blank" rel="noopener noreferrer">
            <motion.img
              src="/badges/cka_from_cncfsite__281_29-1073793947.png"
              alt="Certified Kubernetes Administrator"
              className="w-32 h-32 object-contain opacity-90 hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            />
          </a>
        </div>
      </motion.div>
    </div>
  )
}
