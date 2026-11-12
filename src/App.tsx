import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Expertise } from './components/sections/Expertise'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Solutions } from './components/sections/Solutions'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
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
    </>
  )
}
