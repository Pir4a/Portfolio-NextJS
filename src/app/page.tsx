"use client"
import Header from "../../components/Header"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import { useEffect, useState } from "react"
import Competences from "../../components/competences"
import Projets from "../../components/projets"
import ContactForm from "../../components/contactForm"
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
    <div
      id="top"
      className="bg-cyan-100 dark:bg-black scroll-smooth w-[100dvw]"
    >
      <CursorGlow />
      <Header />
      <div className="dark:bg-black bg-cyan-100">
        <main>
          <Hero />
          <ContactForm />
        </main>
      </div>
    </div>
  )
}
