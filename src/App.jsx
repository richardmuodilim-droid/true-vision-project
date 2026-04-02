import { useState, useCallback } from 'react'
import Vault from './components/Vault'
import DecryptionScreen from './components/DecryptionScreen'
import ArchiveEntry from './components/ArchiveEntry'
import AdminPage from './components/AdminPage'

// Admin route — detected from URL path
const isAdminRoute =
  typeof window !== 'undefined' &&
  window.location.pathname === '/archive-admin'

// screen: 'vault' | 'decrypting' | 'archive'
export default function App() {
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

  if (isAdminRoute) return <AdminPage />

  if (screen === 'decrypting') {
    return <DecryptionScreen onComplete={handleDecryptionComplete} />
  }

  if (screen === 'archive') {
    return <ArchiveEntry onLogout={handleLogout} userId={userId} memberName={memberName} />
  }

  return <Vault onSuccess={handleSuccess} />
}
