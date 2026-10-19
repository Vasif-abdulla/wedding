import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
import { useReducedMotion } from './useReducedMotion'

/**
 * Ultra-lightweight Lenis smooth scroll for desktop, native 120Hz scrolling for mobile.
 *
 * Performance optimizations:
 * 1. Mobile touch interception disabled: mobile devices use native OS momentum scrolling,
 *    eliminating touch lag, CPU drain, and stutter.
 * 2. Self-driven requestAnimationFrame loop without GSAP or ScrollTrigger overhead.
 */
export function useLenis(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    // Respect OS reduced-motion or locked preloader
    if (prefersReduced || !enabled) return

    // On touch/mobile devices, let the browser's native GPU-accelerated touch scroll handle everything
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)

    if (isTouchDevice) {
      return
    }

    let lenis: Lenis | null = null
    let rafId: number | null = null
    let cancelled = false

    void (async () => {
      const { default: LenisClass } = await import('lenis')
      if (cancelled) return

      lenis = new LenisClass({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 0, // Disable touch hijacking
        infinite: false,
      })
      lenisRef.current = lenis

      const tick = (time: number) => {
        lenis?.raf(time)
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    })()

    return () => {
      cancelled = true
      if (rafId !== null) cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [prefersReduced, enabled])

  // Lock the page behind the preloader
  useEffect(() => {
    document.body.style.overflow = enabled ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [enabled])

  return lenisRef
}

/** Smooth-scrolls to a section id, falling back to native when Lenis is off. */
export function scrollToSection(id: string, lenis?: Lenis | null) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
