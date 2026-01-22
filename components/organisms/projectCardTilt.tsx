import { useRef, useState } from "react"
import Image from "next/image"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "../../contexts/LanguageContext"
import { IconType } from "react-icons"
import { FaFolder, FaFolderOpen } from "react-icons/fa"
import { toast } from "sonner"
import { SiTerraform } from "react-icons/si"
import Link from "next/link"

// Mock Infrastructure Files Content
const INFRA_FILES = {
  "main.tf": `module "networking" {
  source = "./modules/networking"
}
module "storage" {
  source = "./modules/storage"
}
module "database" {
  source                = "./modules/database"
  private_subnet_ids    = module.networking.private_subnet_ids
  rds_security_group_id = module.networking.rds_security_group_id
  db_password           = "********"
}
module "compute" {
  source                 = "./modules/compute"
  vpc_id                 = module.networking.vpc_id
  public_subnet_ids      = module.networking.public_subnet_ids
}`,
  "variables.tf": `variable "app_name" {
  default = "fissure"
}
variable "aws_region" {
  default = "eu-west-1"
}`,
  "providers.tf": `provider "aws" {
  region = "eu-west-1"
}`,
  // Compute Module
  "modules/compute/main.tf": `resource "aws_lb" "fissure_lb" {
  name = "fissure-alb"
  load_balancer_type = "application"
}

resource "aws_ecs_cluster" "ecs_cluster" {
  name = "fissure-cluster"
}

resource "aws_ecs_service" "ecs_service" {
  name            = "fissure-service"
  launch_type     = "FARGATE"
  desired_count   = 1
}`,
  "modules/compute/variables.tf": `variable "vpc_id" {}
variable "public_subnet_ids" {}
variable "instance_count" {
  default = 1
}`,
  "modules/compute/iam.tf": `resource "aws_iam_role" "ecs_execution" {
  name = "fissure_ecs_execution_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{ Action = "sts:AssumeRole", Effect = "Allow", Principal = { Service = "ecs-tasks.amazonaws.com" } }]
  })
}`,
  "modules/compute/outputs.tf": `output "lb_dns_name" {
  value = aws_lb.fissure_lb.dns_name
}`,
  // Networking Module
  "modules/networking/main.tf": `resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "public_1" {
  cidr_block = "10.0.1.0/24"
}

resource "aws_nat_gateway" "main" {
  subnet_id = aws_subnet.public_1.id
}`,
  "modules/networking/variables.tf": `variable "vpc_cidr" {
  default = "10.0.0.0/16"
}`,
  "modules/networking/outputs.tf": `output "vpc_id" {
  value = aws_vpc.main.id
}
output "public_subnet_ids" {
  value = [aws_subnet.public_1.id]
}`,
  // Database Module
  "modules/database/main.tf": `resource "aws_db_instance" "rds" {
  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.t3.micro"
  allocated_storage = 20
}`,
  "modules/database/variables.tf": `variable "db_password" {}`,
  // Storage Module
  "modules/storage/main.tf": `resource "aws_ecr_repository" "ecr" {
  name = "fissure-backend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}`
}

import { translations } from "../../translations"

interface InfraBrowserProps {
  displayedimg: string
  titre: string
  language: string
}

