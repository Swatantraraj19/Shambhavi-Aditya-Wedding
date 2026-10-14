import {useEffect,useRef,useState} from 'react'
import {DEFS,ARCH,ENG,WED} from './scenes'
import Hero from './Hero'
import Tilt from './Tilt'
import Music from './Music'
import {startMotion} from './motion'

const WA = '91XXXXXXXXXX' // <- WhatsApp number with country code
const MAP = 'https://www.google.com/maps/search/?api=1&query=Pune%2C+Maharashtra'
const ics = (t,d) => 'data:text/calendar;charset=utf8,' + encodeURIComponent(
  `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${t}\nDTSTART;VALUE=DATE:${d}\nLOCATION:Pune, Maharashtra\nEND:VEVENT\nEND:VCALENDAR`)

const Orn = () => <svg className="orn" viewBox="0 0 140 14"><use href="#orn"/></svg>

function Envelope() {
  const [open,setOpen] = useState(false), [gone,setGone] = useState(false)
  const tap = () => { startMotion(); setOpen(true); setTimeout(()=>document.body.classList.add('go'),2600); setTimeout(()=>setGone(true),4000) }
  if (gone) return null
  return (
    <section id="env" className={open?'open':''} aria-label="Wedding invitation envelope">
      <svg className="bg"><rect width="100%" height="100%" fill="url(#pat)"/></svg>
      <div id="c3"><div className="om foil" aria-hidden="true">&#2384;</div><div className="s foil">Shambhavi<br/>&amp; Aditya</div><small>12 &middot; 12 &middot; 2026</small></div>
      <div id="flap"><div/><svg style={{position:'absolute',inset:0,width:'100%',height:'100%',clipPath:'polygon(0 0,100% 0,50% 100%)'}}><rect width="100%" height="100%" fill="url(#pat)"/></svg></div>
      <button id="seal" className="s" onClick={tap} aria-label="Tap to open the invitation">S&amp;A</button>
      <div className="eh"><i>You are cordially invited to the wedding of</i><h1 className="s gold">Shambhavi &amp; Aditya</h1><i>Tap the seal to reveal</i></div>
    </section>)
}

function Petals() {
  const ref = useRef()
  useEffect(()=>{
    const c = ref.current, x = c.getContext('2d'); let P = [], raf
    const fit = () => { c.width = innerWidth; c.height = innerHeight }; fit(); addEventListener('resize',fit)
    const mk = (y,f) => ({x:Math.random()*c.width,y,r:2+Math.random()*4,v:(f?2.5:.45)+Math.random(),w:Math.random()*6,s:.02+Math.random()*.03,c:['#d4ad66','#e8b9a8','#b07a68'][Math.random()*3|0],f})
    for (let i=0;i<30;i++) P.push(mk(Math.random()*innerHeight))
    const burst = () => { for (let i=0;i<90;i++) P.push(mk(-Math.random()*400,true)) }
    addEventListener('burst',burst)
    const trail = e => { for (let i=0;i<2;i++) P.push({x:e.clientX+Math.random()*10-5,y:e.clientY+Math.random()*10-5,r:1.5+Math.random()*2,v:.6+Math.random()*.8,w:Math.random()*6,s:.05,c:'#f3d79a',f:true,l:28}) }
    addEventListener('pointermove',trail)
    const loop = () => {
      x.clearRect(0,0,c.width,c.height); P = P.filter(p=>!(p.f&&p.y>c.height)&&!(p.l!==undefined&&--p.l<0)); if (P.length>600) P.splice(30,40)
      P.forEach(p=>{ p.y+=p.v; p.w+=p.s; p.x+=Math.sin(p.w)*.7; x.globalAlpha=p.l!==undefined?Math.min(1,p.l/20):.75; x.fillStyle=p.c
        x.beginPath(); x.ellipse(p.x,p.y,p.r,p.r*.55,p.w,0,7); x.fill()
        if (p.y>c.height+8&&!p.f){ p.y=-8; p.x=Math.random()*c.width } })
      raf = requestAnimationFrame(loop) }
    loop()
    return ()=>{ cancelAnimationFrame(raf); removeEventListener('resize',fit); removeEventListener('burst',burst); removeEventListener('pointermove',trail) }
  },[])
  return <canvas id="pt" ref={ref} aria-hidden="true"/>
}

