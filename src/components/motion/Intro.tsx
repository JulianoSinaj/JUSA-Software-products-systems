import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../../data/site'
import { PLAY_INTRO, easeInOut, easeOut } from '../../lib/motion'

/**
 * Opening curtain: the wordmark rises letter by letter, the amber dot
 * lands, then the panel lifts away to reveal the page. Once per session.
 */
export function Intro() {
  const [visible, setVisible] = useState(PLAY_INTRO)

  // Letters (~0.6s) plus a short hold, then lift the curtain.
  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(() => setVisible(false), 1050)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-canvas"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: easeInOut } }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -24, transition: { duration: 0.4, ease: easeOut } }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {site.name.split('').map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  className="inline-block text-2xl font-semibold tracking-[0.3em] text-ink"
                  variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.7, ease: easeOut } } }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
            <motion.span
              className="size-2 rounded-full bg-accent shadow-[0_0_16px_2px_rgb(245_158_11/0.7)]"
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 14 } },
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
