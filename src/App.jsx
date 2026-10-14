import { useEffect, useRef, useState } from 'react'
import { DEFS, ARCH, SANGEET, HALDI, WEDDING, RECEPTION } from './scenes'
import Hero from './Hero'
import Tilt from './Tilt'
import Music, { playRoyalSoundtrack } from './Music'
import { startMotion } from './motion'

const VENUE_NAME = 'The Grand Ballroom, JW Marriott'
const VENUE_CITY = 'Senapati Bapat Road, Pune, Maharashtra 411053'
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=JW+Marriott+Hotel+Pune+Senapati+Bapat+Road'

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
    playRoyalSoundtrack()
    setOpen(true)
    setTimeout(() => {
      document.body.classList.add('go')
      window.dispatchEvent(new Event('burst'))
    }, 2400)
    setTimeout(() => setGone(true), 4200)
  }

  if (gone) return null

  return (
    <section id="env" className={open ? 'open' : ''} aria-label="Royal Wedding Invitation Envelope">
      <svg className="bg" aria-hidden="true">
        <rect width="100%" height="100%" fill="url(#pat)" />
      </svg>

      <div id="c3">
        <div className="card-cameo">
          <img src="/images/couple.jpg" alt="Shambhavi & Aditya" className="cameo-img" />
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
        <span className="card-venue">PUNE &bull; MAHARASHTRA</span>
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
        <i>You are cordially invited to celebrate the royal wedding of</i>
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
        <b className="foil date-num">12</b>
        <b className="foil date-month">December</b>
        <b className="foil date-year">2026</b>
      </div>
      <small className="date-sub">
        Saturday &bull; Godhuli Bela (6:30 PM) &bull; Pune, Maharashtra
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
  const calculateTime = () => new Date('2026-12-12T18:30:00+05:30') - new Date()
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

function LoveStory() {
  const milestones = [
    {
      year: 'Autumn 2022',
      tag: 'The First Spark',
      title: 'Coffee & Endless Conversations',
      desc: 'In the charming cafes of Pune, two worlds collided. What was meant to be a polite hour turned into four hours of non-stop laughter and discovering soulmates in each other.',
      icon: '☕',
    },
    {
      year: 'Winter 2024',
      tag: 'Growing in Love',
      title: 'Adventures & Quiet Moments',
      desc: 'From trekking the Sahyadri hills to celebrating Diwali together, every memory made it clear that life was infinitely brighter hand-in-hand.',
      icon: '✨',
    },
    {
      year: 'Spring 2025',
      tag: 'The Proposal',
      title: 'Under a Sky Full of Stars',
      desc: 'On a starlit terrace overlooking the valley, Aditya knelt down with trembling hands and a heartfelt promise. With tears of joy, Shambhavi said YES!',
      icon: '💍',
    },
    {
      year: '12 December 2026',
      tag: 'Forever Begins',
      title: 'Two Families, One Heart',
      desc: 'Surrounded by the warmth of our beloved parents, elders, and dear friends, we step into our forever with love, laughter, and lifelong devotion.',
      icon: '🌺',
    },
  ]

  return (
    <section className="sec story-sec">
      <small className="section-eyebrow">OUR JOURNEY</small>
      <h2 className="s foil">How Love Unfolded</h2>
      <Orn />
      <div className="timeline">
        {milestones.map((m, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-marker">
              <span className="timeline-icon">{m.icon}</span>
            </div>
            <div className="timeline-card">
              <div className="timeline-head">
                <span className="timeline-year">{m.year}</span>
                <span className="timeline-tag">{m.tag}</span>
              </div>
              <h3 className="timeline-title">{m.title}</h3>
              <p className="timeline-desc">{m.desc}</p>
            </div>
          </div>
        ))}
      <div className="couple-moment-feature glass">
        <div className="moment-img-frame">
          <img src="/images/couple.jpg" alt="Shambhavi & Aditya together" className="moment-img" />
          <div className="moment-overlay-badge">A PROMISE OF FOREVER</div>
        </div>
        <p className="moment-quote">
          &ldquo;Two souls, one sacred journey. Blessed by our families, united forever in love.&rdquo;
        </p>
        <div className="moment-names royal-name gold">Shambhavi &amp; Aditya</div>
      </div>
    </section>
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
          <p className="ev-venue">The Grand Ballroom &bull; JW Marriott, Pune</p>
          <div className="ev-attire">
            <span className="attire-tag">Dress Code:</span> {attire}
          </div>
          <div className="ev-actions">
            <a
              className="b b-cal"
              href={makeIcs(`Shambhavi & Aditya: ${title}`, dateIcs, startIcs, endIcs, desc)}
              download={file}
            >
              📅 Add to Calendar
            </a>
            <a className="b b-map" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              📍 View Location
            </a>
          </div>
        </div>
      </div>
    </Tilt>
  )
}

function GuestWishes() {
  const [wishes, setWishes] = useState([
    {
      name: 'Priya & Rohan Sharma',
      relation: "Bride's Best Friend",
      msg: 'Wishing Shambhavi and Aditya a lifetime of endless laughter, joy, and blessings! Can’t wait to dance at the Sangeet! 🎉❤️',
      time: 'Just now',
    },
    {
      name: 'Deepak & Sunita Kulkarni',
      relation: 'Family Elders',
      msg: 'May God shower both of you with health, prosperity, and eternal togetherness. Blessed to be part of this celebration! 🌸🙏',
      time: '1 hour ago',
    },
    {
      name: 'Karan & The College Squad',
      relation: "Groom's Crew",
      msg: 'Aditya found his queen! Get ready for the wildest Baraat Pune has ever seen! Lots of love to you both! 🥂🔥',
      time: '2 hours ago',
    },
  ])

  const [name, setName] = useState('')
  const [relation, setRelation] = useState('')
  const [msg, setMsg] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handlePost = e => {
    e.preventDefault()
    if (!name.trim() || !msg.trim()) return
    const newWish = {
      name: name.trim(),
      relation: relation.trim() || 'Well Wisher',
      msg: msg.trim(),
      time: 'Just now',
    }
    setWishes([newWish, ...wishes])
    setName('')
    setRelation('')
    setMsg('')
    setSubmitted(true)
    window.dispatchEvent(new Event('burst'))
    setTimeout(() => setSubmitted(false), 3500)
  }

  return (
    <section className="sec wishes-sec">
      <small className="section-eyebrow">BLESSINGS &amp; WISHES</small>
      <h2 className="s foil">Words of Love</h2>
      <p className="wishes-intro">Leave your heartfelt blessing for the bride and groom</p>
      <Orn />

      <form className="wishes-form glass" onSubmit={handlePost}>
        <div className="form-row">
          <div>
            <label htmlFor="w-name">Your Full Name</label>
            <input
              id="w-name"
              required
              placeholder="e.g. Ananya Verma"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="w-rel">Relation / Group</label>
            <input
              id="w-rel"
              placeholder="e.g. College Friend, Cousin"
              value={relation}
              onChange={e => setRelation(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="w-msg">Your Blessing / Message</label>
          <textarea
            id="w-msg"
            rows="3"
            required
            placeholder="Share your warm wishes, advice, or love for the couple..."
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
        </div>
        <button className="b p submit-btn" type="submit">
          ✨ Send Your Blessing
        </button>
        {submitted && <div className="wish-success">Thank you! Your blessing was posted with love ❤️</div>}
      </form>

      <div className="wishes-list">
        {wishes.map((w, i) => (
          <div key={i} className="wish-card">
            <div className="wish-header">
              <div>
                <b className="wish-author">{w.name}</b>
                <span className="wish-rel"> &bull; {w.relation}</span>
              </div>
              <span className="wish-time">{w.time}</span>
            </div>
            <p className="wish-body">"{w.msg}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}


function VenueGuide() {
  return (
    <section className="sec venue-sec">
      <small className="section-eyebrow">HOSPITALITY &amp; VENUE</small>
      <h2 className="s foil">The Venue &amp; Stay</h2>
      <Orn />
      <div className="glass venue-info-card">
        <h3 className="venue-title">The Grand Ballroom &bull; JW Marriott</h3>
        <p className="venue-address">Senapati Bapat Road, Pune, Maharashtra 411053</p>

        <div className="venue-grid">
          <div className="venue-item">
            <span className="v-icon">✈️</span>
            <b>Airport Access</b>
            <span>25 mins from Pune International Airport (PNQ)</span>
          </div>
          <div className="venue-item">
            <span className="v-icon">🚆</span>
            <b>Railway Station</b>
            <span>15 mins from Pune Junction Railway Station</span>
          </div>
          <div className="venue-item">
            <span className="v-icon">🚗</span>
            <b>Valet &amp; Parking</b>
            <span>Complimentary 24/7 valet parking for all guests</span>
          </div>
          <div className="venue-item">
            <span className="v-icon">🏨</span>
            <b>Guest Accommodations</b>
            <span>Deluxe suites reserved for our traveling family &amp; friends</span>
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
    const text = `🌸 You're cordially invited to celebrate the royal wedding of Shambhavi & Aditya! 🌸\n\n📅 11 & 12 December 2026\n📍 Pune, Maharashtra\n\nExperience our interactive wedding invitation card here:\n${window.location.href}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: DEFS }} />
      <Envelope />
      <Petals />
      <Music />

      <main>
        <Hero />

        {/* Sacred Invocation & Family Welcome */}
        <section className="sec">
          <Tilt max={6}>
            <div className="glass royal-card">
              <div className="om gold" aria-hidden="true">
                &#2384;
              </div>
              <div className="shloka-box">
                <p className="sanskrit-shloka">
                  ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
                  <br />
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </p>
              </div>
              <Orn />
              <p className="welcome-intro">
                With the divine blessings of Almighty &amp; our respected elders,
                <br />
                we joyfully invite you and your family to celebrate the sacred union of
              </p>

              <div className="couple-showcase">
                <div className="person-block">
                  <div className="portrait-arch">
                    <img src="/images/shambhavi.jpg" alt="Shambhavi - The Bride" className="person-img" />
                    <div className="portrait-filigree"></div>
                  </div>
                  <div className="person-role">THE BRIDE</div>
                  <div className="names royal-name foil">Shambhavi</div>
                  <small className="family-line">Daughter of Smt. Sunita &amp; Shri Rajesh Sharma</small>
                </div>

                <div className="couple-center-divider">
                  <svg className="sacred-kalash" viewBox="0 0 50 60" width="36" height="44"><use href="#kalash" /></svg>
                  <div className="royal-name gold couple-amp">&amp;</div>
                  <svg className="sacred-diya" viewBox="0 0 40 35" width="32" height="28"><use href="#diya" /></svg>
                </div>

                <div className="person-block">
                  <div className="portrait-arch">
                    <img src="/images/aditya.jpg" alt="Aditya - The Groom" className="person-img" />
                    <div className="portrait-filigree"></div>
                  </div>
                  <div className="person-role">THE GROOM</div>
                  <div className="names royal-name foil">Aditya</div>
                  <small className="family-line">Son of Smt. Meenakshi &amp; Shri Sanjay Singhania</small>
                </div>
              </div>

              <div className="arch-wrap">
                <div className="arch" dangerouslySetInnerHTML={{ __html: ARCH }} />
              </div>

            </div>
          </Tilt>
        </section>

        {/* Our Love Story */}
        <LoveStory />

        {/* Save the Date & Scratch Card */}
        <section className="sec">
          <small className="section-eyebrow">SAVE THE DATE</small>
          <h2 className="s foil">A Sacred Milestone</h2>
          <p>Scratch the 24K gold card below with your finger or cursor</p>
          <Reveal />
          <Countdown />
          <p className="s foil journey-quote">
            "When two souls are destined to meet, the universe conspires to create magic."
          </p>
        </section>

        {/* The 4 Celebrations */}
        <section className="sec celebrations-sec">
          <small className="section-eyebrow">WEDDING ITINERARY</small>
          <h2 className="s foil">The Celebrations</h2>
          <p>Four enchanting gatherings of music, rituals, and unforgettable joy</p>
          <Orn />

          <CeremonyCard
            svg={SANGEET}
            title="Mehendi & Sangeet Carnival"
            time="6:00 PM Onwards"
            dateStr="Friday · 11 December 2026"
            dateIcs="20261211"
            startIcs="1800"
            endIcs="2330"
            file="sangeet.ics"
            attire="Indo-Western Glitz & Starlight Sparkles"
            desc="An evening of vibrant henna, soulful music, and high-energy dance performances by friends and family."
          />

          <CeremonyCard
            svg={HALDI}
            title="Haldi & Phoolon Ki Holi"
            time="10:00 AM"
            dateStr="Saturday · 12 December 2026"
            dateIcs="20261212"
            startIcs="1000"
            endIcs="1330"
            file="haldi.ics"
            attire="Sunshine Yellow & Floral Ethnic"
            desc="A joyous celebration of turmeric blessings, marigold flower showers, and traditional folk music."
          />

          <CeremonyCard
            svg={WEDDING}
            title="Shubh Vivah & Varmala"
            time="6:00 PM (Auspicious Muhurat)"
            dateStr="Saturday · 12 December 2026"
            dateIcs="20261212"
            startIcs="1800"
            endIcs="2130"
            file="wedding.ics"
            attire="Royal Indian Heritage & Traditional Banarasi"
            desc="The sacred Vedic wedding rituals, Saat Phere around the holy fire, and the eternal exchange of Varmala."
          />

          <CeremonyCard
            svg={RECEPTION}
            title="Grand Reception & Dinner"
            time="8:30 PM Onwards"
            dateStr="Saturday · 12 December 2026"
            dateIcs="20261212"
            startIcs="2030"
            endIcs="2359"
            file="reception.ics"
            attire="Black Tie, Tuxedo or Evening Glamour"
            desc="A grand banquet dinner, champagne toast, and formal blessings as we welcome the newly married couple."
          />
        </section>

        {/* Venue & Travel Guide */}
        <VenueGuide />

        {/* Wishes & Blessings Wall */}
        <GuestWishes />


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
          Warmly awaiting your presence with love,
          <br />
          The Sharma &amp; Singhania Families
        </p>

        <button className="b p share-btn" onClick={shareInvitation}>
          📲 Share Invitation on WhatsApp
        </button>
      </footer>
    </>
  )
}