function Reveal() {
  const box = useRef(), cv = useRef(), [gone,setGone] = useState(false)
  useEffect(()=>{
    const c = cv.current; if (!c) return
    const b = box.current.getBoundingClientRect(); c.width = b.width; c.height = b.height
    const x = c.getContext('2d'), g = x.createLinearGradient(0,0,b.width,b.height)
    ;['#9a6c2b','#f6e2b0','#c0914a','#fbe9bb','#a9782f'].forEach((k,i)=>g.addColorStop(i/4,k))
    x.fillStyle = g; x.fillRect(0,0,b.width,b.height)
    for (let i=0;i<260;i++){ x.fillStyle=`rgba(255,255,255,${Math.random()*.35})`; x.fillRect(Math.random()*b.width,Math.random()*b.height,1+Math.random()*2,1+Math.random()*2) }
    x.fillStyle='#5b1f2e'; x.font='600 22px Cormorant Garamond,serif'; x.textAlign='center'
    x.fillText('\u2665 Scratch to reveal \u2665',b.width/2,b.height/2+6); x.globalCompositeOperation='destination-out'
    let drawing=false, done=false
    const pos = e => { const q=c.getBoundingClientRect(), t=e.touches?e.touches[0]:e; return [t.clientX-q.left,t.clientY-q.top] }
    const go = e => {
      if (!drawing||done) return; e.preventDefault()
      const [a,d]=pos(e); x.beginPath(); x.arc(a,d,24,0,7); x.fill()
      const m=x.getImageData(0,0,c.width,c.height).data; let n=0
      for (let i=3;i<m.length;i+=64) if(!m[i]) n++
      if (n/(m.length/64)>.45){ done=true; c.style.opacity=0; setTimeout(()=>setGone(true),1000); dispatchEvent(new Event('burst')) } }
    const ev = [['mousedown',e=>{drawing=true;go(e)}],['touchstart',e=>{drawing=true;go(e)}],['mousemove',go],['touchmove',go],
      ['mouseup',()=>drawing=false],['mouseleave',()=>drawing=false],['touchend',()=>drawing=false]]
    ev.forEach(([n,f])=>c.addEventListener(n,f,{passive:false}))
    return ()=>ev.forEach(([n,f])=>c.removeEventListener(n,f))
  },[])
  return (
    <div className="rv" ref={box}>
      <div className="dt"><b className="foil">12</b><b className="foil">December</b><b className="foil">2026</b></div>
      <small>Saturday &middot; Pune, Maharashtra</small>
      {!gone && <canvas ref={cv} aria-hidden="true"/>}
    </div>)
}

function Countdown() {
  const f = () => new Date('2026-12-12T00:00:00+05:30') - new Date()
  const [t,setT] = useState(f)
  useEffect(()=>{ const i=setInterval(()=>setT(f()),1000); return ()=>clearInterval(i) },[])
  if (t<=0) return <div className="cd">Today is the day!</div>
  const v = [['Days',Math.floor(t/864e5)],['Hours',Math.floor(t/36e5)%24],['Mins',Math.floor(t/6e4)%60],['Secs',Math.floor(t/1e3)%60]]
  return <div className="cd">{v.map(([l,n])=><div key={l}><b>{n}</b>{l}</div>)}</div>
}

function Event({svg,title,day,date,file,shadow}) {
  const sh = shadow ? {textShadow:'0 1px 6px #0006'} : {}
  return (
    <Tilt max={7}><div className="ev">
      <span dangerouslySetInnerHTML={{__html:svg}}/>
      <div className="t"><h3 className="s gold">{title}</h3><p style={{fontSize:'1.5rem',...sh}}>{day}</p><p style={sh}>Pune, Maharashtra</p></div>
      <div className="sp"/>
      <div className="bt">
        <a className="b" href={ics('Shambhavi & Aditya '+title,date)} download={file}>Add to calendar</a>
        <a className="b" href={MAP} target="_blank" rel="noopener noreferrer">View location</a>
      </div>
    </div></Tilt>)
}

