import { Reveal } from '../ui/SectionReveal'
import MagneticButton from '../ui/MagneticButton'
import { products } from '../../data/products'

function CollectionItem({ product, onSelect, even }) {
  return (
    <article
      data-hover
      data-cursor="view"
      onClick={onSelect}
      className="group relative cursor-pointer overflow-hidden border-t border-beige/70 py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute -right-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${product.liquid}66, transparent 70%)`,
          }}
        />
      </div>

      <div
        className={`relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 ${even ? 'lg:[direction:rtl]' : ''}`}
      >
        <div className="lg:col-span-5 lg:[direction:ltr]">
          <div className="flex items-baseline justify-between">
            <span className="label text-mute">N° {product.number}</span>
            <span className="block font-serif text-6xl font-semibold italic text-taupe transition-all duration-700 group-hover:text-champagne/70 md:text-8xl lg:hidden">
              {product.number}
            </span>
          </div>
          <h3 className="clamp-product mt-3 font-serif font-medium text-ink transition-transform duration-700 group-hover:translate-x-2">
            {product.name}
          </h3>
          <p className="mt-3 label font-medium text-champagne">{product.family}</p>
          <p className="mt-6 max-w-sm text-[0.95rem] font-light leading-relaxed text-mute">
            {product.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-8">
            <MagneticButton
              onClick={onSelect}
              className="group/btn inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3"
            >
              <span className="label text-ink">Discover</span>
              <span className="inline-block text-ink transition-transform duration-500 group-hover/btn:translate-x-1.5">
                →
              </span>
            </MagneticButton>
            <span className="text-sm tracking-[0.15em] text-mute">
              {product.price}
            </span>
          </div>
        </div>

        <div className="relative flex h-72 items-center justify-center lg:col-span-7 lg:h-[30rem] lg:[direction:ltr]">
          <span
            className="absolute inset-0 flex items-center justify-center font-serif text-[13rem] font-semibold italic text-transparent transition-all duration-700 group-hover:-translate-y-2 group-hover:opacity-0"
            style={{ WebkitTextStroke: '1.5px rgba(36,33,29,0.09)' }}
            aria-hidden="true"
          >
            {product.number}
          </span>
          <div className="relative h-full w-auto transition-transform duration-1000 ease-out group-hover:scale-105">
            <svg viewBox="0 0 200 460" className="h-full w-auto" aria-hidden="true">
            <defs>
              <linearGradient id={`juice-${product.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={product.liquid} stopOpacity="0" />
                <stop offset="40%" stopColor={product.liquid} stopOpacity="0.9" />
                <stop offset="100%" stopColor={product.liquid} stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id={`glass-${product.id}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
              </linearGradient>
            </defs>
            <path
              d="M104 4 L104 78 Q104 100 124 114 L176 158 Q184 166 184 180 L184 364 Q184 396 152 416 Q120 436 100 436 Q80 436 48 416 Q16 396 16 364 L16 180 Q16 166 24 158 L76 114 Q96 100 96 78 L96 4 A4 4 0 0 1 100 2 L104 4 Z"
              fill={`url(#glass-${product.id})`}
            />
            <path
              d="M104 4 L104 78 Q104 100 124 114 L176 158 Q184 166 184 180 L184 364 Q184 396 152 416 Q120 436 100 436 Q80 436 48 416 Q16 396 16 364 L16 180 Q16 166 24 158 L76 114 Q96 100 96 78 L96 4 A4 4 0 0 1 100 2 L104 4 Z"
              fill={`url(#juice-${product.id})`}
            />
            <path
              d="M100 150 L100 370"
              stroke="rgba(36,33,29,0.3)"
              strokeWidth="1.4"
            />
            <circle cx="100" cy="280" r="70" fill="none" stroke="rgba(119,112,103,0.35)" strokeWidth="1" />
            <path
              d="M104 168 Q104 190 122 204 L172 246"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect x="88" y="4" width="24" height="12" rx="2" fill="#b8a078" />
            <circle cx="80" cy="120" r="3" fill="rgba(255,255,255,0.7)" />
            <circle cx="140" cy="340" r="4" fill="rgba(255,255,255,0.5)" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Collection({ onSelect }) {
  return (
    <section id="collection" className="relative overflow-hidden bg-ivory px-6 py-28 md:px-12 md:py-40">
      <span
        className="ghost-num"
        style={{ fontSize: 'clamp(8rem, 20vw, 20rem)' }}
        aria-hidden="true"
      >
        03
      </span>
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <p className="overline">The Collection</p>
        </Reveal>
        <Reveal className="mt-6">
          <h2 className="clamp-section font-serif font-medium text-ink">
            THREE SCENTS. <span className="italic text-champagne">ONE SIGNATURE.</span>
          </h2>
        </Reveal>
        <Reveal>
          <p className="mt-6 max-w-lg text-[0.95rem] font-light leading-relaxed text-mute">
            Each fragrance is released once, in a single edition, in a bottle
            designed to be kept. Select one to explore it.
          </p>
        </Reveal>

        <div className="mt-20">
          {products.map((product, i) => (
            <CollectionItem
              key={product.id}
              product={product}
              even={i % 2 === 1}
              onSelect={() => onSelect(product)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}