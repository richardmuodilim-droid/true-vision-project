import { useState, useCallback } from 'react'
import Vault from './components/Vault'
import ArchiveEntry from './components/ArchiveEntry'

// screen: 'vault' | 'glitching' | 'archive'
export default function App() {
  const [screen, setScreen] = useState('vault')

  const handleSuccess = useCallback(() => {
    // 1. Trigger glitch on the vault
    setScreen('glitching')
    // 2. After glitch duration (550ms), switch to archive
    setTimeout(() => setScreen('archive'), 550)
  }, [])

  const handleLogout = useCallback(() => {
    setScreen('vault')
  }, [])

  if (screen === 'archive') {
    return <ArchiveEntry onLogout={handleLogout} />
  }

  return (
    <Vault
      onSuccess={handleSuccess}
      glitching={screen === 'glitching'}
    />
  )
}
