import { rankedName, rankingTitle, type DivisionRanking } from '@/entities/ranking'
import classes from './DivisionPicker.module.css'

interface DivisionPickerProps {
  rankings: DivisionRanking[]
  value: string
  onChange: (divisionId: string) => void
}

export function DivisionPicker({ rankings, value, onChange }: DivisionPickerProps) {
  return (
    <nav className={classes.list} aria-label="Divisions">
      {rankings.map((ranking) => (
        <button
          key={ranking.division_id}
          type="button"
          className={classes.item}
          data-active={ranking.division_id === value || undefined}
          aria-current={ranking.division_id === value || undefined}
          onClick={() => onChange(ranking.division_id)}
        >
          <span className={classes.name}>{rankingTitle(ranking)}</span>
          <span className={classes.champ}>{ranking.champion ? `Champion · ${rankedName(ranking.champion)}` : 'Title vacant'}</span>
        </button>
      ))}
    </nav>
  )
}
