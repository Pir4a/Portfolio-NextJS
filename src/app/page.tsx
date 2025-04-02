"use client"
import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import Cherrytree from "../../components/cherrytree"
import Petals from "../../components/petals"
import { useEffect, useState } from "react"
import Competences from "../../components/competences"
import Projets from "../../components/projets"
export default function Home() {
  const [deviceWidth, setDeviceWidth] = useState(0)

  useEffect(() => {
    // Function to update device width
    const updateWidth = () => {
      setDeviceWidth(window.innerWidth)
    }

    // Set initial width
    updateWidth()

    // Add event listener for window resize
    window.addEventListener("resize", updateWidth)

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [])

  return (
    <div className="bg-cyan-100 dark:bg-black md:px-[10%] lg:px-[0%]  2xl:px-[10%]  w-[100dvw]">
      <CursorGlow />
      <Header />
      <div className="dark:bg-black bg-cyan-100">
        <main>
          <div className="flex overflow-hidden ">
            <Hero />

            <Cherrytree />
            <Petals />
          </div>
          <Profil deviceWidth={deviceWidth} />
          <Competences deviceWidth={deviceWidth} />
          <Projets deviceWidth={deviceWidth} />
        </main>
      </div>
    </div>
  )
}