const InfraBrowser = ({ displayedimg, titre, language }: InfraBrowserProps) => {
  const [selectedFile, setSelectedFile] = useState("main.tf")
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    "modules": true,
  })

  const text = translations[language as keyof typeof translations].fissure_card

  const toggleFolder = (path: string) => {
    setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }))
  }

  interface TreeItem {
    name: string
    path: string
    type: "folder" | "file"
    children?: TreeItem[]
  }

  // Tree Structure Definition
  const tree: TreeItem[] = [
    {
      name: "modules",
      path: "modules",
      type: "folder",
      children: [
        {
          name: "compute",
          path: "modules/compute",
          type: "folder",
          children: [
            { name: "main.tf", path: "modules/compute/main.tf", type: "file" },
            { name: "variables.tf", path: "modules/compute/variables.tf", type: "file" },
            { name: "iam.tf", path: "modules/compute/iam.tf", type: "file" },
            { name: "outputs.tf", path: "modules/compute/outputs.tf", type: "file" },
          ]
        },
        {
          name: "networking",
          path: "modules/networking",
          type: "folder",
          children: [
            { name: "main.tf", path: "modules/networking/main.tf", type: "file" },
            { name: "variables.tf", path: "modules/networking/variables.tf", type: "file" },
            { name: "outputs.tf", path: "modules/networking/outputs.tf", type: "file" },
          ]
        },
        {
          name: "database",
          path: "modules/database",
          type: "folder",
          children: [
            { name: "main.tf", path: "modules/database/main.tf", type: "file" },
            { name: "variables.tf", path: "modules/database/variables.tf", type: "file" },
          ]
        },
        {
          name: "storage",
          path: "modules/storage",
          type: "folder",
          children: [
            { name: "main.tf", path: "modules/storage/main.tf", type: "file" },
          ]
        }
      ]
    },
    { name: "main.tf", path: "main.tf", type: "file" },
    { name: "variables.tf", path: "variables.tf", type: "file" },
    { name: "providers.tf", path: "providers.tf", type: "file" },
  ]

  const renderTree = (items: TreeItem[], depth = 0) => {
    return items.map((item) => {
      const isOpen = openFolders[item.path]
      const isSelected = selectedFile === item.path
      const paddingLeft = `${depth * 12 + 12}px`

      if (item.type === "folder") {
        return (
          <div key={item.path}>
            <div
              onClick={() => toggleFolder(item.path)}
              className="flex items-center gap-1.5 py-1 text-zinc-300 hover:bg-[#2a2d2e] cursor-pointer"
              style={{ paddingLeft }}
            >
              {isOpen ? <FaFolderOpen className="text-yellow-500" /> : <FaFolder className="text-yellow-500" />}
              <span>{item.name}</span>
            </div>
            {isOpen && item.children && (
              <div>{renderTree(item.children, depth + 1)}</div>
            )}
          </div>
        )
      } else {
        return (
          <div
            key={item.path}
            onClick={() => setSelectedFile(item.path)}
            className={`flex items-center gap-1.5 py-1 cursor-pointer transition-colors ${isSelected ? "bg-[#37373d] text-white" : "text-zinc-400 hover:bg-[#2a2d2e] hover:text-white"}`}
            style={{ paddingLeft }}
          >
            <SiTerraform className="text-purple-400 opacity-80" />
            <span>{item.name}</span>
          </div>
        )
      }
    })
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Full Width Image with Overlay */}
      <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10">
          <h3 className="text-lg font-bold text-white tracking-wide">
            {text.infra_diagram}
          </h3>
        </div>
        <Image
          src={displayedimg}
          alt={titre}
          width={800}
          height={600}
          className="w-3/4 h-auto ml-[20%] object-cover rounded-lg"
        />
      </div>

      <div className="space-y-10 px-2 lg:px-4">
        {/* AWS Cloud Infra Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
            {text.aws_cloud}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[450px]">
            {/* Left Column: Explanations */}
            <div className="bg-white/5 dark:bg-zinc-900/50 p-6 rounded-xl border border-orange-200/20 dark:border-orange-900/30 space-y-4 text-black dark:text-gray-300 overflow-y-auto custom-scrollbar">
              <p><strong className="text-orange-700 dark:text-orange-300">{text.why_choice}</strong><br />
                {text.why_choice_text}</p>

              <p><strong className="text-orange-700 dark:text-orange-300">{text.scalability}</strong><br />
                {text.scalability_text}</p>

              <p><strong className="text-orange-700 dark:text-orange-300">{text.security}</strong><br />
                {text.security_text}</p>
            </div>

            {/* Right Column: Interactive Infra Browser */}
            <div className="bg-[#1e1e1e] rounded-xl border border-zinc-700 overflow-hidden flex shadow-2xl">
              {/* Sidebar: File Tree */}
              <div className="w-[35%] border-r border-zinc-700 bg-[#252526] flex flex-col font-mono text-xs">
                <div className="p-3 text-zinc-400 uppercase tracking-wider text-[10px] font-bold">{text.explorer}</div>
                <div className="flex-1 overflow-y-auto py-2">
                  {renderTree(tree)}
                </div>
              </div>

              {/* Code View */}
              <div className="flex-1 bg-[#1e1e1e] flex flex-col font-mono text-xs min-w-0">
                {/* MacOS Header */}
                <div className="h-9 flex items-center px-4 gap-2 bg-[#2d2d2d] border-b border-black/30">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  <div className="ml-4 text-zinc-400 text-[11px]">{selectedFile}</div>
                </div>
                {/* Code Editor */}
                <div className="flex-1 overflow-x-auto overflow-y-auto p-4 custom-scrollbar">
                  <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre inline-block min-w-full">
                    <code dangerouslySetInnerHTML={{
                      __html: (INFRA_FILES[selectedFile as keyof typeof INFRA_FILES] || "").replace(
                        /("[^"]*")|\b(resource|module|provider|data)\b|\b(variable|output|source)\b|([={}[\]])/g,
                        (match, str, purpleKw, blueKw, operator) => {
                          if (str) return `<span class="text-green-400">${str}</span>`
                          if (purpleKw) return `<span class="text-purple-400">${purpleKw}</span>`
                          if (blueKw) return `<span class="text-blue-400">${blueKw}</span>`
                          if (operator) {
                            if (operator === "=") return `<span class="text-zinc-500">=</span>`
                            return `<span class="text-yellow-400">${operator}</span>`
                          }
                          return match
                        }
                      )
                    }} />
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Post CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-6 bg-gradient-to-br from-violet-50/50 via-purple-50/50 to-fuchsia-50/50 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-fuchsia-900/20 rounded-xl border-2 border-violet-200/50 dark:border-violet-700/50 shadow-lg backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-violet-700 dark:text-violet-300 mb-2">
                {language === "en" ? "Want to know more?" : "En savoir plus ?"}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mb-4">
                {language === "en" 
                  ? "Discover the complete story behind Fissure's infrastructure: from the first catastrophic deployment to the final architecture, including lessons learned and cost optimizations."
                  : "Découvrez l'histoire complète de l'infrastructure de Fissure : du premier déploiement catastrophique à l'architecture finale, en passant par les leçons apprises et les optimisations de coûts."}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-violet-200 dark:bg-violet-800 text-violet-800 dark:text-violet-200">
                  {language === "en" ? "Cloud Architecture" : "Architecture Cloud"}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200">
                  {language === "en" ? "DevOps Journey" : "Parcours DevOps"}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-fuchsia-200 dark:bg-fuchsia-800 text-fuchsia-800 dark:text-fuchsia-200">
                  {language === "en" ? "Lessons Learned" : "Leçons Apprises"}
                </span>
              </div>
            </div>
            <Link
              href="/blog#histoire-fissure"
              className="group relative px-8 py-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 dark:from-violet-500/15 dark:to-purple-500/15 backdrop-blur-xl border-2 border-violet-300/80 dark:border-violet-400/80 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <span>{language === "en" ? "Read the Blog Post" : "Lire l'article"}</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </Link>
          </div>
        </motion.div>

        {/* IaC Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-2">
            {text.iac_title}
          </h3>
          <div className="bg-white/5 dark:bg-zinc-900/50 p-6 rounded-xl border border-purple-200/20 dark:border-purple-900/30 space-y-4 text-black dark:text-gray-300">
            <p>
              {text.iac_text}
            </p>
          </div>
        </div>

        {/* Split View: Video + Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Video Placeholder */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{text.app_demo}</h3>
            <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-900 rounded-xl border border-zinc-300 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-600 gap-2">
              <span className="font-medium text-sm">{text.video_placeholder}</span>
            </div>
          </div>

          {/* Right: Architecture Choices */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{text.architecture_choices}</h3>
            <div className="space-y-4 text-black dark:text-gray-300 text-sm leading-relaxed">
              <div>
                <strong className="text-blue-700 dark:text-blue-300 block mb-1">{text.backend_title}</strong>
                <p>{text.backend_text}</p>
              </div>
              <div>
                <strong className="text-sky-700 dark:text-sky-300 block mb-1">{text.frontend_title}</strong>
                <p>{text.frontend_text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TiltShineCardProps {
  technosImg: string[]
  technos: string[]
  titre: string
  description: string
  descriptionEN: string
  displayedimg: string
  className?: string
  children: React.ReactNode
  delay?: number
  layoutId?: string
  index: number
  iconMap: { [key: string]: IconType }
  gitLink: string
  liveLink: string
}

export function TiltShineCard({
  technosImg,
  technos,
  description,
  descriptionEN,
  titre,
  displayedimg,
  delay,
  className,
  children,
  index,
  iconMap,
  gitLink,
  liveLink,
}: TiltShineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { language } = useLanguage()

  // Add spring physics for smooth movement
  const springConfig = { damping: 15, stiffness: 15 }
  const rotateX = useSpring(useMotionValue(0), springConfig)
  const rotateY = useSpring(useMotionValue(0), springConfig)

  // Calculate diagonal movement for shine effect
  const diagonalMovement = useMotionValue(0)

  // Use this to update diagonal movement when rotation changes
  rotateX.onChange((latest) => {
    diagonalMovement.set(latest + rotateY.get())
  })

  rotateY.onChange((latest) => {
    diagonalMovement.set(rotateX.get() + latest)
  })

  // Shine gradient position
  const sheenPosition = useTransform(diagonalMovement, [-15, 15], [-100, 200])
  const sheenOpacity = useTransform(diagonalMovement, [-15, 15], [0, 0.3])
  const sheenGradient = useMotionTemplate`linear-gradient(
    55deg,
    transparent,
    rgba(255, 255, 255, ${sheenOpacity}) ${sheenPosition}%,
    transparent
  )`

  // Handle mouse move
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 4.5
    const centerY = rect.height / 4.5

    const rotateXValue = ((y - centerY) / centerY) * -8
    const rotateYValue = ((x - centerX) / centerX) * 8

    rotateX.set(rotateXValue)
    rotateY.set(rotateYValue)
    diagonalMovement.set(rotateXValue + rotateYValue)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
    diagonalMovement.set(0)
  }

  const { theme } = useTheme()

  const sentences = (sentence: string) =>
    sentence.split(/[.!?]+/).filter((sentence: string) => sentence.trim())

  const isFissure = titre === "Fissure ( SaaS )"

  return (
    <>
      <motion.div
        key={`card-${index}`}
        initial={{ opacity: 0, scale: isFissure ? 0.95 : 1 }}
        animate={{ opacity: isModalOpen ? 0 : 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isFissure ? 0.5 : 0.3,
          ease: "easeOut",
          delay: delay,
        }}
        className={`group h-full xl:w-full lg:min-h-[30dvh] xl:h-full mx-auto xl:perspective-[1000px] transition-all duration-300 ${isFissure ? "perspective-[1500px]" : ""
          }`}
      >
        <motion.div
          whileHover={{
            scale: isFissure ? 1.02 : 1.05,
            boxShadow: isFissure
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(59, 130, 246, 0.15)"
              : undefined
          }}
          transition={{
            type: "spring",
            stiffness: isFissure ? 200 : 300,
            damping: isFissure ? 25 : 20
          }}
          layoutId={`card-${index}`}
          ref={cardRef}
          className={`relative xl:max-w-auto xl:min-h-full cursor-pointer hover:-z-50 ${isFissure ? "overflow-visible" : "overflow-hidden"
            } rounded-lg border p-5 
            xl:max-h-[35dvh] dark:bg-[#0A0A0A]/10 border-pink-200/50 dark:border-[#1A1A1A]/10 
            dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.1)] 
            z-30 bg-white/10 ${className || ""} ${isFissure ? "border-blue-300/50 dark:border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)]" : ""
            }`}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            rotateX,
            rotateY,
            backgroundImage: sheenGradient,
            pointerEvents: isModalOpen ? "none" : "auto",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsModalOpen(true)}
        >
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 z-30 rounded-lg bg-gradient-to-b ${isFissure
            ? "from-blue-500/10 to-transparent"
            : "from-[#1A1A1A]/20 to-transparent"
            }`} />

          {/* Pink border glow */}
          <div className="absolute inset-0 z-30 rounded-lg border via-pink-300/60 shadow-[0_0_10px_rgba(236,72,153,0.1)]" />

          {/* Light reflection effect */}
          <div className="absolute z-30 inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

          {/* Illuminated edge - custom mouseover effect */}
          <div
            className="absolute inset-0 -z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${theme === "dark"
                ? "rgba(236, 72, 153, 0.1)"
                : "rgba(236, 72, 153, 0.15)"
                } 0%, transparent 60%)`,
            }}
            onMouseMove={(e) => {
              if (!cardRef.current) return
              const rect = cardRef.current.getBoundingClientRect()
              const x = ((e.clientX - rect.left) / rect.width) * 100
              const y = ((e.clientY - rect.top) / rect.height) * 100
              e.currentTarget.style.setProperty("--mouse-x", `${x}%`)
              e.currentTarget.style.setProperty("--mouse-y", `${y}%`)
            }}
          />

          {/* 3D content that moves slightly in opposite direction */}
          <motion.div className="relative z-10 text-gray-800 dark:text-gray-400">
            {children}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-7xl ${titre === "Fissure ( SaaS )" ? "w-[80dvw]" : "w-[90vw] max-w-4xl"
                }`}
            >
              <motion.div
                className={`relative overflow-hidden rounded-lg border p-8 pt-4 bg-gray-400/80 dark:bg-black/80 shadow-xl ${isFissure ? "overflow-y-auto max-h-[85vh]" : ""}`}
                style={{
                  backgroundImage: sheenGradient,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 cursor-pointer right-4 z-50 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <motion.div className="relative z-10 w-full min-h-[50dvh] xl:min-w-[300px]">
                  <h1 className="flex justify-center xl:text-2xl xl:pb-4 font-light tracking-tight text-black dark:text-gray-200">
                    {titre}
                  </h1>

                  {/* Fissure Special Layout */}
                  {isFissure ? (
                    <InfraBrowser
                      displayedimg={displayedimg}
                      titre={titre}
                      language={language}
                    />
                  ) : (
                    // Standard Layout for other cards
                    <div className="pt-2 flex flex-col lg:flex-row gap-8">
                      {/* Left Column - Image and Tech Stack */}
                      <div className="lg:w-1/2 flex flex-col gap-4">
                        <div className="relative ">
                          <Image
                            src={displayedimg}
                            alt={titre}
                            width={800}
                            height={600}
                            className="rounded-lg shadow-lg object-cover w-full opacity-90 "
                          />
                        </div>
                        {/* Tech Stack */}
                        <motion.div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:justify-evenly gap-4 p-4 bg-gray-50 dark:bg-black/80 rounded-lg">
                          {technosImg.map((technoImg, i) => {
                            const Icon = iconMap[technoImg]
                            return Icon ? (
                              <div
                                key={i}
                                className="flex justify-center items-center"
                              >
                                <span className="flex justify-center items-center gap-2">
                                  <Icon className="w-6 h-6" />
                                  <p className="text-md">{technos[i]}</p>
                                </span>
                              </div>
                            ) : null
                          })}
                        </motion.div>
                        {/* Project Links */}
                        <motion.div className="flex gap-6 justify-center items-center xl:min-h-[60px] xl:min-w-[180px]">
                          <motion.a
                            whileHover={{
                              scale: 1.05,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            href={gitLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black/70 border border-solid border-pink-100/90 hover:bg-black xl:max-h-[45px] text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </motion.a>
                          <motion.a
                            whileHover={{
                              scale: 1.05,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            onClick={() => {
                              if (liveLink === "") {
                                toast.error(
                                  `${titre} ${language === "en" ? "is not available yet in live version" : "n'est pas encore disponible en version live"}`
                                )
                              }
                            }}
                            href={liveLink === "" ? undefined : liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-pink-400/70 cursor-pointer  xl:max-h-[45px] hover:bg-pink-400/80  text-white px-6 py-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Live Demo
                          </motion.a>
                        </motion.div>
                      </div>

                      {/* Right Column - Description */}
                      <div className="lg:w-1/2 text-black/90 tracking-tight dark:font-light dark:text-gray-200 space-y-4">
                        <>
                          {/* Regular project description */}
                          {sentences(
                            language === "en" ? descriptionEN : description
                          ).map((sentence, i) => (
                            <motion.p
                              key={i}
                              className="leading-relaxed text-lg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1] }}
                              transition={{
                                duration: 0.5,
                                bounce: 0,
                                delay: i * 0.2,
                              }}
                            >
                              {sentence.trim()}
                            </motion.p>
                          ))}
                        </>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
