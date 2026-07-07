import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import GateScreen from './components/GateScreen'
import { GATE_ENABLED, isUnlocked, isExemptPath, consumeUrlUnlock } from './lib/gate'
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
import Drop002 from './pages/Drop002'
import Tee from './pages/Tee'
import Press from './pages/Press'
import Founders from './pages/Founders'
import TeeConcept from './pages/TeeConcept'

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

// The Invitation: everything behind the gate except the front door (/archive),
// the admin panel, and Stripe's return page. Members and invite links pass through.
function GateKeeper({ children }) {
  const location = useLocation()
  const [unlocked, setUnlocked] = useState(() => {
    consumeUrlUnlock() // invite links (?ref=) and shared codes (?key=) unlock on arrival
    return isUnlocked()
  })

  // Re-check when returning from /archive (joining the Vault makes you a member)
  useEffect(() => {
    if (!unlocked && isUnlocked()) setUnlocked(true)
  }, [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!GATE_ENABLED || unlocked || isExemptPath(location.pathname)) return children
  return <GateScreen onUnlock={() => setUnlocked(true)} />
}

export default function App() {
  // Capture invite code from ?ref= so the referrer gets credit when this visitor joins
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get('ref')
      if (ref && /^TVP-\d{3}-[A-Z0-9]{4}$/i.test(ref.trim())) {
        localStorage.setItem('tvp_ref', ref.trim().toUpperCase())
      }
    } catch {}
  }, [])

  return (
    <BrowserRouter>
      <GateKeeper>
      <Routes>
        {/* Standalone — no navbar */}
        <Route path="/intro"         element={<Landing />} />
        <Route path="/drop-002"      element={<Drop002 />} />
        <Route path="/archive"       element={<ArchiveFlow />} />
        <Route path="/archive-admin" element={<AdminPage />} />

        {/* Store — with navbar + cart */}
        <Route element={<StoreShell />}>
          <Route path="/"            element={<Home />} />
          <Route path="/store"       element={<Navigate to="/" replace />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/checkout"    element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/our-story"   element={<OurStory />} />
          <Route path="/tee"         element={<Tee />} />
          <Route path="/press"       element={<Press />} />
          <Route path="/founders"    element={<Founders />} />
          <Route path="/tee-concept" element={<TeeConcept />} />
        </Route>
      </Routes>
      </GateKeeper>
    </BrowserRouter>
  )
}
