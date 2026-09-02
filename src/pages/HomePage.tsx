import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AboutExperience } from '../components/AboutExperience'
import { ContactSection } from '../components/ContactSection'
import { Hero } from '../components/Hero'
import { ProductLaunchpad } from '../components/ProductLaunchpad'
import { SkillsToolkit } from '../components/SkillsToolkit'
import { scrollToSection } from '../lib/scroll'

export function HomePage() {
  const location = useLocation()

  // If we routed home with a section target (from another page), scroll to it.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (target) {
      // wait a frame for sections to mount
      requestAnimationFrame(() => scrollToSection(target))
    }
  }, [location.state])

  return (
    <>
      <Hero />
      <ProductLaunchpad />
      <AboutExperience />
      <SkillsToolkit />
      <ContactSection />
    </>
  )
}
