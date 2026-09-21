import { Reveal, RevealLines } from '../ui/SectionReveal'

export default function BrandStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-noir px-6 py-32 md:px-12 md:py-48">
      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)', WebkitTextStroke: '1px rgba(201,168,120,0.16)' }}
        aria-hidden="true"
      >
        05
      </span>

      <div
        className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,168,120,0.35), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <p className="overline text-goldlight">The Story</p>
        </Reveal>

        <RevealLines
          as="h2"
          className="clamp-display mt-10 font-serif font-medium text-ivory"
          lines={['MADE TO BE', 'REMEMBERED.']}
        />

        <div className="mt-14 max-w-2xl">
          <Reveal>
            <p className="text-lg font-light leading-relaxed text-ivory/70">
              NOIRÉ is built the old way: a small atelier, a short palette, and
              a single standard — if a material cannot carry a scent on its own,
              it does not belong in the composition.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 text-lg font-light leading-relaxed text-ivory/70">
              We release three fragrances. No flankers, no seasons, no noise.
              Understated luxury is not what a perfume says — it is what it
              chooses to leave out.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <blockquote className="font-serif text-3xl font-light italic leading-snug text-ivory md:text-5xl">
            “Quiet luxury is not what you say —
            <span className="text-goldlight"> it is what you choose to leave out.</span>”
          </blockquote>
          <p className="mt-8 label text-ivory/40">— NOIRÉ ATELIER, PARIS</p>
        </Reveal>
      </div>
    </section>
  )
}