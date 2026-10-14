// Royal Indian Wedding SVG vectors, mandalas, and ceremony illustrations
export const DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <!-- Royal Mughal Jali Pattern -->
    <pattern id="pat" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="#d4af37" stroke-width="0.8" opacity="0.2"/>
      <circle cx="30" cy="30" r="10" fill="none" stroke="#f6e2b0" stroke-width="0.7" opacity="0.25"/>
      <circle cx="30" cy="30" r="3" fill="#d4af37" opacity="0.3"/>
      <path d="M0 0 L10 10 M50 10 L60 0 M60 60 L50 50 M0 60 L10 50" stroke="#d4af37" stroke-width="0.8" opacity="0.2"/>
    </pattern>

    <!-- Auspicious Kalash Symbol -->
    <g id="kalash" fill="none" stroke="#d4af37" stroke-width="1.8">
      <ellipse cx="25" cy="40" rx="14" ry="12" fill="#872338" opacity="0.85"/>
      <path d="M16 29 C18 20, 32 20, 34 29" stroke="#f3d79a" stroke-width="2"/>
      <path d="M12 40 Q25 48 38 40" stroke="#f3d79a" stroke-width="1.5"/>
      <!-- Coconut -->
      <path d="M18 22 C18 10, 32 10, 32 22 Z" fill="#b3684a" stroke="#d4af37"/>
      <!-- Mango leaves -->
      <path d="M14 26 C10 18, 12 12, 17 21" stroke="#4a8505" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M36 26 C40 18, 38 12, 33 21" stroke="#4a8505" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Swastik / Tilak on pot -->
      <circle cx="25" cy="38" r="3" fill="#f3d79a"/>
    </g>

    <!-- Diya with Glowing Flame -->
    <g id="diya">
      <ellipse cx="20" cy="22" rx="15" ry="7" fill="#a8432a" stroke="#d4af37" stroke-width="1.2"/>
      <path d="M5 22 Q20 32 35 22" fill="#7a2a16"/>
      <ellipse cx="20" cy="21" rx="10" ry="4" fill="#f5c270"/>
      <!-- Flame with warm pulsation -->
      <path d="M20 18 C16 12, 17 4, 20 0 C23 4, 24 12, 20 18 Z" fill="url(#flameGrad)">
        <animate attributeName="d" 
          values="M20 18 C16 12, 17 4, 20 0 C23 4, 24 12, 20 18 Z; M20 18 C15 13, 19 3, 20 -1 C21 3, 25 13, 20 18 Z; M20 18 C16 12, 17 4, 20 0 C23 4, 24 12, 20 18 Z" 
          dur="1.8s" repeatCount="indefinite"/>
      </path>
    </g>

    <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#ff4500"/>
      <stop offset="45%" stop-color="#ffb700"/>
      <stop offset="90%" stop-color="#ffffff"/>
    </linearGradient>

    <!-- Royal Floral Flourish Ornament -->
    <g id="orn">
      <path d="M0 12 Q35 12 55 4 Q65 0 75 12 Q85 24 95 20 Q115 12 150 12" stroke="#d4af37" stroke-width="1.2" fill="none"/>
      <path d="M150 12 Q185 12 205 4 Q215 0 225 12 Q235 24 245 20 Q265 12 300 12" stroke="#d4af37" stroke-width="1.2" fill="none"/>
      <circle cx="150" cy="12" r="5" fill="#d4af37"/>
      <circle cx="150" cy="12" r="2.5" fill="#fdf0d5"/>
      <path d="M142 12 Q150 4 158 12 Q150 20 142 12 Z" fill="#d4af37" opacity="0.6"/>
      <circle cx="65" cy="5" r="2" fill="#d4af37"/>
      <circle cx="235" cy="5" r="2" fill="#d4af37"/>
    </g>

    <!-- Couple Silhouette -->
    <symbol id="cp" viewBox="0 0 140 170">
      <!-- Groom Sherwani & Turban -->
      <path d="M30 136h18v32H30z" fill="#2b1a1a"/>
      <path d="M52 136h18v32H52z" fill="#2b1a1a"/>
      <path d="M33 52q18-10 36 0l6 86H26z" fill="#f5ede2"/>
      <path d="M48 52l3 26 3-26" stroke="#d4af37" fill="none" stroke-width="2.2"/>
      <circle cx="51" cy="36" r="11" fill="#d9a07a"/>
      <!-- Royal Safa (Turban) with Kalgi -->
      <path d="M38 34q13-18 26 0q-13-8-26 0z" fill="#b82641"/>
      <path d="M49 20 l2 -8 l2 8 z" fill="#f3d79a"/>
      <!-- Bride Lehenga & Dupatta -->
      <path d="M78 34q14-24 28 0l8 54q-22 8-44 0z" fill="#fcedec" opacity="0.75"/>
      <path d="M64 168L88 74h16l28 94z" fill="#c41e3a"/>
      <path d="M84 52h22l-3 26H87z" fill="#a0182f"/>
      <circle cx="95" cy="38" r="11" fill="#d9a07a"/>
      <path d="M82 38q0-18 13-18t13 18q-4-10-13-11t-13 11z" fill="#1d1210"/>
      <!-- Varmala (Garlands) -->
      <path d="M42 64q20 22 44 0" stroke="#ff7b00" stroke-width="4.5" fill="none" stroke-dasharray="2 5" stroke-linecap="round"/>
      <path d="M62 66q20 22 44 0" stroke="#d41c40" stroke-width="4" fill="none" stroke-dasharray="2 5" stroke-linecap="round"/>
    </symbol>
  </defs>
