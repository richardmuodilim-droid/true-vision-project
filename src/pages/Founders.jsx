import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mono, serif, ease } from '../lib/design'

export default function Founders() {
  const [data, setData] = useState({ count: 0, members: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/lookup?wall=1')
      .then(r => r.json())
      .then(d => { setData({ count: d.count || 0, members: d.members || [] }); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const wall = data.members.filter(m => m.ref >= 5).sort((a, b) => b.ref - a.ref)

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 pt-28 sm:pt-32 pb-10 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.08, ease }}
          style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.5em' }} className="uppercase mb-7">
          The Movement
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16, ease }}
          style={{ ...serif, fontSize: 'clamp(40px, 8vw, 64px)', color: '#111', fontWeight: 400, lineHeight: 1.08 }} className="mb-5">
          Built by these people.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, delay: 0.28, ease }}
          style={{ ...mono, fontSize: 'clamp(9px, 1.8vw, 11px)', color: 'rgba(0,0,0,0.45)', letterSpacing: '0.3em' }} className="uppercase">
          {loading ? '— — —' : `${String(data.count).padStart(2, '0')} strong — and growing`}
        </motion.p>
      </section>

      {/* Founders Wall — 5+ recruiters */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-10" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-6">
          The Founders Wall — brought 5+ in
        </p>
        {wall.length === 0 ? (
          <p style={{ ...serif, fontSize: 'clamp(18px, 3vw, 24px)', color: 'rgba(0,0,0,0.45)', fontStyle: 'italic', lineHeight: 1.5 }}>
            The first names here are being earned right now.<br />Bring five in, and yours goes up.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {wall.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03, ease }}
                className="flex items-center gap-3 px-4 py-3" style={{ border: '1px solid rgba(0,0,0,0.18)' }}>
                <span style={{ ...serif, fontSize: '20px', color: '#111', fontWeight: 500 }}>{m.firstName}</span>
                <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.40)', letterSpacing: '0.16em' }} className="uppercase">↑ {m.ref}</span>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* The full roll */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-10" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ ...mono, fontSize: '7px', color: 'rgba(0,0,0,0.35)', letterSpacing: '0.45em' }} className="uppercase mb-6">
          Everyone building this
        </p>
        {loading ? (
          <p style={{ ...mono, fontSize: '9px', color: 'rgba(0,0,0,0.30)', letterSpacing: '0.22em' }} className="uppercase">Loading…</p>
        ) : data.members.length === 0 ? (
          <p style={{ ...serif, fontSize: '22px', color: 'rgba(0,0,0,0.45)', fontStyle: 'italic' }}>Be the first name here.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-3">
            {data.members.map((m, i) => (
              <div key={i} className="flex items-baseline justify-between gap-2 py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <span style={{ ...mono, fontSize: '11px', color: 'rgba(0,0,0,0.70)', letterSpacing: '0.06em' }} className="uppercase truncate">{m.firstName}</span>
                <span style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.28)', letterSpacing: '0.08em' }}>
                  {m.n != null ? `#${String(m.n).padStart(3, '0')}` : ''}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-14 text-center" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <p style={{ ...serif, fontSize: 'clamp(22px, 4.5vw, 34px)', color: '#111', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.4 }} className="mb-8">
          "Built from nothing.<br />Worn by those who understand."
        </p>
        <Link to="/archive"
          style={{ ...mono, fontSize: '10px', letterSpacing: '0.4em', background: '#111', color: '#F5F3EE' }}
          className="inline-flex items-center justify-center px-10 py-5 uppercase hover:bg-[#2a2a2a] active:scale-[0.98] transition-all duration-300">
          [ Join the Movement ]
        </Link>
      </section>

      <div className="flex items-center justify-center pb-14">
        <Link to="/" style={{ ...mono, fontSize: '8px', color: 'rgba(0,0,0,0.22)', letterSpacing: '0.32em' }}
          className="uppercase hover:opacity-50 transition-opacity">← True Vision Project</Link>
      </div>
    </div>
  )
}
