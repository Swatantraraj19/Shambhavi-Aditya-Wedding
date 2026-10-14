import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { tilt } from './motion'

const L = (w, o) => [...w].map((c, i) => (
  <span
    key={i}
    className={`l royal-name gold ${i === 0 ? 'capital-initial' : ''}`}
    aria-hidden="true"
    style={{ '--i': i + o }}
  >
    {c === ' ' ? '\u00a0' : c}
  </span>
))


export default function Hero() {
  const box = useRef()

  useEffect(() => {
    const el = box.current
    if (!el) return
    let r
    try {
      r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return
    }
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    r.toneMapping = THREE.ACESFilmicToneMapping
    r.toneMappingExposure = 1.35
    el.appendChild(r.domElement)

    const sc = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 70)
    cam.position.z = 8.2

    const pmrem = new THREE.PMREMGenerator(r)
    sc.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    // Warm dramatic wedding lighting
    const light1 = new THREE.PointLight(0xffe6a3, 3.2, 25)
    light1.position.set(4, 5, 4)
    sc.add(light1)

    const light2 = new THREE.PointLight(0xffa894, 2.4, 25)
    light2.position.set(-4, -3, 3)
    sc.add(light2)

    const amb = new THREE.AmbientLight(0xffeedd, 0.8)
    sc.add(amb)

    // Master group for rings & diamond
    const g = new THREE.Group()
    sc.add(g)

    // Gold & Rose-Gold Materials
    const yellowGold = new THREE.MeshStandardMaterial({
      color: 0xf5c353,
      metalness: 0.98,
      roughness: 0.12,
      envMapIntensity: 2.8,
    })
    const roseGold = new THREE.MeshStandardMaterial({
      color: 0xeea38e,
      metalness: 0.98,
      roughness: 0.15,
      envMapIntensity: 2.6,
    })

    // Solitaire Diamond Material with intense specular refraction
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.02,
      envMapIntensity: 4.5,
    })

    // Ring 1: Groom's Yellow Gold band
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.18, 56, 160), yellowGold)
    ring1.position.x = -0.66
    ring1.rotation.y = 0.58
    g.add(ring1)

    // Ring 2: Bride's Rose Gold interlocking band
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.18, 56, 160), roseGold)
    ring2.position.x = 0.66
    ring2.rotation.y = -0.58
    g.add(ring2)

    // Multi-faceted Diamond (Icosahedron faceted gem)
    const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 1), diamondMat)
    gem.position.set(0, 1.34, 0)
    g.add(gem)

    // Diamond Prongs / Crown setting
    const prongMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.15 })
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.28, 8), prongMat)
      prong.position.set(Math.cos(angle) * 0.26, 1.28, Math.sin(angle) * 0.26)
      prong.rotation.z = Math.cos(angle) * -0.2
      g.add(prong)
    }

    // Floating Golden Dust / Sacred Sparks
    const N = 500
    const pos = new Float32Array(N * 3)
    const spd = []
    const rndX = []
    for (let i = 0; i < N; i++) {
      pos.set([(Math.random() - 0.5) * 16, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9], i * 3)
      spd.push(0.005 + Math.random() * 0.012)
      rndX.push(Math.random() * 6.28)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const dust = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0xf5d996,
        size: 0.055,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    sc.add(dust)

    // Touch & Pointer Drag for Interactive 360 Spin
    let isDragging = false
    let prevPointer = { x: 0, y: 0 }
    let dragVelocity = { x: 0, y: 0 }
    let targetRotation = { x: 0, y: 0 }

    const onPointerDown = e => {
      isDragging = true
      prevPointer = { x: e.clientX, y: e.clientY }
    }
    const onPointerMove = e => {
      if (!isDragging) return
      const dx = (e.clientX - prevPointer.x) * 0.006
      const dy = (e.clientY - prevPointer.y) * 0.006
      targetRotation.y += dx
      targetRotation.x += dy
      dragVelocity = { x: dy, y: dx }
      prevPointer = { x: e.clientX, y: e.clientY }
    }
    const onPointerUp = () => {
      isDragging = false
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    // Dynamic Sizing
    let by = 0
    let bs = 1
    const size = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      r.setSize(w, h)
      cam.aspect = w / h
      const p = w / h < 1
      by = p ? 1.6 : 0.25
      bs = p ? 0.95 : 1.2
      cam.updateProjectionMatrix()
    }
    size()
    const ro = new ResizeObserver(size)
    ro.observe(el)

    let vis = true
    const io = new IntersectionObserver(e => {
      vis = e[0].isIntersecting
    })
    io.observe(el)

    let raf
    const t0 = performance.now()

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!vis) return

      const t = (performance.now() - t0) / 1000
      const pr = Math.min(window.scrollY / window.innerHeight, 1)

      // Dynamic scroll choreography
      g.position.y = by + pr * 1.4
      g.scale.setScalar(bs * (1 - pr * 0.35))
      g.rotation.z = pr * 1.3

      // Drag inertia decay
      if (!isDragging) {
        dragVelocity.x *= 0.94
        dragVelocity.y *= 0.94
        targetRotation.x += dragVelocity.x
        targetRotation.y += dragVelocity.y
      }

      // Smooth Gyroscope + Auto-float + User Drag interpolation
      const targetY = targetRotation.y + tilt.x * 0.75 + Math.sin(t * 0.45) * 0.4
      const targetX = targetRotation.x + tilt.y * 0.4 + Math.cos(t * 0.35) * 0.15
      g.rotation.y += (targetY - g.rotation.y) * 0.05
      g.rotation.x += (targetX - g.rotation.x) * 0.05

      // Independent ring & gem rotations
      ring1.rotation.x = t * 0.45
      ring2.rotation.x = -t * 0.45
      gem.rotation.y = t * 1.2
      gem.rotation.x = Math.sin(t) * 0.2

      // Dynamic light orbiting
      light1.position.x = Math.cos(t * 0.7) * 5
      light1.position.z = Math.sin(t * 0.7) * 5 + 3
      light2.position.x = -Math.cos(t * 0.6) * 5
      light2.position.z = -Math.sin(t * 0.6) * 5 + 3

      // Sparkle particle drift
      const a = geo.attributes.position
      for (let i = 0; i < N; i++) {
        let y = a.getY(i) - spd[i]
        if (y < -7) y = 7
        a.setY(i, y)
        rndX[i] += 0.015
        a.setX(i, a.getX(i) + Math.sin(rndX[i]) * 0.003)
      }
      a.needsUpdate = true
      dust.rotation.y = t * 0.035

      r.render(sc, cam)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      ro.disconnect()
      io.disconnect()
      pmrem.dispose()
      r.dispose()
      if (r.domElement.parentNode) r.domElement.remove()
    }
  }, [])

  return (
    <section className="hero">
      <div className="cv" ref={box} aria-hidden="true" />
      <div className="hero-content">
        <div className="shloka-mini">॥ ॐ श्री गणेशाय नमः ॥</div>
        <p className="hero-subtitle">Together with their families</p>
        <h1 aria-label="Shambhavi and Aditya" className="hero-names">
          {L('Shambhavi', 0)}
          <span className="ampersand">&amp;</span>
          {L('Aditya', 10)}
        </h1>
        <div className="dt2">
          <span>12</span> &bull; <span>12</span> &bull; <span>2026</span>
        </div>
        <p className="hero-place">The Grand Ballroom &bull; Pune, Maharashtra</p>
        <div className="hero-drag-hint">
          <span className="hint-icon">✦</span> Interactive 3D &bull; Tilt or Drag Rings <span className="hint-icon">✦</span>
        </div>
      </div>
    </section>
  )
}
