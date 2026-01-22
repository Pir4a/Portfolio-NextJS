"use client"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

interface JourneySection {
    title: string
    content: string
    diagram?: {
        type: string
        description: string
    }
}

interface JourneyCardProps {
    id: string
    title: string
    date: string
    category: string
    excerpt: string
    readTime: string
    sections: JourneySection[]
    index: number
    className?: string
}

export interface JourneyCardRef {
    openModal: () => void
}

export const JourneyCard = forwardRef<JourneyCardRef, JourneyCardProps>(({
    title,
    date,
    category,
    excerpt,
    readTime,
    sections,
    className,
    index,
}, ref) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(0)
    const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]))

    // Expose openModal method via ref
    useImperativeHandle(ref, () => ({
        openModal: () => {
            setIsModalOpen(true)
        }
    }))

    // Reset when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setActiveSection(0)
            // Load first 2 sections immediately for better UX
            const initialSections = new Set<number>()
            for (let i = 0; i < Math.min(2, sections.length); i++) {
                initialSections.add(i)
            }
            setVisibleSections(initialSections)
            // Reset refs array
            sectionRefs.current = new Array(sections.length).fill(null)
        } else {
            // Reset when modal closes
            setVisibleSections(new Set([0]))
        }
    }, [isModalOpen, sections.length])

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
        rotateX.set(((y - centerY) / centerY) * -5)
        rotateY.set(((x - centerX) / centerX) * 5)
    }

    function handleMouseLeave() {
        rotateX.set(0)
        rotateY.set(0)
        diagonalMovement.set(0)
    }

    const { theme } = useTheme()

    // Intersection Observer for lazy loading
    useEffect(() => {
        if (!isModalOpen || !contentRef.current) return

        let observer: IntersectionObserver | null = null

        // Small delay to ensure refs are set
        const timeoutId = setTimeout(() => {
            observer = new IntersectionObserver(
                (entries) => {
                    const sectionsToAdd = new Set<number>()
                    
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const index = parseInt(entry.target.getAttribute('data-section-index') || '0')
                            sectionsToAdd.add(index)
                        }
                    })

                    // Batch update to prevent multiple re-renders
                    if (sectionsToAdd.size > 0) {
                        setVisibleSections((prev) => {
                            let hasChanges = false
                            const newSet = new Set(prev)
                            sectionsToAdd.forEach((index) => {
                                if (!newSet.has(index)) {
                                    newSet.add(index)
                                    hasChanges = true
                                }
                            })
                            return hasChanges ? newSet : prev
                        })
                    }
                },
                {
                    root: contentRef.current,
                    rootMargin: '300px', // Load sections 300px before they're visible
                    threshold: 0.01
                }
            )

            // Observe all section refs that exist
            sectionRefs.current.forEach((ref) => {
                if (ref) {
                    observer!.observe(ref)
                }
            })
        }, 150)

        return () => {
            clearTimeout(timeoutId)
            if (observer) {
                observer.disconnect()
            }
        }
    }, [isModalOpen, sections.length])

    // Track active section based on scroll position and load visible sections
    useEffect(() => {
        if (!isModalOpen || !contentRef.current) return

        let rafId: number | null = null
        let lastActiveSection = 0

        const handleScroll = () => {
            if (!contentRef.current) return

            // Use requestAnimationFrame to throttle updates
            if (rafId) return

            rafId = requestAnimationFrame(() => {
                rafId = null
                
                const scrollTop = contentRef.current!.scrollTop
                const containerHeight = contentRef.current!.clientHeight
                const viewportCenter = scrollTop + containerHeight / 2
                const viewportTop = scrollTop
                const viewportBottom = scrollTop + containerHeight

                let closestIndex = 0
                let closestDistance = Infinity
                const sectionsToLoad = new Set<number>()

                sectionRefs.current.forEach((ref, index) => {
                    if (!ref) return
                    const sectionTop = ref.offsetTop
                    const sectionHeight = ref.offsetHeight
                    const sectionBottom = sectionTop + sectionHeight
                    const sectionCenter = sectionTop + sectionHeight / 2
                    const distance = Math.abs(viewportCenter - sectionCenter)

                    if (distance < closestDistance) {
                        closestDistance = distance
                        closestIndex = index
                    }

                    // Load section if it's near viewport (within 400px)
                    if (sectionTop < viewportBottom + 400 && sectionBottom > viewportTop - 400) {
                        sectionsToLoad.add(index)
                    }
                })

                // Only update active section if it changed
                if (closestIndex !== lastActiveSection) {
                    lastActiveSection = closestIndex
                    setActiveSection(closestIndex)
                }

                // Batch load visible sections
                if (sectionsToLoad.size > 0) {
                    setVisibleSections((prev) => {
                        let hasChanges = false
                        const newSet = new Set(prev)
                        sectionsToLoad.forEach((index) => {
                            if (!newSet.has(index)) {
                                newSet.add(index)
                                hasChanges = true
                            }
                        })
                        return hasChanges ? newSet : prev
                    })
                }
            })
        }

        const content = contentRef.current
        content.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        return () => {
            if (rafId) {
                cancelAnimationFrame(rafId)
            }
            content.removeEventListener('scroll', handleScroll)
        }
    }, [isModalOpen])

    const scrollToSection = (index: number) => {
        const section = sectionRefs.current[index]
        if (section && contentRef.current) {
            const sectionTop = section.offsetTop
            contentRef.current.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            })
        }
    }

    const scrollToNext = () => {
        if (activeSection < sections.length - 1) {
            scrollToSection(activeSection + 1)
        }
    }

    // Mock diagram component
    const renderDiagram = (diagram: { type: string; description: string }) => {
        return (
            <div className="my-6 md:my-8 p-4 md:p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-violet-200 dark:border-slate-700">
                <div className="text-center mb-3 md:mb-4">
                    <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-1 md:mb-2">
                        {diagram.description}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Type: {diagram.type}
                    </p>
                </div>
                <div className="relative h-48 md:h-64 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    <div className="text-center text-slate-400 dark:text-slate-500">
                        <svg className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <p className="text-sm">Diagram Preview</p>
                        <p className="text-xs mt-1">(Mock diagram - replace with actual diagram)</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <motion.div
                key={`journey-card-${index}`}
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
                    className="relative h-full overflow-hidden rounded-xl border p-8 
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

                        <div className="space-y-3">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {excerpt}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50">
                            <span className="text-xs text-slate-500 dark:text-slate-500">
                                {date}
                            </span>
                            <span className="text-sm font-medium text-violet-600 dark:text-violet-400 group-hover:translate-x-1 transition-transform">
                                Read journey →
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Large Modal */}
            <AnimatePresence mode="wait">
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
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
                                className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800/50 rounded-2xl shadow-2xl pointer-events-auto flex flex-col relative"
                            >
                                {/* Header */}
                                <div className="relative p-6 border-b border-slate-200 dark:border-slate-800/50 flex-shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setIsModalOpen(false)
                                        }}
                                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300">
                                            {category}
                                        </span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">
                                            {date} • {readTime}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                            {title}
                                        </h2>
                                        <div className="text-sm text-slate-500 dark:text-slate-400">
                                            <span className="font-medium text-violet-600 dark:text-violet-400">{activeSection + 1}</span>
                                            <span className="mx-1">/</span>
                                            <span>{sections.length}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-hidden flex">
                                    {/* Sidebar Navigation */}
                                    <div className="w-64 border-r border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto flex-shrink-0">
                                        <div className="p-4">
                                            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wide">
                                                Sections
                                            </h3>
                                            <nav className="space-y-1">
                                                {sections.map((section, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => scrollToSection(idx)}
                                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                                            activeSection === idx
                                                                ? "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-medium"
                                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                        }`}
                                                    >
                                                        {section.title}
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>

                                    {/* Main Content - Vertical Carousel */}
                                    <div
                                        ref={contentRef}
                                        className="flex-1 overflow-y-auto custom-scrollbar relative"
                                        style={{ scrollSnapType: 'y proximity' }}
                                    >
                                        <div className="space-y-0">
                                            {sections.map((section, idx) => {
                                                const isVisible = visibleSections.has(idx)
                                                
                                                return (
                                                    <div
                                                        key={idx}
                                                        ref={(el) => {
                                                            if (sectionRefs.current[idx] !== el) {
                                                                sectionRefs.current[idx] = el
                                                            }
                                                        }}
                                                        data-section-index={idx}
                                                        className="flex flex-col justify-center px-8 py-12 md:py-20 scroll-snap-align-start"
                                                        style={{ scrollSnapAlign: 'start', minHeight: '60vh' }}
                                                    >
                                                        {isVisible ? (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 30 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.4, delay: 0.1 }}
                                                                className="max-w-3xl mx-auto w-full"
                                                            >
                                                                <h3 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-6 md:mb-8">
                                                                    {section.title}
                                                                </h3>

                                                                <div
                                                                    className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:mt-6 prose-headings:mb-4 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-2"
                                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                                />

                                                                {section.diagram && (
                                                                    <div className="mt-6 md:mt-8">
                                                                        {renderDiagram(section.diagram)}
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        ) : (
                                                            <div className="max-w-3xl mx-auto w-full">
                                                                <div className="h-32 flex items-center justify-center">
                                                                    <div className="text-slate-400 dark:text-slate-600">
                                                                        <svg className="w-12 h-12 mx-auto animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Fixed Bottom Navigation Button */}
                                    {activeSection < sections.length - 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                                        >
                                            <button
                                                onClick={scrollToNext}
                                                className="pointer-events-auto px-6 py-3 rounded-full bg-violet-600 dark:bg-violet-500 text-white shadow-lg hover:bg-violet-700 dark:hover:bg-violet-600 transition-all hover:scale-105 flex items-center gap-2"
                                            >
                                                <span>Next Section</span>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
})

JourneyCard.displayName = "JourneyCard"
