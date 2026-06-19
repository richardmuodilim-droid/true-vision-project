import { Link } from 'react-router-dom'
import { mono } from '../lib/design'

export default function Footer({ className = '' }) {
  return (
    <footer className={className} style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16 sm:py-20">

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-14">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img
              src="/logo.svg"
              alt="True Vision Project"
              width="40"
              height="40"
              style={{ filter: 'invert(1)' }}
              className="w-9 h-9 object-contain select-none"
              draggable="false"
            />
            <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.28)', maxWidth: '180px', lineHeight: '1.8' }}
              className="uppercase">
              Built From Nothing.
            </p>
            <div className="flex items-center gap-1" style={{ marginLeft: '-14px' }}>
              <a
                href="https://www.tiktok.com/@truevisionproject"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{ color: 'rgba(0,0,0,0.28)' }}
                className="inline-flex items-center justify-center w-11 h-11 hover:opacity-50 transition-opacity duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/truevisionproject/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: 'rgba(0,0,0,0.28)' }}
                className="inline-flex items-center justify-center w-11 h-11 hover:opacity-50 transition-opacity duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-20">
            <nav aria-label="Drops">
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }} className="uppercase mb-5">
                Drops
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/',         label: 'Drop 001' },
                  { to: '/drop-002', label: 'Drop 002' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to}
                      style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.38)' }}
                      className="uppercase hover:opacity-50 transition-opacity duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Project">
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }} className="uppercase mb-5">
                Project
              </p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/our-story', label: 'Our Story' },
                  { to: '/archive',   label: 'Archive'   },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to}
                      style={{ ...mono, fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(0,0,0,0.38)' }}
                      className="uppercase hover:opacity-50 transition-opacity duration-300">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
        >
          <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.22)' }} className="uppercase">
            © {new Date().getFullYear()} True Vision Project
          </p>
          <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.26em', color: 'rgba(0,0,0,0.18)' }}>
            Wexford / Ireland &nbsp;×&nbsp; Bergamo / Italy
          </p>
        </div>
      </div>
    </footer>
  )
}
