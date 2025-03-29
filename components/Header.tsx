"use client"
import React from "react"
import ThemeToggle from "./theme-toggle"
import Logo from "./logo"
export default function Header() {
  return (
    <header className="flex items-center justify-between py-4 px-8	">
      <Logo text="DEDU Stéphane" />
      <ThemeToggle />
    </header>
  )
}
