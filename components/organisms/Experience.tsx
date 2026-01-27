"use client"

import { motion } from "framer-motion"
import { careerData } from "../../datas/career"

const getDisplayYear = (period: string) => {
    if (period.includes("Present")) return "NOW"
    if (period.includes("En cours")) return "NOW"
    if (period.includes(" - ")) {
        return period.split(" - ")[0]
    }
    return period
}

export default function Experience() {
    return (
        <section className="relative w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Parcours <span className="font-light text-cyan-600 dark:text-cyan-400">&</span> Expérience
            </h2>

            <div className="relative pl-8">
                {/* Left-aligned Timeline Line */}
                <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent" />

                <div className="flex flex-col gap-10">
                    {careerData.experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Node on the line */}
                            <div className="absolute -left-8 top-1 w-3 h-3 bg-white dark:bg-black border-2 border-cyan-500 rounded-full z-10 group-hover:scale-125 transition-transform" />

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                                        {getDisplayYear(exp.period)}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                                    {exp.position}
                                </h4>
                                <h5 className="text-sm text-cyan-600 dark:text-cyan-400 font-medium mb-3">
                                    {exp.company}
                                </h5>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
