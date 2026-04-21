import { useEffect, useRef } from 'react'

export default function LoadingScreen({ visible }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const tRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 0,
      speedY: 0,
      length: 1 + Math.random() * 2,
    }))

    const draw = () => {
      tRef.current += 0.016
      const t = tRef.current
      const warpFactor = Math.min(t / 2, 1) // 0→1 over 2s

      ctx.fillStyle = `rgba(2, 2, 15, ${0.15 + warpFactor * 0.05})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cx = canvas.width / 2
      const cy = canvas.height / 2

      stars.forEach(star => {
        const dx = star.x - cx
        const dy = star.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const speed = (0.5 + warpFactor * 6) * (dist / 200)
        star.x += (dx / dist) * speed
        star.y += (dy / dist) * speed

        const alpha = Math.min(1, warpFactor * 2)
        const len = star.length * (1 + warpFactor * 3)
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(star.x - (dx / dist) * len, star.y - (dy / dist) * len)
        ctx.strokeStyle = `rgba(200, 180, 255, ${alpha * 0.8})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Reset star when out of bounds
        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
          star.x = cx + (Math.random() - 0.5) * 200
          star.y = cy + (Math.random() - 0.5) * 200
        }
      })

      // Center glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 * (1 + warpFactor))
      grad.addColorStop(0, `rgba(168, 85, 247, ${0.3 + warpFactor * 0.2})`)
      grad.addColorStop(0.4, `rgba(255, 110, 180, ${0.1 + warpFactor * 0.15})`)
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 200 * (1 + warpFactor), 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <div
      id="loading-screen"
      className={!visible ? 'fade-out' : ''}
      style={{ pointerEvents: visible ? 'all' : 'none' }}
    >
      <canvas ref={canvasRef} className="warp-canvas" />
      <div className="loading-content">
        <div className="loading-logo">SR</div>
        <div className="loading-subtitle">Entering the Universe</div>
        <div className="loading-bar-wrap">
          <div className="loading-bar" />
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(200,180,255,0.4)', letterSpacing: '2px', marginTop: '8px' }}>
          SHAMITA RATHINARAJ
        </div>
      </div>
    </div>
  )
}
