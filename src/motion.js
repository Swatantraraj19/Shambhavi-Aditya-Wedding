// shared pointer / phone-gyro tilt in range -1..1
export const tilt = {x:0,y:0}
const subs = new Set()
export const subscribe = f => (subs.add(f), () => subs.delete(f))
const emit = () => subs.forEach(f => f(tilt))
const clamp = v => Math.max(-1,Math.min(1,v))
let on = false
export function startMotion() {
  if (on) return; on = true
  addEventListener('pointermove', e => { tilt.x = e.clientX/innerWidth*2-1; tilt.y = e.clientY/innerHeight*2-1; emit() })
  const go = () => addEventListener('deviceorientation', e => {
    if (e.gamma == null) return
    tilt.x = clamp(e.gamma/30); tilt.y = clamp((e.beta-45)/30); emit() })
  const D = window.DeviceOrientationEvent
  if (D && D.requestPermission) D.requestPermission().then(s => s === 'granted' && go()).catch(()=>{})
  else go()
}
