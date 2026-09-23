import { SegmentedControl, Select, TextInput } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { useState } from 'react'
import { divisionLabel, fetchDivisions } from '@/entities/division'
import { useRequest } from '@/shared/lib'
import { FilterBar, filterBarClasses as classes, IconSearch } from '@/shared/ui'
import { useAthletesFilter, type AthleteStatusFilter } from '../model/store'

const STATUSES: { label: string; value: AthleteStatusFilter }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Retired', value: 'retired' },
  { label: 'All', value: 'all' },
]

export function AthletesFilterBar() {
  const { search, divisionId, status, setSearch, setDivisionId, setStatus } = useAthletesFilter()
  const [query, setQuery] = useState(search)
  const commitSearch = useDebouncedCallback(setSearch, 350)
  const divisions = useRequest('divisions:weight', () => fetchDivisions({ kind: 'weight_class' }))

  return (
    <FilterBar>
      <TextInput
        className={classes.search}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value)
          commitSearch(e.currentTarget.value)
        }}
        placeholder="Search by name or nickname"
        leftSection={<IconSearch size={16} />}
        radius={0}
        size="md"
        aria-label="Search athletes"
      />
      <Select
        className={classes.select}
        value={divisionId}
        onChange={setDivisionId}
        data={(divisions.data ?? []).map((d) => ({ value: d.id, label: divisionLabel(d) }))}
        placeholder="All divisions"
        clearable
        radius={0}
        size="md"
        aria-label="Division"
        comboboxProps={{ radius: 0 }}
      />
      <SegmentedControl
        value={status}
        onChange={(value) => setStatus(value as AthleteStatusFilter)}
        data={STATUSES}
        color="vfl"
        radius={0}
        size="md"
        className={classes.segment}
      />
    </FilterBar>
  )
}
