import Header from "../../components/organisms/Header"
import Hero from "../../components/organisms/hero"
import ContactForm from "../../components/organisms/contactForm"
import CursorGlow from "../../components/atoms/CursorGlow"

export default function Home() {

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
