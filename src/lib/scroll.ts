/** Smoothly scroll to a section by id, honoring reduced-motion preference. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const prefersReduced = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  ).matches
  el.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  })
  // move focus for keyboard/screen-reader users without an extra scroll jump
  el.setAttribute('tabindex', '-1')
  ;(el as HTMLElement).focus({ preventScroll: true })
}
