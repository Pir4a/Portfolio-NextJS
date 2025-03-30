"use client"
import React from "react"
import { useTheme } from "next-themes"

export default function logo({ text }: { text?: string }) {
  const { theme } = useTheme()
  return (
    <span className="flex items-center gap-4 text-lg font-bold dark:text-white text-black">
      <img
        src={theme === "dark" ? "/stephanelogo.png" : "/stephanelogolight.png"}
        alt="logo"
        className="w-10 h-10 flex-shrink-0"
      />
      {text}
    </span>
  )
}
