import { SegmentedControl, TextInput } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { useState } from 'react'
import type { EventScope } from '@/entities/event'
import { FilterBar, filterBarClasses as classes, IconSearch } from '@/shared/ui'
import { useEventsFilter } from '../model/store'

const SCOPES: { label: string; value: EventScope }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
  { label: 'All', value: 'all' },
]

export function EventsFilterBar() {
  const { scope, search, setScope, setSearch } = useEventsFilter()
  const [query, setQuery] = useState(search)
  const commitSearch = useDebouncedCallback(setSearch, 350)

  return (
    <FilterBar>
      <SegmentedControl
        value={scope}
        onChange={(value) => setScope(value as EventScope)}
        data={SCOPES}
        color="vfl"
        radius={0}
        size="md"
        className={classes.segment}
      />
      <TextInput
        className={classes.search}
        value={query}
        onChange={(e) => {
          setQuery(e.currentTarget.value)
          commitSearch(e.currentTarget.value)
        }}
        placeholder="Search events or matchups"
        leftSection={<IconSearch size={16} />}
        radius={0}
        size="md"
        aria-label="Search events"
      />
    </FilterBar>
  )
}
