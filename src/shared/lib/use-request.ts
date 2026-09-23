import { useCallback, useEffect, useRef } from 'react'
import { create } from 'zustand'

type Status = 'loading' | 'success' | 'error'

interface Entry {
  status: Status
  data?: unknown
  error?: unknown
  updatedAt: number
}

interface RequestCache {
  entries: Record<string, Entry | undefined>
  set: (key: string, entry: Entry) => void
}

const STALE_MS = 60_000

const useRequestCache = create<RequestCache>((set) => ({
  entries: {},
  set: (key, entry) => set((state) => ({ entries: { ...state.entries, [key]: entry } })),
}))

const inFlight = new Map<string, Promise<unknown>>()

function run<T>(key: string, fetcher: () => Promise<T>, force = false) {
  const { entries, set } = useRequestCache.getState()
  const current = entries[key]
  if (inFlight.has(key)) return
  if (!force && current?.status === 'success' && Date.now() - current.updatedAt < STALE_MS) return

  set(key, { ...current, status: current?.status === 'success' ? 'success' : 'loading', updatedAt: current?.updatedAt ?? 0 })
  const promise = fetcher()
    .then((data) => set(key, { status: 'success', data, updatedAt: Date.now() }))
    .catch((error: unknown) => set(key, { status: 'error', error, updatedAt: Date.now() }))
    .finally(() => inFlight.delete(key))
  inFlight.set(key, promise)
}

/**
 * Minimal cached request hook backed by a zustand store: dedupes in-flight
 * requests, serves cached data instantly on revisit and revalidates when stale.
 * Pass `null` as the key to skip the request.
 */
export function useRequest<T>(key: string | null, fetcher: () => Promise<T>) {
  const entry = useRequestCache((state) => (key ? state.entries[key] : undefined))
  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    fetcherRef.current = fetcher
  })

  useEffect(() => {
    if (key) run(key, () => fetcherRef.current())
  }, [key])

  const retry = useCallback(() => {
    if (key) run(key, () => fetcherRef.current(), true)
  }, [key])

  return {
    data: entry?.data as T | undefined,
    error: entry?.status === 'error' ? entry.error : undefined,
    isLoading: key !== null && (!entry || entry.status === 'loading'),
    retry,
  }
}
