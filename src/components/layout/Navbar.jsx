import { useEffect, useState } from 'react'
import { scrollToId } from '../../lib/gsap'

const LINKS = [
  { label: 'Collection', id: 'collection' },
  { label: 'Story', id: 'story' },
  { label: 'Ingredients', id: 'ingredients' },
  { label: 'Journal', id: 'journal' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const dark = !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollToId(id)
  }

  const brand = dark ? 'text-ivory' : 'text-ink'
  const link = dark
    ? 'text-ivory/60 hover:text-ivory'
    : 'text-mute hover:text-ink'
  const stroke = dark ? 'stroke-ivory' : 'stroke-ink'
  const line = dark ? 'bg-ivory' : 'bg-ink'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12">
        <button
          type="button"
          onClick={() => go('hero')}
          className={`font-serif text-[1.35rem] tracking-[0.18em] ${brand}`}
          aria-label="NOIRÉ — back to top"
        >
          NOIRÉ
        </button>

        <ul className="hidden items-center gap-10 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className={`link-underline label ${link} transition-colors duration-300`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => go('collection')}
            className="group relative flex h-9 w-9 items-center justify-center"
            aria-label="Shopping bag"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-5 w-5 ${stroke} transition-colors duration-300`}
              fill="none"
              strokeWidth="1.4"
            >
              <path d="M6 8h12l1 12H5L6 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-champagne" />
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Open menu"
          >
            <span className={`h-px w-6 ${line} transition-colors duration-300`} />
            <span className={`h-px w-6 ${line} transition-colors duration-300`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-between bg-noir px-8 pb-10 pt-28 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
          >
            <span className="absolute h-px w-7 rotate-45 bg-ivory/80" />
            <span className="absolute h-px w-7 -rotate-45 bg-ivory/80" />
          </button>

          <ul className="space-y-2">
            {LINKS.map((l, i) => (
              <li key={l.id} className="overflow-hidden border-b border-ivory/10 pb-2">
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  className="flex w-full items-baseline justify-between py-3"
                >
                  <span className="font-serif text-4xl font-medium text-ivory">
                    {l.label}
                  </span>
                  <span className="label text-champagne">0{i + 1}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="label text-ivory/40">PARIS — MAISON DE PARFUM</div>
        </div>
      )}
    </header>
  )
}