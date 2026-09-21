import { useRef } from 'react'
import { gsap } from '../../lib/gsap'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

/**
 * Magnetic button / link: the label drifts slightly toward the cursor,
 * then springs back on leave. Disabled for touch and reduced motion.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.28,
  rel,
  target,
}) {
  const root = useRef(null)
  const inner = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduced || !root.current) return
    const rect = root.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(inner.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  const onLeave = () => {
    if (reduced || !inner.current) return
    gsap.to(inner.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  const shared = {
    ref: root,
    onPointerMove: onMove,
    onPointerLeave: onLeave,
    onClick,
    className: `inline-block ${className}`,
  }

  if (href) {
    return (
      <a href={href} rel={rel} target={target} {...shared}>
        <span ref={inner} className="inline-block will-change-transform">
          {children}
        </span>
      </a>
    )
  }

  return (
    <button type="button" {...shared}>
      <span ref={inner} className="inline-block will-change-transform">
        {children}
      </span>
    </button>
  )
}