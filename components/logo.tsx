"use client"
import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function logo({ text }: { text?: string }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className="flex items-center px-2 lg:px-4 gap-4 text-lg font-bold dark:text-white text-black">
        <div className="w-10 h-10 flex-shrink-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full" />
        {text}
      </span>
    )
  }

  return (
    <span className="flex items-center px-2 lg:px-4 gap-4 text-lg font-bold dark:text-white text-black">
      <img
        src={theme === "dark" ? "/stephanelogo.png" : "/stephanelogolight.png"}
        alt="logo"
        className="w-10 h-10 flex-shrink-0"
      />
      {text}
    </span>
  )
}
