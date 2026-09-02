import { Outlet, useLocation } from 'react-router-dom'
import { useActiveSection } from '../hooks/useActiveSection'
import { Footer } from './Footer'
import { IntroOverlay } from './IntroOverlay'
import { Navbar } from './Navbar'
import { ParticlesBackground } from './ParticlesBackground'
import { RadialNav } from './RadialNav'

const homeSectionIds = ['home', 'products', 'about', 'contact']

export function Layout() {
  const location = useLocation()
  const activeSection = useActiveSection(homeSectionIds)
  const activeId =
    location.pathname === '/thoughts' ? 'thoughts' : activeSection

  return (
    <>
      <IntroOverlay />
      <ParticlesBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
      <RadialNav activeId={activeId} />
    </>
  )
}
