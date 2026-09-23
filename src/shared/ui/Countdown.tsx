import { useEffect, useState } from 'react'
import classes from './Countdown.module.css'

const pad = (n: number) => String(n).padStart(2, '0')

export function Countdown({ target }: { target: Date }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const diff = Math.max(0, target.getTime() - now)
  if (diff === 0) {
    return (
      <div className={classes.live}>
        <span className={classes.dot} /> Fight night is live
      </div>
    )
  }

  const cells = [
    { label: 'Days', value: Math.floor(diff / 86_400_000) },
    { label: 'Hours', value: Math.floor(diff / 3_600_000) % 24 },
    { label: 'Min', value: Math.floor(diff / 60_000) % 60 },
    { label: 'Sec', value: Math.floor(diff / 1000) % 60 },
  ]

  return (
    <div className={classes.root} role="timer" aria-label="Time until event">
      {cells.map((cell) => (
        <div key={cell.label} className={classes.cell}>
          <div className={classes.value}>{pad(cell.value)}</div>
          <div className={classes.label}>{cell.label}</div>
        </div>
      ))}
    </div>
  )
}
