import React from "react"

export default function logo({ text }: { text?: string }) {
  return (
    <span className="flex items-center gap-4 text-lg font-bold">
      <img
        src="/stephanelogo.png"
        alt="logo"
        className="w-10 h-10 flex-shrink-0"
      />
      {text}
    </span>
  )
}