</svg>
`

export const ARCH = `
<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="archSun" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#fff8e7"/>
      <stop offset="60%" stop-color="#f5d996" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#e2b96f" stop-opacity="0.1"/>
    </radialGradient>
  </defs>
  <!-- Sacred Sun Aura -->
  <circle cx="160" cy="130" r="105" fill="url(#archSun)"/>
  <!-- Decorative Royal Arch Pillars -->
  <path d="M35 320 V160 Q35 50 160 50 Q285 50 285 160 V320" fill="none" stroke="#d4af37" stroke-width="3"/>
  <path d="M45 320 V165 Q45 65 160 65 Q275 65 275 165 V320" fill="none" stroke="#d4af37" stroke-width="1" stroke-dasharray="3 3"/>
  <!-- Arch Dome Crest -->
  <path d="M148 48 Q160 18 172 48 Z" fill="#d4af37"/>
  <circle cx="160" cy="14" r="5" fill="#fcedbe"/>
  <!-- Floral Garland on Arch -->
  <path d="M45 160 Q160 210 275 160" fill="none" stroke="#ff7700" stroke-width="6" stroke-dasharray="3 7" stroke-linecap="round"/>
  <path d="M55 170 Q160 220 265 170" fill="none" stroke="#d41c40" stroke-width="4" stroke-dasharray="2 6" stroke-linecap="round"/>
  <!-- Ground Pedestal -->
  <path d="M0 320 V275 Q160 230 320 275 V320 Z" fill="#4a101d" opacity="0.85"/>
  <use href="#cp" x="90" y="125" width="140" height="175"/>
