"use client"

import React, { useEffect, useRef } from "react"
import * as THREE from "three"

interface Petal {
  mesh: THREE.Mesh
  velocity: THREE.Vector3
  rotation: THREE.Vector3
  rotationSpeed: THREE.Vector3
  life: number
}

const Petals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const petalsRef = useRef<Petal[]>([])
  const lastShakeTimeRef = useRef(0)
  const isShakingRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup (same as tree)
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(3, 3, 2)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 50, 5)
    scene.add(directionalLight)

    // Create a single petal
    function createPetal(): Petal {
      const geometry = new THREE.PlaneGeometry(0.2, 0.2)
      const material = new THREE.MeshStandardMaterial({
        color: 0xffb7c5,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geometry, material)

      // Random starting position above the tree
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        5 + Math.random() * 5,
        (Math.random() - 0.5) * 10
      )

      return {
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          -0.02 - Math.random() * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotation: new THREE.Vector3(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        life: 1,
      }
    }

    // Add new petals
    function addPetals(count: number) {
      for (let i = 0; i < count; i++) {
        const petal = createPetal()
        scene.add(petal.mesh)
        petalsRef.current.push(petal)
      }
    }

    // Update petal physics
    function updatePetals() {
      const currentTime = Date.now()
      const timeSinceLastShake = currentTime - lastShakeTimeRef.current

      // Add more petals when tree is shaking
      if (isShakingRef.current && timeSinceLastShake > 100) {
        addPetals(2)
        lastShakeTimeRef.current = currentTime
      }

      // Update existing petals
      petalsRef.current = petalsRef.current.filter((petal) => {
        // Update position
        petal.mesh.position.add(petal.velocity)

        // Update rotation
        petal.rotation.add(petal.rotationSpeed)
        petal.mesh.rotation.set(
          petal.rotation.x,
          petal.rotation.y,
          petal.rotation.z
        )

        // Update life
        petal.life -= 0.001
        if (petal.mesh.material instanceof THREE.Material) {
          petal.mesh.material.opacity = petal.life
        }

        // Remove if dead or fallen too far
        if (petal.life <= 0 || petal.mesh.position.y < -10) {
          scene.remove(petal.mesh)
          return false
        }

        return true
      })
    }

    // Listen for tree shake events
    function handleTreeShakeStart() {
      isShakingRef.current = true
      addPetals(5)
    }

    function handleTreeShakeEnd() {
      isShakingRef.current = false
    }

    window.addEventListener("treeShakeStart", handleTreeShakeStart)
    window.addEventListener("treeShakeEnd", handleTreeShakeEnd)

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      updatePetals()
      renderer.render(scene, camera)
    }

    // Handle window resize
    function handleResize() {
      if (!cameraRef.current || !rendererRef.current || !canvasRef.current)
        return

      const containerWidth =
        canvasRef.current.parentElement?.clientWidth || window.innerWidth
      const containerHeight =
        canvasRef.current.parentElement?.clientHeight || window.innerHeight

      cameraRef.current.aspect = containerWidth / containerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(containerWidth, containerHeight)
    }

    window.addEventListener("resize", handleResize)
    animate()

    // Initial petals
    addPetals(10)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("treeShakeStart", handleTreeShakeStart)
      window.removeEventListener("treeShakeEnd", handleTreeShakeEnd)
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-[50%] h-full absolute left-0 top-0 pointer-events-none"
    />
  )
}

export default Petals
