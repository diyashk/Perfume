import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/** Fade + vertical drift on scroll into view. */
export function Reveal({
  children,
  className = '',
  y = 40,
  delay = 0,
  duration = 1.2,
  start = 'top 85%',
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      gsap.set(el, { autoAlpha: 1 })
      return undefined
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [reduced, y, delay, duration, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/**
 * Editorial line-by-line heading reveal. Pass `lines` (one string per line);
 * each line rises out of an overflow mask as it enters the viewport.
 */
export function RevealLines({
  as: Tag = 'h2',
  lines = [],
  className = '',
  lineClassName = '',
  stagger = 0.12,
  duration = 1.4,
  start = 'top 88%',
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const inners = el.querySelectorAll('[data-line-inner]')
    if (reduced) {
      gsap.set(inners, { yPercent: 0 })
      return undefined
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(inners, { yPercent: 112 }, {
        yPercent: 0,
        duration,
        ease: 'power4.out',
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      })
    })
    return () => ctx.revert()
  }, [reduced, duration, stagger, start])

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className={`block overflow-hidden ${lineClassName}`}>
          <span data-line-inner className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}