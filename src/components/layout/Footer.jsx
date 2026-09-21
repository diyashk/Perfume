import { scrollToId } from '../../lib/gsap'

const LINKS = [
  { label: 'Collection', id: 'collection' },
  { label: 'Story', id: 'story' },
  { label: 'Ingredients', id: 'ingredients' },
  { label: 'Journal', id: 'journal' },
  { label: 'Contact', id: 'contact' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-24 md:px-12 md:pt-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-serif text-4xl tracking-[0.18em] text-ink">
              NOIRÉ
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
              A maison de parfum composing three scents — ÉCLAT, ÉTHER and
              LUMIÈRE — around contrast, character and quiet elegance.
            </p>
          </div>

          <div>
            <p className="label mb-6 text-champagne">Maison</p>
            <ul className="space-y-3">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(l.id)}
                    className="link-underline text-sm text-mute transition-colors duration-300 hover:text-ink"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-6 text-champagne">Follow</p>
            <ul className="space-y-3 text-sm text-mute">
              <li>
                <a
                  href="#contact"
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  Pinterest
                </a>
              </li>
              <li className="pt-4">
                <a
                  href="mailto:hello@noire.paris"
                  className="link-underline transition-colors duration-300 hover:text-ink"
                >
                  hello@noire.paris
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-beige pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-[0.2em] text-mute">
            © {new Date().getFullYear()} NOIRÉ — SCENT BEYOND ORDINARY.
          </p>
          <div className="flex gap-8 text-xs tracking-[0.2em] text-mute">
            <a href="#contact" className="transition-colors duration-300 hover:text-ink">
              Privacy
            </a>
            <a href="#contact" className="transition-colors duration-300 hover:text-ink">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}