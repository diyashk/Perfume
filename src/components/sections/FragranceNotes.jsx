import { Reveal } from '../ui/SectionReveal'
import { fragranceNotes } from '../../data/fragranceNotes'

function dispatchNote(detail) {
  window.dispatchEvent(new CustomEvent('noire:note-hover', { detail }))
}

function NoteItem({ note }) {
  return (
    <li
      className="group relative border-b border-beige/70 py-6"
      onPointerEnter={() => dispatchNote({ name: note.name, color: '#b8a078' })}
      onPointerLeave={() => dispatchNote(null)}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-serif text-4xl font-medium text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:italic md:text-6xl">
          {note.name}
        </h3>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/50 transition-all duration-500 group-hover:scale-150 group-hover:bg-champagne" />
      </div>
      <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-mute opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 lg:opacity-60 lg:group-hover:opacity-100 lg:group-hover:translate-x-3">
        {note.detail}
      </p>
    </li>
  )
}

export default function FragranceNotes() {
  return (
    <section
      id="notes"
      className="relative overflow-hidden bg-cream px-6 py-28 md:px-12 md:py-40"
    >
      <div className="pointer-events-none absolute -right-32 top-10 hidden h-96 w-96 rounded-full opacity-40 blur-3xl xl:block" style={{ background: 'radial-gradient(circle, rgba(184,160,120,0.5), transparent 70%)' }} />

      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(7rem, 18vw, 16rem)' }}
        aria-hidden="true"
      >
        02
      </span>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="overline">Fragrance Notes</p>
        </Reveal>

        <Reveal className="mt-6">
          <h2 className="clamp-section font-serif font-medium text-ink">
            THE <span className="italic text-champagne">STRUCTURE</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-10">
          {fragranceNotes.map((stage) => (
            <Reveal key={stage.index} delay={0.1}>
              <article>
                <div className="mb-8 flex items-center justify-between">
                  <span className="label text-champagne">{stage.stage}</span>
                  <span className="font-serif text-lg italic text-ink/30">{stage.index}</span>
                </div>
                <p className="mb-8 text-sm font-light leading-relaxed text-mute">
                  {stage.description}
                </p>
                <ul>
                  {stage.notes.map((n) => (
                    <NoteItem key={n.name} note={n} />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}