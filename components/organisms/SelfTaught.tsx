"use client"

import { motion } from "framer-motion"
import { careerData } from "../../datas/career"
import { FaAws, FaMobileAlt } from "react-icons/fa"
import { SiTerraform, SiKubernetes } from "react-icons/si"

export default function SelfTaught() {
    const getIcon = (title: string) => {
        if (title.includes("AWS")) return <FaAws className="text-orange-500" />
        if (title.includes("Terraform")) return <SiTerraform className="text-purple-500" />
        if (title.includes("Kubernetes")) return <SiKubernetes className="text-blue-500" />
        return <FaMobileAlt className="text-cyan-500" />
    }

    return (
        <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Apprentissage Autonome
            </h3>

            <div className="space-y-6 relative pl-8">
                {/* Dashed line for independent path */}
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 border-l-2 border-dashed border-slate-300 dark:border-slate-700" />

                {careerData.selfTaught.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="relative group"
                    >
                        {/* Node on the line */}
                        <div className="absolute -left-8 top-1.5 w-3 h-3 bg-white dark:bg-slate-900 border-2 border-cyan-500 rounded-full z-10 group-hover:scale-125 transition-transform" />

                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 block">
                                {item.period}
                            </span>
                            <div className="text-lg opacity-80">
                                {getIcon(item.title)}
                            </div>
                        </div>

                        <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 leading-tight mb-1">
                            {item.title}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line mb-2">
                            {item.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {(item as any).tags?.map((tag: string) => (
                                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
