import { useEffect, useMemo, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { Reveal } from '../ui/SectionReveal'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import { useQuality } from '../../hooks/useQuality'

const INGREDIENTS = [
  { name: 'BERGAMOT', desc: 'Calabrian sunlight', latin: 'Citrus bergamia' },
  { name: 'IRIS', desc: 'Powdered graces', latin: 'Iris pallida' },
  { name: 'ROSE', desc: 'Velvet bloom', latin: 'Rosa centifolia' },
  { name: 'VANILLA', desc: 'Golden warmth', latin: 'Vanilla planifolia' },
  { name: 'SANDALWOOD', desc: 'Creamy calm', latin: 'Santalum album' },
  { name: 'MUSK', desc: 'A second skin', latin: 'Musk — botanical' },
]

function seed(n) {
  return Math.sin(n * 12.9898) * 43758.5453 - Math.floor(Math.sin(n * 12.9898) * 43758.5453)
}

function FloatingOrbs({ count }) {
  const root = useRef(null)
  const reduced = usePrefersReducedMotion()

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${seed(i) * 100}%`,
        top: `${seed(i + 40) * 100}%`,
        size: 3 + seed(i + 80) * 5,
        duration: 6 + seed(i + 120) * 8,
        delay: seed(i + 160) * -8,
        gold: i % 3 === 0,
      })),
    [count],
  )

  useEffect(() => {
    if (reduced) return undefined
    const q = gsap.utils.toArray('[data-orb]')
    const ctx = gsap.context(() => {
      q.forEach((el) => {
        const rnd = seed(Number(el.dataset.i))
        gsap.to(el, {
          y: (rnd - 0.5) * 90,
          x: (seed(el.dataset.i + 5) - 0.5) * 50,
          duration: 4 + rnd * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, root)
    return () => ctx.revert()
  }, [reduced, count])

  if (reduced) return null

  return (
    <div ref={root} className="pointer-events-none absolute inset-0">
      {dots.map((d, i) => (
        <span
          key={i}
          data-orb
          data-i={i}
          className={`absolute rounded-full ${
            d.gold ? 'bg-champagne/50' : 'bg-sand/40'
          }`}
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
          }}
        />
      ))}
      <div
        className="absolute right-0 top-10 h-[24rem] w-[24rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, #e9dcc8, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 h-[20rem] w-[20rem] rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(184,160,120,0.45), transparent 70%)' }}
      />
    </div>
  )
}

export default function Ingredients() {
  const section = useRef(null)
  const orbsRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const quality = useQuality()

  useEffect(() => {
    if (reduced || quality.reduced) return undefined
    // Gentle parallax drift for the decorative container.
    const ctx = gsap.context(() => {
      gsap.to('[data-drift]', {
        xPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      })
    }, section)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return (
    <section
      ref={section}
      id="ingredients"
      className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40"
    >
      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden="true"
      >
        04
      </span>

      <div ref={orbsRef} data-drift className="absolute inset-y-0 -right-40 w-1/2">
        <FloatingOrbs count={quality.tier === 'full' ? 24 : 12} />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <p className="overline">Ingredients — The Palette</p>
        </Reveal>
        <Reveal className="mt-6">
          <h2 className="clamp-section font-serif font-medium text-ink">
            WHAT WE <span className="italic text-champagne">COMPOSE</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-md text-[0.95rem] font-light leading-relaxed text-mute">
            A short list, sourced slowly. Six ingredients anchor every NOIRÉ
            composition — each chosen for how it behaves on skin, not for how
            loud it is in the bottle.
          </p>
        </Reveal>

        <ul className="mt-20">
          {INGREDIENTS.map((ing, i) => (
            <Reveal key={ing.name} delay={i * 0.04}>
              <li
                className="group flex items-baseline justify-between gap-6 border-b border-beige/70 py-6"
                data-hover
              >
                <div className="flex items-baseline gap-6">
                  <span className="label text-champagne/0 transition-all duration-500 group-hover:text-champagne">
                    0{i + 1}
                  </span>
                  <h3 className="font-serif text-5xl font-medium text-ink transition-all duration-700 group-hover:translate-x-2 group-hover:italic md:text-8xl">
                    {ing.name}
                  </h3>
                </div>
                <div className="hidden text-right md:block">
                  <p className="text-sm font-light text-mute transition-transform duration-500 group-hover:-translate-x-2">
                    {ing.desc}
                  </p>
                  <p className="label mt-1 text-ink/30 group-hover:text-champagne/70">
                    {ing.latin}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}