</svg>
`

// 1. Mehendi & Sangeet Artwork
export const SANGEET = `
<svg viewBox="0 0 300 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0c1736"/>
      <stop offset="50%" stop-color="#1e2d63"/>
      <stop offset="100%" stop-color="#46224e"/>
    </linearGradient>
  </defs>
  <rect width="300" height="520" fill="url(#sg)"/>
  <!-- Twinkling fairy lights / Starlight sky -->
  <g fill="#fff" opacity="0.9">
    <circle cx="45" cy="40" r="1.5"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></circle>
    <circle cx="130" cy="70" r="2"><animate attributeName="opacity" values="0.8;0.2;0.8" dur="2.7s" repeatCount="indefinite"/></circle>
    <circle cx="260" cy="50" r="1.8"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite"/></circle>
    <circle cx="210" cy="110" r="1.4"><animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite"/></circle>
    <circle cx="75" cy="130" r="2.2"><animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite"/></circle>
  </g>
  <!-- Glowing lanterns -->
  <g stroke="#e8d7a0" opacity="0.8">
    <line x1="60" y1="0" x2="60" y2="130"/>
    <line x1="150" y1="0" x2="150" y2="95"/>
    <line x1="240" y1="0" x2="240" y2="145"/>
  </g>
  <g fill="#ffdf79">
    <circle cx="60" cy="138" r="11" filter="drop-shadow(0 0 8px #ffc107)"/>
    <circle cx="150" cy="103" r="10" filter="drop-shadow(0 0 8px #ffc107)"/>
    <circle cx="240" cy="153" r="12" filter="drop-shadow(0 0 8px #ffc107)"/>
  </g>
  <!-- Sangeet Musical Dhol / Tabla silhouette -->
  <g transform="translate(100 240)" opacity="0.85">
    <ellipse cx="50" cy="40" rx="35" ry="18" fill="#d4af37" stroke="#fff" stroke-width="1.5"/>
    <path d="M15 40 Q50 90 85 40 L80 90 Q50 115 20 90 Z" fill="#8c3b17" stroke="#d4af37" stroke-width="1.5"/>
  </g>
  <!-- Stage arches -->
  <path d="M20 520 V330 a38 38 0 0 1 76 0 v190 M112 520 V350 a38 38 0 0 1 76 0 v170 M204 520 V330 a38 38 0 0 1 76 0 v190" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="2 3" opacity="0.5"/>
  <use href="#cp" x="80" y="340" width="140" height="170"/>
</svg>
`

// 2. Haldi & Phoolon Ki Holi Artwork
export const HALDI = `
<svg viewBox="0 0 300 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f9b208"/>
      <stop offset="45%" stop-color="#f49d1a"/>
      <stop offset="100%" stop-color="#b83b14"/>
    </linearGradient>
  </defs>
  <rect width="300" height="520" fill="url(#hg)"/>
  <!-- Falling Marigold (Genda Phool) petals -->
  <g fill="#ffe066" opacity="0.85">
    <circle cx="40" cy="60" r="7"><animate attributeName="cy" values="0;520" dur="8s" repeatCount="indefinite"/></circle>
    <circle cx="120" cy="180" r="8"><animate attributeName="cy" values="0;520" dur="6.5s" repeatCount="indefinite"/></circle>
    <circle cx="230" cy="100" r="9"><animate attributeName="cy" values="0;520" dur="7.2s" repeatCount="indefinite"/></circle>
    <circle cx="180" cy="280" r="6"><animate attributeName="cy" values="0;520" dur="9s" repeatCount="indefinite"/></circle>
    <circle cx="80" cy="340" r="8"><animate attributeName="cy" values="0;520" dur="7.8s" repeatCount="indefinite"/></circle>
  </g>
  <!-- Traditional Urli bowl with yellow marigolds & floating diyas -->
  <g transform="translate(60 210)">
    <ellipse cx="90" cy="50" rx="85" ry="32" fill="#d4af37" stroke="#946d1b" stroke-width="2.5"/>
    <ellipse cx="90" cy="48" rx="76" ry="26" fill="#fde047" opacity="0.9"/>
    <!-- Floating flowers in Urli -->
    <circle cx="60" cy="48" r="9" fill="#ea580c"/>
    <circle cx="90" cy="46" r="10" fill="#f97316"/>
    <circle cx="120" cy="48" r="9" fill="#ea580c"/>
    <circle cx="75" cy="54" r="7" fill="#eab308"/>
    <circle cx="105" cy="54" r="7" fill="#eab308"/>
  </g>
  <use href="#cp" x="80" y="340" width="140" height="170"/>
