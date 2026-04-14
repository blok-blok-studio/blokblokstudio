'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const generateBurstCookies = () => Array.from({ length: 12 }, (_, i) => ({
  id: i,
  startX: Math.random() * 100,
  startY: 110,
  endX: Math.random() * 100,
  endY: Math.random() * 80,
  rotation: Math.random() * 720 - 360,
  size: Math.random() * 40 + 24,
  opacity: Math.random() * 0.5 + 0.4,
  duration: Math.random() * 1.5 + 1.5,
  delay: i * 0.15,
}))

const generateFloatingCookies = () => Array.from({ length: 8 }, (_, i) => ({
  id: i + 100,
  x: Math.random() * 90 + 5,
  y: Math.random() * 80 + 10,
  size: Math.random() * 20 + 16,
  opacity: Math.random() * 0.12 + 0.05,
  duration: Math.random() * 8 + 12,
  delay: Math.random() * 3,
  driftX: (Math.random() - 0.5) * 30,
  driftY: (Math.random() - 0.5) * 20,
  rotation: Math.random() * 360 - 180,
}))

export function FlyingCookies() {
  const [burstCookies] = useState(generateBurstCookies)
  const [floatingCookies] = useState(generateFloatingCookies)
  const [burstVisible, setBurstVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setBurstVisible(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* Burst cookies on load */}
      <AnimatePresence>
        {burstVisible && burstCookies.map((cookie) => (
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

      {/* Permanent floating cookies */}
      {floatingCookies.map((cookie) => (
        <motion.div
          key={cookie.id}
          initial={{
            x: `${cookie.x}vw`,
            y: `${cookie.y}vh`,
            opacity: 0,
          }}
          animate={{
            x: [`${cookie.x}vw`, `${cookie.x + cookie.driftX}vw`, `${cookie.x}vw`],
            y: [`${cookie.y}vh`, `${cookie.y + cookie.driftY}vh`, `${cookie.y}vh`],
            rotate: [0, cookie.rotation, 0],
            opacity: cookie.opacity,
          }}
          transition={{
            x: { duration: cookie.duration, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: cookie.duration * 0.8, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: cookie.duration * 1.2, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 2, delay: cookie.delay + 3 },
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
    </div>
  )
}
