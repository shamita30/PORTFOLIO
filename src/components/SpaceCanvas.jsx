import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, Sparkles, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Vector2 } from 'three'

// Animated nebula plane (glsl shader approach using THREE)
function NebulaCloud({ position, color, scale }) {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.04
      meshRef.current.material.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 0.3) * 0.04
    }
  })
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
    </mesh>
  )
}

// Orbiting planet
function Planet({ position, color, size, speed, ringColor, hasRing }) {
  const ref = useRef()
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={position}>
        <mesh ref={ref}>
          <sphereGeometry args={[size, 32, 32]} />
          <MeshDistortMaterial
            color={color}
            distort={0.2}
            speed={2}
            roughness={0.3}
            metalness={0.1}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>
        {hasRing && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[size * 1.8, size * 0.12, 2, 64]} />
            <meshBasicMaterial color={ringColor || color} transparent opacity={0.5} />
          </mesh>
        )}
        {/* Glow */}
        <pointLight color={color} intensity={1.5} distance={size * 12} decay={2} />
      </group>
    </Float>
  )
}

// Shooting star
function ShootingStar() {
  const ref = useRef()
  const speed = useRef(Math.random() * 2 + 1)
  const startX = useRef((Math.random() - 0.5) * 60)
  const startY = useRef((Math.random() - 0.5) * 30)

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = (clock.getElapsedTime() * speed.current) % 10
      ref.current.position.x = startX.current - t * 4
      ref.current.position.y = startY.current - t * 2
      ref.current.material.opacity = Math.max(0, 1 - t / 10)
    }
  })

  return (
    <mesh ref={ref} position={[startX.current, startY.current, -20]}>
      <boxGeometry args={[0.8, 0.04, 0.04]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  )
}

// Mouse-reactive camera rig
function CameraRig({ mousePos }) {
  const { camera } = useThree()

  useFrame(() => {
    const tx = (mousePos.x / window.innerWidth - 0.5) * 1.2
    const ty = -(mousePos.y / window.innerHeight - 0.5) * 0.8
    camera.position.x += (tx - camera.position.x) * 0.04
    camera.position.y += (ty - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Sun (center glowing sphere)
function Sun() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })
  return (
    <group position={[0, 0, -20]}>
      <mesh ref={ref}>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshDistortMaterial
          color="#ff6eb4"
          distort={0.3}
          speed={3}
          emissive="#ff6eb4"
          emissiveIntensity={0.8}
        />
      </mesh>
      <pointLight color="#ff6eb4" intensity={8} distance={80} decay={1.5} />
      <pointLight color="#a855f7" intensity={4} distance={60} decay={2} position={[2, 2, 2]} />
    </group>
  )
}

// Asteroid belt
function AsteroidBelt() {
  const asteroids = useRef([])
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: 80 }).map((_, i) => {
        const angle = (i / 80) * Math.PI * 2
        const r = 14 + (Math.random() - 0.5) * 3
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        const y = (Math.random() - 0.5) * 2
        const s = 0.04 + Math.random() * 0.12
        return (
          <mesh key={i} position={[x, y, z]} rotation={[Math.random(), Math.random(), Math.random()]} scale={s}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={i % 3 === 0 ? '#a855f7' : i % 3 === 1 ? '#06b6d4' : '#ff6eb4'} roughness={0.8} metalness={0.2} emissive={i % 2 === 0 ? '#a855f7' : '#06b6d4'} emissiveIntensity={0.1} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function SpaceCanvas({ mousePos, loaded }) {
  return (
    <div id="space-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#02020f' }}
      >
        {/* Ambient */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} color="#a855f7" />

        {/* Stars */}
        <Stars
          radius={120}
          depth={60}
          count={8000}
          factor={4}
          saturation={0.5}
          fade
          speed={0.4}
        />

        {/* Sparkle particles */}
        <Sparkles count={200} scale={30} size={1.5} speed={0.2} color="#a855f7" opacity={0.6} />
        <Sparkles count={100} scale={20} size={1} speed={0.3} color="#06b6d4" opacity={0.5} />
        <Sparkles count={80} scale={25} size={0.8} speed={0.1} color="#ff6eb4" opacity={0.4} />

        {/* Sun */}
        <Sun />

        {/* Planets */}
        <Planet position={[-12, 3, -15]} color="#a855f7" size={1.5} speed={0.3} hasRing ringColor="#c084fc" />
        <Planet position={[14, -2, -18]} color="#06b6d4" size={1.2} speed={0.2} hasRing={false} />
        <Planet position={[-8, -5, -22]} color="#f97316" size={0.8} speed={0.5} hasRing={false} />
        <Planet position={[10, 6, -25]} color="#ff6eb4" size={1.8} speed={0.15} hasRing ringColor="#fda4af" />
        <Planet position={[0, -8, -30]} color="#3b82f6" size={2.2} speed={0.1} hasRing ringColor="#60a5fa" />

        {/* Asteroid belt */}
        <AsteroidBelt />

        {/* Shooting stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <ShootingStar key={i} />
        ))}

        {/* Nebula clouds */}
        <NebulaCloud position={[-15, 8, -35]} color="#a855f7" scale={[20, 12, 1]} />
        <NebulaCloud position={[18, -5, -40]} color="#06b6d4" scale={[16, 10, 1]} />
        <NebulaCloud position={[0, 10, -45]} color="#ff6eb4" scale={[25, 15, 1]} />

        {/* Mouse camera rig */}
        <CameraRig mousePos={mousePos} />

        {/* Post processing */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.3}
            luminanceSmoothing={0.8}
            intensity={1.2}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
          <ChromaticAberration offset={new Vector2(0.0008, 0.0008)} radialModulation={false} modulationOffset={0} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
