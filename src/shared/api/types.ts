export interface ListMeta {
  page: number
  limit: number
  total: number
  total_pages: number
}

export interface ListResponse<T> {
  data: T[]
  meta: ListMeta
}

export interface PageParams {
  page?: number
  limit?: number
}
