"use client"
import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import Cherrytree from "../../components/cherrytree"
import Petals from "../../components/petals"
import { useScroll } from "motion/react"
import { useMotionValueEvent } from "motion/react"
import { useState } from "react"
export default function Home() {
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
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
          <Profil scrollYValue={scrollYValue} />
        </main>
      </div>
    </div>
  )
}
