import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createLabelTexture } from '../../three/labelTexture'

function profile(points, segments) {
  return new THREE.LatheGeometry(
    points.map((p) => new THREE.Vector2(p[0], p[1])),
    segments,
  )
}

const BODY = [
  [0, -0.82],
  [0.28, -0.82],
  [0.55, -0.8],
  [0.63, -0.74],
  [0.66, -0.66],
  [0.66, 0.02],
  [0.64, 0.26],
  [0.56, 0.54],
  [0.38, 0.84],
  [0.2, 1.0],
  [0.16, 1.05],
  [0.16, 1.2],
  [0.18, 1.24],
]

const CAP = [
  [0.19, 0],
  [0.19, 0.08],
  [0.22, 0.2],
  [0.27, 0.3],
  [0.29, 0.33],
  [0.26, 0.4],
  [0.13, 0.47],
  [0, 0.47],
]

/**
 * Reusable luxury perfume bottle built from Three.js geometry.
 *
 * props:
 *  - scrollRef        shared ref { value: 0..1 } to drive scroll choreography
 *  - quality          { tier: 'full'|'reduced'|'light', reduced: bool }
 *  - labelTitle       text printed on the label
 *  - labelSub         secondary label line
 *  - liquid           hex colour of the juice
 *  - accent           hex used on the label
 *  - spin             base rotation speed (rad/s)
 *  - interactive      follow pointer when true
 */
export default function PerfumeBottle({
  scrollRef,
  quality = { tier: 'full', reduced: false },
  labelTitle = 'NOIRÉ',
  labelSub = 'SCENT BEYOND ORDINARY.',
  liquid = '#e3d1a0',
  accent = '#b8a078',
  spin = 0.2,
  interactive = true,
}) {
  const group = useRef(null)
  const look = useRef({ rx: 0, ry: 0, tx: 0, ty: 0, scale: 1 })
  const premium = quality.tier === 'full'

  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    let alive = true
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => alive && setFontsReady(true))
    }
    return () => {
      alive = false
    }
  }, [])

  const segments = premium ? 64 : 32

  const geometries = useMemo(
    () => ({
      body: profile(BODY, segments),
      cap: profile(CAP, segments),
      liquid: new THREE.CylinderGeometry(0.6, 0.62, 1.1, 36, 1, false),
      label: new THREE.BoxGeometry(0.52, 0.39, 0.02),
    }),
    [segments],
  )

  const materials = useMemo(() => {
    const glass = premium
      ? new THREE.MeshPhysicalMaterial({
          color: '#fdfbf7',
          metalness: 0,
          roughness: 0.05,
          transmission: 1,
          thickness: 1.2,
          ior: 1.5,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          envMapIntensity: 1.1,
        })
      : new THREE.MeshPhysicalMaterial({
          color: '#fdfbf7',
          metalness: 0,
          roughness: 0.06,
          clearcoat: 1,
          transparent: true,
          opacity: 0.3,
          envMapIntensity: 1.6,
        })

    const juice = premium
      ? new THREE.MeshPhysicalMaterial({
          color: liquid,
          metalness: 0,
          roughness: 0.12,
          transmission: 0.75,
          thickness: 1,
          ior: 1.35,
          envMapIntensity: 0.8,
        })
      : new THREE.MeshPhysicalMaterial({
          color: liquid,
          metalness: 0,
          roughness: 0.1,
          transparent: true,
          opacity: 0.55,
          envMapIntensity: 1,
        })

    const cap = new THREE.MeshStandardMaterial({
      color: accent,
      metalness: 1,
      roughness: 0.3,
      envMapIntensity: 1.4,
    })

    return { glass, juice, cap }
  }, [premium, liquid, accent])

  const labelTexture = useMemo(
    () =>
      createLabelTexture({
        title: labelTitle,
        sub: labelSub,
        accent,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labelTitle, labelSub, accent, fontsReady],
  )

  useEffect(() => () => labelTexture.dispose(), [labelTexture])

  const labelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: labelTexture,
        roughness: 0.75,
        metalness: 0,
      }),
    [labelTexture],
  )

  useEffect(
    () => () => {
      Object.values(geometries).forEach((g) => g.dispose())
      Object.values(materials).forEach((m) => m.dispose())
      labelMaterial.dispose()
    },
    [geometries, materials, labelMaterial],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return

    const t = state.clock.elapsedTime
    const reduced = quality.reduced
    const scroll = scrollRef?.current?.value ?? 0

    const px = interactive ? state.pointer.x : 0
    const py = interactive ? state.pointer.y : 0

    look.current.tx = px * (reduced ? 0.04 : 0.16)
    look.current.ty = py * (reduced ? 0.03 : 0.12)
    look.current.rx = THREE.MathUtils.damp(look.current.rx, look.current.ty, 3, delta)
    look.current.ry = THREE.MathUtils.damp(look.current.ry, look.current.tx, 3, delta)

    const baseSpin = reduced ? 0.02 : t * spin
    const scrollRot = scroll * Math.PI * 1.4
    const scaleTarget = THREE.MathUtils.clamp(
      state.viewport.height / 3.2,
      0.55,
      1.2,
    )
    look.current.scale = THREE.MathUtils.damp(look.current.scale, scaleTarget, 3, delta)

    const bob = reduced ? 0 : Math.sin(t * 0.55) * 0.045
    const targetY = 0.08 + bob + scroll * 0.4

    g.rotation.x = look.current.rx
    g.rotation.y = baseSpin + scrollRot + look.current.ry
    g.position.x = look.current.ry * 0.6
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 3, delta)
    g.scale.setScalar(look.current.scale)
  })

  return (
    <group ref={group} position={[0, 0.08, 0]}>
      <mesh geometry={geometries.body} material={materials.glass} />
      <mesh
        geometry={geometries.liquid}
        material={materials.juice}
        position={[0, -0.13, 0]}
      />
      <mesh
        geometry={geometries.label}
        material={labelMaterial}
        position={[0, -0.1, 0.675]}
      />
      <group position={[0, 1.24, 0]}>
        <mesh geometry={geometries.cap} material={materials.cap} />
      </group>
    </group>
  )
}