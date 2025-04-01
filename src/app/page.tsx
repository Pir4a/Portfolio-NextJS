"use client"
import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import Cherrytree from "../../components/cherrytree"
import Petals from "../../components/petals"
import { useScroll } from "motion/react"
import { useMotionValueEvent } from "motion/react"
import { useEffect, useState } from "react"
import Competences from "../../components/competences"
export default function Home() {
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)
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

  deviceWidth < 1024
    ? useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollYValue(1500)
      })
    : useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollYValue(latest)
      })
  return (
    <div className="bg-cyan-100 dark:bg-black lg:px-[10%]  w-[100dvw]">
      <CursorGlow />
      <Header />
      <div className="dark:bg-black bg-cyan-100">
        <main>
          <div className="flex overflow-hidden ">
            <Hero />

            <Cherrytree />
            <Petals />
          </div>
          <Profil scrollYValue={scrollYValue} deviceWidth={deviceWidth} />
          <Competences scrollYValue={scrollYValue} deviceWidth={deviceWidth} />
        </main>
      </div>
    </div>
  )
}