function Rsvp() {
  const submit = e => {
    e.preventDefault(); const f = new FormData(e.target)
    const msg = `RSVP - Shambhavi & Aditya\nName: ${f.get('nm')}\nResponse: ${f.get('at')}\nGuests: ${f.get('gs')}\nEvents: ${f.getAll('ev').join(', ')||'-'}\nNote: ${f.get('mg')}`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank')
  }
  return (
    <div className="glass">
      <h2 className="s foil">Will you join us?</h2>
      <form onSubmit={submit}>
        <div><label htmlFor="nm">Your name</label><input id="nm" name="nm" required autoComplete="name"/></div>
        <div><label htmlFor="at">Your response</label><select id="at" name="at"><option>Joyfully accept</option><option>Regretfully decline</option></select></div>
        <div><label htmlFor="gs">Party size</label><input id="gs" name="gs" type="number" min="1" max="10" defaultValue="1"/></div>
        <div><label>Events you'll attend</label><div className="ch">
          <label><input type="checkbox" name="ev" value="Engagement" defaultChecked/>Engagement</label>
          <label><input type="checkbox" name="ev" value="Wedding" defaultChecked/>Wedding</label></div></div>
        <div><label htmlFor="mg">Leave us a note</label><textarea id="mg" name="mg" rows="3" placeholder="Words for the couple"/></div>
        <button className="b p" type="submit">Send love</button>
      </form>
    </div>)
}

export default function App() {
  return (<>
    <div dangerouslySetInnerHTML={{__html:DEFS}}/>
    <Envelope/><Petals/><Music/>
    <main>
      <Hero/>
      <section className="sec"><Tilt max={6}><div className="glass">
        <div className="om gold" aria-hidden="true">&#2384;</div><Orn/>
        <p style={{fontStyle:'italic',margin:'.4em 0'}}>With the blessings of our elders<br/>we joyfully invite you to celebrate the wedding of</p>
        <div className="names s foil">Shambhavi</div><small>Daughter of Mr. &amp; Mrs. ______</small>
        <div className="s gold" style={{fontSize:'2.6rem',lineHeight:1.3}}>&amp;</div>
        <div className="names s foil">Aditya</div><small>Son of Mr. &amp; Mrs. ______</small>
        <div className="arch" dangerouslySetInnerHTML={{__html:ARCH}}/>
      </div></Tilt></section>
      <section className="sec">
        <small className="s" style={{fontSize:'1.6rem'}}>Save the date</small>
        <h2 className="s foil">Reveal Our Big Day</h2><p>Scratch the card to reveal the date</p>
        <Reveal/><Countdown/>
        <p className="s foil" style={{fontSize:'2rem',marginTop:18}}>The start of a beautiful journey&hellip;</p>
      </section>
      <section className="sec">
        <h2 className="s foil">The Celebrations</h2>
        <Event svg={ENG} title="Engagement" day="Friday · 11 December 2026" date="20261211" file="engagement.ics"/>
        <Event svg={WED} title="Wedding Ceremony" day="Saturday · 12 December 2026" date="20261212" file="wedding.ics" shadow/>
      </section>
      <section className="sec"><Rsvp/></section>
    </main>
    <footer><div className="names s gold">Shambhavi<br/>&amp;<br/>Aditya</div><Orn/><p style={{fontStyle:'italic'}}>12 December 2026 &middot; Pune</p><a className="b" style={{marginTop:16}} target="_blank" rel="noopener noreferrer" href={'https://wa.me/?text='+encodeURIComponent("You're invited to Shambhavi & Aditya's wedding! "+location.href)}>Share this invitation</a></footer>
  </>)
}
