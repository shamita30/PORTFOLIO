import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, Sparkles, MeshDistortMaterial, Preload } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Vector2 } from 'three'

/* ═══════════════════════════════════════════════════════════════════
   CHRISTMAS THEME — 3D SCENE
   Brand Palette: Deep-Ocean Blue / Frost White / Crimson Red / Emerald
   ═══════════════════════════════════════════════════════════════════ */

// Brand colors
const C = {
  deepOcean:    '#0a2e4d',
  frostBlue:    '#58c4e6',
  crimson:      '#dc2626',
  emerald:      '#10b981',
  gold:         '#fbbf24',
  snowWhite:    '#e8f4f8',
  icePurple:    '#818cf8',
  warmOrange:   '#f97316',
}

// ── Loading fallback ─────────────────────────────────────────────
function SceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={C.frostBlue} wireframe />
    </mesh>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CHRISTMAS TREE  (procedural cone + star)
   ═══════════════════════════════════════════════════════════════════ */
function ChristmasTree({ position, scale = 1, isDark }) {
  const groupRef = useRef()
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.1
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Tree trunk */}
        <mesh position={[0, -1.8, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.6, 8]} />
          <meshStandardMaterial color="#5c3a1e" roughness={0.9} />
        </mesh>

        {/* Tree layers (3 cones stacked) */}
        {[
          { y: 0, topR: 0.05, botR: 1.2, h: 1.8, color: '#0d6e3f' },
          { y: 1.0, topR: 0.05, botR: 0.9, h: 1.4, color: '#10b981' },
          { y: 1.8, topR: 0.05, botR: 0.6, h: 1.0, color: '#34d399' },
        ].map(({ y, topR, botR, h, color }, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <coneGeometry args={[botR, h, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              metalness={0.1}
              emissive={color}
              emissiveIntensity={isDark ? 0.08 : 0.02}
            />
          </mesh>
        ))}

        {/* Star on top */}
        <mesh position={[0, 2.85, 0]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color={C.gold}
            emissive={C.gold}
            emissiveIntensity={isDark ? 1.2 : 0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <pointLight position={[0, 2.85, 0]} color={C.gold} intensity={isDark ? 3 : 1} distance={8} />

        {/* Ornament balls */}
        {[
          { pos: [0.4, 0.3, 0.5], color: C.crimson },
          { pos: [-0.3, 0.8, 0.4], color: C.frostBlue },
          { pos: [0.5, 1.2, -0.2], color: C.gold },
          { pos: [-0.4, 1.6, 0.3], color: C.crimson },
          { pos: [0.2, -0.2, 0.6], color: C.emerald },
          { pos: [-0.5, 0.1, -0.3], color: C.warmOrange },
        ].map(({ pos, color }, i) => (
          <mesh key={`orn-${i}`} position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isDark ? 0.6 : 0.2}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   GITHUB STATS CRYSTAL — changes scale/glow based on real stats
   ═══════════════════════════════════════════════════════════════════ */
function GitHubCrystal({ position, ghStats, isDark }) {
  const ref = useRef()
  const glowRef = useRef()

  // Scale based on contributions (clamped to a reasonable range)
  const contribScale = Math.min(2.5, Math.max(0.8, (ghStats.contributions || 100) / 150))
  const starGlow = Math.min(1.5, Math.max(0.2, (ghStats.stars || 1) / 3))

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.4
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.15
      // Pulse effect based on repos
      const pulse = 1 + Math.sin(t * 1.5) * 0.05
      ref.current.scale.setScalar(contribScale * pulse)
    }
    if (glowRef.current) {
      glowRef.current.intensity = (isDark ? 4 : 1.5) * starGlow * (1 + Math.sin(t * 2) * 0.3)
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        {/* Main crystal */}
        <mesh ref={ref} scale={contribScale}>
          <octahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color={C.frostBlue}
            distort={0.15}
            speed={1.5}
            roughness={0.1}
            metalness={0.9}
            emissive={C.frostBlue}
            emissiveIntensity={isDark ? 0.4 * starGlow : 0.15 * starGlow}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner glow */}
        <pointLight
          ref={glowRef}
          color={C.frostBlue}
          intensity={isDark ? 4 * starGlow : 1.5 * starGlow}
          distance={15}
          decay={2}
        />

        {/* Orbit ring — repos count drives ring size */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[contribScale * 1.6, 0.02, 8, 64]} />
          <meshBasicMaterial color={C.gold} transparent opacity={isDark ? 0.5 : 0.2} />
        </mesh>

        {/* Floating repo indicators */}
        {Array.from({ length: Math.min(ghStats.repos || 6, 12) }).map((_, i) => {
          const angle = (i / Math.min(ghStats.repos || 6, 12)) * Math.PI * 2
          const r = contribScale * 1.6
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * r,
                Math.sin(angle * 0.5) * 0.3,
                Math.sin(angle) * r,
              ]}
            >
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color={i % 2 === 0 ? C.emerald : C.gold} />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   SNOWFLAKE (procedural)
   ═══════════════════════════════════════════════════════════════════ */
function Snowfall({ count = 120, isDark }) {
  const meshRef = useRef()
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 60,
        y: Math.random() * 40 + 10,
        z: (Math.random() - 0.5) * 40 - 10,
        speed: 0.3 + Math.random() * 0.8,
        wobble: Math.random() * Math.PI * 2,
        size: 0.03 + Math.random() * 0.06,
      })
    }
    return arr
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const matrix = new THREE.Matrix4()
    particles.forEach((p, i) => {
      let y = p.y - (t * p.speed) % 50
      if (y < -10) y += 50
      const x = p.x + Math.sin(t * 0.5 + p.wobble) * 0.8
      matrix.makeTranslation(x, y, p.z)
      matrix.scale(new THREE.Vector3(p.size, p.size, p.size))
      meshRef.current.setMatrixAt(i, matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color={isDark ? '#ffffff' : '#d1d5db'} transparent opacity={isDark ? 0.7 : 0.4} />
    </instancedMesh>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   GIFT BOX
   ═══════════════════════════════════════════════════════════════════ */
function GiftBox({ position, color, ribbonColor, size = 0.5, isDark }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.3
      ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={ref} position={position}>
        {/* Box */}
        <mesh>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial
            color={color}
            roughness={0.4}
            metalness={0.3}
            emissive={color}
            emissiveIntensity={isDark ? 0.15 : 0.05}
          />
        </mesh>
        {/* Horizontal ribbon */}
        <mesh>
          <boxGeometry args={[size + 0.02, size * 0.12, size + 0.02]} />
          <meshStandardMaterial color={ribbonColor} emissive={ribbonColor} emissiveIntensity={0.2} metalness={0.5} />
        </mesh>
        {/* Vertical ribbon */}
        <mesh>
          <boxGeometry args={[size * 0.12, size + 0.02, size + 0.02]} />
          <meshStandardMaterial color={ribbonColor} emissive={ribbonColor} emissiveIntensity={0.2} metalness={0.5} />
        </mesh>
        {/* Bow on top */}
        <mesh position={[0, size * 0.6, 0]}>
          <sphereGeometry args={[size * 0.15, 8, 8]} />
          <meshStandardMaterial color={ribbonColor} emissive={ribbonColor} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CANDY CANE
   ═══════════════════════════════════════════════════════════════════ */
function CandyCane({ position, rotation = [0, 0, 0], scale = 1, isDark }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + rotation[2]
  })

  return (
    <Float speed={0.6} floatIntensity={0.3}>
      <group ref={ref} position={position} rotation={rotation} scale={scale}>
        {/* Straight part */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.1} />
        </mesh>
        {/* Stripe */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 1.2, 8]} />
          <meshStandardMaterial color={C.crimson} transparent opacity={0.6} roughness={0.3} />
        </mesh>
        {/* Hook */}
        <mesh position={[0.15, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.15, 0.06, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} emissive="#ffffff" emissiveIntensity={isDark ? 0.1 : 0} />
        </mesh>
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CHRISTMAS LIGHT STRING
   ═══════════════════════════════════════════════════════════════════ */
function LightString({ isDark }) {
  const bulbColors = [C.crimson, C.emerald, C.gold, C.frostBlue, C.warmOrange, C.icePurple]
  const groupRef = useRef()

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const r = 10 + Math.sin(i * 0.7) * 3
        const x = Math.cos(angle) * r
        const z = Math.sin(angle) * r
        const y = -3 + Math.sin(i * 0.5) * 1.5
        const color = bulbColors[i % bulbColors.length]
        return (
          <group key={i} position={[x, y, z]}>
            <mesh>
              <sphereGeometry args={[0.12, 8, 8]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={isDark ? 0.8 : 0.3}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
            <pointLight color={color} intensity={isDark ? 0.5 : 0.15} distance={3} decay={2} />
          </group>
        )
      })}
    </group>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   WREATH (torus with berries)
   ═══════════════════════════════════════════════════════════════════ */
function Wreath({ position, isDark }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.05
  })

  return (
    <Float speed={0.5} floatIntensity={0.2}>
      <group ref={ref} position={position}>
        {/* Wreath body */}
        <mesh>
          <torusGeometry args={[1.2, 0.25, 8, 32]} />
          <meshStandardMaterial
            color="#1a5c2a"
            roughness={0.7}
            emissive="#10b981"
            emissiveIntensity={isDark ? 0.1 : 0.03}
          />
        </mesh>
        {/* Berries */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * 1.2, Math.sin(a) * 1.2, 0.25]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial
                color={C.crimson}
                emissive={C.crimson}
                emissiveIntensity={isDark ? 0.5 : 0.15}
              />
            </mesh>
          )
        })}
        {/* Bow at bottom */}
        <mesh position={[0, -1.2, 0.3]}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color={C.crimson} emissive={C.crimson} emissiveIntensity={0.3} metalness={0.6} />
        </mesh>
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   MEDICAL CROSS (for MedFlow AI project)
   ═══════════════════════════════════════════════════════════════════ */
function MedicalCross({ position, isDark }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.5
      ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={ref} position={position} scale={0.6}>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.3, 1.0, 0.15]} />
          <meshStandardMaterial
            color={C.crimson}
            emissive={C.crimson}
            emissiveIntensity={isDark ? 0.4 : 0.15}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[1.0, 0.3, 0.15]} />
          <meshStandardMaterial
            color={C.crimson}
            emissive={C.crimson}
            emissiveIntensity={isDark ? 0.4 : 0.15}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        <pointLight color={C.crimson} intensity={isDark ? 1 : 0.3} distance={5} />
      </group>
    </Float>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   CAMERA RIG (mouse parallax)
   ═══════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════
   MAIN CHRISTMAS SCENE EXPORT
   ═══════════════════════════════════════════════════════════════════ */
export default function SpaceCanvas({ mousePos, loaded, theme, ghStats }) {
  const isDark = theme === 'dark'
  const bgColor = isDark ? '#050d18' : '#e8f4f8'

  const safeStats = ghStats || { repos: 6, stars: 2, contributions: 150, loading: true }

  return (
    <div id="space-canvas" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: bgColor }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<SceneFallback />}>
          {/* Lighting */}
          <ambientLight intensity={isDark ? 0.15 : 0.5} />
          <directionalLight
            position={[10, 15, 5]}
            intensity={isDark ? 0.5 : 0.9}
            color={isDark ? C.frostBlue : '#ffffff'}
          />
          <directionalLight
            position={[-5, -5, 10]}
            intensity={isDark ? 0.15 : 0.3}
            color={C.crimson}
          />

          {/* Snowfall */}
          <Stars
            radius={120}
            depth={60}
            count={3000}
            factor={isDark ? 3 : 0.5}
            saturation={0}
            fade
            speed={0.3}
          />

          {/* Glowing snowflake particles */}
          <Sparkles count={80} scale={25} size={1.5} speed={0.15} color={isDark ? '#ffffff' : C.frostBlue} opacity={isDark ? 0.5 : 0.15} />
          <Sparkles count={50} scale={20} size={1} speed={0.2} color={C.gold} opacity={isDark ? 0.3 : 0.1} />

          {/* ── SNOWFALL ── */}
          <Snowfall count={100} isDark={isDark} />

          {/* ── CHRISTMAS TREE (center-back) ── */}
          <ChristmasTree position={[0, -2, -12]} scale={2.5} isDark={isDark} />

          {/* ── GITHUB CRYSTAL (dynamic from stats) ── */}
          <GitHubCrystal position={[6, 2, -8]} ghStats={safeStats} isDark={isDark} />

          {/* ── GIFT BOXES ── */}
          <GiftBox position={[-5, -3, -10]} color={C.crimson} ribbonColor={C.gold} size={0.8} isDark={isDark} />
          <GiftBox position={[4, -4, -14]} color={C.emerald} ribbonColor={C.crimson} size={0.6} isDark={isDark} />
          <GiftBox position={[-3, -5, -8]} color={C.frostBlue} ribbonColor="#ffffff" size={0.5} isDark={isDark} />

          {/* ── CANDY CANES ── */}
          <CandyCane position={[-8, 1, -12]} rotation={[0, 0.5, 0.3]} scale={1.5} isDark={isDark} />
          <CandyCane position={[9, -1, -15]} rotation={[0, -0.3, -0.2]} scale={1.2} isDark={isDark} />

          {/* ── WREATH ── */}
          <Wreath position={[-6, 4, -18]} isDark={isDark} />

          {/* ── MEDICAL CROSS (MedFlow AI) ── */}
          <MedicalCross position={[10, 5, -20]} isDark={isDark} />

          {/* ── CHRISTMAS LIGHTS ── */}
          <LightString isDark={isDark} />

          {/* Camera rig */}
          <CameraRig mousePos={mousePos} />

          {/* Post-processing */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={isDark ? 0.25 : 0.85}
              luminanceSmoothing={isDark ? 0.9 : 0.4}
              intensity={isDark ? 1.5 : 0.3}
              mipmapBlur
            />
            {isDark && <Vignette eskil={false} offset={0.3} darkness={0.6} />}
            <ChromaticAberration
              offset={new Vector2(0.0006, 0.0006)}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>

          {/* Preload all geometries */}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
