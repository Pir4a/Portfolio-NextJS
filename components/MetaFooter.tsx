"use client"

import { useState, useEffect } from "react"
import { BsCircleFill } from "react-icons/bs"

export default function MetaFooter() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <footer className="fixed bottom-0 left-0 right-0 h-8 bg-gray-100 dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 text-[10px] md:text-xs font-mono text-gray-500 uppercase z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <BsCircleFill className="w-2 h-2 text-green-500 animate-pulse" />
                    <span>System Status: Operational</span>
                </div>
                <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
                <span className="hidden md:inline">Region: eu-west-3</span>
            </div>

            <div className="flex items-center gap-4">
                <span>CI/CD: Automated</span>
                <span className="hidden md:inline text-gray-300 dark:text-gray-700">|</span>
                <span>Uptime: 99.99%</span>
            </div>
        </footer>
    )
}
