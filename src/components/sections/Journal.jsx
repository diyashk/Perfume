import { Reveal } from '../ui/SectionReveal'
import { journalArticles } from '../../data/journal'

export default function Journal() {
  return (
    <section id="journal" className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40">
      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden="true"
      >
        06
      </span>
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="overline">Journal</p>
        </Reveal>
        <Reveal className="mt-6">
          <h2 className="clamp-section font-serif font-medium text-ink">
            NOTES FROM <span className="italic text-champagne">THE ATELIER</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          {journalArticles.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.05}>
              <article
                data-hover
                data-cursor="read"
                className="group relative flex flex-col gap-4 border-t border-beige/70 py-10 md:flex-row md:items-start md:gap-12"
              >
                <span className="label w-24 shrink-0 pt-1 text-mute">
                  {article.index}
                </span>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                    <span className="label text-champagne">{article.category}</span>
                    <span className="label text-ink/40">{article.date}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-3xl font-medium leading-tight text-ink transition-transform duration-700 group-hover:translate-x-2 md:text-5xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] font-light leading-relaxed text-mute">
                    {article.excerpt}
                  </p>
                  <span className="mt-5 inline-block label text-ink/50 transition-colors duration-500 group-hover:text-champagne">
                    {article.readTime}
                  </span>
                </div>

                <div className="pointer-events-none relative mt-2 hidden h-24 w-24 shrink-0 items-center justify-center md:flex">
                  <span className="absolute inset-0 rounded-full opacity-0 blur-xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-60"
                    style={{ background: 'radial-gradient(circle, #c8bdaa, transparent 70%)' }}
                  />
                  <span className="label text-ink/60 transition-all duration-500 group-hover:text-champagne">
                    →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </section>
  )
}