"use client"

import ThemeToggle from "./theme-toggle"
import Logo from "./logo"
import Link from "next/link"
export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8  bg-glass backdrop-blur-lg dark:bg-black text-black dark:text-white ">
      <Logo text="DEDU Stéphane" />
      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Profil</Link>
          </li>
          <li>
            <Link href="/">Compétences</Link>
          </li>
          <li>
            <Link href="/">Projets</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
      </div>
      <ThemeToggle />
    </header>
  )
}
