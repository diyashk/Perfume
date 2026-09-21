import { useLayoutEffect, useRef } from 'react'
import { gsap, scrollToId } from '../../lib/gsap'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import PerfumeScene from '../three/PerfumeScene'
import MagneticButton from '../ui/MagneticButton'

const LINES = ['SCENT', 'BEYOND', 'ORDINARY.']

function HeroLine({ index, className = '' }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span data-hero-line className="block will-change-transform">
        {LINES[index]}
      </span>
    </span>
  )
}

export default function Hero() {
  const section = useRef(null)
  const text = useRef(null)
  const meta = useRef(null)
  const scrollRef = useRef({ value: 0 })
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('[data-hero-line]', { yPercent: 0 })
        gsap.set('[data-hero-el]', { autoAlpha: 1 })
        return
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('[data-hero-el]', { y: 26, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.1, delay: 0.25 })
        .fromTo(
          '[data-hero-line]',
          { yPercent: 116 },
          { yPercent: 0, duration: 1.5, stagger: 0.09, ease: 'power4.out' },
          0.15,
        )

      gsap.to(scrollRef.current, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      gsap.to(text.current, {
        yPercent: -34,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      gsap.to(meta.current, {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: '30% top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={section} id="hero" className="relative h-[190vh] bg-noir">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden lg:flex-row">
        {/* Text column */}
        <div
          ref={text}
          className="relative z-20 flex h-[52vh] flex-col justify-center px-6 md:px-12 lg:h-full lg:w-1/2 lg:px-20"
        >
          <p data-hero-el className="overline text-goldlight" style={{ opacity: 1 }}>
            NOIRÉ — Maison de parfum
          </p>

          <h1 className="clamp-hero mt-6 font-serif font-medium text-ivory" style={{ opacity: 1 }}>
            <HeroLine index={0} />
            <HeroLine index={1} />
            <HeroLine index={2} className="italic font-light text-goldlight" />
          </h1>

          <p
            data-hero-el
            className="mt-7 max-w-md text-[0.95rem] font-light leading-relaxed text-ivory/55 md:text-base"
            style={{ opacity: 1 }}
          >
            A fragrance crafted around contrast, character, and quiet elegance.
            Three scents. One signature.
          </p>

          <div data-hero-el className="mt-10" style={{ opacity: 1 }}>
            <MagneticButton
              onClick={() => scrollToId('collection')}
              className="group inline-flex items-center gap-3 rounded-full border border-goldlight/50 px-8 py-3.5 text-ivory transition-colors duration-500 hover:border-goldlight hover:bg-goldlight/10"
            >
              <span className="label text-[0.62rem] text-ivory">
                Explore the collection
              </span>
              <span className="inline-block h-px w-6 bg-goldlight transition-all duration-500 group-hover:w-10" />
            </MagneticButton>
          </div>
        </div>

        {/* 3D column */}
        <div className="relative z-10 h-[48vh] flex-1 lg:h-full">
          <div className="absolute inset-x-16 bottom-6 top-8 lg:inset-x-24 lg:inset-y-14">
            <PerfumeScene scrollRef={scrollRef} />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-[50%] h-60 w-[70%] -translate-x-1/2 rounded-[50%]"
            style={{
              background:
                'radial-gradient(closest-side, rgba(201,168,120,0.20), transparent)',
            }}
          />
        </div>

        {/* Scroll indicator */}
        <div
          ref={meta}
          className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        >
          <span className="label text-ivory/40">Scroll</span>
          <div className="relative h-14 w-px overflow-hidden bg-ivory/15">
            <span className="absolute left-0 top-0 h-1/2 w-px bg-goldlight scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  )
}