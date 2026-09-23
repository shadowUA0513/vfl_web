import type { ReactNode } from 'react'
import classes from './FilterBar.module.css'

export function FilterBar({ children }: { children: ReactNode }) {
  return <div className={classes.bar}>{children}</div>
}
