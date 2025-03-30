import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-black lg:px-[10%]">
      <CursorGlow />
      <Header />
      <div className="dark:bg-black bg-gray-100">
        <main>
          <Hero />
          <Profil />
          <h1 className="text-gray-900 dark:text-black h-screen">Home</h1>
        </main>
      </div>
    </div>
  )
}
