import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/**
 * Device quality buckets used to scale 3D complexity:
 * - 'full'    desktop: transmission glass, contact shadows, particles
 * - 'reduced' tablet: cheaper glass, fewer particles
 * - 'light'   mobile: flat glass, minimal particles
 * `reduced` reflects the OS prefers-reduced-motion preference only.
 */
export function useQuality() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(max-width: 1100px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  if (reduced) return { tier: 'light', isMobile, reduced: true }
  if (isMobile) return { tier: 'light', isMobile, reduced: false }
  if (isTablet) return { tier: 'reduced', isMobile: false, reduced: false }
  return { tier: 'full', isMobile: false, reduced: false }
}