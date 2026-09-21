import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useQuality } from '../../hooks/useQuality'
import PerfumeBottle from './PerfumeBottle'
import FloatingParticles from './FloatingParticles'
import { LightRig, StudioEnvironment } from './SceneLights'

function CameraRig({ scrollRef }) {
  const camera = useThree((s) => s.camera)
  const look = useRef({ x: 0, y: 0.45 })

  useFrame((state, delta) => {
    const scroll = scrollRef?.current?.value ?? 0
    const px = state.pointer.x * 0.4
    const py = state.pointer.y * 0.25

    look.current.x = THREE.MathUtils.damp(look.current.x, px, 2.2, delta)
    look.current.y = THREE.MathUtils.damp(look.current.y, 0.45 + py, 2.2, delta)

    // oxlint-disable-next-line react/immutability
    camera.position.x = look.current.x
    // oxlint-disable-next-line react/immutability
    camera.position.y = look.current.y + scroll * 0.55
    // oxlint-disable-next-line react/immutability
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7 - scroll * 2.5, 2.2, delta)
    camera.lookAt(0, -0.12, 0)
  })

  return null
}

/**
 * Self-contained WebGL scene. Drop a <PerfumeScene/> anywhere a usable
 * luxury bottle is needed (hero, product detail).
 *
 * props:
 *  - scrollRef  { value: 0..1 } optional scroll choreography
 *  - labelTitle / labelSub / liquid / accent -> bottle branding
 *  - interactive  follow pointer
 */
export default function PerfumeScene({
  scrollRef,
  labelTitle,
  labelSub,
  liquid,
  accent,
  interactive = true,
  className,
}) {
  const quality = useQuality()
  const particleCount =
    quality.tier === 'full' ? 90 : quality.tier === 'reduced' ? 45 : 18

  return (
    <Canvas
      className={className}
      dpr={[1, quality.tier === 'full' ? 2 : 1.5]}
      camera={{ position: [0, 0.45, 7], fov: 30, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <StudioEnvironment />
        <LightRig tier={quality.tier} />
        <group>
          <PerfumeBottle
            scrollRef={scrollRef}
            quality={quality}
            labelTitle={labelTitle}
            labelSub={labelSub}
            liquid={liquid}
            accent={accent}
            interactive={interactive}
          />
          <FloatingParticles count={particleCount} reduced={quality.reduced} />
        </group>
        {quality.tier === 'full' && (
          <ContactShadows
            position={[0, -0.95, 0]}
            opacity={0.4}
            scale={7}
            blur={2.4}
            far={2.4}
            color="#8a7d63"
            resolution={512}
            frames={1}
          />
        )}
        <CameraRig scrollRef={scrollRef} />
      </Suspense>
    </Canvas>
  )
}