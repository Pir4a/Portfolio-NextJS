"use client"
import { useLanguage } from "../contexts/LanguageContext"
import projetsdata from "../datas/projetsdatanew.json"
import ProjectCardSRE from "./ProjectCardSRE"

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

function Projets() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col items-center min-h-screen py-20 px-4 max-w-7xl mx-auto">
      <div className="w-full mb-16 border-b border-gray-200 dark:border-gray-800 pb-8">
        <h2 className="text-4xl font-bold text-black dark:text-white mb-2">
          Project Index
        </h2>
        <p className="font-mono text-gray-500 text-sm">
          /var/www/html/projects --list-all
        </p>
      </div>

      <div className="flex flex-col gap-12 w-full">
        {projetsdata.map((projet: Projet, index: number) => (
          <ProjectCardSRE
            key={index}
            title={projet.projectName}
            description={language === "fr" ? projet.projectDescription : projet.projectDescriptionEN}
            techStack={projet.technos}
            stats={{
              uptime: "99.9%",
              latency: `${Math.floor(Math.random() * 50) + 10}ms`, // Mock data for now
              requests: "2.4M/mo"
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Projets
{
  /*<p className="text-sm xl:w-[80%] mx-auto mt-4 text-center">
                {language === "fr"
                  ? projet.projectDescription
                  : projet.projectDescriptionEN}
              </p>*/
}
