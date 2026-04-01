import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { getByCategory } from '../data/products'

export default function Category() {
  const { slug } = useParams()
  const categoryName = slug === 't-shirts' ? 'T-Shirts' : 'Hats'
  const items = getByCategory(categoryName)

  return (
    <div className="bg-[#000000] min-h-screen text-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 pt-36 pb-0">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[7px] tracking-[0.55em] text-white/20 uppercase mb-4">
            True Vision Project
          </p>
          <h1 className="text-[11px] sm:text-[13px] tracking-[0.4em] text-white/70 uppercase font-light">
            {categoryName}
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-14">
          {items.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
