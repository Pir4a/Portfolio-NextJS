"use client"
import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import Competences from "../../components/competences"
import Projets from "../../components/projets"
import ContactForm from "../../components/contactForm"

export default function Home() {
  return (
    <div id="top" className="bg-white dark:bg-[#0a0a0a] min-h-screen w-full">
      <Header />
      <main className="flex flex-col gap-20">
        <Hero />
        <Profil />
        <Competences />
        <Projets />
        <ContactForm />
      </main>
    </div>
  )
}
