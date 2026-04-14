'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const generateBurstCookies = () => Array.from({ length: 10 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  startY: 110,
  endX: Math.random() * 100,
  endY: Math.random() * 80,
  rotation: Math.random() * 360 - 180,
  size: Math.random() * 32 + 20,
  opacity: Math.random() * 0.4 + 0.3,
  duration: Math.random() * 1.5 + 1.5,
  delay: i * 0.15,
}))

export function FlyingCookies() {
  const [cookies] = useState(generateBurstCookies)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {cookies.map((cookie) => (
          <motion.div
            key={cookie.id}
            initial={{
              x: `${cookie.startX}vw`,
              y: `${cookie.startY}vh`,
              rotate: 0,
              opacity: 0,
            }}
            animate={{
              x: `${cookie.endX}vw`,
              y: `${cookie.endY}vh`,
              rotate: cookie.rotation,
              opacity: cookie.opacity,
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5 },
            }}
            transition={{
              duration: cookie.duration,
              delay: cookie.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              fontSize: cookie.size,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {'\u{1F36A}'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
