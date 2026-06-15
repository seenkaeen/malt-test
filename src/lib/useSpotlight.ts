import { useCallback } from 'react'
import type { MouseEvent } from 'react'

/**
 * Tracks the pointer inside an element and writes its position to the
 * `--mx` / `--my` CSS custom properties, so a `.spot-glow` child can render a
 * radial highlight that follows the cursor. Pair with `group/spot` on the host.
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  return useCallback((e: MouseEvent<T>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}
