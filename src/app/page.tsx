import Header from "../../components/Header"
import Profil from "../../components/profil"
import Hero from "../../components/hero"
import CursorGlow from "../../components/CursorGlow"
import Cherrytree from "../../components/cherrytree"
import Petals from "../../components/petals"
export default function Home() {
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
          <Profil />
        </main>
      </div>
    </div>
  )
}
