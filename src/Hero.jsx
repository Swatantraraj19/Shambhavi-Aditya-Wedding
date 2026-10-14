import {useEffect,useRef} from 'react'
import * as THREE from 'three'
import {RoomEnvironment} from 'three/examples/jsm/environments/RoomEnvironment.js'
import {tilt} from './motion'

const L = (w,o) => [...w].map((c,i) => <span key={i} className="l s gold" aria-hidden="true" style={{'--i':i+o}}>{c===' '?'\u00a0':c}</span>)

export default function Hero() {
  const box = useRef()
  useEffect(() => {
    const el = box.current; let r
    try { r = new THREE.WebGLRenderer({antialias:true,alpha:true}) } catch { return }
    r.setPixelRatio(Math.min(devicePixelRatio,2)); r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.2
    el.appendChild(r.domElement)
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40,1,.1,60); cam.position.z = 8
    sc.environment = new THREE.PMREMGenerator(r).fromScene(new RoomEnvironment(),.04).texture
    const metal = c => new THREE.MeshStandardMaterial({color:c,metalness:1,roughness:.2})
    const g = new THREE.Group(); sc.add(g)
    const ring = (c,x,ry) => { const t = new THREE.Mesh(new THREE.TorusGeometry(1.15,.17,48,128),metal(c)); t.position.x = x; t.rotation.y = ry; g.add(t); return t }
    const r1 = ring(0xd9ad5a,-.62,.55), r2 = ring(0xeab9a2,.62,-.55)
    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(.26),new THREE.MeshStandardMaterial({color:0xffffff,metalness:.1,roughness:0,envMapIntensity:2.5}))
    gem.position.set(0,1.25,0); g.add(gem)
    const N = 420, pos = new Float32Array(N*3), spd = []
    for (let i=0;i<N;i++){ pos.set([(Math.random()-.5)*14,(Math.random()-.5)*12,(Math.random()-.5)*8],i*3); spd.push(.004+Math.random()*.01) }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position',new THREE.BufferAttribute(pos,3))
    const dust = new THREE.Points(geo,new THREE.PointsMaterial({color:0xf3d79a,size:.045,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}))
    sc.add(dust)
    let by = 0, bs = 1
    const size = () => { const w = el.clientWidth, h = el.clientHeight; r.setSize(w,h); cam.aspect = w/h
      const p = w/h < 1; by = p ? 1.5 : .2; bs = p ? .9 : 1.15; cam.updateProjectionMatrix() }
    size(); const ro = new ResizeObserver(size); ro.observe(el)
    let vis = true; const io = new IntersectionObserver(e => vis = e[0].isIntersecting); io.observe(el)
    let raf, t0 = performance.now()
    const loop = () => {
      raf = requestAnimationFrame(loop); if (!vis) return
      const t = (performance.now()-t0)/1000, pr = Math.min(scrollY/innerHeight,1)
      g.position.y = by + pr*1.3; g.scale.setScalar(bs*(1-pr*.35)); g.rotation.z = pr*1.4
      g.rotation.y += ((tilt.x*.7 + Math.sin(t*.4)*.35) - g.rotation.y)*.05
      g.rotation.x += ((tilt.y*.35) - g.rotation.x)*.05
      r1.rotation.x = t*.5; r2.rotation.x = -t*.5; gem.rotation.y = t
      const a = geo.attributes.position
      for (let i=0;i<N;i++){ let y = a.getY(i)-spd[i]; if (y<-6) y = 6; a.setY(i,y) }
      a.needsUpdate = true; dust.rotation.y = t*.03
      r.render(sc,cam)
    }
    loop()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); r.dispose(); r.domElement.remove() }
  }, [])
  return (
    <section className="hero">
      <div className="cv" ref={box} aria-hidden="true"/>
      <p>Together with their families</p>
      <h1 aria-label="Shambhavi and Aditya">{L('Shambhavi',0)}<br/>{L('& Aditya',9)}</h1>
      <div className="dt2">12 &middot; 12 &middot; 2026</div>
      <p>Pune, Maharashtra</p>
    </section>)
}
