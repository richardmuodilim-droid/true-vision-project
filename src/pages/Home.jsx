import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { getFeatured, getBestSellers, getByCategory } from '../data/products'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Home() {
  const featured = getFeatured()
  const bestSellers = getBestSellers()

  return (
    <div className="bg-[#000000] min-h-screen text-white">

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Cinematic background layers */}
        <div aria-hidden="true" className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -10%, rgba(255,255,255,0.04) 0%, transparent 100%)' }} />
        <div aria-hidden="true" className="absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.95) 100%)' }} />
        <div aria-hidden="true" className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-10 max-w-lg">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="text-[8px] tracking-[0.6em] text-white/25 uppercase"
          >
            True Vision Project
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
            className="text-[13px] sm:text-[15px] font-light tracking-[0.4em] text-white/85 uppercase leading-loose"
          >
            Built From Nothing
          </motion.h1>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
            className="w-px h-12 bg-white/[0.08]"
            aria-hidden="true"
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.8}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link
              to="/category/t-shirts"
              className="px-10 py-4 border border-white/20 text-[9px] tracking-[0.45em] text-white/60 uppercase hover:border-white/50 hover:text-white/90 transition-all duration-500"
            >
              Shop T-Shirts
            </Link>
            <Link
              to="/category/hats"
              className="px-10 py-4 text-[9px] tracking-[0.45em] text-white/30 uppercase hover:text-white/60 transition-colors duration-500"
            >
              Shop Hats
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-3"
          aria-hidden="true"
        >
          <span className="text-[7px] tracking-[0.5em] text-white/15 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/15 to-transparent" />
        </motion.div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-screen-xl mx-auto px-6 sm:px-10 py-24 sm:py-32" aria-labelledby="featured-heading">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[7px] tracking-[0.5em] text-white/20 uppercase mb-3">Collection</p>
            <h2 id="featured-heading" className="text-[10px] tracking-[0.4em] text-white/60 uppercase">
              Featured
            </h2>
          </div>
          <Link
            to="/category/t-shirts"
            className="text-[8px] tracking-[0.35em] text-white/25 uppercase hover:text-white/50 transition-colors duration-300 border-b border-white/10 pb-px hover:border-white/25"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="border-y border-white/[0.04]" aria-label="Why True Vision Project">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.04]">
            {[
              { label: 'Free Shipping', detail: 'On all orders over $150' },
              { label: 'Premium Materials', detail: 'Heavyweight cottons, garment dyed' },
              { label: 'Easy Returns', detail: '30-day returns, no questions' },
            ].map(({ label, detail }) => (
              <div key={label} className="flex flex-col gap-2 py-8 sm:py-0 sm:px-12 first:pl-0 last:pr-0">
                <p className="text-[9px] tracking-[0.4em] text-white/50 uppercase">{label}</p>
                <p className="text-[8px] tracking-[0.2em] text-white/20 uppercase">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="max-w-screen-xl mx-auto px-6 sm:px-10 py-24 sm:py-32" aria-labelledby="bestsellers-heading">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-[7px] tracking-[0.5em] text-white/20 uppercase mb-3">Most Worn</p>
            <h2 id="bestsellers-heading" className="text-[10px] tracking-[0.4em] text-white/60 uppercase">
              Best Sellers
            </h2>
          </div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-6 sm:mx-0 px-6 sm:px-0 overflow-x-auto sm:overflow-visible">
          <div className="flex sm:grid sm:grid-cols-4 gap-5 w-max sm:w-auto">
            {bestSellers.map((product, i) => (
              <div key={product.id} className="w-56 sm:w-auto shrink-0 sm:shrink">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
