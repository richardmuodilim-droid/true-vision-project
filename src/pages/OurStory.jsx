import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

export default function OurStory() {
  const bodyRef = useRef(null)
  const ctaRef  = useRef(null)
  const bodyInView = useInView(bodyRef, { once: true, margin: '-60px' })
  const ctaInView  = useInView(ctaRef,  { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      <div className="max-w-[640px] mx-auto px-6 sm:px-10 pt-32 pb-32">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ ...mono, fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.28)' }}
          className="uppercase mb-8"
        >
          True Vision Project &nbsp;·&nbsp; Est. 2026
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ ...serif, fontSize: 'clamp(36px, 7vw, 56px)', color: '#111111', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em' }}
          className="mb-6"
        >
          Two towns.<br />One road.
        </motion.h1>

        {/* Origin line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ ...mono, fontSize: '8px', letterSpacing: '0.38em', color: 'rgba(0,0,0,0.30)' }}
          className="uppercase mb-12"
        >
          Wexford, Ireland &nbsp;×&nbsp; Bergamo, Italy
        </motion.p>

        {/* Rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="origin-left h-px mb-14"
          style={{ background: 'rgba(0,0,0,0.08)' }}
          aria-hidden="true"
        />

        {/* Body */}
        <motion.div
          ref={bodyRef}
          initial={{ opacity: 0, y: 20 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 mb-16"
        >
          <p style={{ ...inter, fontSize: '16px', color: 'rgba(0,0,0,0.60)', lineHeight: 1.9, fontWeight: 300 }}>
            We didn't start True Vision because we had money, connections, or a blueprint. We started it because we had nothing — and we decided that was enough to begin.
          </p>

          <p style={{ ...inter, fontSize: '16px', color: 'rgba(0,0,0,0.60)', lineHeight: 1.9, fontWeight: 300 }}>
            Both of us came from ordinary places, ordinary families. People who worked hard, asked for little, and gave everything they had. We watched that. We absorbed it. And we refused to let where we started decide where we finish.
          </p>

          <p style={{ ...inter, fontSize: '16px', color: 'rgba(0,0,0,0.60)', lineHeight: 1.9, fontWeight: 300 }}>
            Every piece we make carries that. It is a physical reminder that it is possible — to start from zero and build something real, with integrity and purpose.
          </p>
        </motion.div>

        {/* Statement */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 16 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-10"
        >
          <div className="h-px" style={{ background: 'rgba(0,0,0,0.08)' }} aria-hidden="true" />

          <blockquote
            style={{ ...serif, fontSize: 'clamp(20px, 4vw, 28px)', color: '#111111', fontWeight: 500, lineHeight: 1.35, fontStyle: 'italic' }}
          >
            "Built from nothing.<br />Worn by those who understand."
          </blockquote>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              to="/"
              className="inline-block px-8 py-[14px] bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a] transition-colors duration-300"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.42em' }}
            >
              Shop Drop 001
            </Link>
            <Link
              to="/archive"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
              className="uppercase pb-px hover:opacity-50 transition-opacity duration-300"
            >
              Join the Archive →
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
