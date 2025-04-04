"use client"

import React, { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import type { GLTF } from "three/addons/loaders/GLTFLoader.js"
import { motion, AnimatePresence } from "framer-motion"

const Cherrytree: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const modelRef = useRef<THREE.Group | null>(null)
  const rotationDirectionRef = useRef(1)
  const isDraggingRef = useRef(false)
  const lastMouseXRef = useRef(0)
  const initialRotationRef = useRef(-0.15)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
      document.body.style.overflowX = "hidden"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.overflowX = "hidden"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.overflowX = "hidden"
    }
  }, [isLoading])

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(1.2, 3, 3)
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

    // Mouse event handlers
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true
      lastMouseXRef.current = event.clientX
      window.dispatchEvent(new CustomEvent("treeShakeStart"))
    }

    const handleMouseUp = () => {
      isDraggingRef.current = false
      window.dispatchEvent(new CustomEvent("treeShakeEnd"))
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingRef.current && modelRef.current) {
        const deltaX = event.clientX - lastMouseXRef.current
        const newRotation = modelRef.current.rotation.y + deltaX * 0.005

        // Calculate the rotation relative to initial position
        const relativeRotation = newRotation - initialRotationRef.current

        // Limit rotation to 10% (approximately 0.628 radians) in either direction
        if (Math.abs(relativeRotation) <= 0.21) {
          modelRef.current.rotation.y = newRotation
        } else {
          // Clamp the rotation to the maximum allowed
          modelRef.current.rotation.y =
            initialRotationRef.current + Math.sign(relativeRotation) * 0.18
        }

        lastMouseXRef.current = event.clientX
      }
    }

    // Add event listeners
    canvasRef.current.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffd7fa, 0.8)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5)
    directionalLight.position.set(5, 50, 5)
    scene.add(directionalLight)

    // Add point lights for petal glow
    const pointLight1 = new THREE.PointLight(0xffe6e6, 1, 10)
    pointLight1.position.set(0, -0.8, -3)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xffe6e6, 1, 10)
    pointLight2.position.set(2, -0.8, -4)
    scene.add(pointLight2)

    // Create glowing circle effect
    const circleGeometry = new THREE.CircleGeometry(4.5, 64)
    const circleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffd7fa) },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = length(vUv - center);
          
          // Create a soft circular gradient
          float glow = smoothstep(0.5, 0.0, dist);
          
          // Add subtle pulsing animation
          float pulse = sin(time * 2.0) * 0.1 + 0.9;
          glow *= pulse;
          
          // Fade to black at edges
          vec3 finalColor = mix(vec3(0.0), color, glow);
          gl_FragColor = vec4(finalColor, glow * 0.5);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const circle = new THREE.Mesh(circleGeometry, circleMaterial)
    circle.rotation.x = -Math.PI / 2
    circle.position.y = -0.4
    circle.position.z = -5.2
    scene.add(circle)

    // Load the model
    const loader = new GLTFLoader()
    loader.load(
      "/cherry tree/scene.gltf",
      (gltf: GLTF) => {
        const model = gltf.scene
        model.scale.set(1.65, 1.65, 1.65)
        model.position.y = -0.4
        model.position.x = 0.2
        model.position.z = -5.2
        model.rotation.y = -0.1
        initialRotationRef.current = -0.15
        scene.add(model)
        if (window.innerWidth < 1000) return setIsLoading(false)
        modelRef.current = model
        setIsLoading(false)
      },
      undefined,
      (error: unknown) => {
        console.error("Error loading model:", error)
        setIsLoading(false)
      }
    )

    // Animation
    function animate() {
      requestAnimationFrame(animate)
      if (modelRef.current && !isDraggingRef.current) {
        const currentRotation = modelRef.current.rotation.y
        const maxRotation = 0.35
        const rotationSpeed = 0.00022

        // Change direction when reaching max rotation
        if (Math.abs(currentRotation) >= maxRotation) {
          rotationDirectionRef.current *= -1
        }

        // Apply rotation in current direction
        modelRef.current.rotation.y +=
          rotationSpeed * rotationDirectionRef.current
      }

      // Update shader time uniform
      if (circleMaterial.uniforms) {
        circleMaterial.uniforms.time.value += 0.01
      }

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

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mousemove", handleMouseMove)
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black z-50"
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-200 text-lg"
              >
                Loading...
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <canvas
        ref={canvasRef}
        className={`hidden xl:block max-w-[100%] min-h-[110dvh] pl-30 absolute top-0 cursor-pointer transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
    </>
  )
}

export default Cherrytree
