"use client"

import { useEffect, useRef } from "react"
import Header from "../../../components/organisms/Header"
import CursorGlow from "../../../components/atoms/CursorGlow"
import { BlogCard } from "../../../components/organisms/BlogCard"
import { JourneyCard, JourneyCardRef } from "../../../components/organisms/JourneyCard"
import { motion } from "framer-motion"

import blogData from "../../../datas/blogposts.json"

export default function BlogPage() {
    const certifications = blogData.certifications || []
    const journeys = blogData.journeys || []
    const journeyCardRefs = useRef<{ [key: string]: JourneyCardRef | null }>({})

    useEffect(() => {
        // Check if there's a hash in the URL
        const hash = window.location.hash.slice(1) // Remove the #
        
        if (hash) {
            // Delay to ensure page is fully loaded and rendered before opening modal
            const timer = setTimeout(() => {
                const cardRef = journeyCardRefs.current[hash]
                if (cardRef) {
                    cardRef.openModal()
                    // Remove hash from URL after opening
                    window.history.replaceState(null, '', '/blog')
                }
            }, 600) // Increased delay for better UX
            
            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <div
            id="top"
            className="bg-cyan-100 dark:bg-black scroll-smooth w-[100dvw] min-h-screen flex flex-col"
        >
            <CursorGlow />
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 xl:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Thoughts on software engineering, cloud infrastructure, and the chaotic beauty of modern tech stacks.
                    </p>
                    <div className="h-px w-24 bg-violet-500 mt-6" />
                </motion.div>

                {/* Journeys & Projects Section */}
                {journeys.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-16"
                    >
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                Journeys & Projects
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Detailed stories about my projects, architecture decisions, and technical journeys.
                            </p>
                            <div className="h-px w-20 bg-violet-500 mt-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {journeys.map((journey, index) => (
                                <JourneyCard
                                    key={journey.id}
                                    index={index}
                                    {...journey}
                                    className="h-full"
                                    ref={(ref) => {
                                        if (ref) {
                                            journeyCardRefs.current[journey.id] = ref
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* Certifications & Feedback Section */}
                {certifications.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                                Certifications & Feedback
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                My thoughts and experiences with certifications and technologies.
                            </p>
                            <div className="h-px w-20 bg-violet-500 mt-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {certifications.map((post, index) => (
                                <BlogCard
                                    key={post.id}
                                    index={index}
                                    {...post}
                                    className="h-full"
                                />
                            ))}
                        </div>
                    </motion.section>
                )}
            </main>
        </div>
    )
}
