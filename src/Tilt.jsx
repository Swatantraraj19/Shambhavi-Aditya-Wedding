import {useEffect,useRef} from 'react'
import {subscribe} from './motion'
export default function Tilt({children,max=8}) {
  const r = useRef()
  useEffect(() => subscribe(t => {
    const e = r.current
    if (e) e.style.transform = `perspective(900px) rotateY(${t.x*max}deg) rotateX(${-t.y*max}deg)`
  }), [max])
  return <div ref={r} className="tilt">{children}</div>
}