</svg>
`

// 3. Shubh Vivah (Wedding & Varmala) Artwork
export const WEDDING = `
<svg viewBox="0 0 300 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#400c19"/>
      <stop offset="45%" stop-color="#691629"/>
      <stop offset="100%" stop-color="#91283b"/>
    </linearGradient>
  </defs>
  <rect width="300" height="520" fill="url(#wg)"/>
  <!-- Grand Wedding Mandap Pillars with Floral Garlands -->
  <path d="M45 520 V230 Q150 140 255 230 V520" fill="none" stroke="#d4af37" stroke-width="8"/>
  <path d="M30 520 V250 M270 520 V250" stroke="#f6e2b0" stroke-width="4"/>
  <!-- Royal Kalgi on Mandap Dome -->
  <path d="M142 152 Q150 115 158 152 Z" fill="#d4af37"/>
  <circle cx="150" cy="110" r="5" fill="#fbe9bb"/>
  <!-- Jasmine & Rose Varmala arches -->
  <path d="M25 240 Q150 300 275 240" fill="none" stroke="#ff8500" stroke-width="7" stroke-dasharray="2 7" stroke-linecap="round"/>
  <path d="M45 225 Q150 280 255 225" fill="none" stroke="#e11d48" stroke-width="6" stroke-dasharray="2 8" stroke-linecap="round"/>
  <!-- Sacred Hawan Kund with Holy Agni Flame -->
  <g transform="translate(100 285)">
    <polygon points="20,50 80,50 70,75 30,75" fill="#c2410c" stroke="#d4af37" stroke-width="2"/>
    <path d="M50 48 C42 38, 44 26, 50 16 C56 26, 58 38, 50 48 Z" fill="url(#flameGrad)">
      <animate attributeName="d" 
        values="M50 48 C42 38, 44 26, 50 16 C56 26, 58 38, 50 48 Z; M50 48 C40 39, 48 24, 50 12 C52 24, 60 39, 50 48 Z; M50 48 C42 38, 44 26, 50 16 C56 26, 58 38, 50 48 Z" 
        dur="1.5s" repeatCount="indefinite"/>
    </path>
  </g>
  <use href="#cp" x="80" y="340" width="140" height="170"/>
</svg>
`

// 4. Grand Reception Artwork
export const RECEPTION = `
<svg viewBox="0 0 300 520" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="45%" stop-color="#1f2937"/>
      <stop offset="100%" stop-color="#374151"/>
    </linearGradient>
  </defs>
  <rect width="300" height="520" fill="url(#rg)"/>
  <!-- Grand Chandelier Lights with Sparkles -->
  <g transform="translate(150 60)">
    <path d="M0 -30 V40 M-60 0 Q0 30 60 0 M-90 -10 Q0 50 90 -10" stroke="#d4af37" stroke-width="2" fill="none"/>
    <circle cx="0" cy="45" r="7" fill="#fef08a" filter="drop-shadow(0 0 10px #fef08a)"/>
    <circle cx="-60" cy="5" r="5" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)"/>
    <circle cx="60" cy="5" r="5" fill="#fef08a" filter="drop-shadow(0 0 6px #fef08a)"/>
    <circle cx="-90" cy="-5" r="4" fill="#fef08a"/>
    <circle cx="90" cy="-5" r="4" fill="#fef08a"/>
    <!-- Crystal drops -->
    <line x1="-60" y1="5" x2="-60" y2="25" stroke="#fef08a" stroke-width="1.5"/>
    <line x1="60" y1="5" x2="60" y2="25" stroke="#fef08a" stroke-width="1.5"/>
    <line x1="0" y1="45" x2="0" y2="70" stroke="#fef08a" stroke-width="2"/>
  </g>
  <!-- Champagne toast glasses silhouette -->
  <g transform="translate(110 220)" stroke="#d4af37" stroke-width="1.8" fill="none" opacity="0.8">
    <path d="M25 35 L38 10 L50 35 Z M38 35 V55 M28 55 H48"/>
    <path d="M55 35 L68 10 L80 35 Z M68 35 V55 M58 55 H78"/>
    <circle cx="44" cy="5" r="2" fill="#fef08a"/>
    <circle cx="62" cy="3" r="2.5" fill="#fef08a"/>
  </g>
  <use href="#cp" x="80" y="340" width="140" height="170"/>
</svg>
`
