"use client"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../translations"
import ProjectCard from "./projectCard"

function projets({
  scrollYValue,
  deviceWidth,
}: {
  scrollYValue: number
  deviceWidth: number
}) {
  const { language } = useLanguage()
  return (
    <>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-pink-300/60 to-transparent" />
      <div className="flex flex-col items-center min-h-[50dvh]">
        <h1 className="text-4xl font-bold pt-10 mx-auto">
          {translations[language].projects.title}
        </h1>
        <div className="grid xl:grid-cols-3 min-h-[60dvh] gap-30 w-full items-center pt-10">
          <ProjectCard>
            <p className="text-sm xl:w-[30%] mx-auto">
              Description du projet 1
            </p>
          </ProjectCard>
          <p className="text-sm xl:w-[30%] mx-auto">Description du projet 1</p>
          <p className="text-sm xl:w-[30%] mx-auto">Description du projet 1</p>
          <p className="text-sm xl:w-[30%] mx-auto">Description du projet 1</p>
          <p className="text-sm xl:w-[30%] mx-auto">Description du projet 1</p>
          <p className="text-sm xl:w-[30%] mx-auto">Description du projet 1</p>
        </div>
      </div>
    </>
  )
}

export default projets
