import { useEffect, useRef, useState } from 'react'
import { DEFS, SANGEET, HALDI, WEDDING, RECEPTION } from './scenes'
import Hero from './Hero'
import Tilt from './Tilt'
import { startMotion } from './motion'

const VENUE_NAME = 'Mango Leaf Lake Resort'
const VENUE_CITY = 'NDA Road, near Malai Mata Temple, Khadakwadi, Khadakwasla, Pune, Maharashtra 411023'
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Mango+Leaf+Lake+Resort+NDA+Road+near+Malai+Mata+Temple+Khadakwadi+Khadakwasla+Pune+411023'

const makeIcs = (title, date, startTime, endTime, desc) =>
  'data:text/calendar;charset=utf8,' +
  encodeURIComponent(
    `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Shambhavi Aditya Wedding//EN\nBEGIN:VEVENT\nSUMMARY:${title}\nDESCRIPTION:${desc}\nLOCATION:${VENUE_NAME}, ${VENUE_CITY}\nDTSTART:${date}T${startTime}00\nDTEND:${date}T${endTime}00\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`
  )

const Orn = () => (
  <svg className="orn" viewBox="0 0 300 24" aria-hidden="true">
    <use href="#orn" />
  </svg>
)

function Envelope() {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  const handleOpen = () => {
    startMotion()
    setOpen(true)
    setTimeout(() => {
      document.body.classList.add('go')
      window.dispatchEvent(new Event('burst'))
    }, 3200)
    setTimeout(() => setGone(true), 4800)
  }

  if (gone) return null

  return (
    <section id="env" className={open ? 'open' : ''} aria-label="Royal Wedding Invitation Envelope">
      <svg className="bg" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#pat)" />
      </svg>

      <div id="c3">
        <div className="card-cameo">
          <img src="/images/sam-ad-1.jpg" alt="Shambhavi & Aditya" className="cameo-img" />
        </div>
        <div className="card-shloka">॥ श्री गणेशाय नमः ॥</div>
        <div className="royal-name foil card-title">
          Shambhavi
          <br />
          <span className="and-symbol">&amp;</span>
          <br />
          Aditya
        </div>
        <div className="card-divider" />
        <small className="card-date">12 &bull; 12 &bull; 2026</small>
        <span className="card-venue">KHADAKWASLA &bull; PUNE</span>
      </div>

      <div id="flap">
        <div />
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          }}
        >
          <rect width="100%" height="100%" fill="url(#pat)" />
        </svg>
      </div>

      <button id="seal" className="s" onClick={handleOpen} aria-label="Tap to break the seal and open invitation">
        <div className="seal-ring"></div>
        <div className="seal-text">S &amp; A</div>
      </button>

      <div className="eh">
        <div className="shloka-header">॥ ॐ श्री गणेशाय नमः ॥</div>
        <i>You are warmly invited to celebrate the royal wedding of</i>
        <h1 className="royal-name gold main-title">Shambhavi &amp; Aditya</h1>
        <p className="tap-hint">
          <span className="pulse-dot"></span> Tap the wax seal to open <span className="pulse-dot"></span>
        </p>
      </div>

    </section>
  )
}

