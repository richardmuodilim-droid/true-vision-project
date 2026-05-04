import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Product from './pages/Product'
import Category from './pages/Category'
import Checkout from './pages/Checkout'
import Vault from './components/Vault'
import DecryptionScreen from './components/DecryptionScreen'
import ArchiveEntry from './components/ArchiveEntry'
import AdminPage from './components/AdminPage'
import OrderSuccess from './pages/OrderSuccess'
import OurStory from './pages/OurStory'

function StoreShell() {
  const [cartOpen, setCartOpen] = useState(false)
  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <>
      <Navbar onCartOpen={openCart} />
      <Cart open={cartOpen} onClose={closeCart} />
      <Outlet context={{ onCartOpen: openCart }} />
    </>
  )
}

function ArchiveFlow() {
  const [screen, setScreen] = useState('vault')
  const [userId, setUserId] = useState(null)
  const [memberName, setMemberName] = useState('')

  const handleSuccess = useCallback((id, name) => {
    setUserId(id)
    setMemberName(name ?? '')
    setScreen('decrypting')
  }, [])

  const handleDecryptionComplete = useCallback(() => {
    setScreen('archive')
  }, [])

  const handleLogout = useCallback(() => {
    setUserId(null)
    setMemberName('')
    setScreen('vault')
  }, [])

  if (screen === 'decrypting') return <DecryptionScreen onComplete={handleDecryptionComplete} />
  if (screen === 'archive') return <ArchiveEntry onLogout={handleLogout} userId={userId} memberName={memberName} />
  return <Vault onSuccess={handleSuccess} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone — no navbar */}
        <Route path="/" element={<Landing />} />
        <Route path="/archive" element={<ArchiveFlow />} />
        <Route path="/archive-admin" element={<AdminPage />} />

        {/* Store — with navbar + cart */}
        <Route element={<StoreShell />}>
          <Route path="/store" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/checkout"      element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/our-story"     element={<OurStory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
