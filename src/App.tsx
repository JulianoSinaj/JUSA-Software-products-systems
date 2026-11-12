import { MotionConfig } from 'framer-motion'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Ambient } from './components/motion/Ambient'
import { Intro } from './components/motion/Intro'
import { SmoothScroll } from './components/motion/SmoothScroll'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Expertise } from './components/sections/Expertise'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Solutions } from './components/sections/Solutions'

export default function App() {
  return (
    // "user": transform animations are skipped for visitors who ask for
    // reduced motion; opacity fades still run so nothing pops in harshly.
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Ambient />
      <Intro />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:border focus:border-line-strong focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Expertise />
        <Solutions />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </MotionConfig>
  )
}
