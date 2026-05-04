import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { getByCategory } from '../data/products'

const mono = { fontFamily: "'Space Mono', monospace" }

export default function Category() {
  const { slug } = useParams()
  const categoryName = slug === 't-shirts' ? 'T-Shirts' : 'Hats'
  const items = getByCategory(categoryName)

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <div className="grain" aria-hidden="true" />
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pt-36 pb-0">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p style={{ ...mono, fontSize: '7px', letterSpacing: '0.55em', color: 'rgba(0,0,0,0.28)' }}
            className="uppercase mb-4">
            True Vision Project
          </p>
          <h1 style={{ ...mono, fontSize: 'clamp(11px, 1.5vw, 13px)', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.65)', fontWeight: 300 }}
            className="uppercase">
            {categoryName}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <p style={{ ...mono, fontSize: '8px', letterSpacing: '0.4em', color: 'rgba(0,0,0,0.25)' }} className="uppercase">
              No items available yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-14">
            {items.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
