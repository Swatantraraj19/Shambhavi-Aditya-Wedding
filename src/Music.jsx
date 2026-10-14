import { useEffect, useRef, useState } from 'react'

let audioHandle = null

export function playRoyalSoundtrack() {
  if (audioHandle && audioHandle.start) {
    audioHandle.start()
  }
}

export default function Music() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ctxRef = useRef(null)
  const masterGainRef = useRef(null)
  const loopTimeoutRef = useRef(null)

  const initAudio = () => {
    if (ctxRef.current) return
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    // Master warm lowpass filter to emulate acoustic temple acoustics
    const masterFilter = ctx.createBiquadFilter()
    masterFilter.type = 'lowpass'
    masterFilter.frequency.value = 1600
    masterFilter.Q.value = 1.2
    masterFilter.connect(master)

    // Reverb / Delay illusion network
    const delay = ctx.createDelay()
    delay.delayTime.value = 0.38
    const delayFeedback = ctx.createGain()
    delayFeedback.gain.value = 0.35
    const delayFilter = ctx.createBiquadFilter()
    delayFilter.frequency.value = 1200
    delay.connect(delayFilter)
    delayFilter.connect(delayFeedback)
    delayFeedback.connect(delay)
    delayFilter.connect(masterFilter)

    // 1. Warm Royal Tanpura Drone (Sa - Pa harmonic base: D3, A3, D4)
    const droneFreqs = [146.83, 220.0, 293.66, 440.0]
    droneFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = freq
      osc.detune.value = (idx - 1.5) * 5 // natural warm chorus detune
      g.gain.value = 0.035 / (idx + 1)
      osc.connect(g)
      g.connect(masterFilter)
      osc.start()
    })

    // Sub-bass warm pad
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()
    subOsc.type = 'sine'
    subOsc.frequency.value = 73.42 // D2
    subGain.gain.value = 0.04
    subOsc.connect(subGain)
    subGain.connect(masterFilter)
    subOsc.start()

    // 2. Auspicious Melodic Flute / Santoor Pentatonic Notes (Raga Yaman / Bhupali scale notes)
    // Notes in Hz: D4, E4, F#4, A4, B4, D5, E5
    const scale = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25]
    let step = 0
    const melodyLoop = () => {
      if (!ctx || ctx.state === 'closed') return
      const now = ctx.currentTime
      const noteFreq = scale[step % scale.length]
      step = (step + Math.floor(1 + Math.random() * 3)) % scale.length

      const osc = ctx.createOscillator()
      const noteGain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(noteFreq, now)

      // gentle vibrato
      const vib = ctx.createOscillator()
      const vibGain = ctx.createGain()
      vib.frequency.value = 4.8
      vibGain.gain.value = 4.5
      vib.connect(osc.frequency)
      vib.start(now)

      noteGain.gain.setValueAtTime(0.0001, now)
      noteGain.gain.linearRampToValueAtTime(0.045, now + 0.3)
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)

      osc.connect(noteGain)
      noteGain.connect(masterFilter)
      noteGain.connect(delay)
      osc.start(now)
      osc.stop(now + 2.5)
      vib.stop(now + 2.5)

      // Periodic temple chime bell
      if (Math.random() > 0.6) {
        const chime = ctx.createOscillator()
        const chimeGain = ctx.createGain()
        chime.type = 'triangle'
        chime.frequency.setValueAtTime(noteFreq * 2.5, now + 0.2)
        chimeGain.gain.setValueAtTime(0.015, now + 0.2)
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)
        chime.connect(chimeGain)
        chimeGain.connect(delay)
        chime.start(now + 0.2)
        chime.stop(now + 3.0)
      }

      const nextInterval = (1.6 + Math.random() * 1.8) * 1000
      loopTimeoutRef.current = setTimeout(melodyLoop, nextInterval)
    }

    melodyLoop()

    ctxRef.current = ctx
    masterGainRef.current = master
  }

  const startSound = () => {
    initAudio()
    const ctx = ctxRef.current
    const master = masterGainRef.current
    if (!ctx || !master) return
    if (ctx.state === 'suspended') ctx.resume()
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 1.8)
    setIsPlaying(true)
  }

  const stopSound = () => {
    const ctx = ctxRef.current
    const master = masterGainRef.current
    if (!ctx || !master) return
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2)
    setIsPlaying(false)
  }

  const toggle = () => {
    if (isPlaying) {
      stopSound()
    } else {
      startSound()
    }
  }

  useEffect(() => {
    audioHandle = {
      start: () => {
        if (!isPlaying) startSound()
      },
    }
    return () => {
      audioHandle = null
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
      if (ctxRef.current && ctxRef.current.state !== 'closed') {
        try {
          ctxRef.current.close()
        } catch {}
      }
    }
  }, [isPlaying])

  return (
    <button
      className={`royal-music-pill ${isPlaying ? 'playing' : ''}`}
      onClick={toggle}
      aria-label={isPlaying ? 'Mute royal soundtrack' : 'Play royal soundtrack'}
      title={isPlaying ? 'Mute Music' : 'Play Royal Shehnai Soundtrack'}
    >
      <div className="eq-bars" aria-hidden="true">
        <span className="eq-bar bar-1"></span>
        <span className="eq-bar bar-2"></span>
        <span className="eq-bar bar-3"></span>
        <span className="eq-bar bar-4"></span>
      </div>
      <span className="music-label">{isPlaying ? 'Royal Sangeet' : 'Music Off'}</span>
    </button>
  )
}
