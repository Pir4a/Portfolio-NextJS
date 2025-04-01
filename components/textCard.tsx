import React from "react"

interface TextCardProps {
  children: React.ReactNode
  className?: string
}

function TextCard({ children, className = "" }: TextCardProps) {
  return (
    <div
      className={`relative p-6 rounded-lg bg-[#0A0A0A] border border-[#1A1A1A] shadow-[0_0_20px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#1A1A1A]/20 to-transparent"></div>
      {/* Pink border glow */}
      <div className="absolute inset-0 rounded-lg border border-pink-500/10 shadow-[0_0_10px_rgba(236,72,153,0.1)]"></div>

      {/* Content */}
      <div className="relative z-10 text-gray-800  dark:text-gray-400">
        {children}
      </div>
    </div>
  )
}

export default TextCard
