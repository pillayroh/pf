import {
  Home,
  Layers,
  Mail,
  NotebookPen,
  Route as RouteIcon,
  type LucideIcon,
} from 'lucide-react'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { scrollToSection } from './scroll'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  /** 'section' scrolls within the home page; 'route' changes page */
  kind: 'section' | 'route'
  /** section id (for kind 'section') or path (for kind 'route') */
  target: string
}

/**
 * Single source of truth for the site map, shared by the top bar and the
 * floating radial navigator.
 */
export const siteNav: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, kind: 'section', target: 'home' },
  {
    id: 'products',
    label: 'Projects',
    icon: Layers,
    kind: 'section',
    target: 'products',
  },
  {
    id: 'about',
    label: 'Journey',
    icon: RouteIcon,
    kind: 'section',
    target: 'about',
  },
  {
    id: 'thoughts',
    label: 'My Thoughts',
    icon: NotebookPen,
    kind: 'route',
    target: '/thoughts',
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    kind: 'section',
    target: 'contact',
  },
]

/**
 * Returns a resolver that navigates to a nav item. Section targets scroll on
 * the home page, or route home first (then scroll) when on another page.
 */
export function useSiteNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (item: NavItem) => {
      if (item.kind === 'route') {
        navigate(item.target)
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      // section
      if (location.pathname === '/') {
        scrollToSection(item.target)
      } else {
        navigate('/', { state: { scrollTo: item.target } })
      }
    },
    [navigate, location.pathname],
  )
}
