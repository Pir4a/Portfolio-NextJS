"use client"

import { BsGithub, BsHddNetwork } from "react-icons/bs"

interface ProjectProps {
    title: string
    description: string
    techStack: string[]
    stats: {
        uptime: string
        latency: string
        requests: string
    }
}

export default function ProjectCardSRE({ title, description, techStack, stats }: ProjectProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
            {/* Left: Architecture Diagram Placeholder */}
            <div className="lg:col-span-7 bg-gray-50 dark:bg-[#111] p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 min-h-[300px]">
                <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 gap-4 p-8">
                    <BsHddNetwork className="w-12 h-12" />
                    <span className="font-mono text-xs uppercase tracking-widest">
                        Architecture Diagram
                    </span>
                    <span className="text-xs text-center px-8 font-mono">
                        [Load Balancer] -&gt; [ECS Cluster] -&gt; [RDS Multi-AZ]
                    </span>
                </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-baseline justify-between mb-4">
                        <h3 className="text-xl font-bold font-mono tracking-tight">{title}</h3>
                        <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full">
                            Production
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        {description}
                    </p>

                    <div className="mb-6">
                        <h4 className="text-xs font-mono uppercase text-gray-400 mb-3">
                            Infrastructure Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-0">
                    <div className="border-t border-gray-100 dark:border-gray-800 py-3 flex justify-between items-center">
                        <span className="text-xs font-mono text-gray-500">Uptime (SLA)</span>
                        <span className="text-xs font-mono font-bold text-green-600 dark:text-green-400">
                            {stats.uptime}
                        </span>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 py-3 flex justify-between items-center">
                        <span className="text-xs font-mono text-gray-500">Avg Latency</span>
                        <span className="text-xs font-mono text-gray-700 dark:text-gray-300">
                            {stats.latency}
                        </span>
                    </div>
                    <div className="border-t border-b border-gray-100 dark:border-gray-800 py-3 flex justify-between items-center">
                        <span className="text-xs font-mono text-gray-500">CI/CD Pipeline</span>
                        <a href="#" className="flex items-center gap-1 text-xs font-mono text-blue-600 hover:underline">
                            <BsGithub className="w-3 h-3" /> View Workflows
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
