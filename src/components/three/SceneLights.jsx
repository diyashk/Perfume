import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, PMREMGenerator } from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * Procedural studio environment (no network assets) — renders a soft
 * room-based reflection map so the glass bottle picks up believable highlights.
 */
export function StudioEnvironment({ baseIntensity = 0.95 }) {
  const gl = useThree((s) => s.gl)
  const scene = useThree((s) => s.scene)
  const target = useRef(baseIntensity)

  useEffect(() => {
    const pmrem = new PMREMGenerator(gl)
    const env = new RoomEnvironment()
    const rt = pmrem.fromScene(env, 0.04)
    scene.environment = rt.texture
    scene.environmentIntensity = baseIntensity

    return () => {
      scene.environment = null
      rt.dispose()
      pmrem.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene])

  // Subtle atmosphere shift when the Fragrance Notes section is hovered.
  useEffect(() => {
    const onNote = (e) => {
      target.current = e.detail ? baseIntensity + 0.35 : baseIntensity
    }
    window.addEventListener('noire:note-hover', onNote)
    return () => window.removeEventListener('noire:note-hover', onNote)
  }, [baseIntensity])

  useFrame((_, delta) => {
    scene.environmentIntensity = MathUtils.damp(
      scene.environmentIntensity,
      target.current,
      2.5,
      delta,
    )
  })

  return null
}

export function LightRig({ tier = 'full' }) {
  return (
    <>
      <ambientLight intensity={0.45} color="#fff6e3" />
      <directionalLight position={[4, 6, 4]} intensity={1.15} color="#fff1dc" />
      <directionalLight position={[-5, 3, -3]} intensity={0.55} color="#f4efe7" />
      <directionalLight position={[0, -3, 6]} intensity={0.5} color="#fff8ee" />
      {tier === 'full' && (
        <spotLight
          position={[0, 8, 2]}
          angle={0.5}
          penumbra={1}
          intensity={0.45}
          color="#fff6e6"
        />
      )}
    </>
  )
}