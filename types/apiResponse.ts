export interface TApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}