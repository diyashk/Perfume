import { Sparkles } from '@react-three/drei'

export default function FloatingParticles({ count = 80, reduced = false }) {
  if (reduced) return null
  return (
    <Sparkles
      count={count}
      scale={[7, 5, 4]}
      size={2}
      speed={0.22}
      opacity={0.4}
      color="#c9b584"
      noise={1}
    />
  )
}