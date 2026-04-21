import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * SmoothScroll — Wraps Lenis for fluid, inertial scrolling.
 * Overscroll-bounce is disabled via CSS on html/body.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,           // Scroll animation duration (seconds)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out — "heavy" inertia
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,      // Disabled for native mobile feel
      touchMultiplier: 1.5,
      wheelMultiplier: 0.9,
      infinite: false,
      syncTouch: false,
      prevent: (node) => node.classList.contains('lenis-prevent'), // Opt-out class
    })

    lenisRef.current = lenis

    // Sync with React Three Fiber's RAF loop if present
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Expose lenis globally for nav smooth-scroll
    window.__lenis = lenis

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return <>{children}</>
}
