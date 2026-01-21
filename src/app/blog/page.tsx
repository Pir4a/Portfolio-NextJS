"use client"

import Header from "../../../components/organisms/Header"
import CursorGlow from "../../../components/atoms/CursorGlow"
import { BlogCard } from "../../../components/organisms/BlogCard"
import { motion } from "framer-motion"

import blogPosts from "../../../datas/blogposts.json"

export default function BlogPage() {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <BlogCard
                            key={index}
                            index={index}
                            {...post}
                            className="h-full"
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}
