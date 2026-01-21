"use client"

import { motion } from "motion/react"
import { IconType } from "react-icons"

interface SkillItem {
  Icon: IconType
  key: string
  label: string
}

interface ChaqueCompetencesProps {
  title: string
  items: SkillItem[]
  language: string
  deviceWidth: number
  delay?: number
  arbriraryValue?: number
}

export default function ChaqueCompetences({
  arbriraryValue,
  title,
  items,
  language,
  deviceWidth,
  delay = 0.2,
}: ChaqueCompetencesProps) {
  return (
    <div className="w-full xl:w-auto">
      <motion.h3
        key={`${language}-${deviceWidth}-${title}`}
        initial={{
          opacity: 0,
          ...(deviceWidth >= 1280 ? { x: -300 } : {}),
        }}
        animate={{
          opacity: 1,
          ...(deviceWidth >= 1280 ? { x: [-300, -150, 0] } : {}),
        }}
        exit={{
          opacity: 0,
          ...(deviceWidth >= 1280 ? { x: -300 } : {}),
        }}
        transition={{ duration: 0.25, ease: "easeOut", delay }}
        className="text-2xl xl:text-3xl font-light tracking-tight text-gray-900 dark:text-gray-300 mb-6 text-center"
      >
        {title}
      </motion.h3>
      <motion.div
        key={`${language}-${deviceWidth}-items`}
        initial={{
          opacity: 0,
          ...(deviceWidth >= 1280 ? { x: -270 } : {}),
        }}
        animate={{
          opacity: 1,
          ...(deviceWidth >= 1280 ? { x: [-300, -150, 0] } : {}),
        }}
        exit={{
          opacity: 0,
          ...(deviceWidth >= 1280 ? { x: -300, scale: 0.8 } : {}),
        }}
        transition={{
          duration: 0.25,
          bounce: 1,
          ease: "easeOut",
          delay: 0.12,
        }}
        className=" xl:min-w-[10rem] grid grid-cols-2 gap-4 xl:gap-4 xl:min-h-[320px] lg:max-w-full max-w-[300px] mx-auto"
      >
        {items.map(({ Icon, key, label }, index) => (
          <motion.div
            key={`${language}-${deviceWidth}-${key}`}
            initial={{
              opacity: 0,
              ...(deviceWidth >= 1280 ? { x: -270, scale: 0.8 } : {}),
            }}
            animate={{
              opacity: [0, 0.4, 0.6, 1],
              ...(deviceWidth >= 1280
                ? {
                    x: [-3000, 100, 0],
                    scale: [0.8, 1, 1.05, 1],
                  }
                : {}),
            }}
            exit={{
              opacity: 0,
              ...(deviceWidth >= 1280 ? { x: -300, scale: 0.8 } : {}),
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
              delay: 0.14 + index * 0.14 + (arbriraryValue ?? 0),
              ...(deviceWidth >= 1280
                ? {
                    scale: {
                      bounce: 1,
                      duration: 0.2,
                      times: [0, 0.7, 0.85, 1],
                    },
                  }
                : {}),
            }}
            className="flex flex-col items-center gap-2"
          >
            <Icon className="text-4xl xl:text-5xl text-gray-900 dark:text-gray-200" />
            <span className="text-sm xl:text-md text-gray-700 dark:text-gray-300 font-light tracking-wide">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
