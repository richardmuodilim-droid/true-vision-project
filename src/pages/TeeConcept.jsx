import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mono, serif } from '../lib/design'

/* Flat design mockup of The Statement Tee — front + back, both colourways.
   This is a tech-flat / placement visual (vector), the kind printers work from.
   Change STATEMENT to re-letter the back instantly. */

const STATEMENT = 'BUILT FROM NOTHING'

const COLOURWAYS = [
  { id: 'black', label: 'Black', body: '#141414', ink: '#F5F3EE', stroke: 'rgba(255,255,255,0.10)' },
  { id: 'cream', label: 'Cream / Bone', body: '#E9E6DF', ink: '#141414', stroke: 'rgba(0,0,0,0.10)' },
]

const TEE_PATH = 'M50,60 L80,40 Q90,55 120,55 Q150,55 160,40 L190,60 L175,95 L155,85 L155,212 L85,212 L85,85 L65,95 Z'

function TeeFlat({ cw, side }) {
  return (
    <svg viewBox="0 0 240 240" className="w-full h-auto" role="img" aria-label={`Tee ${side}`}>
      {/* body */}
      <path d={TEE_PATH} fill={cw.body} stroke={cw.stroke} strokeWidth="1.2" />
      {/* collar hint */}
      {side === 'front'
        ? <path d="M80,40 Q120,70 160,40" fill="none" stroke={cw.stroke} strokeWidth="1.2" />
        : <path d="M80,40 Q120,58 160,40" fill="none" stroke={cw.stroke} strokeWidth="1.2" />}

      {side === 'front' ? (
        <>
          {/* small V mark, left chest */}
          <text x="96" y="104" textAnchor="middle"
            style={{ ...serif, fontWeight: 700, fill: cw.ink, fontSize: '15px' }}>V</text>
        </>
      ) : (
        <>
          {/* the statement across the upper back */}
          {STATEMENT.split(' ').length > 2 ? (
            <>
              <text x="120" y="108" textAnchor="middle"
                style={{ ...mono, fill: cw.ink, fontSize: '11px', letterSpacing: '1.5px' }}>
                {STATEMENT.split(' ').slice(0, Math.ceil(STATEMENT.split(' ').length / 2)).join(' ')}
              </text>
              <text x="120" y="124" textAnchor="middle"
                style={{ ...mono, fill: cw.ink, fontSize: '11px', letterSpacing: '1.5px' }}>
                {STATEMENT.split(' ').slice(Math.ceil(STATEMENT.split(' ').length / 2)).join(' ')}
              </text>
            </>
          ) : (
            <text x="120" y="116" textAnchor="middle"
              style={{ ...mono, fill: cw.ink, fontSize: '11px', letterSpacing: '1.5px' }}>{STATEMENT}</text>
          )}
        </>
      )}
    </svg>
  )
}

export default function TeeConcept() {
  const [cwId, setCwId] = useState('black')
  const cw = COLOURWAYS.find(c => c.id === cwId)

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      <section className="max-w-4xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-8 text-center">
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }} className="uppercase mb-6">
          Design Mockup — Not For Sale Yet
        </p>
        <h1 style={{ ...serif, fontSize: 'clamp(38px, 7vw, 58px)', color: '#111', fontWeight: 400, lineHeight: 1.08 }} className="mb-4">
          The Statement Tee
        </h1>
        <p style={{ ...mono, fontSize: 'clamp(8px, 1.6vw, 9px)', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.22em' }} className="uppercase">
          Minimal front. A statement back. A line inside, only you see.
        </p>
      </section>

      {/* Colour toggle */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {COLOURWAYS.map(c => (
          <button key={c.id} onClick={() => setCwId(c.id)} aria-pressed={cwId === c.id}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-300 cursor-pointer"
            style={{ border: `1px solid ${cwId === c.id ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.12)'}` }}>
            <span className="w-3 h-3 rounded-full" style={{ background: c.body, border: '1px solid rgba(0,0,0,0.2)' }} />
            <span style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.65)', letterSpacing: '0.16em' }} className="uppercase">{c.label}</span>
          </button>
        ))}
      </div>

      {/* Front + Back */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 grid grid-cols-2 gap-6 sm:gap-12 mb-14">
        {[['front', 'Front'], ['back', 'Back']].map(([side, label]) => (
          <div key={side} className="flex flex-col items-center gap-4">
            <div className="w-full max-w-[300px] p-6" style={{ border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(0,0,0,0.015)' }}>
              <TeeFlat cw={cw} side={side} />
            </div>
            <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.3em' }} className="uppercase">{label}</p>
          </div>
        ))}
      </section>

      {/* Placement notes */}
      <section className="max-w-2xl mx-auto px-6 sm:px-10 pb-16">
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-6">
          Placement
        </p>
        <div className="flex flex-col">
          {[
            ['Front', 'Small "V" mark, left chest (~8cm). Tonal, subtle. The front whispers.'],
            ['Back', `"${STATEMENT}" across the upper back — Space Mono, uppercase, monochrome.`],
            ['Inside neck', '"Never forget where you came from" — small, private, only the wearer sees it.'],
            ['Garment', 'Heavyweight 240–280gsm, boxy fit, ribbed collar. Black & Cream.'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-start gap-4 py-4" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
              <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.2em', minWidth: '92px' }} className="uppercase">{k}</span>
              <span style={{ ...mono, fontSize: '10px', color: 'rgba(0,0,0,0.62)', letterSpacing: '0.04em', lineHeight: 1.7 }}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.16em', lineHeight: 1.8 }} className="mt-8 uppercase">
          This is a flat design mockup — the kind a printer works from. The real photos come from the first sample.
        </p>
      </section>

      <div className="flex items-center justify-center pb-14">
        <Link to="/" style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity">← True Vision Project</Link>
      </div>
    </div>
  )
}
