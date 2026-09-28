/**
 * Production-only deterrent against casual inspection: blocks the context menu and
 * DevTools/view-source shortcuts, and blanks the page when DevTools is detected open.
 * This is not real protection — anything shipped to the browser can still be read.
 */

const CHECK_INTERVAL_MS = 1000
const PAUSE_THRESHOLD_MS = 100

const isBlockedShortcut = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase()
  const mod = e.ctrlKey || e.metaKey

  if (key === 'F12') return true
  // Ctrl+Shift+I / J / C (Cmd+Opt+I / J / C on macOS)
  if (mod && (e.shiftKey || e.altKey) && ['I', 'J', 'C'].includes(key)) return true
  // View source / save page
  if (mod && (key === 'U' || key === 'S')) return true
  return false
}

// A `debugger` statement only pauses while DevTools is open, so a long pause means it's open.
const isDevToolsOpen = () => {
  const start = performance.now()
  // eslint-disable-next-line no-debugger
  debugger
  return performance.now() - start > PAUSE_THRESHOLD_MS
}

const lockPage = () => {
  document.documentElement.innerHTML = ''
  window.location.replace('about:blank')
}

export function initDevtoolsGuard() {
  if (!import.meta.env.PROD) return

  document.addEventListener('contextmenu', (e) => e.preventDefault())
  document.addEventListener(
    'keydown',
    (e) => {
      if (!isBlockedShortcut(e)) return
      e.preventDefault()
      e.stopPropagation()
    },
    { capture: true },
  )

  window.setInterval(() => {
    if (isDevToolsOpen()) lockPage()
  }, CHECK_INTERVAL_MS)
}
