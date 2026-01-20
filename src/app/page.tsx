"use client"
import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import dynamic from "next/dynamic"
import { useEffect, useState, memo } from "react"
import Competences from "../../components/competences"
import Projets from "../../components/projets"
import ContactForm from "../../components/contactForm"
import Certifications from "../../components/certifications"

// Dynamic imports for heavy components
const Cherrytree = dynamic(() => import("../../components/cherrytree"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const Petals = dynamic(() => import("../../components/petals"), {
  ssr: false,
})

// Memoize components to prevent unnecessary re-renders
const MemoizedHero = memo(Hero)
const MemoizedProfil = memo(Profil)
const MemoizedCertifications = memo(Certifications)
const MemoizedCompetences = memo(Competences)
const MemoizedProjets = memo(Projets)
const MemoizedContactForm = memo(ContactForm)
const MemoizedCursorGlow = memo(CursorGlow)
const MemoizedHeader = memo(Header)

export default function Home() {
  const [deviceWidth, setDeviceWidth] = useState(0)

  useEffect(() => {
    // Function to update device width with debounce
    let timeoutId: NodeJS.Timeout

    const updateWidth = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setDeviceWidth(window.innerWidth)
      }, 150) // Debounce by 150ms
    }

    // Set initial width
    updateWidth()

    // Add event listener for window resize
    window.addEventListener("resize", updateWidth)

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateWidth)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div
      id="top"
      className="bg-cyan-100  dark:bg-black md:px-[10%] lg:px-[0%] scroll-smooth  2xl:px-[10%]  w-[100dvw]"
    >
      <MemoizedCursorGlow />
      <MemoizedHeader />
      <div className="dark:bg-black bg-cyan-100">
        <main>
          <div className="flex overflow-hidden ">
            <MemoizedHero />
            <Cherrytree />
            <Petals />
          </div>
          <MemoizedProfil deviceWidth={deviceWidth} />
          <MemoizedCertifications deviceWidth={deviceWidth} />
          <MemoizedCompetences deviceWidth={deviceWidth} />
          <MemoizedProjets deviceWidth={deviceWidth} />
          <MemoizedContactForm />
        </main>
      </div>
    </div>
  )
}
