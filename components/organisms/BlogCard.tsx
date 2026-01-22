"use client"

import { useState, useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { SiAmazonwebservices } from "react-icons/si"

interface BlogCardProps {
    title: string
    date: string
    category: string
    excerpt: string
    content: string
    readTime: string
    className?: string
    icon?: string
    index: number
}

export function BlogCard({
    title,
    date,
    category,
    excerpt,
    content,
    readTime,
    className,
    icon,
    index,
}: BlogCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Spring physics
    const springConfig = { damping: 15, stiffness: 15 }
    const rotateX = useSpring(useMotionValue(0), springConfig)
    const rotateY = useSpring(useMotionValue(0), springConfig)

    // Shine effect
    const diagonalMovement = useMotionValue(0)
    rotateX.onChange((latest) => diagonalMovement.set(latest + rotateY.get()))
    rotateY.onChange((latest) => diagonalMovement.set(rotateX.get() + latest))

    const sheenPosition = useTransform(diagonalMovement, [-15, 15], [-100, 200])
    const sheenOpacity = useTransform(diagonalMovement, [-15, 15], [0, 0.3])
    const sheenGradient = useMotionTemplate`linear-gradient(
    55deg,
    transparent,
    rgba(255, 255, 255, ${sheenOpacity}) ${sheenPosition}%,
    transparent
  )`

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        rotateX.set(((y - centerY) / centerY) * -5) // Reduced rotation for better text readability
        rotateY.set(((x - centerX) / centerX) * 5)
    }

    function handleMouseLeave() {
        rotateX.set(0)
        rotateY.set(0)
        diagonalMovement.set(0)
    }

    const { theme } = useTheme()

    return (
        <>
            <motion.div
                key={`card-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isModalOpen ? 0 : 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`relative group perspective-1000 ${className}`}
            >
                <motion.div
                    ref={cardRef}
                    style={{
                        rotateX: isModalOpen ? 0 : rotateX,
                        rotateY: isModalOpen ? 0 : rotateY,
                        transformStyle: "preserve-3d",
                        backgroundImage: sheenGradient,
                    }}
                    animate={{
                        scale: isModalOpen ? 0.95 : 1,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut"
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setIsModalOpen(true)}
                    className="relative h-full overflow-hidden rounded-xl border p-6 
        bg-white/10 dark:bg-[#0A0A0A]/20 
        border-slate-200/50 dark:border-slate-800/50
        shadow-sm hover:shadow-xl dark:shadow-none
        transition-shadow duration-300
        backdrop-blur-sm cursor-pointer"
                >
                    {/* Glow Effects */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <motion.div className="relative z-10 flex flex-col h-full gap-4">
                        <div className="flex justify-between items-start">
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                {category}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                {readTime}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                {excerpt}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs text-slate-500 dark:text-slate-500">
                                {date}
                            </span>
                            <span className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                                Read more →
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence mode="wait">
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    mass: 0.8
                                }}
                                className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800/50 rounded-2xl shadow-2xl pointer-events-auto custom-scrollbar"
                            >
                                <div className="relative p-8">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsModalOpen(false);
                                        }}
                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                                            {category}
                                        </span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {date} • {readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                                        {title}
                                        {icon === "aws" && <SiAmazonwebservices className="w-8 h-8 text-[#FF9900]" />}
                                    </h2>

                                    <div
                                        className="prose prose-slate dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: content }}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
