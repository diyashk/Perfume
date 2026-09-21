import { useEffect, useRef } from 'react'
import { gsap, scrollToId } from '../../lib/gsap'
import PerfumeScene from '../three/PerfumeScene'
import MagneticButton from '../ui/MagneticButton'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'

export default function ProductDetail({ product, onClose }) {
  const overlay = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!product) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlay.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.6, ease: 'power2.out' },
      )
      if (!reduced) {
        gsap.fromTo(
          '[data-detail-in]',
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.1 },
        )
      } else {
        gsap.set('[data-detail-in]', { autoAlpha: 1 })
      }
    }, overlay)

    return () => {
      ctx.revert()
      document.body.style.overflow = prev
      window.removeEventListener('keydown', esc)
    }
  }, [product, onClose, reduced])

  if (!product) return null

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[70] overflow-y-auto bg-ivory"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} — ${product.family}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 bg-ivory/60 backdrop-blur transition-colors duration-300 hover:border-ink/40"
        aria-label="Close"
      >
        <span className="absolute h-px w-5 rotate-45 bg-ink" />
        <span className="absolute h-px w-5 -rotate-45 bg-ink" />
      </button>

      <span className="fixed left-6 top-6 label text-mute">N° {product.number}</span>

      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-24 md:px-12 lg:grid-cols-2">
        <div className="relative h-[45vh] lg:h-[70vh]">
          <PerfumeScene
            labelTitle={product.name}
            labelSub={product.family}
            liquid={product.liquid}
            accent={product.accent}
          />
          <span
            className="label pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-mute"
          >
            Drag to explore
          </span>
        </div>

        <div>
          <p data-detail-in className="overline">
            {product.family}
          </p>
          <h2 data-detail-in className="clamp-product mt-4 font-serif font-medium text-ink">
            {product.name}
          </h2>
          <p data-detail-in className="mt-4 font-serif text-2xl italic text-champagne">
            {product.tagline}
          </p>

          <p data-detail-in className="mt-8 max-w-md text-[0.95rem] font-light leading-relaxed text-mute">
            {product.description}
          </p>

          <div data-detail-in className="mt-9">
            <p className="label mb-4 text-champagne">Notes</p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {product.notes.map((n) => (
                <li key={n} className="font-serif text-xl font-light text-ink">
                  {n}
                </li>
              ))}
            </ul>
          </div>

          <div data-detail-in className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
            <span className="label text-mute">{product.size}</span>
            <span className="font-serif text-2xl text-ink">{product.price}</span>
          </div>

          <div data-detail-in className="mt-12 flex flex-wrap items-center gap-6">
            <MagneticButton
              onClick={() => {
                onClose()
                scrollToId('contact')
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 text-ivory"
            >
              <span className="label text-ivory">Discover fragrance</span>
              <span className="inline-block h-px w-6 bg-champagne transition-all duration-500 group-hover:w-9" />
            </MagneticButton>
            <button
              type="button"
              onClick={onClose}
              className="link-underline label text-mute hover:text-ink"
            >
              Back to collection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}