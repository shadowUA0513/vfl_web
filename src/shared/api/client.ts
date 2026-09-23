import axios, { isAxiosError } from 'axios'
import { env } from '@/shared/config'

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15_000,
})

export function getErrorMessage(error: unknown): string {
  if (isAxiosError<{ error?: string }>(error)) {
    if (error.response?.status === 404) return 'Not found'
    return error.response?.data?.error ?? error.message
  }
  return error instanceof Error ? error.message : 'Something went wrong'
}

export function isNotFound(error: unknown): boolean {
  return isAxiosError(error) && error.response?.status === 404
}
