export const mono  = { fontFamily: "'Space Mono', monospace" }
export const serif = { fontFamily: "'Cormorant Garamond', serif" }
export const inter = { fontFamily: "'Inter', sans-serif" }
export const ease  = [0.16, 1, 0.3, 1]

export const reveal = (delay = 0, y = 28) => ({
  initial:     { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-40px' },
  transition:  { duration: 0.76, delay, ease },
})

export const lineGrow = (delay = 0) => ({
  initial:     { scaleX: 0 },
  whileInView: { scaleX: 1 },
  viewport:    { once: true },
  transition:  { duration: 0.85, delay, ease },
})
