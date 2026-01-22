"use client"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { FaFolder, FaFolderOpen } from "react-icons/fa"
import { SiTerraform } from "react-icons/si"
import { useLanguage } from "../../contexts/LanguageContext"
import { translations } from "../../translations"
import Image from "next/image"

interface JourneySection {
    title: string
    content: string
    diagram?: {
        type: string
        description: string | { fr: string; en: string }
        imagePath?: string
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

// Clean Architecture Files Content
const ARCHITECTURE_FILES = {
  "src/domain/entities/user.entity.ts": `export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(email: string, name: string): User {
    return new User(
      crypto.randomUUID(),
      email,
      name,
      new Date(),
      new Date()
    )
  }
}`,
  "src/domain/entities/workout.entity.ts": `export interface Exercise {
  name: string
  sets: number
  reps: number
  weight?: number
}

export class Workout {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly exercises: Exercise[],
    public readonly date: Date
  ) {}

  static create(userId: string, name: string, exercises: Exercise[]): Workout {
    return new Workout(
      crypto.randomUUID(),
      userId,
      name,
      exercises,
      new Date()
    )
  }
}`,
  "src/domain/repositories/user.repository.interface.ts": `import { User } from '../entities/user.entity'

export interface IUserRepository {
  save(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}`,
  "src/domain/repositories/workout.repository.interface.ts": `import { Workout } from '../entities/workout.entity'

export interface IWorkoutRepository {
  save(workout: Workout): Promise<Workout>
  findByUserId(userId: string): Promise<Workout[]>
}`,
  "src/application/use-cases/create-user.use-case.ts": `import { User } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository.interface'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string, name: string): Promise<User> {
    // Business logic validation
    if (!email || !name) {
      throw new Error('Email and name are required')
    }

    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const user = User.create(email, name)
    return await this.userRepository.save(user)
  }
}`,
  "src/application/use-cases/get-user.use-case.ts": `import { User } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository.interface'

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return await this.userRepository.findById(id)
  }
}`,
  "src/application/use-cases/create-workout.use-case.ts": `import { Workout, Exercise } from '../../domain/entities/workout.entity'
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface'
import { IUserRepository } from '../../domain/repositories/user.repository.interface'

export class CreateWorkoutUseCase {
  constructor(
    private workoutRepository: IWorkoutRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string, name: string, exercises: Exercise[]): Promise<Workout> {
    // Business logic: verify user exists
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const workout = Workout.create(userId, name, exercises)
    return await this.workoutRepository.save(workout)
  }
}`,
  "src/infrastructure/database/drizzle.config.ts": `import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })

export async function connectDatabase() {
  await pool.connect()
  console.log('Database connected')
}

export async function disconnectDatabase() {
  await pool.end()
  console.log('Database disconnected')
}`,
  "src/infrastructure/database/schema.ts": `import { pgTable, uuid, varchar, timestamp, jsonb } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  exercises: jsonb('exercises').notNull(),
  date: timestamp('date').defaultNow().notNull(),
})`,
  "src/infrastructure/repositories/user.repository.ts": `import { User } from '../../domain/entities/user.entity'
import { IUserRepository } from '../../domain/repositories/user.repository.interface'
import { db } from '../database/drizzle.config'
import { users } from '../database/schema'
import { eq } from 'drizzle-orm'

export class UserRepository implements IUserRepository {
  async save(user: User): Promise<User> {
    const [saved] = await db.insert(users).values({
      id: user.id,
      email: user.email,
      name: user.name,
    }).returning()
    
    return new User(
      saved.id,
      saved.email,
      saved.name,
      saved.createdAt,
      saved.updatedAt
    )
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)
    
    if (!user) return null
    
    return new User(
      user.id,
      user.email,
      user.name,
      user.createdAt,
      user.updatedAt
    )
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    
    if (!user) return null
    
    return new User(
      user.id,
      user.email,
      user.name,
      user.createdAt,
      user.updatedAt
    )
  }
}`,
  "src/infrastructure/repositories/workout.repository.ts": `import { Workout } from '../../domain/entities/workout.entity'
import { IWorkoutRepository } from '../../domain/repositories/workout.repository.interface'
import { db } from '../database/drizzle.config'
import { workouts } from '../database/schema'
import { eq } from 'drizzle-orm'

export class WorkoutRepository implements IWorkoutRepository {
  async save(workout: Workout): Promise<Workout> {
    const [saved] = await db.insert(workouts).values({
      id: workout.id,
      userId: workout.userId,
      name: workout.name,
      exercises: workout.exercises,
      date: workout.date,
    }).returning()
    
    return new Workout(
      saved.id,
      saved.userId,
      saved.name,
      saved.exercises as any,
      saved.date
    )
  }

  async findByUserId(userId: string): Promise<Workout[]> {
    const results = await db.select()
      .from(workouts)
      .where(eq(workouts.userId, userId))
    
    return results.map(w => new Workout(
      w.id,
      w.userId,
      w.name,
      w.exercises as any,
      w.date
    ))
  }
}`,
  "src/infrastructure/http/express.config.ts": `import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

export function createExpressApp() {
  const app = express()
  
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  
  return app
}`,
  "src/presentation/controllers/user.controller.ts": `import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case'
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case'

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const { email, name } = req.body
      const user = await this.createUserUseCase.execute(email, name)
      res.status(201).json(user)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await this.getUserUseCase.execute(id)
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }
      
      res.json(user)
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }
}`,
  "src/presentation/routes/user.routes.ts": `import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

export function createUserRoutes(userController: UserController) {
  const router = Router()
  
  router.post('/', userController.create.bind(userController))
  router.get('/:id', userController.getById.bind(userController))
  
  return router
}`,
  "src/main.ts": `import { createExpressApp } from './infrastructure/http/express.config'
import { connectDatabase, disconnectDatabase } from './infrastructure/database/drizzle.config'
import { UserRepository } from './infrastructure/repositories/user.repository'
import { WorkoutRepository } from './infrastructure/repositories/workout.repository'
import { CreateUserUseCase } from './application/use-cases/create-user.use-case'
import { GetUserUseCase } from './application/use-cases/get-user.use-case'
import { CreateWorkoutUseCase } from './application/use-cases/create-workout.use-case'
import { UserController } from './presentation/controllers/user.controller'
import { createUserRoutes } from './presentation/routes/user.routes'

async function bootstrap() {
  const app = createExpressApp()
  
  // Connect to database
  await connectDatabase()
  
  // Infrastructure layer: Repositories (implementations)
  const userRepository = new UserRepository()
  const workoutRepository = new WorkoutRepository()
  
  // Application layer: Use Cases
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const getUserUseCase = new GetUserUseCase(userRepository)
  const createWorkoutUseCase = new CreateWorkoutUseCase(workoutRepository, userRepository)
  
  // Presentation layer: Controllers
  const userController = new UserController(createUserUseCase, getUserUseCase)
  
  // Routes
  app.use('/api/users', createUserRoutes(userController))
  
  // Graceful shutdown
  process.on('SIGINT', async () => {
    await disconnectDatabase()
    process.exit(0)
  })
  
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
  })
}

bootstrap()
`
}

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
  "modules/database/main.tf": `resource "aws_db_instance" "rds" {
  engine         = "postgres"
  engine_version = "16"
  instance_class = "db.t3.micro"
  allocated_storage = 20
}`,
  "modules/database/variables.tf": `variable "db_password" {}`,
  "modules/storage/main.tf": `resource "aws_ecr_repository" "ecr" {
  name = "fissure-backend"
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}`
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
    const { language } = useLanguage()
    const cardRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeSection, setActiveSection] = useState(0)
    const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set([0]))
    const [selectedFile, setSelectedFile] = useState("main.tf")
    const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
        "modules": true,
        "src": true,
        "src/domain": true,
        "src/domain/entities": true,
        "src/domain/repositories": true,
        "src/application": true,
        "src/application/use-cases": true,
        "src/infrastructure": true,
        "src/infrastructure/database": true,
        "src/infrastructure/repositories": true,
        "src/presentation": true,
        "src/presentation/controllers": true,
    })

    // Reset selected file when active section changes and has a diagram
    useEffect(() => {
        if (isModalOpen && sections[activeSection]?.diagram) {
            const diagram = sections[activeSection].diagram!
            if (diagram.type === "architecture") {
                setSelectedFile("src/main.ts")
            } else if (diagram.type === "terraform" || diagram.type === "iac") {
                setSelectedFile("main.tf")
            }
        }
    }, [activeSection, isModalOpen, sections])

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


    interface TreeItem {
        name: string
        path: string
        type: "folder" | "file"
        children?: TreeItem[]
    }

    // Terraform Tree Structure Definition
    const terraformTree: TreeItem[] = [
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

    // Clean Architecture Tree Structure Definition
    const architectureTree: TreeItem[] = [
        {
            name: "src",
            path: "src",
            type: "folder",
            children: [
                {
                    name: "domain",
                    path: "src/domain",
                    type: "folder",
                    children: [
                        {
                            name: "entities",
                            path: "src/domain/entities",
                            type: "folder",
                            children: [
                                { name: "user.entity.ts", path: "src/domain/entities/user.entity.ts", type: "file" },
                                { name: "workout.entity.ts", path: "src/domain/entities/workout.entity.ts", type: "file" },
                            ]
                        },
                        {
                            name: "repositories",
                            path: "src/domain/repositories",
                            type: "folder",
                            children: [
                                { name: "user.repository.interface.ts", path: "src/domain/repositories/user.repository.interface.ts", type: "file" },
                                { name: "workout.repository.interface.ts", path: "src/domain/repositories/workout.repository.interface.ts", type: "file" },
                            ]
                        }
                    ]
                },
                {
                    name: "application",
                    path: "src/application",
                    type: "folder",
                    children: [
                        {
                            name: "use-cases",
                            path: "src/application/use-cases",
                            type: "folder",
                            children: [
                                { name: "create-user.use-case.ts", path: "src/application/use-cases/create-user.use-case.ts", type: "file" },
                                { name: "get-user.use-case.ts", path: "src/application/use-cases/get-user.use-case.ts", type: "file" },
                                { name: "create-workout.use-case.ts", path: "src/application/use-cases/create-workout.use-case.ts", type: "file" },
                            ]
                        }
                    ]
                },
                {
                    name: "infrastructure",
                    path: "src/infrastructure",
                    type: "folder",
                    children: [
                        {
                            name: "database",
                            path: "src/infrastructure/database",
                            type: "folder",
                            children: [
                                { name: "drizzle.config.ts", path: "src/infrastructure/database/drizzle.config.ts", type: "file" },
                                { name: "schema.ts", path: "src/infrastructure/database/schema.ts", type: "file" },
                            ]
                        },
                        {
                            name: "repositories",
                            path: "src/infrastructure/repositories",
                            type: "folder",
                            children: [
                                { name: "user.repository.ts", path: "src/infrastructure/repositories/user.repository.ts", type: "file" },
                                { name: "workout.repository.ts", path: "src/infrastructure/repositories/workout.repository.ts", type: "file" },
                            ]
                        },
                        {
                            name: "http",
                            path: "src/infrastructure/http",
                            type: "folder",
                            children: [
                                { name: "express.config.ts", path: "src/infrastructure/http/express.config.ts", type: "file" },
                            ]
                        }
                    ]
                },
                {
                    name: "presentation",
                    path: "src/presentation",
                    type: "folder",
                    children: [
                        {
                            name: "controllers",
                            path: "src/presentation/controllers",
                            type: "folder",
                            children: [
                                { name: "user.controller.ts", path: "src/presentation/controllers/user.controller.ts", type: "file" },
                            ]
                        },
                        {
                            name: "routes",
                            path: "src/presentation/routes",
                            type: "folder",
                            children: [
                                { name: "user.routes.ts", path: "src/presentation/routes/user.routes.ts", type: "file" },
                            ]
                        }
                    ]
                },
                { name: "main.ts", path: "src/main.ts", type: "file" },
            ]
        }
    ]

    const toggleFolder = (path: string) => {
        setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }))
    }

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
                        {item.path.endsWith('.ts') || item.path.endsWith('.tsx') || item.path.endsWith('.js') ? (
                            <span className="text-blue-400 opacity-80 text-xs">📄</span>
                        ) : item.path.endsWith('.tf') ? (
                            <SiTerraform className="text-purple-400 opacity-80" />
                        ) : (
                            <span className="text-blue-400 opacity-80 text-xs">📄</span>
                        )}
                        <span>{item.name}</span>
                    </div>
                )
            }
        })
    }

    const text = translations[language as keyof typeof translations].fissure_card

    // Code syntax highlighting for TypeScript/JavaScript
    const highlightCode = (code: string, language: 'terraform' | 'typescript' = 'typescript') => {
        if (language === 'terraform') {
            return code.replace(
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
        } else {
            // TypeScript/JavaScript highlighting
            return code.replace(
                /(import|export|from|class|interface|type|const|let|var|function|async|await|return|if|else|try|catch|finally|for|while|switch|case|default|break|continue|new|this|super|extends|implements|public|private|protected|static|readonly|abstract|enum|namespace|module|declare|as|typeof|keyof|infer|extends|in|of|instanceof|void|null|undefined|true|false)\b|("[^"]*"|'[^']*'|`[^`]*`)|(\d+\.?\d*)|(\/\/.*|\/\*[\s\S]*?\*\/)|([{}()[\].,;:])/g,
                (match, keyword, string, number, comment, punctuation) => {
                    if (keyword) return `<span class="text-purple-400">${match}</span>`
                    if (string) return `<span class="text-green-400">${match}</span>`
                    if (number) return `<span class="text-orange-400">${match}</span>`
                    if (comment) return `<span class="text-zinc-500 italic">${match}</span>`
                    if (punctuation) return `<span class="text-zinc-400">${match}</span>`
                    return match
                }
            )
        }
    }

    // Diagram component - supports Terraform browser, Architecture browser, and image
    const renderDiagram = (diagram: { type: string; description: string | { fr: string; en: string }; imagePath?: string }) => {
        const description = typeof diagram.description === 'string' 
            ? diagram.description 
            : (diagram.description[language as 'fr' | 'en'] || diagram.description.fr || diagram.description.en)
        
        // If it's an image type, render the image
        if (diagram.type === "image" && diagram.imagePath) {
            return (
                <div className="my-4 md:my-6">
                    <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10 hidden md:block">
                            <h3 className="text-lg font-bold text-white tracking-wide">
                                {description}
                            </h3>
                        </div>
                        <Image
                            src={diagram.imagePath}
                            alt={description}
                            width={800}
                            height={600}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                </div>
            )
        }

        // Determine which tree and files to use based on diagram type
        const isArchitecture = diagram.type === "architecture"
        const currentTree = isArchitecture ? architectureTree : terraformTree
        const currentFiles = isArchitecture ? ARCHITECTURE_FILES : INFRA_FILES
        const fileLanguage: 'terraform' | 'typescript' = isArchitecture ? 'typescript' : 'terraform'
        
        // Set default selected file based on type if not already set
        const defaultFile = isArchitecture ? "src/main.ts" : "main.tf"
        const actualSelectedFile = selectedFile || defaultFile

        // If it's terraform or architecture type, render the code browser
        if (diagram.type === "terraform" || diagram.type === "iac" || diagram.type === "architecture") {
            // Architecture diagrams are smaller and fixed height
            const isArchitectureDiagram = diagram.type === "architecture"
            const containerHeight = isArchitectureDiagram ? "h-[320px] sm:h-[450px]" : "max-h-[420px] sm:max-h-[600px]"
            const sidebarHeight = isArchitectureDiagram ? "h-[320px] sm:h-[450px]" : "max-h-[420px] sm:max-h-[600px]"
            const codeViewHeight = isArchitectureDiagram ? "h-[320px] sm:h-[450px]" : "max-h-[420px] sm:max-h-[600px]"
            
            return (
                <div className="my-4 md:my-6">
                    <div className={`bg-[#1e1e1e] rounded-xl border border-zinc-700 overflow-hidden flex shadow-2xl ${containerHeight} flex-col md:flex-row`}>
                        {/* Sidebar: File Tree */}
                        <div className={`w-full md:w-[35%] border-r border-zinc-700 bg-[#252526] flex flex-col font-mono text-xs ${sidebarHeight}`}>
                            <div className="p-3 text-zinc-400 uppercase tracking-wider text-[10px] font-bold flex-shrink-0">{text.explorer}</div>
                            <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                                {renderTree(currentTree)}
                            </div>
                        </div>

                        {/* Code View */}
                        <div className={`flex-1 bg-[#1e1e1e] flex flex-col font-mono text-xs min-w-0 ${codeViewHeight}`}>
                            {/* MacOS Header */}
                            <div className="h-9 flex items-center px-4 gap-2 bg-[#2d2d2d] border-b border-black/30 flex-shrink-0">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                <div className="ml-4 text-zinc-400 text-[11px]">{actualSelectedFile}</div>
                            </div>
                            {/* Code Editor */}
                            <div className="flex-1 overflow-x-auto overflow-y-auto p-4 custom-scrollbar">
                                <pre className="text-zinc-300 leading-relaxed font-mono whitespace-pre inline-block min-w-full">
                                    <code dangerouslySetInnerHTML={{
                                        __html: highlightCode(
                                            (currentFiles[actualSelectedFile as keyof typeof currentFiles] || ""),
                                            fileLanguage
                                        )
                                    }} />
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        // Default placeholder for other types
        const defaultDescription = typeof diagram.description === 'string' 
            ? diagram.description 
            : (diagram.description[language as 'fr' | 'en'] || diagram.description.fr || diagram.description.en)
        
        return (
            <div className="my-4 md:my-6 p-4 md:p-6 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-slate-900 dark:to-slate-800 rounded-xl border border-violet-200 dark:border-slate-700">
                <div className="text-center mb-2 md:mb-3">
                    <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-1 md:mb-2">
                        {defaultDescription}
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
                                className="w-full max-w-6xl max-h-[100svh] overflow-y-auto md:max-h-[90vh] md:overflow-hidden bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-slate-800/50 rounded-2xl shadow-2xl pointer-events-auto flex flex-col relative"
                            >
                                {/* Header */}
                                <div className="relative p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800/50 flex-shrink-0">
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
                                <div className="flex-1 overflow-visible flex flex-col md:flex-row md:overflow-hidden">
                                    {/* Sidebar Navigation */}
                                    <div className="hidden md:block w-64 border-r border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 overflow-y-auto flex-shrink-0">
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
                                        className="flex-1 overflow-visible md:overflow-y-auto custom-scrollbar relative md:[scroll-snap-type:y_proximity]"
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
                                                        className="flex flex-col justify-center px-5 sm:px-8 py-8 md:py-12 md:[scroll-snap-align:start]"
                                                    >
                                                        {isVisible ? (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 30 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.4, delay: 0.1 }}
                                                                className="max-w-3xl mx-auto w-full"
                                                            >
                                                                <h3 className="text-3xl font-bold text-violet-600 dark:text-violet-400 mb-4 md:mb-6">
                                                                    {section.title}
                                                                </h3>

                                                                <div
                                                                    className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:mt-4 prose-headings:mb-3 prose-p:my-3 prose-ul:my-3 prose-ol:my-3 prose-li:my-1.5"
                                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                                />

                                                                {section.diagram && (
                                                                    <div className="mt-6 md:mt-8">
                                                                        {section.diagram.type === "image" ? (
                                                                            renderDiagram(section.diagram)
                                                                        ) : (
                                                                            <div className="hidden md:block">
                                                                                {renderDiagram(section.diagram)}
                                                                            </div>
                                                                        )}
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
