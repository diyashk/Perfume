import * as THREE from 'three'

/**
 * Renders a minimal "printed label" to a canvas texture so the glass bottle
 * carries a believable NOIRÉ label without shipping image assets.
 */
export function createLabelTexture({
  title = 'NOIRÉ',
  sub = 'SCENT BEYOND ORDINARY.',
  accent = '#b8a078',
} = {}) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 384
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f6f1e6'
  ctx.fillRect(0, 0, 512, 384)

  ctx.strokeStyle = accent
  ctx.lineWidth = 2
  ctx.strokeRect(14, 14, 484, 356)
  ctx.globalAlpha = 0.55
  ctx.lineWidth = 1
  ctx.strokeRect(23, 23, 466, 338)
  ctx.globalAlpha = 1

  ctx.fillStyle = '#24211d'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '600 96px "Cormorant Garamond", "Times New Roman", serif'
  ctx.fillText(title, 256, 158)

  ctx.strokeStyle = accent
  ctx.globalAlpha = 0.7
  ctx.beginPath()
  ctx.moveTo(186, 212)
  ctx.lineTo(326, 212)
  ctx.stroke()
  ctx.globalAlpha = 1

  ctx.fillStyle = '#777067'
  ctx.font = '400 19px "Jost", "Helvetica Neue", sans-serif'
  ctx.fillText(sub.toUpperCase(), 256, 242)

  ctx.fillStyle = '#b1a896'
  ctx.font = '400 13px "Jost", "Helvetica Neue", sans-serif'
  ctx.fillText('EAU DE PARFUM — PARIS', 256, 318)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}