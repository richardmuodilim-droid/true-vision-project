import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const serif = { fontFamily: "'Cormorant Garamond', serif" }
const inter = { fontFamily: "'Inter', sans-serif" }

const chapters = [
  {
    n: '01',
    title: 'Where It Started',
    body: [
      'Two small towns. Two countries. One road.',
      'One grew up in a small town in Italy. One grew up in a small town in Ireland. Different languages, different skies, different corners of the world — but underneath it all, the same story.',
      'Both came from ordinary households. Families that didn\'t have much, but never made you feel it. People who worked hard, asked for little, and gave everything they had. The kind of upbringing that teaches you the value of something before you ever have it.',
      'No silver spoons. No shortcuts. No connections. Just ordinary people doing their best with what they had — and raising two young men who watched that, absorbed it, and decided it meant something.',
    ],
  },
  {
    n: '02',
    title: 'The Turning Point',
    body: [
      'That kind of background does one of two things to you.',
      'It makes you accept less. Or it makes you refuse to.',
      'We refused.',
      'Not out of anger. Not out of bitterness. Out of love — for the people who gave everything so we could have a chance. For the families who sacrificed quietly, without applause, without recognition, without ever asking for anything back.',
      'We looked at where we came from and made a decision. This is not where the story ends. This is where it begins.',
    ],
  },
  {
    n: '03',
    title: 'How We Found Each Other',
    body: [
      'Two people from two different corners of the world ended up on the same road.',
      'Same mindset. Same fire. Same reason to keep going. Years of knowing each other, building trust, and realising that what we had between us — the shared hunger, the shared values, the shared refusal to accept less — was something worth building on.',
      'Not just a friendship. A foundation.',
    ],
  },
  {
    n: '04',
    title: 'Why We Built True Vision',
    body: [
      'We didn\'t start True Vision because we had money. We didn\'t start it because someone believed in us. We didn\'t start it because the timing was perfect or because we had a blueprint.',
      'We started it because we had nothing — and we decided that was enough to begin.',
      'No investors. No backing. No industry connections. Just two young men from small towns with a vision clear enough to build on and a story real enough to stand behind.',
      'We built it for our families. To prove to them — and to ourselves — that where you start does not decide where you finish. That ordinary beginnings can produce extraordinary things. That the people who sacrificed for us did not do so for nothing.',
      'Every product we make carries that. Every hat, every tee is a physical reminder that it is possible — to start from zero, to build something real, and to do it with integrity and purpose.',
    ],
  },
  {
    n: '05',
    title: 'What True Vision Means',
    body: [
      'True Vision is not just a clothing brand.',
      'It is a mindset. The ability to look honestly at where you are — with nothing, with little, with odds stacked against you — and still see clearly where you are going. To have a vision so true, so certain, so unshakeable that no amount of doubt or difficulty can take it from you.',
      'That is what we had when we started. That is what we are building. And that is what every person who wears True Vision carries with them.',
    ],
  },
  {
    n: '06',
    title: 'Who This Is For',
    body: [
      'We believe our story is your story too.',
      'Because most people are not born into opportunity. Most people come from ordinary places, ordinary families, ordinary beginnings. Most people are told — by circumstance if not by words — to be realistic. To know their place. To accept the hand they were dealt.',
      'True Vision exists for everyone who looked at that hand and decided to play differently.',
      'This is for the ones who work in silence. Who build without applause. Who carry their family\'s name like a responsibility, not just an identity. Who refuse to let where they came from become an excuse — and refuse to let anyone else use it as one either.',
      'If you understand that — you understand True Vision.',
    ],
  },
  {
    n: '07',
    title: 'Where We Are Now',
    body: [
      'We started from nothing. We are building something real.',
      'Drop 001 — The Foundation — is the first physical proof of that. One product. Made with purpose. Limited by design. The first stone laid in something we intend to build for a long time.',
      'Every person who pre-orders, every person who wears it, every person who believes in what we are building becomes part of the foundation.',
      'We started from nothing. With you, we build everything.',
    ],
  },
]

function Chapter({ chapter, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className="flex flex-col gap-6 py-14"
      style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
    >
      <div className="flex items-baseline gap-5">
        <span style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.22)' }}>
          {chapter.n}
        </span>
        <h2 style={{ ...mono, fontSize: '9px', letterSpacing: '0.42em', color: 'rgba(0,0,0,0.45)' }}
          className="uppercase">
          {chapter.title}
        </h2>
      </div>

      <div className="flex flex-col gap-5 pl-0 sm:pl-10">
        {chapter.body.map((para, i) => (
          <p key={i}
            style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.62)', lineHeight: '1.85', fontWeight: 300 }}>
            {para}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default function OurStory() {
  const heroRef = useRef(null)
  const statementRef = useRef(null)
  const statementInView = useInView(statementRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="grain" aria-hidden="true" />

      <div className="max-w-[680px] mx-auto px-6 sm:px-10 pt-28 pb-32">

        {/* Hero */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ ...mono, fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase mb-6"
          >
            True Vision Project &nbsp;·&nbsp; Origin
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...serif, fontSize: 'clamp(38px, 7vw, 58px)', color: '#111111', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            Built From Nothing.
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left h-px mt-8"
            style={{ background: 'rgba(0,0,0,0.10)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{ ...inter, fontSize: '15px', color: 'rgba(0,0,0,0.45)', lineHeight: '1.85', fontWeight: 300 }}
            className="mt-8 max-w-lg"
          >
            Two small towns. Two countries. One road. This is where True Vision began — and why it will not stop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-6 mt-8"
          >
            <span style={{ ...mono, fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.22)' }}>
              Italy &nbsp;/&nbsp; Ireland
            </span>
            <span style={{ color: 'rgba(0,0,0,0.12)' }}>·</span>
            <span style={{ ...mono, fontSize: '7px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.22)' }}>
              Est. 2026
            </span>
          </motion.div>
        </motion.div>

        {/* Chapters */}
        <div>
          {chapters.map((chapter, i) => (
            <Chapter key={chapter.n} chapter={chapter} index={i} />
          ))}
        </div>

        {/* Statement */}
        <motion.div
          ref={statementRef}
          initial={{ opacity: 0, y: 24 }}
          animate={statementInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="py-20 text-center flex flex-col items-center gap-8"
          style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
        >
          <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.5em', color: 'rgba(0,0,0,0.22)' }} className="uppercase">
            The Statement We Stand By
          </p>

          <blockquote
            style={{ ...serif, fontSize: 'clamp(22px, 4.5vw, 32px)', color: '#111111', fontWeight: 500, lineHeight: 1.3, fontStyle: 'italic', maxWidth: '480px' }}
          >
            "Built from nothing. Worn by those who understand."
          </blockquote>

          <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.38em', color: 'rgba(0,0,0,0.28)' }} className="uppercase">
            True Vision &nbsp;·&nbsp; Est. 2026 &nbsp;·&nbsp; And this is only the beginning.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
            <Link
              to="/store"
              className="inline-block px-8 py-[14px] bg-[#111111] text-[#F5F3EE] hover:bg-[#2a2a2a] transition-colors duration-300"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.42em' }}
            >
              Shop Drop 001
            </Link>
            <Link
              to="/store"
              style={{ ...mono, fontSize: '8px', letterSpacing: '0.38em', color: 'rgba(0,0,0,0.35)', borderBottom: '1px solid rgba(0,0,0,0.15)' }}
              className="uppercase pb-px hover:opacity-50 transition-opacity duration-300"
            >
              Back to Store
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
