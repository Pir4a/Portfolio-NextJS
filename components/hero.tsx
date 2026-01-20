"use client"

import { useLanguage } from "../contexts/LanguageContext"
import { FaAws } from "react-icons/fa"
import { SiTerraform, SiKubernetes } from "react-icons/si"

export default function Hero() {
  const { language } = useLanguage()

  const certifications = [
    { name: "AWS Solutions Arch.", icon: FaAws, color: "text-orange-500" },
    { name: "CKA", icon: SiKubernetes, color: "text-blue-500" },
    { name: "Terraform Assoc.", icon: SiTerraform, color: "text-purple-500" },
  ]

  return (
    <section className="min-h-[80vh] flex flex-col justify-center max-w-7xl mx-auto px-6 border-l border-gray-200 dark:border-gray-800 ml-4 lg:ml-20 pl-8 lg:pl-12 my-20">
      <div className="space-y-2 mb-8">
        <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
          #!/bin/bash
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white">
          Stéphane Dedu
        </h1>
        <h2 className="text-2xl md:text-3xl font-mono text-blue-600 dark:text-blue-400">
          &gt; SRE / Cloud Engineer<span className="animate-pulse">_</span>
        </h2>
      </div>

      <div className="max-w-2xl mb-12">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-light">
          {language === 'fr'
            ? "Conception d'infrastructures résilientes, automatisation des déploiements et optimisation de la performance système. Focus sur l'observabilité et la scalabilité."
            : "Architecting resilient infrastructure, automating deployments, and optimizing system performance. Focused on observability and scalability."}
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500">
          Certifications_ & Status
        </h3>
        <div className="flex flex-wrap gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-sm"
            >
              <cert.icon className={`w-5 h-5 ${cert.color}`} />
              <span className="font-mono text-sm font-medium">{cert.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm font-medium text-green-700 dark:text-green-400">
              Open to Work
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