function Petals() {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current
    if (!c) return
    const x = c.getContext('2d')
    let P = []
    let raf

    const fit = () => {
      c.width = window.innerWidth
      c.height = window.innerHeight
    }
    fit()
    window.addEventListener('resize', fit)

    // Palette: Gold, Crimson Rose, Blush Pink, Saffron Yellow
    const colors = ['#e6af2e', '#c41e3a', '#e07a5f', '#f4a261', '#f6e2b0', '#ffccd5']
    const mk = (y, isBurst) => ({
      x: Math.random() * c.width,
      y,
      r: 2.2 + Math.random() * 4.5,
      v: (isBurst ? 3.5 : 0.6) + Math.random() * 1.2,
      w: Math.random() * 6.28,
      s: 0.02 + Math.random() * 0.035,
      c: colors[Math.floor(Math.random() * colors.length)],
      isBurst,
    })

    // Ambient falling petals
    for (let i = 0; i < 35; i++) {
      P.push(mk(Math.random() * window.innerHeight, false))
    }

    const burst = () => {
      for (let i = 0; i < 110; i++) {
        P.push(mk(-Math.random() * 450, true))
      }
    }
    window.addEventListener('burst', burst)

    // Sparkle trail on pointer move & touch
    const trail = e => {
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : null)
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : null)
      if (clientX == null) return
      for (let i = 0; i < 2; i++) {
        P.push({
          x: clientX + Math.random() * 14 - 7,
          y: clientY + Math.random() * 14 - 7,
          r: 1.8 + Math.random() * 2.2,
          v: 0.6 + Math.random() * 0.9,
          w: Math.random() * 6,
          s: 0.06,
          c: Math.random() > 0.4 ? '#fde047' : '#ffd166',
          isBurst: true,
          life: 30,
        })
      }
    }

    window.addEventListener('pointermove', trail)
    window.addEventListener('touchmove', trail, { passive: true })

    const loop = () => {
      x.clearRect(0, 0, c.width, c.height)
      P = P.filter(p => !(p.isBurst && p.y > c.height) && !(p.life !== undefined && --p.life < 0))
      if (P.length > 600) P.splice(35, 45)

      P.forEach(p => {
        p.y += p.v
        p.w += p.s
        p.x += Math.sin(p.w) * 0.85
        x.globalAlpha = p.life !== undefined ? Math.min(1, p.life / 20) : 0.8
        x.fillStyle = p.c
        x.beginPath()
        x.ellipse(p.x, p.y, p.r, p.r * 0.58, p.w, 0, 6.28)
        x.fill()

        if (p.y > c.height + 10 && !p.isBurst) {
          p.y = -10
          p.x = Math.random() * c.width
        }
      })
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
      window.removeEventListener('burst', burst)
      window.removeEventListener('pointermove', trail)
      window.removeEventListener('touchmove', trail)
    }
  }, [])

  return <canvas id="pt" ref={ref} aria-hidden="true" />
}

