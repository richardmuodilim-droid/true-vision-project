import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toPng } from 'html-to-image'
import { mono, serif } from '../lib/design'

/* ── Brand graphics ──────────────────────────────────────────
   Rendered at full social resolution, scaled down for preview,
   exported to PNG at 2x. Pure typography, monochrome, on-brand.
   Add/edit a graphic in GRAPHICS below. ───────────────────── */

const CREAM = '#F5F3EE'
const INK   = '#111111'

const CornerMarks = ({ s }) => (
  <>
    {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
      <span key={v+h} aria-hidden="true" style={{
        position: 'absolute', [v]: s*0.06, [h]: s*0.06, width: s*0.05, height: s*0.05,
        borderTop: v==='top' ? `2px solid rgba(0,0,0,0.18)` : 'none',
        borderBottom: v==='bottom' ? `2px solid rgba(0,0,0,0.18)` : 'none',
        borderLeft: h==='left' ? `2px solid rgba(0,0,0,0.18)` : 'none',
        borderRight: h==='right' ? `2px solid rgba(0,0,0,0.18)` : 'none',
      }} />
    ))}
  </>
)

const Frame = ({ w, h, children }) => (
  <div style={{
    width: w, height: h, position: 'relative', background: CREAM, color: INK,
    overflow: 'hidden', display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', textAlign: 'center',
  }}>
    <CornerMarks s={Math.min(w, h)} />
    {/* top mark */}
    <img src="/logo.svg" alt="" style={{
      position: 'absolute', top: h*0.085, width: w*0.12, height: 'auto',
      filter: 'invert(1)', opacity: 0.9,
    }} />
    {children}
    {/* footer url */}
    <p style={{ ...mono, position: 'absolute', bottom: h*0.075, margin: 0,
      fontSize: Math.round(w*0.0185), letterSpacing: '0.42em', color: 'rgba(0,0,0,0.40)' }}>
      TRUEVISIONPROJECT.COM
    </p>
  </div>
)

function Graphic({ type, w, h }) {
  const big   = Math.round(w * 0.072)
  const huge  = Math.round(w * 0.20)
  const label = Math.round(w * 0.019)

  if (type === 'statement') return (
    <Frame w={w} h={h}>
      <p style={{ ...serif, fontStyle: 'italic', fontWeight: 500, margin: 0,
        fontSize: big, lineHeight: 1.32, maxWidth: w*0.82 }}>
        Built from nothing.<br/>Worn by those<br/>who understand.
      </p>
    </Frame>
  )

  if (type === 'numbers') return (
    <Frame w={w} h={h}>
      <p style={{ ...serif, fontWeight: 600, margin: 0, fontSize: huge, lineHeight: 0.9 }}>24</p>
      <p style={{ ...mono, margin: `${w*0.012}px 0 ${w*0.05}px`, fontSize: label, letterSpacing: '0.5em' }}>UNITS</p>
      <p style={{ ...mono, margin: 0, fontSize: Math.round(w*0.03), letterSpacing: '0.28em', lineHeight: 2.2 }}>
        24 HOURS<br/>SOLD OUT<br/>NO ADS
      </p>
    </Frame>
  )

  if (type === 'movement') return (
    <Frame w={w} h={h}>
      <p style={{ ...mono, margin: `0 0 ${w*0.05}px`, fontSize: label, letterSpacing: '0.5em', color: 'rgba(0,0,0,0.40)' }}>
        [ TRUE VISION PROJECT ]
      </p>
      <p style={{ ...serif, fontWeight: 500, margin: 0, fontSize: big*1.05, lineHeight: 1.22, maxWidth: w*0.82 }}>
        This is not a brand.<br/>It's a representation<br/>of us.
      </p>
      <p style={{ ...mono, margin: `${w*0.055}px 0 0`, fontSize: label, letterSpacing: '0.4em' }}>
        JOIN THE MOVEMENT
      </p>
    </Frame>
  )

  if (type === 'origin') return (
    <Frame w={w} h={h}>
      <p style={{ ...mono, margin: `0 0 ${w*0.04}px`, fontSize: label, letterSpacing: '0.42em', color: 'rgba(0,0,0,0.40)' }}>
        WEXFORD &nbsp;×&nbsp; BERGAMO
      </p>
      <p style={{ ...serif, fontWeight: 500, margin: 0, fontSize: big, lineHeight: 1.28, maxWidth: w*0.8 }}>
        Built between<br/>two towns.
      </p>
    </Frame>
  )

  return null
}

const GRAPHICS = [
  { id: 'statement', name: 'The Statement', note: '"Built from nothing."' },
  { id: 'numbers',   name: 'The Numbers',   note: '24 units / 24 hours / sold out' },
  { id: 'movement',  name: 'The Movement',  note: 'Not a brand. A representation.' },
  { id: 'origin',    name: 'The Origin',    note: 'Wexford × Bergamo' },
]

const FORMATS = [
  { key: 'square', label: 'Post 1080×1080', w: 1080, h: 1080, preview: 300 },
  { key: 'story',  label: 'Story 1080×1920', w: 1080, h: 1920, preview: 220 },
]

function ExportCard({ type, format }) {
  const ref = useRef(null)
  const [busy, setBusy] = useState(false)
  const scale = format.preview / format.w

  const download = async () => {
    if (!ref.current) return
    setBusy(true)
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready
      const url = await toPng(ref.current, { width: format.w, height: format.h, pixelRatio: 2, cacheBust: true })
      const a = document.createElement('a')
      a.href = url
      a.download = `tvp-${type}-${format.key}.png`
      a.click()
    } catch (e) {
      alert('Export failed — try again, or screenshot the preview.')
    }
    setBusy(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <div style={{ width: format.preview, height: format.h * scale, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.10)' }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <div ref={ref}><Graphic type={type} w={format.w} h={format.h} /></div>
        </div>
      </div>
      <button onClick={download} disabled={busy}
        style={{ ...mono, fontSize: '9px', letterSpacing: '0.28em', background: INK, color: CREAM }}
        className="py-3 uppercase hover:bg-[#2a2a2a] disabled:opacity-50 active:scale-[0.98] transition-all duration-300">
        {busy ? 'Rendering…' : 'Download PNG'}
      </button>
    </div>
  )
}

export default function Press() {
  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-10 text-center">
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }} className="uppercase mb-7">
          Asset Kit
        </p>
        <h1 style={{ ...serif, fontSize: 'clamp(40px, 8vw, 64px)', color: '#111', fontWeight: 400, lineHeight: 1.08 }} className="mb-5">
          Brand Graphics.
        </h1>
        <p style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 9px)', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase max-w-lg mx-auto">
          Download. Post. Represent. Square for the feed, vertical for stories &amp; reels.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 sm:px-10 pb-20 flex flex-col gap-16">
        {GRAPHICS.map(g => (
          <div key={g.id}>
            <div className="flex items-baseline gap-4 mb-6" style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '12px' }}>
              <h2 style={{ ...serif, fontSize: '24px', color: '#111', fontWeight: 500 }}>{g.name}</h2>
              <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.18em' }} className="uppercase">{g.note}</p>
            </div>
            <div className="flex flex-wrap gap-8">
              {FORMATS.map(f => (
                <div key={f.key} className="flex flex-col gap-2">
                  <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.28em' }} className="uppercase">{f.label}</p>
                  <ExportCard type={g.id} format={f} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="flex items-center justify-center pb-16">
        <Link to="/" style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity">← True Vision Project</Link>
      </div>
    </div>
  )
}
