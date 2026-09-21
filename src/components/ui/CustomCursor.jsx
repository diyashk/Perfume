import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'

const HOVER_TARGETS = 'a, button, [data-hover]'

/**
 * Subtle luxury cursor: a small dot that trails the pointer, a soft ring
 * that expands over interactive elements, and a tiny "VIEW"/"READ" word
 * over collection / journal items (data-cursor="view" / "read").
 */
export default function CustomCursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  )
  const dot = useRef(null)
  const ring = useRef(null)
  const word = useRef(null)
  const raw = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const state = useRef({ hover: false, mode: null })

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (e) => {
      raw.current.x = e.clientX
      raw.current.y = e.clientY
    }

    const onOver = (e) => {
      const el = e.target
      if (!el || !el.closest) return
      if (el.closest(HOVER_TARGETS)) {
        const mode = el.closest('[data-cursor]')?.getAttribute('data-cursor') || null
        state.current = { hover: true, mode }
        dot.current.classList.add('cursor-dot-hover')
        ring.current.classList.add('cursor-ring-hover')
        if (mode) word.current.textContent = mode === 'read' ? 'READ' : 'VIEW'
      }
    }

    const onOut = (e) => {
      const el = e.target
      if (!el || !el.closest) return
      if (el.closest(HOVER_TARGETS)) {
        state.current = { hover: false, mode: null }
        dot.current.classList.remove('cursor-dot-hover')
        ring.current.classList.remove('cursor-ring-hover')
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, true)
    document.addEventListener('pointerout', onOut, true)

    gsap.set([dot.current, ring.current, word.current], { x: -100, y: -100 })

    const tick = () => {
      const dotD = 0.3
      dotPos.current.x += (raw.current.x - dotPos.current.x) * dotD
      dotPos.current.y += (raw.current.y - dotPos.current.y) * dotD
      gsap.set(dot.current, { x: dotPos.current.x, y: dotPos.current.y })

      const ringD = state.current.hover ? 0.14 : 0.09
      ringPos.current.x += (raw.current.x - ringPos.current.x) * ringD
      ringPos.current.y += (raw.current.y - ringPos.current.y) * ringD
      gsap.set(ring.current, { x: ringPos.current.x, y: ringPos.current.y })

      if (state.current.hover && state.current.mode) {
        gsap.set(word.current, {
          x: ringPos.current.x,
          y: ringPos.current.y,
          opacity: 1,
          scale: 1,
        })
      } else {
        gsap.set(word.current, { opacity: 0, scale: 0.4 })
      }
      raf = requestAnimationFrame(tick)
    }
    let raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver, true)
      document.removeEventListener('pointerout', onOut, true)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div ref={dot} className="noire-cursor-dot" aria-hidden="true" />
      <div ref={ring} className="noire-cursor-ring" aria-hidden="true" />
      <div ref={word} className="noire-cursor-word" aria-hidden="true" />
    </>
  )
}