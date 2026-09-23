import { useDocumentTitle } from '@mantine/hooks'
import { NotFound } from '@/shared/ui'

export function NotFoundPage() {
  useDocumentTitle('Not found — VFL')
  return <NotFound />
}
