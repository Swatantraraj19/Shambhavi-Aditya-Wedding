import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { tilt } from './motion'

const L = (w, o) => [...w].map((c, i) => (
  <span
    key={i}
    className="l royal-letter gold"
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

    // Extra brilliant light for diamond sparkle
    const diamondLight = new THREE.PointLight(0xffffff, 2.5, 12)
    diamondLight.position.set(0, 4, 3)
    sc.add(diamondLight)

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

    // Solitaire Diamond Crown Setting
    const crownGroup = new THREE.Group()

    // Faceted brilliant-cut diamond gem
    const gemGeo = new THREE.OctahedronGeometry(0.32, 0)
    gemGeo.scale(1, 1.2, 1)

    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x081520,
      metalness: 0.02,
      roughness: 0.02,
      transmission: 0.92,
      ior: 2.417,
      reflectivity: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.0,
      flatShading: true,
      envMapIntensity: 5.0,
    })

    const gem = new THREE.Mesh(gemGeo, diamondMat)
    gem.position.set(0, 0.16, 0)
    crownGroup.add(gem)

    // Platinum / White Gold setting
    const prongMat = new THREE.MeshStandardMaterial({
      color: 0xf0f4f8,
      metalness: 0.96,
      roughness: 0.08,
      envMapIntensity: 3.0,
    })

    // 6 Platinum Prongs
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      const prong = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.28, 8), prongMat)
      prong.position.set(Math.cos(angle) * 0.22, 0.1, Math.sin(angle) * 0.22)
      prong.rotation.z = Math.cos(angle) * -0.16
      prong.rotation.x = Math.sin(angle) * 0.16
      crownGroup.add(prong)
    }

    // Bezel base ring
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.03, 16, 32), prongMat)
    bezel.rotation.x = Math.PI / 2
    bezel.position.y = 0.02
    crownGroup.add(bezel)

    // Ring 1: Groom's Yellow Gold band
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.18, 56, 160), yellowGold)
    ring1.position.set(-0.55, 0, 0)
    ring1.rotation.set(0.25, 0.52, 0.15)
    g.add(ring1)

    // Ring 2: Bride's Rose Gold interlocking solitaire ring
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.18, 56, 160), roseGold)
    ring2.position.set(0.55, 0, 0)
    ring2.rotation.set(-0.25, -0.52, -0.15)
    crownGroup.position.set(0, 1.22, 0)
    ring2.add(crownGroup)
    g.add(ring2)

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

    // Dynamic Sizing calibrated for Mobile & Desktop so rings NEVER overlap text
    let by = 0
    let bs = 1
    const size = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      r.setSize(w, h)
      cam.aspect = w / h
      const isPortrait = w / h < 1

      if (isPortrait) {
        // Mobile portrait: rings float comfortably in upper 40%
        by = 1.38
        bs = Math.min(w / 400, 1) * 0.60
        cam.position.z = 8.6
      } else if (h < 640) {
        // Short landscape / mobile landscape
        by = 1.05
        bs = 0.54
        cam.position.z = 8.0
      } else {
        // Desktop / Tablet landscape:
        // Positioned in top half so it floats above the text cleanly
        by = 1.18
        bs = Math.min(h / 860, 1) * 0.74
        cam.position.z = 8.2
      }
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
      const targetY = targetRotation.y + tilt.x * 0.65 + t * 0.35
      const targetX = targetRotation.x + tilt.y * 0.35 + Math.sin(t * 0.5) * 0.12
      g.rotation.y += (targetY - g.rotation.y) * 0.05
      g.rotation.x += (targetX - g.rotation.x) * 0.05

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
          <span className="hero-name-line">{L('Shambhavi', 0)}</span>
          <span className="hero-name-line hero-line-second">
            <span className="ampersand">&amp;</span>
            {L('Aditya', 10)}
          </span>
        </h1>
        <div className="dt2">
          <span>12</span> &bull; <span>12</span> &bull; <span>2026</span>
        </div>
        <p className="hero-place">Mango Leaf Lake Resort &bull; Khadakwasla, Pune</p>
        <div className="hero-drag-hint">
          <span className="hint-icon">✦</span> Interactive 3D &bull; Tilt or Drag Rings <span className="hint-icon">✦</span>
        </div>
      </div>
    </section>
  )
}
