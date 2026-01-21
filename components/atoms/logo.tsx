"use client"

import { useTheme } from "next-themes"
import Image from "next/image"

export default function Logo({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <a
      href="#top"
      className="flex items-center px-2 lg:px-4 gap-4 text-lg font-bold dark:text-white text-black"
    >
      <Image
        src={theme === "dark" ? "/stephanelogo.png" : "/stephanelogolight.png"}
        alt="logo"
        width={40}
        height={40}
        className="flex-shrink-0"
      />
      {children}
    </a>
  )
}
