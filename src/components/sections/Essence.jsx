import { Reveal, RevealLines } from '../ui/SectionReveal'

export default function Essence() {
  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40">
      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden="true"
      >
        01
      </span>

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <p className="overline">The Essence</p>
        </Reveal>

        <RevealLines
          as="h2"
          className="clamp-display mt-10 font-serif font-medium text-ink"
          lines={['EVERY SCENT', 'TELLS A STORY.']}
        />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="max-w-xl text-lg font-light leading-relaxed text-mute">
              NOIRÉ is built on a single conviction: a perfume is not an
              accessory, it is a presence. Each composition is a study in
              restraint — few ingredients, carefully placed, allowed to breathe.
            </p>
          </Reveal>
          <Reveal className="md:col-span-5" delay={0.15}>
            <p className="max-w-sm text-sm font-light leading-loose text-mute md:ml-auto">
              Three fragrances. Composed in small batches in Paris. Slowly
              matured, and offered in glass that is meant to be kept long after
              the last drop.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-20">
          <p className="font-serif text-2xl italic text-champagne md:text-3xl">
            — The NOIRÉ atelier
          </p>
        </Reveal>
      </div>
    </section>
  )
}