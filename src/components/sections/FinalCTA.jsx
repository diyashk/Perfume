import { Reveal, RevealLines } from '../ui/SectionReveal'
import MagneticButton from '../ui/MagneticButton'
import BottleSilhouette from '../ui/BottleSilhouette'
import { scrollToId } from '../../lib/gsap'

export default function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-noir px-6 py-32 md:px-12 md:py-48"
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[30rem] w-[18rem] md:h-[38rem] md:w-[22rem]">
          <div
            className="absolute -inset-10 rounded-full opacity-70 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(201,168,120,0.28), transparent 70%)' }}
          />
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(201,168,120,0.2), transparent 72%)' }}
          />
          <BottleSilhouette
            className="absolute inset-0 h-full w-full opacity-90 drop-shadow-[0_20px_60px_rgba(201,168,120,0.25)] transition-transform duration-[2000ms] ease-out hover:scale-105"
            liquid="#c9a878"
          />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-goldlight/40 to-transparent" />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <Reveal>
          <p className="overline text-goldlight">A Signature Awaits</p>
        </Reveal>

        <RevealLines
          as="h2"
          className="clamp-display mt-10 font-serif font-medium text-ivory"
          lines={['FIND YOUR', 'SIGNATURE.']}
        />

        <Reveal className="mt-8">
          <p className="max-w-md text-[0.95rem] font-light leading-relaxed text-ivory/60">
            Discover the fragrance that becomes part of your story — and the
            bottle you will keep long after the perfume is gone.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <MagneticButton
            onClick={() => scrollToId('collection')}
            className="group inline-flex items-center gap-3 rounded-full border border-goldlight/50 px-9 py-4 text-ivory transition-colors duration-500 hover:border-goldlight hover:bg-goldlight/10"
          >
            <span className="label text-ivory">Explore NOIRÉ</span>
            <span className="inline-block h-px w-7 bg-goldlight transition-all duration-500 group-hover:w-11" />
          </MagneticButton>
        </Reveal>

        <Reveal className="mt-16">
          <p className="font-serif text-xl font-light italic text-goldlight/80">
            hello@noire.paris — Paris, France
          </p>
        </Reveal>
      </div>
    </section>
  )
}