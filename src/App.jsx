import { useState, useCallback } from 'react'
import Vault from './components/Vault'
import DecryptionScreen from './components/DecryptionScreen'
import ArchiveEntry from './components/ArchiveEntry'

// screen: 'vault' | 'decrypting' | 'archive'
export default function App() {
  const [screen, setScreen] = useState('vault')

  const handleSuccess = useCallback(() => {
    setScreen('decrypting')
  }, [])

  const handleDecryptionComplete = useCallback(() => {
    setScreen('archive')
  }, [])

  const handleLogout = useCallback(() => {
    setScreen('vault')
  }, [])

  if (screen === 'decrypting') {
    return <DecryptionScreen onComplete={handleDecryptionComplete} />
  }

  if (screen === 'archive') {
    return <ArchiveEntry onLogout={handleLogout} />
  }

  return <Vault onSuccess={handleSuccess} />
}
