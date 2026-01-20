import React, { ReactNode } from "react"

export default function TextCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`p-8 rounded-2xl backdrop-blur-xl border border-pink-200/20 dark:border-pink-500/20 shadow-xl shadow-pink-500/5 ${className}`}
    >
      {/* Content */}
      <div className="relative z-10 text-gray-800  dark:text-gray-400">
        {children}
      </div>
    </div>
  )
}
