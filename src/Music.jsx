import {useRef,useState} from 'react'
// soft generated wedding pad (no audio file needed)
export default function Music() {
  const [on,setOn] = useState(false), a = useRef()
  const toggle = () => {
    if (!a.current) {
      const c = new (window.AudioContext||window.webkitAudioContext)(), m = c.createGain(); m.gain.value = 0; m.connect(c.destination)
      const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.connect(m)
      ;[146.83,185,220,277.18,293.66,369.99].forEach((f,i)=>[0,1].forEach(k=>{
        const o = c.createOscillator(), g = c.createGain()
        o.type = i%2 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = (k?1:-1)*4; g.gain.value = .03
        o.connect(g).connect(lp); o.start() }))
      const l = c.createOscillator(), lg = c.createGain(); l.frequency.value = .08; lg.gain.value = 300; l.connect(lg).connect(lp.frequency); l.start()
      a.current = {c,m}
    }
    const {c,m} = a.current; c.resume(); m.gain.cancelScheduledValues(c.currentTime)
    m.gain.linearRampToValueAtTime(on?0:.6, c.currentTime+1.5); setOn(!on)
  }
  return <button className="mus" onClick={toggle} aria-label={on?'Mute music':'Play music'}>{on?'🔊':'🔇'}</button>
}
