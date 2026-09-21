import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import CustomCursor from './components/ui/CustomCursor'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Essence from './components/sections/Essence'
import FragranceNotes from './components/sections/FragranceNotes'
import Collection from './components/sections/Collection'
import ProductDetail from './components/sections/ProductDetail'
import Ingredients from './components/sections/Ingredients'
import BrandStory from './components/sections/BrandStory'
import Journal from './components/sections/Journal'
import FinalCTA from './components/sections/FinalCTA'

export default function App() {
  const [activeProduct, setActiveProduct] = useState(null)

  useEffect(() => {
    // Re-measure positions once the WebGL canvas and webfonts have settled.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh)
    }
    const t = setTimeout(refresh, 400)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Essence />
        <FragranceNotes />
        <Collection onSelect={setActiveProduct} />
        <Ingredients />
        <BrandStory />
        <Journal />
        <FinalCTA />
      </main>
      <Footer />
      <ProductDetail
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />
    </>
  )
}