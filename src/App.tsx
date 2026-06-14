import { MotionConfig } from 'framer-motion'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { BackToTop } from './components/ui/BackToTop'
import { Navbar } from './components/sections/Navbar'
import { Hero } from './components/sections/Hero'
import { Marquee } from './components/sections/Marquee'
import { AppPreview } from './components/sections/AppPreview'
import { Services } from './components/sections/Services'
import { HowItWorks } from './components/sections/HowItWorks'
import { Trust } from './components/sections/Trust'
import { Workers } from './components/sections/Workers'
import { Seasonal } from './components/sections/Seasonal'
import { Waitlist } from './components/sections/Waitlist'
import { FAQ } from './components/sections/FAQ'
import { Footer } from './components/sections/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <a
        href="#main"
        className="sr-only rounded-full focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream focus:shadow-card"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <AppPreview />
        <Services />
        <HowItWorks />
        <Trust />
        <Workers />
        <Seasonal />
        <Waitlist />
        <FAQ />
      </main>

      <Footer />
      <BackToTop />
    </MotionConfig>
  )
}