function Reveal() {
  const box = useRef()
  const cv = useRef()
  const [gone, setGone] = useState(false)
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const c = cv.current
    if (!c) return
    const b = box.current.getBoundingClientRect()
    c.width = b.width
    c.height = b.height
    const x = c.getContext('2d')

    // Luxurious 24K Gold Foil leaf gradient
    const g = x.createLinearGradient(0, 0, b.width, b.height)
    ;['#b38728', '#fbf5b7', '#d4af37', '#fcf6ba', '#aa771c'].forEach((k, i) => g.addColorStop(i / 4, k))
    x.fillStyle = g
    x.fillRect(0, 0, b.width, b.height)

    // Sparkle flecks on gold foil
    for (let i = 0; i < 300; i++) {
      x.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.45})`
      x.fillRect(Math.random() * b.width, Math.random() * b.height, 1.5 + Math.random() * 2, 1.5 + Math.random() * 2)
    }

    x.fillStyle = '#400c19'
    x.font = '700 17px Cinzel, serif'
    x.textAlign = 'center'
    x.fillText('✦ SCRATCH WITH LOVE ✦', b.width / 2, b.height / 2 - 8)
    x.font = 'italic 16px Cormorant Garamond, serif'
    x.fillText('Rub with your finger or cursor to reveal the date', b.width / 2, b.height / 2 + 16)

    x.globalCompositeOperation = 'destination-out'

    let drawing = false
    let done = false

    const pos = e => {
      const q = c.getBoundingClientRect()
      const t = e.touches ? e.touches[0] : e
      return [t.clientX - q.left, t.clientY - q.top]
    }

    const scratch = e => {
      if (!drawing || done) return
      if (e.cancelable) e.preventDefault()
      const [a, d] = pos(e)
      x.beginPath()
      x.arc(a, d, 26, 0, 6.28)
      x.fill()

      // Calculate scratched ratio
      const m = x.getImageData(0, 0, c.width, c.height).data
      let transparentCount = 0
      for (let i = 3; i < m.length; i += 64) {
        if (!m[i]) transparentCount++
      }
      const ratio = transparentCount / (m.length / 64)
      setPercent(Math.min(100, Math.round(ratio * 220)))

      if (ratio > 0.45 && !done) {
        done = true
        c.style.opacity = '0'
        setTimeout(() => setGone(true), 900)
        window.dispatchEvent(new Event('burst'))
      }
    }

    const events = [
      ['mousedown', e => { drawing = true; scratch(e) }],
      ['touchstart', e => { drawing = true; scratch(e) }],
      ['mousemove', scratch],
      ['touchmove', scratch],
      ['mouseup', () => (drawing = false)],
      ['mouseleave', () => (drawing = false)],
      ['touchend', () => (drawing = false)],
    ]
    events.forEach(([n, f]) => c.addEventListener(n, f, { passive: false }))
    return () => events.forEach(([n, f]) => c.removeEventListener(n, f))
  }, [])

  return (
    <div className="rv" ref={box}>
      <div className="reveal-badge">Auspicious Wedding Muhurat</div>
      <div className="dt">
        <b className="gold date-num">12</b>
        <b className="gold date-month">December</b>
        <b className="gold date-year">2026</b>
      </div>
      <small className="date-sub">
        Saturday &bull; 11:00 AM &bull; Pune, Maharashtra
      </small>
      {!gone && (
        <>
          <canvas ref={cv} aria-hidden="true" />
          {percent > 5 && <div className="scratch-indicator">{percent}% Revealed</div>}
        </>
      )}
    </div>
  )
}

function Countdown() {
  const calculateTime = () => new Date('2026-12-12T11:00:00+05:30') - new Date()
  const [timeLeft, setTimeLeft] = useState(calculateTime)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (timeLeft <= 0) {
    return <div className="cd-celebrate">✨ The Royal Celebrations Have Begun! ✨</div>
  }

  const units = [
    ['DAYS', Math.floor(timeLeft / 864e5)],
    ['HOURS', Math.floor(timeLeft / 36e5) % 24],
    ['MINS', Math.floor(timeLeft / 6e4) % 60],
    ['SECS', Math.floor(timeLeft / 1e3) % 60],
  ]

  return (
    <div className="cd">
      {units.map(([label, val]) => (
        <div key={label} className="cd-box">
          <b className="cd-val">{String(val).padStart(2, '0')}</b>
          <span className="cd-lbl">{label}</span>
        </div>
      ))}
    </div>
  )
}

function CeremonyCard({ svg, title, time, dateStr, dateIcs, startIcs, endIcs, file, attire, desc }) {
  return (
    <Tilt max={8}>
      <div className="ev">
        <span dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="ev-content">
          <div className="ev-badge">Royal Celebration</div>
          <h3 className="s gold ev-title">{title}</h3>
          <div className="ev-time">
            <span className="time-icon">🕐</span> {time}
          </div>
          <div className="ev-date">{dateStr}</div>
          <p className="ev-venue">Mango Leaf Lake Resort &bull; Khadakwasla, Pune</p>
          <div className="ev-attire">
            <span className="attire-tag">Dress Code:</span> {attire}
          </div>
          <div className="ev-actions">
            <a className="b b-map" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              📍 View Location
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  )
}


function VenueGuide() {
  return (
    <section className="sec venue-sec">
      <small className="section-eyebrow">HOSPITALITY &amp; VENUE</small>
      <h2 className="s foil">The Venue &amp; Stay</h2>
      <Orn />
      <div className="glass venue-info-card">
        <h3 className="venue-title">Mango Leaf Lake Resort</h3>
        <p className="venue-address">NDA Road, near Malai Mata Temple, Khadakwadi, Khadakwasla, Pune, Maharashtra 411023</p>

        <div className="venue-grid">
          <div className="venue-item">
            <span className="v-icon">✈️</span>
            <b>Airport Access</b>
            <span>~1 hr 30 mins from Pune International Airport (PNQ)</span>
          </div>
          <div className="venue-item">
            <span className="v-icon">🚆</span>
            <b>Railway Station</b>
            <span>~1 hour from Pune Junction Railway Station</span>
          </div>
        </div>

        <div className="venue-btn-wrap">
          <a className="b p" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
            📍 Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const shareInvitation = () => {
    const text = `🌸 You're warmly invited to celebrate the royal wedding of Shambhavi & Aditya! 🌸\n\n📅 11 & 12 December 2026\n📍 Pune, Maharashtra\n\nExperience our interactive wedding invitation card here:\n${window.location.href}`
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: DEFS }} />
      <Envelope />
      <Petals />

      <main>
        <Hero />

        {/* A Promise of Forever Feature */}
        <section className="sec">
          <div className="couple-moment-feature glass">
            <div className="moment-img-frame">
              <img src="/images/sam-ad-1.jpg" alt="Shambhavi & Aditya together" className="moment-img" />
            </div>
            <p className="moment-quote">
              &ldquo;Two souls, one sacred journey. Blessed by our families, united forever in love.&rdquo;
            </p>
            <div className="moment-names royal-name gold">Shambhavi &amp; Aditya</div>
          </div>
        </section>

        {/* Save the Date & Scratch Card */}
        <section className="sec">
          <small className="section-eyebrow">SAVE THE DATE</small>
          <h2 className="s foil">A Sacred Milestone</h2>
          <p>Scratch the 24K gold card below with your finger or cursor</p>
          <Reveal />
          <Countdown />
          <p className="s gold journey-quote">
            "When two souls are destined to meet, the universe conspires to create magic."
          </p>
        </section>

        {/* The Wedding Celebrations */}
        <section className="sec celebrations-sec">
          <small className="section-eyebrow">WEDDING ITINERARY</small>
          <h2 className="s foil">The Celebrations</h2>
          <p>Auspicious gatherings of sacred rituals, music, and unforgettable joy</p>
          <Orn />

          <CeremonyCard
            svg={SANGEET}
            title="Engagement & Tilak, Haldi, Sangeet"
            time="Celebrations Onwards"
            dateStr="Friday · 11 December 2026"
            dateIcs="20261211"
            startIcs="1600"
            endIcs="2330"
            file="celebrations_day1.ics"
            attire="Festive Traditional & Ethnic Elegance"
            desc="An auspicious and joyous gathering of Engagement & Tilak, Haldi blessings, and vibrant Sangeet celebrations."
          />

          <CeremonyCard
            svg={WEDDING}
            title="Mangalashtak, Grit Dhari & Wedding"
            time="11:00 AM Onwards"
            dateStr="Saturday · 12 December 2026"
            dateIcs="20261212"
            startIcs="1100"
            endIcs="1600"
            file="wedding_day2.ics"
            attire="Royal Indian Heritage & Traditional Attire"
            desc="The sacred rituals of Mangalashtak, Grit Dhari, Saat Phere, and the holy Vivah Sanskar."
          />
        </section>

        {/* Venue & Travel Guide */}
        <VenueGuide />


      </main>

      <footer>
        <div className="shloka-mini">॥ शुभ विवाह ॥</div>
        <div className="names royal-name gold footer-names">
          Shambhavi
          <br />
          <span style={{ fontSize: '2.5rem' }}>&amp;</span>
          <br />
          Aditya
        </div>
        <Orn />
        <p className="footer-date">11 &bull; 12 December 2026 &bull; Pune</p>
        <p className="footer-tagline">
          Warmly awaiting your presence with love.
        </p>

        <button className="b p share-btn" onClick={shareInvitation}>
          📲 Share Invitation on WhatsApp
        </button>
      </footer>
    </>
  )
}
