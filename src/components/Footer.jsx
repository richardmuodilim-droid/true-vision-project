import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.05] mt-32">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-14">

          {/* Brand */}
          <div className="flex flex-col gap-5">
            <img
              src="/logo.svg"
              alt="True Vision Project"
              width="40"
              height="40"
              style={{}}
              className="w-9 h-9 object-contain select-none"
              draggable="false"
            />
            <p className="text-[8px] tracking-[0.3em] text-white/20 uppercase max-w-[180px] leading-relaxed">
              Built From Nothing.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 sm:gap-20">
            <nav aria-label="Shop links">
              <p className="text-[8px] tracking-[0.4em] text-white/20 uppercase mb-5">Shop</p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/category/t-shirts', label: 'T-Shirts' },
                  { to: '/category/hats', label: 'Hats' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-[9px] tracking-[0.3em] text-white/35 uppercase hover:text-white/70 transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support links">
              <p className="text-[8px] tracking-[0.4em] text-white/20 uppercase mb-5">Info</p>
              <ul className="flex flex-col gap-3">
                {[
                  { to: '/shipping', label: 'Shipping' },
                  { to: '/returns', label: 'Returns' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-[9px] tracking-[0.3em] text-white/35 uppercase hover:text-white/70 transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-16 pt-8 border-t border-white/[0.04]">
          <p className="text-[7px] tracking-[0.4em] text-white/15 uppercase">
            © {new Date().getFullYear()} True Vision Project. All rights reserved.
          </p>
          <div className="flex gap-8">
            {[
              { to: '/privacy', label: 'Privacy' },
              { to: '/terms', label: 'Terms' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[7px] tracking-[0.35em] text-white/15 uppercase hover:text-white/35 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
