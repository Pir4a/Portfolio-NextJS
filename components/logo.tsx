"use client"

import { useTheme } from "next-themes"
import Link from "next/link"

export default function Logo({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <Link
      href="/"
      className="flex items-center px-2 lg:px-4 gap-4 text-lg font-bold dark:text-white text-black"
    >
      <img
        src={theme === "dark" ? "/stephanelogo.png" : "/stephanelogolight.png"}
        alt="logo"
        className="w-10 h-10 flex-shrink-0"
      />
      {children}
    </Link>
  )
}
