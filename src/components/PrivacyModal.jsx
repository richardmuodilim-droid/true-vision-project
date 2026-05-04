import { motion, AnimatePresence } from 'framer-motion'

const mono  = { fontFamily: "'Space Mono', monospace" }
const inter = { fontFamily: "'Inter', sans-serif" }

export default function PrivacyModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="privacy-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-0 sm:px-6"
          style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full sm:max-w-lg bg-[#F5F3EE] flex flex-col max-h-[88dvh]"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <p style={{ ...mono, fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.45)' }}>
                PRIVACY POLICY
              </p>
              <button
                onClick={onClose}
                aria-label="Close privacy policy"
                style={{ ...mono, fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(0,0,0,0.35)' }}
                className="hover:opacity-50 transition-opacity duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-end"
              >
                [ CLOSE ]
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto scrollbar-none px-6 py-6 flex flex-col gap-7">

              <Section title="WHO WE ARE">
                True Vision Project is a clothing brand based in Ireland. We operate truevisionproject.com.
                For data protection queries: <a href="mailto:archive@truevisionproject.com"
                  style={{ color: 'rgba(0,0,0,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  archive@truevisionproject.com
                </a>
              </Section>

              <Section title="WHAT DATA WE COLLECT">
                When you join the project, we collect your <strong style={{ color: 'rgba(0,0,0,0.72)', fontWeight: 500 }}>email address</strong> and <strong style={{ color: 'rgba(0,0,0,0.72)', fontWeight: 500 }}>full name</strong>. We also store a unique member ID and the date you joined.
              </Section>

              <Section title="WHY WE COLLECT IT">
                We use your data to manage your membership, notify you about product drops, and send confirmation emails. We will never sell your data to third parties.
              </Section>

              <Section title="LEGAL BASIS (GDPR)">
                We process your data based on your <strong style={{ color: 'rgba(0,0,0,0.72)', fontWeight: 500 }}>explicit consent</strong>, given when you tick the consent box and submit your details.
              </Section>

              <Section title="WHO SEES YOUR DATA">
                Your data is stored securely on Vercel KV (USA, with EU Standard Contractual Clauses). Email confirmations are sent via Resend.com. No other third parties have access.
              </Section>

              <Section title="YOUR RIGHTS (GDPR)">
                You have the right to access, correct, or delete your data, and to withdraw consent at any time. To exercise these rights: <a href="mailto:archive@truevisionproject.com"
                  style={{ color: 'rgba(0,0,0,0.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                  archive@truevisionproject.com
                </a>
              </Section>

              <Section title="COOKIES & STORAGE">
                We use browser localStorage — not cookies — to remember your membership. No tracking or advertising technologies are used.
              </Section>

              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.25)' }}>
                Last updated: April 2026
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.40)' }}
        className="uppercase">
        {title}
      </p>
      <p style={{ ...inter, fontSize: '13px', color: 'rgba(0,0,0,0.55)', lineHeight: '1.75' }}>
        {children}
      </p>
    </div>
  )
}
