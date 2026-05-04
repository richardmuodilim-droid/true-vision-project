import { Link } from 'react-router-dom'

const mono = { fontFamily: "'Space Mono', monospace" }

export default function Footer() {
  return (
    <footer className="mt-32" style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}>
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
            <a
              href="https://www.instagram.com/truevisionproject/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'rgba(0,0,0,0.28)' }}
              className="hover:opacity-50 transition-opacity duration-300 w-fit"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-20">
            <nav aria-label="Shop links">
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }}
                className="uppercase mb-5">Shop</p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/',                label: 'Drop 001' },
                  { to: '/category/hats',   label: 'Hats' },
                  { to: '/category/t-shirts', label: 'T-Shirts' },
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

            <nav aria-label="Project links">
              <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.28)' }}
                className="uppercase mb-5">Project</p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/our-story', label: 'Our Story' },
                  { to: '/archive',   label: 'Archive' },
                  { to: '/contact',   label: 'Contact' },
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.22)' }} className="uppercase">
            © {new Date().getFullYear()} True Vision Project. All rights reserved.
          </p>
          <div className="flex gap-8">
            {[
              { to: '/privacy', label: 'Privacy' },
              { to: '/terms',   label: 'Terms' },
            ].map(({ to, label }) => (
              <Link key={to} to={to}
                style={{ ...mono, fontSize: '7px', letterSpacing: '0.35em', color: 'rgba(0,0,0,0.22)' }}
                className="uppercase hover:opacity-50 transition-opacity duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
